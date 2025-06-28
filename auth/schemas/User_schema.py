from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    name: str
    address: str
    email: EmailStr
    password: str
    enterprise: str
    sector: str
    telephone: str
    role: str
