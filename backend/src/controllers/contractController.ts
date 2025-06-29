// src/controllers/contractController.ts
import { Request, Response } from 'express';
import { createContract, getUserContracts, generateApiKey } from '../repositories/contractRepository';
import crypto from 'crypto';
import prisma from '../config/db';

export const postContract = async (req: Request, res: Response) => {
  const { agentId, callsPurchased, paymentTxHash } = req.body;
  const userId = req.user?.user_id;

  if (!agentId || callsPurchased === undefined || !paymentTxHash) {
    console.warn("Body inválido:", req.body);
    res.status(400).json({ error: 'Campos obrigatórios ausentes.' });
  }

  try {
    const contract = await createContract(userId, agentId, callsPurchased, paymentTxHash);
    const apiKey = await generateApiKey(contract.id);
    res.status(201).json({ contract, apiKey: apiKey.key });
  } catch (error) {
    console.error('[ERRO postContract]', error);
    res.status(500).json({ error: 'Erro ao criar contrato.' });
  }
};


export const getContracts = async (req: Request, res: Response) => {
  const userId = req.user?.user_id;

  try {
    const contracts = await getUserContracts(userId);
    res.status(200).json(contracts);
  } catch (error) {
    console.error('[ERRO getContracts]', error);
    res.status(500).json({ error: 'Erro ao buscar contratos.' });
  }
};

export const meuHandlerComCobrança = async (req: Request, res: Response): Promise<void> => {
  try {
    // Extensão manual do tipo da requisição
    const contratoReq = req as Request & { contract?: any };  // se quiser, pode ser mais específico com `Contract`

    const contract = (req as any).contract;

    if (!contract) {
      res.status(401).json({ error: 'Contrato não encontrado no contexto da requisição.' });
      return;
    }

    const dataToHash = `${contract.id}-${Date.now()}-${Math.random()}`;
    const hash = crypto.createHash('sha256').update(dataToHash).digest('hex');

    const usageLog = await prisma.usageLog.create({
      data: {
        contractId: contract.id,
        callsUsed: 1,
        usageHash: hash,
      },
    });

    res.status(200).json({
      message: 'Chamada registrada com sucesso.',
      contractId: contract.id,
      callsRemaining: contract.callsRemaining - 1,
      proofOfWork: usageLog,
    });

  } catch (error: any) {
    console.error('[ERRO] ao registrar uso da API:', error);
    res.status(500).json({ error: 'Erro ao registrar uso da API.', details: error.message });
  }
};