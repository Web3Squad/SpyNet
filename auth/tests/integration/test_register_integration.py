import pytest
from fastapi.testclient import TestClient
from main import app
import time

# Teste de integração para o endpoint de registro de usuário

def test_registrar_usuario_integration():
    client = TestClient(app)
    unique_email = f"integracao_{int(time.time())}@example.com"
    payload = {
        "name": "Usuário Integração",
        "email": unique_email,
        "senha": "senha_integra",
        "role": "ASSESSOR_PLATINUM"
    }
    response = client.post("/registrar", json=payload)
    print(response.status_code, response.json())
    assert response.status_code == 201
    data = response.json()
    assert "user_id" in data
    assert data["message"] == "Usuário criado com sucesso"
