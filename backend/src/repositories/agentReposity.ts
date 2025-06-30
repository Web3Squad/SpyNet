// src/repositories/agentRepository.ts
import prisma from '../config/db';

export const createAgent = async (
  name: string,
  description: string,
  endpoint: string,
  pricePerCall: number,
  creatorId: number,
  specialty: string,
  useCases: string,
  imageUrl?: string,
  nftTokenId?: number
) => {
  return prisma.agent.create({
    data: {
      name,
      description,
      endpoint,
      pricePerCall,
      creatorId,
      specialty,    
      useCases,
      imageUrl,
      nftTokenId
    },
  });
};

export const findAllAgents = async () => {
  return prisma.agent.findMany({
    include: {
      creator: {
        select: {
          name: true,
          email: true,
          walletAddress: true,
        },
      },
    },
  });
};

export const findAgentById = async (id: string) => {
  return prisma.agent.findUnique({
    where: { id },
    include: {
      Contracts: true,
      creator: true
    },
  });
};

export const updateAgentById = async (id: string, data: any) => {
  return prisma.agent.update({ where: { id }, data });
};

export const deleteAgentById = async (id: string) => {
  return prisma.agent.delete({ where: { id } });
};