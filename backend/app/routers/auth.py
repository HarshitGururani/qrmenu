import secrets
from urllib.parse import urlencode

import httpx
from fastapi import APIRouter, Depends, HTTPException, Response, status, Request
from fastapi.responses import RedirectResponse
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.config import settings
from app.dependencies.auth import get_current_account
from app.models.accounts import Account
from app.models.restaurant_member import RestaurantMember
from app.schemas.account import AccountCreate, AccountResponse
from app.schemas.auth import (
    LoginRequest,
    LogoutResponse,
    RegisterResponse,
    TokenResponse,
)
from app.services.auth_service import (
    login_account,
    refresh_access_token,
    register_account,
    revoke_refresh_token,
    login_with_google,
)


router = APIRouter(
    prefix="/auth",
    tags=["Auth"],
)


REFRESH_TOKEN_COOKIE = "refresh_token"
REFRESH_TOKEN_MAX_AGE = settings.JWT_REFRESH_TOKEN_EXPIRE_DAYS * 24 * 60 * 60
GOOGLE_STATE_COOKIE = "google_oauth_state"
GOOGLE_STATE_MAX_AGE = 10 * 60
GOOGLE_AUTHORIZE_URL = "https://accounts.google.com/o/oauth2/v2/auth"
GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token"
GOOGLE_USERINFO_URL = "https://openidconnect.googleapis.com/v1/userinfo"


def set_refresh_token_cookie(response: Response, refresh_token: str) -> None:
    response.set_cookie(
        key=REFRESH_TOKEN_COOKIE,
        value=refresh_token,
        max_age=REFRESH_TOKEN_MAX_AGE,
        httponly=True,
        secure=not settings.DEBUG,
        samesite="lax",
        path="/auth",
    )


def require_google_oauth_config() -> None:
    if not settings.GOOGLE_CLIENT_ID or not settings.GOOGLE_CLIENT_SECRET:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Google OAuth is not configured",
        )


async def account_has_completed_onboarding(
    db: AsyncSession,
    account_id,
) -> bool:
    result = await db.execute(
        select(RestaurantMember.id)
        .where(
            RestaurantMember.account_id == account_id,
            RestaurantMember.is_active.is_(True),
        )
        .limit(1)
    )
    return result.scalar_one_or_none() is not None


@router.get("/google/login")
async def google_login(response: Response):
    require_google_oauth_config()
    state = secrets.token_urlsafe(32)
    query = urlencode(
        {
            "client_id": settings.GOOGLE_CLIENT_ID,
            "redirect_uri": settings.GOOGLE_REDIRECT_URI,
            "response_type": "code",
            "scope": "openid email profile",
            "state": state,
            "access_type": "offline",
            "prompt": "select_account",
        }
    )
    response.set_cookie(
        key=GOOGLE_STATE_COOKIE,
        value=state,
        max_age=GOOGLE_STATE_MAX_AGE,
        httponly=True,
        secure=not settings.DEBUG,
        samesite="lax",
        path="/auth",
    )
    response.headers["Location"] = f"{GOOGLE_AUTHORIZE_URL}?{query}"
    response.status_code = status.HTTP_307_TEMPORARY_REDIRECT
    return response


@router.get("/google/callback")
async def google_callback(
    request: Request,
    response: Response,
    db: AsyncSession = Depends(get_db),
):
    require_google_oauth_config()

    state = request.query_params.get("state")
    expected_state = request.cookies.get(GOOGLE_STATE_COOKIE)
    if (
        not state
        or not expected_state
        or not secrets.compare_digest(state, expected_state)
    ):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid OAuth state",
        )

    error = request.query_params.get("error")
    if error:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Google OAuth failed: {error}",
        )

    code = request.query_params.get("code")
    if not code:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Google authorization code missing",
        )

    async with httpx.AsyncClient(timeout=10.0) as client:
        token_response = await client.post(
            GOOGLE_TOKEN_URL,
            data={
                "code": code,
                "client_id": settings.GOOGLE_CLIENT_ID,
                "client_secret": settings.GOOGLE_CLIENT_SECRET,
                "redirect_uri": settings.GOOGLE_REDIRECT_URI,
                "grant_type": "authorization_code",
            },
        )
        if token_response.is_error:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Unable to exchange Google authorization code",
            )

        google_access_token = token_response.json().get("access_token")
        if not google_access_token:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Google access token missing",
            )

        userinfo_response = await client.get(
            GOOGLE_USERINFO_URL,
            headers={"Authorization": f"Bearer {google_access_token}"},
        )
        if userinfo_response.is_error:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Unable to retrieve Google profile",
            )

    profile = userinfo_response.json()
    provider_user_id = profile.get("sub")
    email = profile.get("email")
    if not provider_user_id or not email or profile.get("email_verified") is not True:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Google account email is not verified",
        )

    try:
        account, _, refresh_token = await login_with_google(
            db=db,
            provider_user_id=provider_user_id,
            email=email,
            name=profile.get("name") or email.split("@")[0],
        )
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=str(exc))

    has_completed_onboarding = await account_has_completed_onboarding(
        db=db,
        account_id=account.id,
    )
    redirect_target = (
        f"{settings.FRONTEND_URL}/dashboard"
        if has_completed_onboarding
        else f"{settings.FRONTEND_URL}/onboarding?step=1"
    )

    toast_value = "welcome" if not has_completed_onboarding else "account_created"
    redirect_response = RedirectResponse(
        url=f"{redirect_target}&toast={toast_value}"
        if "?" in redirect_target
        else f"{redirect_target}?toast={toast_value}",
        status_code=status.HTTP_302_FOUND,
    )
    set_refresh_token_cookie(redirect_response, refresh_token)
    redirect_response.delete_cookie(key=GOOGLE_STATE_COOKIE, path="/auth")
    return redirect_response


@router.get("/me", response_model=AccountResponse)
async def get_me(
    current_account: Account = Depends(get_current_account),
):
    return current_account


@router.post("/login", response_model=TokenResponse)
async def login(
    payload: LoginRequest,
    response: Response,
    db: AsyncSession = Depends(get_db),
):
    try:
        _, access_token, refresh_token = await login_account(
            db=db,
            email=payload.email,
            password=payload.password,
        )

        set_refresh_token_cookie(response, refresh_token)

        return TokenResponse(
            message="Login successful",
            access_token=access_token,
        )
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(exc),
            headers={"WWW-Authenticate": "Bearer"},
        )


@router.post(
    "/register",
    response_model=RegisterResponse,
    status_code=status.HTTP_201_CREATED,
)
async def register(
    payload: AccountCreate,
    response: Response,
    db: AsyncSession = Depends(get_db),
):
    try:
        account, access_token, refresh_token = await register_account(
            db=db,
            name=payload.name,
            email=payload.email,
            password=payload.password,
            phone=payload.phone,
        )

        set_refresh_token_cookie(response, refresh_token)

        return RegisterResponse(
            message="Account registered successfully",
            id=account.id,
            name=account.name,
            email=account.email,
            phone=account.phone,
            is_active=account.is_active,
            access_token=access_token,
        )

    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=str(exc),
        )


@router.post("/refresh", response_model=TokenResponse)
async def refresh_token(request: Request, db: AsyncSession = Depends(get_db)):

    refresh_token = request.cookies.get(REFRESH_TOKEN_COOKIE)

    if refresh_token is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Refresh token missing",
        )

    try:
        access_token = await refresh_access_token(db=db, refresh_token=refresh_token)

        return TokenResponse(
            message="Access token refreshed successfully",
            access_token=access_token,
        )

    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(exc),
        )


@router.post("/logout", response_model=LogoutResponse)
async def logout(
    request: Request, response: Response, db: AsyncSession = Depends(get_db)
):
    refresh_token = request.cookies.get(REFRESH_TOKEN_COOKIE)

    if refresh_token is not None:
        await revoke_refresh_token(db=db, refresh_token=refresh_token)

    response.delete_cookie(
        key=REFRESH_TOKEN_COOKIE,
        path="/auth",
    )

    return LogoutResponse(message="Logout successful")
