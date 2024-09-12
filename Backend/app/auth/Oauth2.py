from jose import JWTError, jwt
from datetime import datetime, timedelta
from app.core.config import settings
from fastapi.security import OAuth2PasswordBearer




oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

SECRET_KEY = settings.SECRET_KEY
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60


def create_access_token(data:dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_access_token(token:str, credentials_exception):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        id: int = payload.get("user_id")
        if id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    return id