import prisma from '../config/db';

export const createApi = async (
  name: string,
  description: string,
  endpoint: string,
  pricePerCall: number,
  creatorId: number // ID do usuário do tipo Int
) => {
  return prisma.api.create({
    data: {
      name,
      description,
      endpoint,
      pricePerCall,
      creatorId: creatorId, // Corrigido: creatorId é um Int
    },
  });
};

export const findAllApis = async () => {
  return prisma.api.findMany({
    include: {
      Creator: {
        select: { walletAddress: true, name: true }, // Inclui também o nome do criador
      },
    },
  });
};

export const findApiById = async (id: string) => {
  return prisma.api.findUnique({ where: { id } });
};

export const updateApiById = async (id: string, data: any) => {
  return prisma.api.update({ where: { id }, data });
};

export const deleteApiById = async (id: string) => {
  return prisma.api.delete({ where: { id } });
};
