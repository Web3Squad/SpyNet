import { Request, Response } from 'express';
import { loginService } from '../services/authService';

export const login = async (req: Request, res: Response) => {
  const { walletAddress } = req.body;

  if (!walletAddress) {
    return res.status(400).json({ error: 'Endereço da carteira é obrigatório' });
  }

  try {
    const token = await loginService(walletAddress);
    res.status(200).json({ token });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Falha ao fazer login' });
  }
};