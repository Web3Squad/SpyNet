import pytest
from fastapi.testclient import TestClient
from main import app

# Teste de integração mais simples: verifica se o endpoint de listagem de usuários responde com sucesso

def test_listar_usuarios_integration():
    client = TestClient(app)
    response = client.get("/usuarios")
    assert response.status_code == 200
    assert isinstance(response.json(), list)
