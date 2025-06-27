def test_register_user_success(client, db_session, sample_user_data):
    """
    Testa o registro de um novo usuário com sucesso.
    Este é um teste de integração, pois usa o client da API e a sessão do banco.
    """
    # Arrange
    email = sample_user_data["email"]
    
    # Act
    response = client.post("/registrar", json=sample_user_data)
    
    # Assert
    assert response.status_code == 201
    response_data = response.json()
    assert response_data["message"] == "Usuário criado com sucesso"
    assert "user_id" in response_data

def test_register_user_duplicate_email(client, db_session, sample_user_data):
    """
    Testa a falha no registro ao tentar usar um email que já existe.
    """
    # Arrange: Primeiro, registramos o usuário com sucesso
    client.post("/registrar", json=sample_user_data)
    
    # Act: Agora, tentamos registrar o mesmo usuário novamente
    response = client.post("/registrar", json=sample_user_data)
    
    # Assert
    assert response.status_code == 400
    assert response.json()["detail"] == "Email já cadastrado"
