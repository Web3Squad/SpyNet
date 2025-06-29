from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks
from pydantic import BaseModel
from schemas.Password_schema import PasswordReset, PasswordResetRequest
from schemas.User_schema import UserCreate
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from security.security import (
    create_access_token,
    send_password_reset_email,
    ACCESS_TOKEN_EXPIRE_MINUTES, 
    get_db,
    get_password_reset_token,
    verify_password_reset_token
)
from models.User_model import User, pwd_context

router = APIRouter(tags=["Autenticação"])

@router.post("/registrar", status_code=status.HTTP_201_CREATED)
async def registrar_usuario(
    user_data: UserCreate, 
    db: Session = Depends(get_db)
):
    if user_data.role not in ["Creator", "Enterprise"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Role inválida. Use apenas 'Creator' ou 'Enterprise'."
        )
    existing_user = db.query(User).filter(User.email == user_data.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email já cadastrado"
        )
    new_user = User(
        name=user_data.name,
        address=user_data.address,
        email=user_data.email,
        password=user_data.password, 
        enterprise=user_data.enterprise,
        sector=user_data.sector,
        telephone=user_data.telephone,
        role=user_data.role
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {
        "message": "Usuário criado com sucesso",
        "user_id": new_user.id
    }

@router.post("/token")
async def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.email == form_data.username).first()
    if not user or not pwd_context.verify(form_data.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email ou senha incorretos",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email, "user_id": user.id},
        expires_delta=access_token_expires
    )
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user_id": user.id,
        "name": user.name,
        "email": user.email
    }

@router.get("/usuarios")
async def listar_usuarios(db: Session = Depends(get_db)):
    usuarios = db.query(User).all()
    return [
        {
            "id": u.id,
            "name": u.name,
            "email": u.email,
            "address": getattr(u, "address", getattr(u, "walletAddress", None))
        }
        for u in usuarios
    ]

@router.post("/solicitar-redefinicao-senha")
async def solicitar_redefinicao_senha(
    request: PasswordResetRequest,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.email == request.email).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuário não encontrado"
        )
    reset_token = get_password_reset_token(email=user.email)
    background_tasks.add_task(
        send_password_reset_email,  
        user.email,
        reset_token
    )
    return {"message": "Instruções de redefinição enviadas para o email"}

@router.post("/redefinir-senha")
async def redefinir_senha(
    reset_data: PasswordReset,
    db: Session = Depends(get_db)
):
    email = verify_password_reset_token(reset_data.token)
    if not email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Token inválido ou expirado"
        )
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuário não encontrado"
        )
    user.password = pwd_context.hash(reset_data.new_password)
    db.commit()
    return {"message": "Senha redefinida com sucesso"}
