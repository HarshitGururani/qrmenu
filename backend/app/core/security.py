import hashlib
from datetime import datetime, timedelta, timezone
from jose import jwt, JWTError
from passlib.context import CryptContext

from backend.app.core.config import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def create_access_token(employee_id: str, role: str, restraunt_id: str) -> str:
    payload = {
        "sub": employee_id,
        "restraunt_id": restraunt_id,
        "role": role,
        "type": "access",
        # 1 hour
        "exp": datetime.now(timezone.utc)
        + timedelta(minutes=settings.JWT_ACCESS_TOKEN_EXPIRE_MINUTES),
    }

    return jwt.encode(payload, settings.JWT_SECRET_KEY, algorithm="HS256")


def decode_access_token(token: str) -> dict:
    try:
        payload = jwt.decode(token, settings.JWT_SECRET_KEY, algorithms=["HS256"])
        if payload.get("type") != "access":
            raise JWTError("Invalid token type")
        return payload
    except JWTError:
        raise


def create_refresh__token(employee_id: str) -> str:
    payload = {
        "sub": employee_id,
        "type": "refresh",
        "exp": datetime.now(timezone.utc)
        + timedelta(minutes=settings.JWT_REFRESH_TOKEN_EXPIRE_MINUTES),
    }
    return jwt.encode(payload, settings.JWT_REFRESH_SECRET_KEY, algorithm="HS256")


def decode_refresh_token(token: str) -> dict:
    try:
        payload = jwt.decode(
            token, settings.JWT_REFRESH_SECRET_KEY, algorithms=["HS256"]
        )
        if payload.get("type") != "refresh":
            raise JWTError("Invalid token type")
        return payload
    except JWTError:
        raise


def hash_token(token: str) -> str:
    return hashlib.sha256(token.encode()).hexdigest()
