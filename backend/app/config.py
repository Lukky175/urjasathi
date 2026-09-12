from pydantic_settings import BaseSettings
from typing import Union, List

class Settings(BaseSettings):
    app_name: str = "UrjaSathi Backend"
    debug: bool = True
    database_url: str = "sqlite:///./urjasathi.db"
    cors_origins: List[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://urjasathi.com",
        "http://www.urjasathi.com",
        "http://localhost:8000",
        "http://127.0.0.1:8000",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ]
    mongo_url: str = "mongodb://localhost:27017"
    mongo_db_name: str = "urjasathi"
    jwt_secret_key: str = "urjasathi_secret_key_2026_super_secure_jwt"
    jwt_algorithm: str = "HS256"
    jwt_expire_minutes: int = 1440

    class Config:
        env_file = ".env"
        extra = "ignore"

settings = Settings()
