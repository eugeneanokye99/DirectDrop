from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    
    SQLALCHEMY_DATABASE_URL: str
    SECRET_KEY

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")


settings = Settings()
