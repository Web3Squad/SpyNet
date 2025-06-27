import pytest
from fastapi.testclient import TestClient
from main import app
from models.User_model import User, pwd_context

# Arrange: cria um mock de banco de dados que retorna um usuário válido
def fake_get_db():
    class DummySession:
        def query(self, model):
            class DummyQuery:
                def filter(self, *args, **kwargs):
                    class DummyResult:
                        def first(self):
                            # Arrange: usuário de teste com senha já hasheada
                            user = User(
                                name="Test User",
                                email="test@example.com",
                                senha="123456",  # será hasheada no __init__
                                role="ASSESSOR_PLATINUM"
                            )
                            user.senha = pwd_context.hash("123456")
                            return user
                    return DummyResult()
            return DummyQuery()
        def close(self):
            pass
    yield DummySession()

# Act & Assert: executa o endpoint e valida o resultado

def test_login_for_access_token(monkeypatch):
    # Arrange: substitui a dependência do banco pelo mock
    app.dependency_overrides = {}
    from routers.Login_routers import get_db
    app.dependency_overrides[get_db] = fake_get_db

    # Act: executa o endpoint de login
    client = TestClient(app)
    response = client.post("/token", data={"username": "test@example.com", "password": "123456"})

    # Assert: valida o resultado
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"
