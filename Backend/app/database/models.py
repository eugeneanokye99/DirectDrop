from app.database.db import Base
from sqlalchemy.sql.expression import text
from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.sql.sqltypes import TIMESTAMP
from datetime import datetime

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, nullable=False)
    first_name = Column(String, unique=True, nullable=False)
    last_name = Column(String, unique=True, nullable=False)
    email = Column(String, unique=True, nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), 
        nullable=False, server_default=text('now()'))
    is_verified = Column(Boolean, server_default='FALSE', nullable=False)
    is_admin = Column(Boolean, server_default='FALSE', nullable=False)