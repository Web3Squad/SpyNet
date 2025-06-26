import { Request, Response, RequestHandler } from 'express';
import prisma from '../config/db';
import jwt from 'jsonwebtoken';

export const login: RequestHandler = async (req, res) => {
  const { walletAddress } = req.body;

  if (!walletAddress) {
    res.status(400).json({ error: 'Endereço da carteira é obrigatório' });
    return;
  }

  if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET não está definido no arquivo .env");
    res.status(500).json({ error: 'Erro de configuração interna do servidor.' });
    return;
  }

  try {
    const user = await prisma.user.upsert({
      where: { walletAddress: walletAddress },
      update: {},
      create: { walletAddress: walletAddress },
    });

    const token = jwt.sign(
      { userId: user.id, walletAddress: user.walletAddress },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Falha ao fazer login' });
  }
};
