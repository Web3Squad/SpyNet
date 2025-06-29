// src/repositories/contractRepository.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createContract = async (
  userId: number,
  agentId: string,
  callsPurchased: number,
  paymentTxHash: string
) => {
  return prisma.contract.create({
    data: {
      userId,
      agentId,
      callsPurchased,
      callsRemaining: callsPurchased,
      paymentTxHash,
    },
  });
};

export const getUserContracts = async (userId: number) => {
  return prisma.contract.findMany({
    where: {
      userId,
    },
    include: {
      Api: true,
    },
  });
};
