# db/db.py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from db.base import Base  # Importação correta da Base
import os
from dotenv import load_dotenv
from threading import Lock

load_dotenv()

engine = None
SessionLocal = None
_db_lock = Lock()

def get_engine():
    global engine
    # Double-checked locking to ensure thread safety
    if engine is None:
        with _db_lock:
            if engine is None:
                SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL")
                if not SQLALCHEMY_DATABASE_URL:
                    raise ValueError("DATABASE_URL não está definida!")
                engine = create_engine(SQLALCHEMY_DATABASE_URL, echo=False) # Turned off echo for cleaner test output
    return engine

def get_session_local():
    global SessionLocal
    if SessionLocal is None:
        with _db_lock:
            if SessionLocal is None:
                SessionLocal = sessionmaker(bind=get_engine(), autocommit=False, autoflush=False)
    return SessionLocal


def get_db():
    # This function is overridden in tests, but kept for the main app
    Session = get_session_local()
    db = Session()
    try:
        yield db
    finally:
        db.close()

def create_tables():
    """Importa os modelos APÓS criar a Base"""
    from models.User_model import User  # Importação local
    db_engine = get_engine()
    Base.metadata.create_all(bind=db_engine)

def drop_tables():
    db_engine = get_engine()
    Base.metadata.drop_all(bind=db_engine)

# Chame create_tables() apenas se executado diretamente
if __name__ == "__main__":
    create_tables()