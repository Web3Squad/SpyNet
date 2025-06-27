import prisma from '../config/db';

export const upsertUserByWallet = async (walletAddress: string) => {
  return prisma.user.upsert({
    where: { walletAddress },
    update: {},
    create: { walletAddress },
  });
};