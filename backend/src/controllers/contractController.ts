// src/controllers/contractController.ts
import { Request, Response } from 'express';
import { createContract, getUserContracts } from '../repositories/contractRepository';

export const postContract = async (req: Request, res: Response) => {
  const { agentId, callsPurchased, paymentTxHash } = req.body;
  const userId = req.user?.user_id;

  if (!agentId || callsPurchased === undefined || !paymentTxHash) {
    console.warn("Body inválido:", req.body);
    res.status(400).json({ error: 'Campos obrigatórios ausentes.' });
  }

  try {
    const contract = await createContract(userId, agentId, callsPurchased, paymentTxHash);
    res.status(201).json(contract);
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
