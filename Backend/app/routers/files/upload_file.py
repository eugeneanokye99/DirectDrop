from fastapi import (
    FastAPI, 
    Depends, 
    HTTPException, 
    status, 
    APIRouter, 
    BackgroundTasks,
    Header,
    File, 
    UploadFile
)
from app.database.models import User, FileUpload
from app.schemas.schemaresponse import FileUploadResponse
from app.database.db import get_db
from sqlalchemy.orm import Session
from .utils import convert_size_to_mb
from app.auth.Oauth2 import get_user_id_from_token

import logging

logger = logging.getLogger(__name__)

router = APIRouter(tags=["Upload File"])

@router.post("/upload-file/", response_model=FileUploadResponse)
async def upload_file(
    db : Session = Depends(get_db),
    file: UploadFile = File(...),
    current_user: User = Depends(get_user_id_from_token)
):
    contents = await file.read()
    file_size_in_bytes = len(contents)
    file_size_in_mb = convert_size_to_mb(file_size_in_bytes)

    new_file = FileUpload(
        user_id=current_user.id,
        uploaded_by=current_user.first_name + " " + current_user.last_name, 
        filename=file.filename,
        file_data=contents,  
        file_size= str(round(file_size_in_mb, 2)) + " MB",
        file_type=file.content_type
    )
    
    db.add(new_file)
    db.commit()
    db.refresh(new_file)
    
    return new_file
   