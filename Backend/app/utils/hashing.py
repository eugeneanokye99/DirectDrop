from passlib.context import CryptContext
import secrets

# Generate a 32-byte secret key (for example, for JWT or encryption)
secret_key = secrets.token_hex(32)
print(secret_key)


pwd_context = CryptContext(schemes=['bcrypt'], deprecated='auto')


def hasher(password:str):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify_password(plain_password, hashed_password)

