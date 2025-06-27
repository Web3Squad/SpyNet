# language: pt

Funcionalidade: Autenticação de Usuário
  Para garantir a segurança do sistema,
  Apenas usuários registrados com credenciais corretas
  Devem conseguir fazer login e obter um token de acesso.

  Cenário: Login com sucesso
    Dado que eu sou um usuário registrado com o email "teste.bdd@example.com" e senha "Senha@123"
    E a aplicação está rodando
    Quando eu faço uma requisição POST para "/token" com meu email e senha
    Então o código de status da resposta deve ser 200
    E a resposta deve conter um "access_token" 