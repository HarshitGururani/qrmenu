"""fix trial plan spelling

Revision ID: 6901150a257a
Revises: a26de3a9e831
Create Date: 2026-08-21 13:24:45.021683
"""

from typing import Sequence, Union

from alembic import op


# revision identifiers, used by Alembic.
revision: str = "6901150a257a"
down_revision: Union[str, Sequence[str], None] = "a26de3a9e831"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Rename trail enum value to trial."""
    op.execute("ALTER TYPE plan_enum RENAME VALUE 'trail' TO 'trial'")


def downgrade() -> None:
    """Rename trial enum value back to trail."""
    op.execute("ALTER TYPE plan_enum RENAME VALUE 'trial' TO 'trail'")
