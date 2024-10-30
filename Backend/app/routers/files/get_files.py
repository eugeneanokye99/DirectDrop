from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status
)
from sqlalchemy.orm import Session
from app.database.models import FileUpload
from app.schemas.schemaresponse import FilesDisplayResponse
from app.database.db import get_db
from typing import List

router = APIRouter(tags=["All Files"])

@router.get("/get-files/", response_model=List[FilesDisplayResponse])
def get_files(db: Session = Depends(get_db)):
    try:
        files = db.query(FileUpload).all()
        return files
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred while retrieving files."
        )
