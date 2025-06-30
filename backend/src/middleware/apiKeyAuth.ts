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

    // --- CORREÇÃO APLICADA AQUI ---
    // Modificamos a consulta para incluir o Agente relacionado ao Contrato
    const keyRecord = await prisma.apiKey.findUnique({
      where: { key: apiKey },
      include: {
        contract: {          // Inclui o contrato
          include: {
            Agent: true      // E DENTRO do contrato, inclui o Agente
          }
        }
      },
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
    
    // Agora 'contract.Agent' estará disponível

    if (contract.callsRemaining > 0 || contract.callsRemaining === -1) { // Permite chamadas ilimitadas (-1)
        if (contract.callsRemaining !== -1) {
            // Decrementa o número de chamadas restantes apenas se não for ilimitado
            await prisma.contract.update({
                where: { id: contract.id },
                data: { callsRemaining: { decrement: 1 } },
            });
        }
    } else {
        res.status(402).json({ error: 'Créditos esgotados. Renove o contrato.' });
        return;
    }

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

    // Injeta o contrato completo (com dados do Agent) na requisição
    (req as any).contract = contract;
    (req as any).usageHash = hash;

    next();
  } catch (error: any) {
    console.error('[ERRO apiKeyAuth]', error);
    res.status(500).json({ error: 'Erro interno no middleware de autenticação.', details: error.message });
  }
};