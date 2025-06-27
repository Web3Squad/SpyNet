// src/repositories/userRepository.ts
import prisma from '../config/db';
import { User } from '@prisma/client';

/**
 * Encontra um usuário pelo seu endereço de email.
 * @param email - O email do usuário a ser procurado.
 * @returns O objeto do usuário ou nulo se não for encontrado.
 */
export const findUserByEmail = async (email: string): Promise<User | null> => {
  return prisma.user.findUnique({
    where: { email },
  });
};
