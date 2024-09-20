"""Fix uniqueness constraints

Revision ID: a5b40929dd1c
Revises: new_revision_id
Create Date: 2024-09-19 17:01:18.570478

"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = 'a5b40929dd1c'  # Replace with your new revision ID
down_revision = 'cc178cdcac17'
branch_labels = None
depends_on = None

def upgrade() -> None:
    # Drop the uniqueness constraints
    op.drop_constraint('users_first_name_key', 'users', type_='unique')
    op.drop_constraint('users_last_name_key', 'users', type_='unique')

def downgrade() -> None:
    # Re-add the uniqueness constraints
    op.create_unique_constraint('users_first_name_key', 'users', ['first_name'])
    op.create_unique_constraint('users_last_name_key', 'users', ['last_name'])
