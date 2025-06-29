import type { LoginCredentials, RegistrationData } from '@/types';

const API_BASE_URL = '/api'; 

export const loginUser = async (credentials: LoginCredentials): Promise<any> => {
  const formBody = new URLSearchParams();
  formBody.append('username', credentials.email);
  formBody.append('password', credentials.password);

  const response = await fetch(`${API_BASE_URL}/token`, {
    method: 'POST',
    body: formBody,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ detail: 'Unknown error.' }));
    console.error("Backend error during login:", errorData);
    throw new Error(errorData.detail || 'Failed to login.');
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
    const errorData = await response.json().catch(() => ({ detail: 'Unknown server error.' }));
    console.error("Backend error during registration:", errorData);
    throw new Error(errorData.detail || 'Failed to register user.');
  }
};