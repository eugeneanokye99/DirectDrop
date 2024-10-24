from fastapi import FastAPI
from app.auth import user_auth
from app.routers.users import get_user
from app.routers.users import update_profile
from app.database.db import engine
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.include_router(user_auth.router)
app.include_router(get_user.router)
app.include_router(update_profile.router)

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)




@app.get('/')
def root():
    return {
        "message": 
            "DirectDrop is coming out live soon. Anticipate!"
    }
