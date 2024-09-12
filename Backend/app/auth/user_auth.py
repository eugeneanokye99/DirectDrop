from fastapi import FastAPI, Depends, HTTPException, status
from app.database.models import User
from app.database.