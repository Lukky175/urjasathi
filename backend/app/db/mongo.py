import certifi
from motor.motor_asyncio import AsyncIOMotorClient
from app.config import settings

kwargs = {}
if "mongodb+srv://" in settings.mongo_url or "tls=true" in settings.mongo_url.lower() or "ssl=true" in settings.mongo_url.lower():
    kwargs["tlsCAFile"] = certifi.where()

client = AsyncIOMotorClient(settings.mongo_url, **kwargs)
db = client[settings.mongo_db_name]

users_collection = db["users"]
dashboard_collection = db["dashboard_data"]
