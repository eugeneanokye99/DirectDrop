from sqlalchemy.orm import mapper
from app.database.db import Base
from sqlalchemy.sql.expression import text
from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, event, LargeBinary, ForeignKey, text
from sqlalchemy.sql.sqltypes import TIMESTAMP
from datetime import datetime
from sqlalchemy.orm import relationship

class FileUpload(Base):
    __tablename__ = "files"
    
    id = Column(Integer, primary_key=True, nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False) 
    uploaded_by = Column(String, nullable=False)# Foreign key to User table
    filename = Column(String, nullable=False)
    file_data = Column(LargeBinary, nullable=False)  # Stores the file content as binary
    file_size = Column(Integer, nullable=True)
    file_type = Column(String, nullable=True)
    upload_date = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text('CURRENT_TIMESTAMP'))
 
    
    user = relationship("User", back_populates="files")

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, nullable=False)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    password = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    bio = Column(String, nullable=True)
    created_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text('CURRENT_TIMESTAMP'))
    is_verified = Column(Boolean, server_default='FALSE', nullable=False)
    is_admin = Column(Boolean, server_default='FALSE', nullable=False)
    
    # Relationship with the File model
    files = relationship("FileUpload", back_populates="user")

# Format created_at field upon loading the user
def format_created_at(target, context):
    if target.created_at:
        target.created_at = target.created_at.strftime('%Y-%m-%d %H:%M:%S')

event.listen(User, 'load', format_created_at)
