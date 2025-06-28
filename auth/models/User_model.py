# models/User_model.py
from sqlalchemy import Integer, String, TIMESTAMP
from sqlalchemy.orm import mapped_column
from db.base import Base
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")

class User(Base):
    __tablename__ = "users"

    id = mapped_column(Integer, primary_key=True)
    name = mapped_column(String(255), nullable=False)
    address = mapped_column(String(255), nullable=True)
    email = mapped_column(String(255), unique=True, nullable=False)
    password = mapped_column(String(255), nullable=False)
    enterprise = mapped_column(String(255), nullable=False)
    sector = mapped_column(String(255), nullable=False)
    telephone = mapped_column(String(255), nullable=False)
    role = mapped_column(String(255), nullable=False)
    createdAt = mapped_column("created_at", TIMESTAMP(timezone=True), server_default='NOW()')

    def __init__(self, **kwargs):
        if 'password' in kwargs:
            password_plain = kwargs.pop('password')
            self.password = pwd_context.hash(password_plain)
        super().__init__(**kwargs)

    def verify_password(self, password_plain):
        return pwd_context.verify(password_plain, self.password)