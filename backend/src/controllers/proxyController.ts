// src/controllers/proxyController.ts
import { Request, Response } from 'express';
import prisma from '../config/db';
import axios from 'axios';
import { generateProofOfWork } from '../utils/generateProofOfWork';

export const proxyAgentCall = async (req: Request, res: Response) => {
  try {
    const contract = req.body._contract;
    const usageHash = req.body._usageHash;

    if (!contract || !contract.Agent || !contract.Agent.endpoint) {
      return res.status(400).json({ error: 'Contrato ou agente mal definido.' });
    }

    const agentResponse = await axios.post(contract.Agent.endpoint, req.body);

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

export const monitorarUsoDaAPI = async (req: Request, res: Response) => {
  try {
    const contract = (req as any).contract;
    const usageHash = (req as any).usageHash;

    if (!contract || !usageHash) {
      res.status(401).json({ error: 'Contrato não encontrado no contexto da requisição.' });
    }

     res.status(200).json({
      message: 'Cobrança registrada com sucesso.',
      contractId: contract.id,
      userId: contract.userId,
      agentId: contract.agentId,
      usageHash,
      timestamp: new Date().toISOString(),
    });

  } catch (error: any) {
    console.error('[ERRO monitorarUsoDaAPI]', error);
    res.status(500).json({ error: 'Erro ao monitorar o uso da API.', details: error.message });
  }
};

export const proxyParaAgente = async (req: Request, res: Response) => {
  try {
    const contract = (req as any).contract;
    const usageHash = (req as any).usageHash;

    if (!contract || !contract.agentId) {
      return res.status(400).json({ error: 'Contrato ou agente inválido.' });
    }

    // Busca o endpoint do agente
    const agente = await prisma.agent.findUnique({
      where: { id: contract.agentId },
    });

    if (!agente || !agente.endpoint) {
      return res.status(404).json({ error: 'Endpoint do agente não encontrado.' });
    }

    // Faz o forward da requisição original ao endpoint do agente
    const respostaAgente = await axios.post(agente.endpoint, req.body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Retorna ao cliente a resposta original + hash de prova
    return res.status(200).json({
      data: respostaAgente.data,
      usageHash,
      agentEndpoint: agente.endpoint,
      timestamp: new Date().toISOString(),
    });

  } catch (error: any) {
    console.error('[ERRO proxyParaAgente]', error.message);
    return res.status(500).json({ error: 'Erro ao encaminhar requisição ao agente.', details: error.message });
  }
};