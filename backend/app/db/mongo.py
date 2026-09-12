import certifi
from motor.motor_asyncio import AsyncIOMotorClient
from app.config import settings

client = AsyncIOMotorClient(settings.mongo_url, tlsCAFile=certifi.where())
db = client[settings.mongo_db_name]

users_collection = db["users"]
dashboard_collection = db["dashboard_data"]
