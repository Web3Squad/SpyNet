from models.User_model import User

def test_user_model_password_hashing(sample_user_data):
    """
    Testa se o modelo User corretamente hasheia a senha na inicialização.
    Este teste é puramente unitário e não interage com o banco de dados.
    """
    # Arrange
    data = sample_user_data
    
    # Act
    user = User(**data)
    
    # Assert
    # 1. A senha armazenada não deve ser a senha em texto plano
    assert user.senha != data["senha"]
    
    # 2. O método de verificação deve retornar True para a senha correta
    assert user.verify_password(data["senha"])
    
    # 3. O método de verificação deve retornar False para uma senha incorreta
    assert not user.verify_password("wrongpassword")
