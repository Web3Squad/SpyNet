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
    senha = mapped_column(String(255), nullable=False)
    created_at = mapped_column(TIMESTAMP, server_default='NOW()')

    def __init__(self, **kwargs):
        if 'senha' in kwargs:
            senha_plana = kwargs.pop('senha')
            self.senha = pwd_context.hash(senha_plana)
        super().__init__(**kwargs)

    def verify_password(self, senha_plana):
        return pwd_context.verify(senha_plana, self.senha)
