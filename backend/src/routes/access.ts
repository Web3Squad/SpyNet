import { Router, Request, Response } from 'express';
import axios from 'axios';
import { keccak256, toUtf8Bytes } from 'ethers';
import prisma from '../config/db';

export const accessRouter = Router();

accessRouter.post('/:apiKey/call', async (req: Request, res: Response) => {
  const { apiKey } = req.params;

  const key = await prisma.apiKey.findUnique({
    where: { key: apiKey },
    include: { contract: { include: { Agent: true } } }
  });

  if (!key || key.contract.callsRemaining <= 0) {
    res.status(403).json({ error: 'Acesso negado ou calls esgotadas.' });
  }

  try {
    const agent = key.contract.Agent;
    const response = await axios.post(agent.endpoint, req.body);

    await prisma.contract.update({
      where: { id: key.contractId },
      data: { callsRemaining: { decrement: 1 } }
    });

    const usageHash = keccak256(toUtf8Bytes(JSON.stringify(response.data)));

    await prisma.usageLog.create({
      data: {
        contractId: key.contractId,
        callsUsed: 1,
        usageHash,
      }
    });

    res.json({ result: response.data });

  } catch (error) {
    console.error('Erro ao chamar agente:', error);
    res.status(500).json({ error: 'Erro ao chamar agente.' });
  }
});
