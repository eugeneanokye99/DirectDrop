from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime

class UserCreate(BaseModel):
    email: EmailStr
    first_name: str
    last_name: str
    password: str
    bio: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str
    
class Token(BaseModel):
    message: str
    access_token: str
    token_type: str 

class UserUpdate(BaseModel):
    first_name: str
    last_name: str
    bio: str
    email: str


class UserResponse(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: str
    created_at: datetime
    is_verified: bool
    is_admin: bool
