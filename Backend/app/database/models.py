
from app.database.db import Base
from sqlalchemy.sql.expression import text
from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.sql.sqltypes import TIMESTAMP
from datetime import datetime

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, nullable=False)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    password = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    bio = Column(String, nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), 
        nullable=False, server_default=text('CURRENT_TIMESTAMP'))
    is_verified = Column(Boolean, server_default='FALSE', nullable=False)
    is_admin = Column(Boolean, server_default='FALSE', nullable=False)
    
def format_created_at(mapper, connection, target):
    target.created_at = target.created_at.strftime('%Y-%m-%d %H:%M:%S')
    
event.listen(User, 'load', format_created_at)
    