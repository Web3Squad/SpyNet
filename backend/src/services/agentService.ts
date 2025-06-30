// src/services/agentService.ts
import { findUserByEmail } from '../repositories/userRepository';
import { createAgent, findAllAgents, findAgentById, updateAgentById, deleteAgentById} from '../repositories/agentReposity';

export const registerAgentService = async (
  name: string,
  description: string,
  endpoint: string,
  pricePerCall: number,
  creatorEmail: string,
  specialty: string,
  useCases: string,
  imageUrl?: string,
  nftTokenId?: number
) => {
  const creator = await findUserByEmail(creatorEmail);

  if (!creator) {
    throw new Error('Usuário criador não encontrado.');
  }

  return createAgent(
    name,
    description,
    endpoint,
    pricePerCall,
    creator.id,
    specialty,
    useCases,
    imageUrl,
    nftTokenId
  );
};

export const getAllAgentsService = () => findAllAgents();
export const getAgentByIdService = (id: string) => findAgentById(id);
export const updateAgentService = (id: string, data: any) => updateAgentById(id, data);
export const deleteAgentService = (id: string) => deleteAgentById(id);
