import type { LoginCredentials, RegistrationData } from '@/types'; // Certifique-se que o caminho para 'types' está correto

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8084';

export const loginUser = async (credentials: LoginCredentials): Promise<any> => {
  const formBody = new URLSearchParams();
  formBody.append('username', credentials.email);
  formBody.append('password', credentials.password);

  const response = await fetch(`${API_BASE_URL}/token`, {
    method: 'POST',
    // 'Content-Type' é definido automaticamente pelo navegador para URLSearchParams
    body: formBody,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ detail: 'Erro desconhecido.' }));
    console.error("Erro do backend ao logar:", errorData);
    throw new Error(errorData.detail || 'Falha ao fazer login.');
  }

  return response.json();
};

export const registerUser = async (userData: RegistrationData): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/registrar`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    // Tenta pegar o JSON do erro, se não conseguir, usa uma mensagem padrão.
    const errorData = await response.json().catch(() => ({ detail: 'Erro desconhecido no servidor.' }));
    console.error("Erro do backend ao registrar:", errorData);
    // Lança um erro com a mensagem específica vinda do backend (ex: "Email já cadastrado")
    throw new Error(errorData.detail || 'Falha ao registrar usuário.');
  }
};