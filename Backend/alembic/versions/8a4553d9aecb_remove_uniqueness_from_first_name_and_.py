from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = 'new_revision_id'  # Replace with the new revision ID
down_revision = 'cc178cdcac17'
branch_labels = None
depends_on = None

def upgrade() -> None:
    # Remove uniqueness constraints from 'first_name' and 'last_name'
    op.drop_constraint('users_first_name_key', 'users', type_='unique')
    op.drop_constraint('users_last_name_key', 'users', type_='unique')

def downgrade() -> None:
    # Re-add uniqueness constraints to 'first_name' and 'last_name'
    op.create_unique_constraint('users_first_name_key', 'users', ['first_name'])
    op.create_unique_constraint('users_last_name_key', 'users', ['last_name'])
