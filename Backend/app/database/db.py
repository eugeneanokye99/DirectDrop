
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker




SQLALCHEMY_DATABASE_URL = "sqlite:///./DirectDrop.db" 

engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()   

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
 
try: 
    with engine.connect() as connection:
        print("Database connection successful")
        
except Exception as e:
    print("Database connection failed", {e})
                

    
