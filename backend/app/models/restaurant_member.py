import enum
import uuid
from datetime import datetime
from typing import TYPE_CHECKING

from sqlalchemy import Boolean, DateTime, Enum, ForeignKey, UniqueConstraint, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base

if TYPE_CHECKING:
    from app.models.accounts import Account
    from app.models.restaurant import Restaurant
    from app.models.restaurant_member_permission import RestaurantMemberPermission


class RestaurantMemberRole(str, enum.Enum):
    OWNER = "owner"
    STAFF = "staff"


class RestaurantMember(Base):
    __tablename__ = "restaurant_members"

    __table_args__ = (
        UniqueConstraint(
            "restaurant_id",
            "account_id",
            name="uq_restaurant_member",
        ),
    )

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )

    restaurant_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("restaurants.id"),
        nullable=False,
        index=True,
    )

    account_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("accounts.id"),
        nullable=False,
        index=True,
    )

    role: Mapped[RestaurantMemberRole] = mapped_column(
        Enum(RestaurantMemberRole, name="restaurant_member_role"),
        nullable=False,
    )

    is_active: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=True,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )

    account: Mapped["Account"] = relationship(back_populates="restaurant_memberships")

    permissions: Mapped[list["RestaurantMemberPermission"]] = relationship(
        back_populates="restaurant_member"
    )

    restaurant: Mapped["Restaurant"] = relationship(back_populates="members")
