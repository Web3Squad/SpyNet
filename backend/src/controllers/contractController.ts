// src/controllers/contractController.ts
import { Request, Response } from 'express';
import { createContract, getUserContracts } from '../repositories/contractRepository';

export const postContract = async (req: Request, res: Response) => {
  const { apiId, callsPurchased, paymentTxHash } = req.body;
  const userId = req.user?.user_id;

  if (!apiId || !callsPurchased || !paymentTxHash) {
    res.status(400).json({ error: 'Campos obrigatórios ausentes.' });
    return;
  }

  try {
    const contract = await createContract(userId, apiId, callsPurchased, paymentTxHash);
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
