from pydantic import BaseModel, EmailStr
from typing import Literal


class UserCreate(BaseModel):
    name: str
    address: str
    email: EmailStr
    password: str
    enterprise: str
    sector: str
    telephone: str
    role: Literal["Creator", "Enterprise"]
