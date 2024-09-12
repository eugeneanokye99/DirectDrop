from fastapi import FastAPI

from app.auth import user_auth
# from app.database.models import Base
from app.database.db import engine

Base.metadata.create_all(bind=engine)

app = FastAPI()
app.include_router(user_auth.router)

@app.get('/')
def root():
    return {
        "message": 
            "DirectDrop is coming out live soon. Anticipate!"
    }