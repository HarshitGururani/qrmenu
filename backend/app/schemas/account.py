from uuid import UUID

from pydantic import BaseModel, EmailStr, Field


class AccountCreate(BaseModel):
    name: str = Field(min_length=2, max_length=150)
    email: EmailStr
    phone: str | None = Field(default=None, max_length=20)
    password: str = Field(min_length=8, max_length=128)


class AccountResponse(BaseModel):
    id: UUID
    name: str
    email: EmailStr
    phone: str | None
    is_active: bool

    model_config = {"from_attributes": True}
