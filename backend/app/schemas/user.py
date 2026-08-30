from pydantic import BaseModel, EmailStr
from typing import Literal

PREDEFINED_LOCATIONS = Literal["Greater Noida", "Delhi", "Mumbai", "Bangalore", "Pune"]

class UserRegister(BaseModel):
    email: EmailStr
    password: str
    full_name: str
    location: PREDEFINED_LOCATIONS
    address: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    customer_id: str
    email: EmailStr
    full_name: str
    location: str
    address: str
    energy_generated: float
    energy_consumed: float

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse
