from pydantic import BaseModel, EmailStr
from typing import List

class UserCreate(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: EmailStr
    password: str
    