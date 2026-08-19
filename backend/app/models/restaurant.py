from datetime import datetime, timezone
import enum
import uuid
from sqlalchemy.orm import Mapped, mapped_column
from app.core.databse import Base
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import String, Enum as SAENUM


class PlanEnum(str, enum.Enum):
    trail = "trail"
    pro = "pro"
    business = "business"


class BillingCycleEnum(str, enum.Enum):
    monthly = "monthly"
    six_month = "6month"
    yearly = "yearly"


class Restaurant(Base):
    __tablename__ = "restaurants"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    slug: Mapped[str] = mapped_column(String(255), unique=True, nullable=False)
    email: Mapped[str | None] = mapped_column(String(255), nullable=True)
    phone: Mapped[str | None] = mapped_column(String(20), nullable=True)
    address: Mapped[str | None] = mapped_column(String, nullable=True)
    city: Mapped[str | None] = mapped_column(String(100), nullable=True)
    state: Mapped[str | None] = mapped_column(String(100), nullable=True)
    pincode: Mapped[str | None] = mapped_column(String(10), nullable=True)
    gst_number: Mapped[str | None] = mapped_column(String(15), nullable=True)
    logo_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    cover_image_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    brand_color: Mapped[str | None] = mapped_column(String(7), nullable=True)

    plan: Mapped[PlanEnum] = mapped_column(
        SAENUM(PlanEnum, name="plan_enum"), nullable=False, default=PlanEnum.trail
    )

    billing_cycle: Mapped[BillingCycleEnum] = mapped_column(
        SAENUM(BillingCycleEnum, name="billing_enum"),
        nullable=False,
        default=BillingCycleEnum.monthly,
    )

    is_active: Mapped[bool] = mapped_column(nullable=False, default=True)
    created_at: Mapped[datetime] = mapped_column(
        default=lambda: datetime.now(timezone.utc)
    )

    updated_at: Mapped[datetime] = mapped_column(
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
    )
