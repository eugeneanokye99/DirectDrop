from fastapi import (
    FastAPI, 
    Depends, 
    HTTPException, 
    status, 
    APIRouter, 
    BackgroundTasks)

from app.database.models import User
from app.schemas.schemaresponse import UserCreate, Token, UserLogin
from app.auth.Oauth2 import create_access_token, verify_access_token
from app.utils.hashing import hasher, verify_password
from app.database.db import get_db
from sqlalchemy.orm import Session
import logging

router = APIRouter(
    tags=["auth"]
)

@router.get('/update')
def root():
    return {
        "message": 
            "DirectDrop update profile. Anticipate!"
    }
