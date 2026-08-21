import uuid
from datetime import datetime
from typing import TYPE_CHECKING

from sqlalchemy import DateTime, ForeignKey, UniqueConstraint, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base

if TYPE_CHECKING:
    from app.models.permission import Permission
    from app.models.restaurant_member import RestaurantMember


class RestaurantMemberPermission(Base):
    __tablename__ = "restaurant_member_permissions"

    __table_args__ = (
        UniqueConstraint(
            "restaurant_member_id",
            "permission_id",
            name="uq_restaurant_member_permission",
        ),
    )

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )

    restaurant_member_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("restaurant_members.id"),
        nullable=False,
        index=True,
    )

    permission_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("permissions.id"),
        nullable=False,
        index=True,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    restaurant_member: Mapped["RestaurantMember"] = relationship(
        back_populates="permissions"
    )

    permission: Mapped["Permission"] = relationship(back_populates="member_permissions")
