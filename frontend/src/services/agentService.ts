export type AgentRegistrationData = {
  name: string;
  description: string;
  specialty: string;
  useCases: string;
  endpoint: string; 
  pricePerCall: string; 
  image?: File | null;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

/**
 * Registra um novo agente enviando os dados como multipart/form-data.
 * @param data - Os dados do formulário do agente.
 * @param token - O token de autenticação JWT do usuário.
 */
export const registerAgent = async (data: AgentRegistrationData, token: string): Promise<any> => {
  // FormData é a forma correta de enviar arquivos e dados de formulário juntos
  const formData = new FormData();

  formData.append('name', data.name);
  formData.append('description', data.description);
  formData.append('specialty', data.specialty);
  formData.append('useCases', data.useCases);
  formData.append('endpoint', data.endpoint);
  formData.append('pricePerCall', data.pricePerCall);

  if (data.image) {
    formData.append('image', data.image);
  }

  const response = await fetch(`${API_BASE_URL}/agent/register`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData, 
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Erro desconhecido no servidor.' }));
    throw new Error(errorData.error || 'Falha ao registrar o agente.');
  }

  return response.json();
};