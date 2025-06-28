import { RequestHandler } from 'express';
import { registerAgentService, getAllAgentsService, getAgentByIdService, updateAgentService, deleteAgentService } from '../services/agentService';

export const registerAgent: RequestHandler = async (req, res) => {
  const { name, description, endpoint, pricePerCall } = req.body;
  const creatorEmail = req.user?.sub;

  if (!name || !description || !endpoint || !pricePerCall) {
    res.status(400).json({ error: 'Campos obrigatórios ausentes.' });
  }

  if (!creatorEmail) {
    res.status(401).json({ error: 'Criador não autenticado.' });
  }

  try {
    const agent = await registerAgentService(name, description, endpoint, pricePerCall, creatorEmail);
    res.status(201).json(agent);
  } catch (error: any) {
    res.status(500).json({ error: 'Erro ao registrar o agente.', details: error.message });
  }
};

export const getAllAgents: RequestHandler = async (_, res) => {
  try {
    const agents = await getAllAgentsService();
    res.status(200).json(agents);
  } catch {
    res.status(500).json({ error: 'Erro ao buscar agentes.' });
  }
};

export const getAgentById: RequestHandler = async (req, res) => {
  try {
    const agent = await getAgentByIdService(req.params.id);
    if (!agent) {
        res.status(404).json({ error: 'Agente não encontrado.' });
    }
        res.json(agent);
  } catch {
    res.status(500).json({ error: 'Erro ao buscar o agente.' });
  }
};

export const updateAgent: RequestHandler = async (req, res) => {
  try {
    const updated = await updateAgentService(req.params.id, req.body);
    res.json(updated);
  } catch {
    res.status(500).json({ error: 'Erro ao atualizar o agente.' });
  }
};

export const deleteAgent: RequestHandler = async (req, res) => {
  try {
    await deleteAgentService(req.params.id);
    res.status(204).send();
  } catch {
    res.status(500).json({ error: 'Erro ao deletar o agente.' });
  }
};
