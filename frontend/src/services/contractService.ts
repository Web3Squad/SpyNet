// Tipo para os dados que enviaremos ao criar um contrato
export interface ContractCreationData {
  agentId: string;
  callsPurchased: number;
  paymentTxHash: string; // Hash da transação de pagamento on-chain
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/';

/**
 * Cria um novo contrato no backend.
 * @param data - Os dados para a criação do contrato.
 * @param token - O token de autenticação JWT do usuário.
 */
export const createContract = async (data: ContractCreationData, token: string): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/contracts/register`, { // Endpoint para criar contratos
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Erro desconhecido' }));
    throw new Error(errorData.error || 'Falha ao criar o contrato.');
  }

  return response.json();
};

export const getUserContracts = async (token: string): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/contracts/list`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Falha ao buscar os contratos.');
  }

  return response.json();
};