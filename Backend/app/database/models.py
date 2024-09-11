from app.database.db import Base
from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.sql.sqltypes import TIMESTAMP
from datetime import datetime

class User(Base):
    __tablename__ = "users"
    
    id = Clumnn(Integer, pimary_key=True, index=True)
    first_name = Column(String, unique=True, nullable=F)