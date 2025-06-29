import { Request, Response, NextFunction } from 'express';
import prisma from '../config/db';
import crypto from 'crypto';

export const apiKeyAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const apiKey = req.header('x-api-key');

    if (!apiKey) {
      res.status(401).json({ error: 'API key ausente.' });
      return;
    }

    const keyRecord = await prisma.apiKey.findUnique({
      where: { key: apiKey },
      include: { contract: true },
    });

    if (!keyRecord) {
      res.status(403).json({ error: 'API key inválida.' });
      return;
    }

    const contract = keyRecord.contract;
    if (!contract) {
      res.status(403).json({ error: 'Contrato associado não encontrado.' });
      return;
    }

    if (contract.callsRemaining <= 0) {
      res.status(402).json({ error: 'Créditos esgotados. Renove o contrato.' });
      return;
    }

    await prisma.contract.update({
      where: { id: contract.id },
      data: { callsRemaining: { decrement: 1 } },
    });

    const hash = crypto.createHash('sha256')
      .update(`${contract.id}-${Date.now()}-${Math.random()}`)
      .digest('hex');

    await prisma.usageLog.create({
      data: {
        contractId: contract.id,
        callsUsed: 1,
        usageHash: hash,
      },
    });

    req.body._contract = contract;
    req.body._usageHash = hash;

    next();
  } catch (error: any) {
    console.error('[ERRO apiKeyAuth]', error);
    res.status(500).json({ error: 'Erro interno no middleware de autenticação.', details: error.message });
  }
};
