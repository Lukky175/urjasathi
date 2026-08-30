from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    app_name: str = "UrjaSathi Backend"
    debug: bool = True
    database_url: str = "sqlite:///./urjasathi.db"
    cors_origins: list[str] = ["http://localhost:5173"]
    mongo_url: str = ""
    mongo_db_name: str = "urjasathi"
    jwt_secret_key: str = ""
    jwt_algorithm: str = "HS256"
    jwt_expire_minutes: int = 1440

    class Config:
        env_file = ".env"

settings = Settings()
