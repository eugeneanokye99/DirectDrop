from fastapi import (
    FastAPI, 
    Depends, 
    HTTPException, 
    status, 
    APIRouter, 
    BackgroundTasks)

from app.database.models import User
from app.schemas.schemaresponse import UserCreate
from app.utils.hashing import hash
from app.database.db import get_db
from sqlalchemy.orm import Session
import logging
from jose import JWTError

router = APIRouter(
    tags=["auth"]
)


@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register_user(user:UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="User already exist"
        )
    
    hashed_password = hash(user.password)
    
    new_user = User(**user.dict())
    
    new_user.password = hashed_password
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    return{
        "message": "User registration successful"
    }