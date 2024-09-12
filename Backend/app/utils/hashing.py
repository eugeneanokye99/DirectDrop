from passlib.context import CryptContext


def hash(password:str):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password)