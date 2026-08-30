from pydantic import BaseModel, EmailStr, Field

from app.schemas.account import AccountResponse


class LoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)


class TokenResponse(BaseModel):
    message: str
    access_token: str
    token_type: str = "bearer"


class LogoutResponse(BaseModel):
    message: str


class RefreshResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class RegisterResponse(AccountResponse):
    message: str
    access_token: str
    token_type: str = "bearer"
