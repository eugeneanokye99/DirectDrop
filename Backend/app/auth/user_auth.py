from fastapi import (
    FastAPI, 
    Depends, 
    HTTPException, 
    status, 
    APIRouter, 
    BackgroundTasks)

from app.database.models import User
from app.database.db import get_db
from sqlalchemy.orm import Session
import logging

router = APIRouter(
    tags=["auth"]
)changes

@router.post("/register", status_code=status.HTTP_201_CREATED)