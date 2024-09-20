from fastapi import (
    FastAPI, 
    Depends, 
    HTTPException, 
    status, 
    APIRouter, 
    BackgroundTasks,
    Header
)
from app.database.models import User
from app.schemas.schemaresponse import UserCreate, Token, UserLogin, UserResponse, UserUpdate
from app.auth.Oauth2 import create_access_token, verify_access_token, get_user_id_from_token
from app.utils.hashing import hasher, verify_password
from app.database.db import get_db
from sqlalchemy.orm import Session
from datetime import datetime
import logging

logger = logging.getLogger(__name__)

router = APIRouter(tags=["auth"])

@router.put('/updateprofile', response_model=UserUpdate)
def update_user(
    user_update: UserUpdate, 
    authorization: str = Header(...),  # Extract token from the Authorization header
    db: Session = Depends(get_db)
):
    # Extract the token from the 'Authorization' header
    token = authorization.replace("Bearer ", "")
    logger.info(f"Received token: {token}")

    # Decode token to get user ID
    user_id = get_user_id_from_token(token)

    user = db.query(User).filter(User.id == user_id).first()
    
    if not user:
        logger.error(f"User with ID {user_id} not found")
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    # Update user data
    user.first_name = user_update.first_name
    user.last_name = user_update.last_name 
    user.bio = user_update.bio 
    user.email = user_update.email


    db.commit()
    db.refresh(user)
    return {
        "message" : "User update successful",
        "user": user,
    }
