// src/controllers/proxyController.ts
import { Request, Response } from 'express';
import prisma from '../config/db';
import axios from 'axios';
import { generateProofOfWork } from '../utils/generateProofOfWork';

export const proxyAgentCall = async (req: Request, res: Response) => {
  try {
    // Garante que o middleware passou as infos necessárias
    const contract = req.body._contract;
    const usageHash = req.body._usageHash;

    if (!contract || !contract.Agent || !contract.Agent.endpoint) {
      return res.status(400).json({ error: 'Contrato ou agente mal definido.' });
    }

    // Realiza a chamada real ao endpoint do agente
    const agentResponse = await axios.post(contract.Agent.endpoint, req.body);

    // Registra o uso na blockchain futuramente (por enquanto, apenas DB)
    await prisma.usageLog.create({
      data: {
        contractId: contract.id,
        callsUsed: 1,
        usageHash,
        timestamp: new Date(),
      },
    });

    res.status(200).json({
      result: agentResponse.data,
      contractId: contract.id,
      proofOfWork: usageHash,
    });

  } catch (error) {
    console.error('[ERRO NO PROXY]', error);
    res.status(500).json({ error: 'Erro interno no proxy.' });
  }
};
