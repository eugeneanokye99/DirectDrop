# This file contains the configuration settings for the application.
# The settings are loaded from the .env file using the pydantic_settings library. 
# The settings are used to connect to the database and other configurations.

from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DB_USER: str
    DB_PASSWORD: str
    DB_HOST: str
    DB_PORT: str
    DB_NAME: str

    class Config:
        env_file = '.env'
        
settings = Settings()