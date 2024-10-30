from fastapi import (
    FastAPI, 
    Depends, 
    HTTPException, 
    status, 
    APIRouter, 
    BackgroundTasks,
    Header)

from app.database.models import User
from app.schemas.schemaresponse import UserCreate, Token, UserLogin, UserResponse
from app.auth.Oauth2 import create_access_token, verify_access_token, get_user_id_from_token, oauth2_scheme
from app.utils.hashing import hasher, verify_password
from app.database.db import get_db
from sqlalchemy.orm import Session
import logging

logger = logging.getLogger(__name__)

router = APIRouter(
    tags=["Users"]
)



@router.get("/user", response_model=UserResponse)
async def user_data(logged_in: User = Depends(get_user_id_from_token)):
    # Return user details only
    return UserResponse(
        id=logged_in.id,
        first_name=logged_in.first_name,
        last_name=logged_in.last_name,
        email=logged_in.email
    )
