import pytest

@pytest.fixture(scope="module")
def sample_user_data():
    """
    Fornece um dicionário de dados de usuário válido.
    O escopo é 'module' para que seja criado uma vez por módulo de teste,
    economizando tempo.
    """
    return {
        "name": "Unit Test User",
        "email": "unit.test@example.com",
        "senha": "StrongPassword123",
        "role": "ASSESSOR_GOLD"
    } 