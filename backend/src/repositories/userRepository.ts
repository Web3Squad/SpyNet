import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Deriva o tipo User a partir do payload gerado dinamicamente
export type User = Awaited<ReturnType<typeof prisma.user.findFirst>>;

// sua função continua igual:
export const findUserByEmail = async (email: string): Promise<User | null> => {
  return prisma.user.findUnique({
    where: { email },
  });
};
