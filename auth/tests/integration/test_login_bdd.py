import pytest
from pytest_bdd import scenarios, given, when, then, parsers
from models.User_model import User
from schemas.User_schema import UserCreate

# Aponta para o diretório onde os arquivos .feature estão localizados
scenarios('../features/login.feature')


@given(parsers.parse('que eu sou um usuário registrado com o email "{email}" e senha "{senha}"'), target_fixture="login_credentials")
def registered_user(db_session, email, senha):
    """
    Cria um usuário real no banco de dados de teste.
    """
    # Deleta qualquer usuário de teste anterior para garantir um estado limpo
    user = db_session.query(User).filter(User.email == email).first()
    if user:
        db_session.delete(user)
        db_session.commit()

    # Cria o novo usuário usando o Pydantic Schema para validação
    user_data = UserCreate(
        name="Test BDD User",
        email=email,
        senha=senha,
        role="ASSESSOR_GOLD"
    )
    # Cria a instância do modelo SQLAlchemy
    new_user = User(**user_data.model_dump())
    db_session.add(new_user)
    db_session.commit()
    
    return {"username": email, "password": senha}


@given("a aplicação está rodando")
def app_is_running(client):
    """
    Este step é declarativo. A fixture `client` (do conftest.py) garante que a app está pronta.
    """
    assert client is not None
    pass


@when(parsers.parse('eu faço uma requisição POST para "{endpoint}" com meu email e senha'), target_fixture="response")
def make_login_request(client, login_credentials, endpoint):
    """
    Executa a ação principal do cenário: a requisição de login.
    """
    return client.post(endpoint, data=login_credentials)


@then(parsers.parse('o código de status da resposta deve ser {status_code:d}'))
def check_status_code(response, status_code):
    """
    Verifica se o status code da resposta é o esperado.
    """
    assert response.status_code == status_code, f"Esperado: {status_code}, Recebido: {response.status_code}, Conteúdo: {response.text}"


@then(parsers.parse('a resposta deve conter um "{key}"'))
def check_response_key(response, key):
    """
    Verifica se a resposta JSON contém a chave de sucesso (o token).
    """
    response_json = response.json()
    assert key in response_json
    assert response_json[key] 