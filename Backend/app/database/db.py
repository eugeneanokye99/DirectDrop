#importing required libraries

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import psycopg2
import time
from psycopg2.extras import RealDictCursor

SQLALCHEMY_DATABASE_URL = "postgresql://postgres:password@localhost:5432/ecommerce"