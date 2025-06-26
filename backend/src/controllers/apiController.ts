import { Request, Response, NextFunction, RequestHandler } from 'express';
import prisma from '../config/db';

// POST /api/register
// Adicionamos o tipo "RequestHandler" para garantir a compatibilidade com o Express.
export const registerApi: RequestHandler = async (req, res, next) => {
  const { name, description, endpoint, pricePerCall, creatorWalletAddress } = req.body;

  if (!name || !description || !endpoint || !pricePerCall || !creatorWalletAddress) {
    // Não é necessário chamar 'next' aqui, pois a resposta já está sendo encerrada.
    res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    return;
  }

  try {
    const creator = await prisma.user.upsert({
      where: { walletAddress: creatorWalletAddress },
      update: {},
      create: { walletAddress: creatorWalletAddress },
    });

    const newApi = await prisma.api.create({
      data: {
        name,
        description,
        endpoint,
        pricePerCall,
        creatorId: creator.id,
      },
    });
    res.status(201).json(newApi);
    return;
  } catch (error) {
    console.error(error);
    // Em um cenário de erro, também encerramos a resposta.
    res.status(500).json({ error: 'Falha ao registrar a API' });
    return;
  }
};

// GET /api/list
// Também aplicamos o tipo "RequestHandler" aqui.
export const getAllApis: RequestHandler = async (req, res, next) => {
  try {
    const apis = await prisma.api.findMany({
      include: {
        Creator: {
          select: { walletAddress: true }, 
        },
      },
    });
    res.status(200).json(apis);
  } catch (error) {
    res.status(500).json({ error: 'Falha ao buscar as APIs' });
  }
};
