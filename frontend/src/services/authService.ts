// src/services/authService.ts
import type { LoginCredentials, RegistrationData } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8084';

/**
 * Envia as credenciais para o endpoint de login (/token)
 * @param credentials - Objeto com email e senha
 * @returns A resposta completa do backend (incluindo token e dados do usuário)
 */
export const loginUser = async (credentials: LoginCredentials): Promise<any> => {
  const formBody = new URLSearchParams();
  formBody.append('username', credentials.email);
  formBody.append('password', credentials.password);

  const response = await fetch(`${API_BASE_URL}/token`, {
    method: 'POST',
    headers: {}, 
    body: formBody,
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Erro do backend ao logar:", errorData);
    throw new Error('Falha ao fazer login. Verifique as credenciais.');
  }

  return response.json();
};

/**
 * Envia os dados de um novo usuário para o endpoint de registro (/registrar)
 * @param userData - Objeto com os dados do usuário para registro
 */
export const registerUser = async (userData: RegistrationData): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/registrar`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Erro do backend ao registrar:", errorData);
    throw new Error('Falha ao registrar usuário.');
  }
};
