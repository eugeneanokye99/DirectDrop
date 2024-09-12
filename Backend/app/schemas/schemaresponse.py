from pydantic import BaseModel, EmailStr
from typing import List

class UserCreate(BaseModel):
    id: int
    email: EmailStr
    first_name: str
    last_name: str
    password: str
    