from fastapi import APIRouter, HTTPException, Depends
import uuid
from app.schemas.user import UserRegister, UserLogin, UserResponse, TokenResponse
from app.services.auth import hash_password, verify_password, create_access_token
from app.services.dependencies import get_current_user
from app.db.mongo import users_collection

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/register", response_model=TokenResponse)
async def register(user: UserRegister):
    existing = await users_collection.find_one({"email": user.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    customer_id = str(uuid.uuid4())
    user_doc = {
        "customer_id": customer_id,
        "email": user.email,
        "password": hash_password(user.password),
        "full_name": user.full_name,
        "location": user.location,
        "address": user.address,
        "energy_generated": 0.0,
        "energy_consumed": 0.0,
    }
    await users_collection.insert_one(user_doc)

    token = create_access_token({"sub": customer_id})
    user_response = UserResponse(
        customer_id=customer_id,
        email=user.email,
        full_name=user.full_name,
        location=user.location,
        address=user.address,
        energy_generated=0.0,
        energy_consumed=0.0,
    )
    return TokenResponse(access_token=token, user=user_response)

@router.post("/login", response_model=TokenResponse)
async def login(credentials: UserLogin):
    user_doc = await users_collection.find_one({"email": credentials.email})
    if not user_doc or not verify_password(credentials.password, user_doc["password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_access_token({"sub": user_doc["customer_id"]})
    user_response = UserResponse(
        customer_id=user_doc["customer_id"],
        email=user_doc["email"],
        full_name=user_doc["full_name"],
        location=user_doc["location"],
        address=user_doc["address"],
        energy_generated=user_doc["energy_generated"],
        energy_consumed=user_doc["energy_consumed"],
    )
    return TokenResponse(access_token=token, user=user_response)

@router.get("/me", response_model=UserResponse)
async def get_me(current_user: dict = Depends(get_current_user)):
    return UserResponse(
        customer_id=current_user["customer_id"],
        email=current_user["email"],
        full_name=current_user["full_name"],
        location=current_user["location"],
        address=current_user["address"],
        energy_generated=current_user["energy_generated"],
        energy_consumed=current_user["energy_consumed"],
    )
