from fastapi import FastAPI
# from app.database.models import Base
from app.database.db import engine

app = FastAPI()

@app.get('/')
def root():
    return {
        "message": 
            "DirectDrop is coming out live soon. Anticipate!"
    }