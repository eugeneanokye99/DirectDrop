from pydantic import BaseModel, EmailStr
from typing import List

class UserCreate(BaseModel):
    email: EmailStr
    first_name: str
    last_name: str
    password: str
    
class Token(BaseModel):
    access_token: str
    token_type: str