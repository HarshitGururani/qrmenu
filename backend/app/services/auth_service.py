from datetime import datetime, timedelta, timezone

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.models.accounts import Account
from app.models.account_identity import AccountIdentity, AuthProvider
from app.models.refresh_token import RefreshToken

from app.core.config import settings
from app.core.security import (
    decode_refresh_token,
    hash_password,
    verify_password,
    create_access_token,
    create_refresh_token,
    hash_token,
)


async def create_auth_session(
    db: AsyncSession,
    account: Account,
):
    access_token = create_access_token(account_id=str(account.id))

    refresh_token = create_refresh_token(account_id=str(account.id))

    refresh_token_record = RefreshToken(
        account_id=account.id,
        token_hash=hash_token(refresh_token),
        expires_at=datetime.now(timezone.utc)
        + timedelta(days=settings.JWT_REFRESH_TOKEN_EXPIRE_DAYS),
    )

    db.add(refresh_token_record)

    return access_token, refresh_token


async def login_account(
    db: AsyncSession,
    email: str,
    password: str,
):
    result = await db.execute(select(Account).where(Account.email == email))

    account = result.scalar_one_or_none()

    if account is None:
        raise ValueError("Invalid email or password")

    if not account.is_active:
        raise ValueError("Invalid email or password")

    if account.password_hash is None:
        raise ValueError("Please continue with Google")

    if not verify_password(password, account.password_hash):
        raise ValueError("Invalid email or password")

    access_token, refresh_token = await create_auth_session(
        db=db,
        account=account,
    )

    await db.commit()

    return account, access_token, refresh_token


async def register_account(
    db: AsyncSession,
    name: str,
    email: str,
    password: str,
    phone: str | None = None,
):

    result = await db.execute(select(Account).where(Account.email == email))

    existing_account = result.scalar_one_or_none()

    if existing_account:
        raise ValueError("Account with this email already exists.")

    account = Account(
        name=name,
        email=email,
        phone=phone,
        password_hash=hash_password(password),
    )

    db.add(account)

    # Generate account.id without committing yet
    await db.flush()

    access_token, refresh_token = await create_auth_session(
        db=db,
        account=account,
    )

    await db.commit()
    await db.refresh(account)

    return account, access_token, refresh_token


async def refresh_access_token(db: AsyncSession, refresh_token: str):
    payload = decode_refresh_token(refresh_token)

    account_id = payload.get("sub")

    if not account_id:
        raise ValueError("Invalid refresh token")

    token_hash = hash_token(refresh_token)

    result = await db.execute(
        select(RefreshToken).where(
            RefreshToken.token_hash == token_hash,
        )
    )

    token_record = result.scalar_one_or_none()

    if token_record.revoked:
        raise ValueError("Refresh token revoked")

    if token_record.expires_at < datetime.now(timezone.utc):
        raise ValueError("Refresh token expired")

    account = db.execute(select(Account).where(Account.id == account_id))

    if not account and not account.is_active:
        raise ValueError("Account not found")

    return create_access_token(account_id=str(account_id))


async def revoke_refresh_token(db: AsyncSession, refresh_token: str) -> None:
    token_hash = hash_token(refresh_token)

    result = await db.execute(
        select(RefreshToken).where(RefreshToken.token_hash == token_hash)
    )
    token_record = result.scalar_one_or_none()

    if token_record is not None and not token_record.revoked:
        token_record.revoked = True

    await db.commit()


async def login_with_google(
    db: AsyncSession,
    provider_user_id: str,
    email: str,
    name: str,
):
    identity_result = await db.execute(
        select(AccountIdentity, Account)
        .join(Account, Account.id == AccountIdentity.account_id)
        .where(
            AccountIdentity.provider == AuthProvider.GOOGLE,
            AccountIdentity.provider_user_id == provider_user_id,
        )
    )
    identity_row = identity_result.one_or_none()

    if identity_row is not None:
        _, account = identity_row
    else:
        account_result = await db.execute(select(Account).where(Account.email == email))
        account = account_result.scalar_one_or_none()

        if account is None:
            account = Account(name=name, email=email, password_hash=None)
            db.add(account)
            await db.flush()

        db.add(
            AccountIdentity(
                account_id=account.id,
                provider=AuthProvider.GOOGLE,
                provider_user_id=provider_user_id,
            )
        )

    if not account.is_active:
        raise ValueError("Account is inactive")

    access_token, refresh_token = await create_auth_session(db=db, account=account)
    await db.commit()

    return account, access_token, refresh_token
