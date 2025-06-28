// src/repositories/contractRepository.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createContract = async (
  userId: number,
  agenteId: string,
  callsPurchased: number,
  paymentTxHash: string
) => {
  return prisma.contract.create({
    data: {
      userId,
      agenteId,
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
