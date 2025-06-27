from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    name: str
    address: str
    senha: str
    email: EmailStr
