import pytest
from pydantic import ValidationError

from schemas.User_schema import UserCreate

def test_user_create_schema_success(sample_user_data):
    """
    Testa se o schema UserCreate é validado com sucesso com dados corretos.
    Usa a fixture 'sample_user_data' para fornecer os dados.
    """
    # Arrange
    data = sample_user_data
    
    # Act
    user = UserCreate(**data)
    
    # Assert
    assert user.email == data["email"]
    assert user.role == data["role"]

def test_user_create_schema_invalid_email(sample_user_data):
    """
    Testa se o schema UserCreate levanta um erro de validação
    quando um email inválido é fornecido.
    """
    # Arrange
    data = sample_user_data.copy()
    data["email"] = "not-an-email"
    
    # Act & Assert
    with pytest.raises(ValidationError):
        UserCreate(**data)
