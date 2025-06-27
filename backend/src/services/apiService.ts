// src/services/apiService.ts
import { findUserByEmail } from '../repositories/userRepository';
import { createApi, findAllApis } from '../repositories/apiReposity';

export const registerApiService = async (
  name: string,
  description: string,
  endpoint: string,
  pricePerCall: number,
  creatorEmail: string // Agora recebemos o email do criador
) => {
  // Usamos o email para encontrar o usuário no nosso banco de dados
  const creator = await findUserByEmail(creatorEmail);
  
  if (!creator) {
    throw new Error('Usuário criador com o email fornecido no token não foi encontrado no banco de dados do marketplace.');
  }
  
  // Usamos o ID do usuário encontrado para criar a API
  return createApi(name, description, endpoint, pricePerCall, creator.id);
};

export const getAllApisService = async () => {
  return findAllApis();
};
