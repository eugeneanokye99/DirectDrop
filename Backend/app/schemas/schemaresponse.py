from pydantic import BaseModel, EmailStr, validator, PrivateAttr, Field
from typing import List, Optional
from datetime import datetime
import humanize

class UserCreate(BaseModel):
    email: EmailStr
    first_name: str
    last_name: str
    password: str
    # bio: Optional[str] = None # we do not have to add the bio when user is creating account

class UserLogin(BaseModel):
    email: EmailStr
    password: str
    # message : str
    
class Token(BaseModel):
    message: str
    access_token: str
    token_type: str 
class TokenData(BaseModel):
    id: Optional[int] = None
    
class UserUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name:Optional[str] = None
    bio: Optional[str] = None
    
    # email: str
    
    class Config:
        from_attribute = True

class UserUpdateResponse(BaseModel):
    message: str
    user: UserUpdate

class UserUpdateResponse(BaseModel):
    message: str
    user: UserUpdate


class UserResponse(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: str
    created_at: str
    is_verified: bool
    is_admin: bool
    bio: str
  
    
    class Config:
        from_attributes = True

   
    @staticmethod
    def from_orm(obj):
        obj_dict = super().from_orm(obj).dict()
        obj_dict['created_at'] = obj.created_at.strftime('%Y-%m-%d %H:%M:%S')
        return obj_dict


class FileUploadResponse(BaseModel):
    id: int
    user_id: int
    uploaded_by: str  # Add this field to include the uploader's name
    filename: str
    file_size: str
 
    class Config:
        from_attributes = True
    
class FilesDisplayResponse(BaseModel):
    id: int
    uploaded_by : str
    filename: str
    file_size: str
    upload_date: datetime = Field(default_factory=datetime.now, exclude=True) # Store original date as datetime
    time_ago: str = None # Provide a default value
    
    @validator("time_ago", pre=True, always=True)
    def calculate_time_ago(cls, _, values):
        upload_date = values.get("upload_date")
        if upload_date and isinstance(upload_date, datetime):
            return humanize.naturaltime(datetime.now() - upload_date)
        return "just now"  
    
    class Config:
        from_attributes = True
    