import { upsertUserByWallet } from '../repositories/userRepository';
import jwt from 'jsonwebtoken';

export const loginService = async (walletAddress: string): Promise<string> => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET não está definido no arquivo .env');
  }

  const user = await upsertUserByWallet(walletAddress);

  // Gera o Token JWT
  return jwt.sign(
    { userId: user.id, walletAddress: user.walletAddress },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
};