# tests/conftest.py
import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from testcontainers.postgres import PostgresContainer
from fastapi.testclient import TestClient
import os

from db.base import Base
from main import app
from security.security import get_db
from db.db import get_engine # Import get_engine

# Inicia o container PostgreSQL para os testes
postgres_container = PostgresContainer("postgres:16-alpine")

pytest_plugins = [
   "tests.fixtures.user_fixtures",
]

@pytest.fixture(scope="session", autouse=True)
def setup_test_db(request):
    """
    Inicia o container do PostgreSQL, cria a engine de conexão e
    garante que o container seja finalizado ao término dos testes.
    """
    postgres_container.start()
    
    # Define a URL do banco de dados a partir do container
    db_url = postgres_container.get_connection_url()
    
    # Substitui a variável de ambiente para que a aplicação a utilize
    os.environ["DATABASE_URL"] = db_url

    # A engine agora é criada de forma lazy em db.py
    # O lifespan da app vai cuidar da criação das tabelas.

    def fin():
        postgres_container.stop()
    
    request.addfinalizer(fin)
    
    # Não precisamos mais retornar a engine, pois ela é global e lazy
    # return get_engine()

@pytest.fixture(scope="function")
def db_session(setup_test_db):
    """
    Fornece uma sessão de banco de dados para cada teste, garantindo o isolamento.
    As transações são revertidas ao final de cada teste.
    """
    engine = get_engine() # Pega a engine criada lazy
    connection = engine.connect()
    transaction = connection.begin()
    
    # Cria uma SessionLocal específica para o teste, ligada à conexão da transação
    TestSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=connection)
    session = TestSessionLocal()

    # Sobrescreve a dependência `get_db` para usar a sessão de teste
    def override_get_db():
        yield session

    app.dependency_overrides[get_db] = override_get_db

    yield session

    session.close()
    transaction.rollback()
    connection.close()
    
    # Limpa a sobrescrita da dependência
    if get_db in app.dependency_overrides:
        del app.dependency_overrides[get_db]


@pytest.fixture(scope="module")
def client():
    """
    Fornece um TestClient do FastAPI para fazer requisições à API.
    """
    with TestClient(app) as c:
        yield c
