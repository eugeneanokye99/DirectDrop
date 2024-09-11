#importing required libraries

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import psycopg2
import time
from psycopg2.extras import RealDictCursor
from app.core.config import settings

SQLALCHEMY_DATABASE_URL = "sqlite:///./DirectDrop.db" 

engine = create_engine(SQLALCHEMY_DATABASE_URL)