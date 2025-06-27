import prisma from '../config/db';

export const upsertUserByWallet = async (walletAddress: string) => {
  return prisma.user.upsert({
    where: { walletAddress },
    update: {},
    create: { walletAddress },
  });
};

export const createApi = async (
  name: string,
  description: string,
  endpoint: string,
  pricePerCall: number,
  creatorId: number
) => {
  return prisma.api.create({
    data: {
      name,
      description,
      endpoint,
      pricePerCall,
      creatorId: creatorId.toString(),
    },
  });
};

export const findAllApis = async () => {
  return prisma.api.findMany({
    include: {
      Creator: {
        select: { walletAddress: true },
      },
    },
  });
};