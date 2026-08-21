"""add server defaults to restaurants timestamps

Revision ID: c4a1f8d92e07
Revises: 6901150a257a
Create Date: 2026-08-21 13:40:00.000000
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = "c4a1f8d92e07"
down_revision: Union[str, Sequence[str], None] = "6901150a257a"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Add now() server defaults to restaurants.created_at/updated_at."""
    op.alter_column(
        "restaurants",
        "created_at",
        existing_type=postgresql.TIMESTAMP(timezone=True),
        server_default=sa.text("now()"),
        existing_nullable=False,
    )
    op.alter_column(
        "restaurants",
        "updated_at",
        existing_type=postgresql.TIMESTAMP(timezone=True),
        server_default=sa.text("now()"),
        existing_nullable=False,
    )


def downgrade() -> None:
    """Remove the server defaults."""
    op.alter_column(
        "restaurants",
        "updated_at",
        existing_type=postgresql.TIMESTAMP(timezone=True),
        server_default=None,
        existing_nullable=False,
    )
    op.alter_column(
        "restaurants",
        "created_at",
        existing_type=postgresql.TIMESTAMP(timezone=True),
        server_default=None,
        existing_nullable=False,
    )
