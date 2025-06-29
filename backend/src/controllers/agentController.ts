// src/controllers/agentController.ts
import { RequestHandler } from 'express';
import { registerAgentService, getAllAgentsService, getAgentByIdService, updateAgentService, deleteAgentService} from '../services/agentService';
import { Request, Response } from 'express';
import { uploadImageToSupabase } from '../services/uploadService';
import { findBestAgentWithAI } from '../services/aiService';

export const registerAgent: RequestHandler = async (req, res) => {
  const {
    name,
    description,
    endpoint,
    pricePerCall,
    specialty,
    useCases,
    imageUrl
  } = req.body;

  const creatorEmail = req.user?.sub;

  if (!name || !description || !endpoint || !pricePerCall || !specialty || !useCases) {
     res.status(400).json({ error: 'Campos obrigatórios ausentes.' });
  }

  if (!creatorEmail) {
     res.status(401).json({ error: 'Criador não autenticado.' });
  }

  try {
    const agent = await registerAgentService(
      name,
      description,
      endpoint,
      pricePerCall,
      creatorEmail,
      specialty,
      useCases,
      imageUrl // pode ser undefined
    );
     res.status(201).json(agent);
  } catch (error: any) {
     res.status(500).json({
      error: 'Erro ao registrar o agente.',
      details: error.message
    });
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

export const postAgent = async (req: Request, res: Response) => {
  try {
    const {
      name,
      description,
      endpoint,
      pricePerCall,
      specialty,
      useCases,
    } = req.body;

    const file = req.file; // arquivo enviado via multipart/form-data
    const creatorEmail = req.user?.sub;

    if (!name || !description || !endpoint || !pricePerCall || !specialty || !creatorEmail) {
      res.status(400).json({ error: 'Campos obrigatórios ausentes.' });
    }

    let imageUrl: string | undefined = undefined;

    if (file) {
      const fileName = `${Date.now()}_${file.originalname}`;
      const imageBuffer = file.buffer;
      const contentType = file.mimetype;

      imageUrl = await uploadImageToSupabase(imageBuffer, fileName, contentType);
    }

    const agent = await registerAgentService(
      name,
      description,
      endpoint,
      parseFloat(pricePerCall),
      creatorEmail,
      specialty,
      useCases,
      imageUrl
    );

    res.status(201).json(agent);

  } catch (error: any) {
    console.error('[ERRO postAgent]', error);
    res.status(500).json({
      error: 'Erro ao registrar o agente.',
      details: error.message,
    });
  }
};

export const findBestAgent: RequestHandler = async (req, res) => {
  const { query } = req.body;

  if (!query) {
    res.status(400).json({ error: 'A propriedade "query" é obrigatória.' });
    return;
  }

  try {
    const allAgents = await getAllAgentsService();

    const aiSuggestion = await findBestAgentWithAI(allAgents as any[], query);

    const recommendedAgent = allAgents.find(agent => agent.id === aiSuggestion.bestAgentId);

    if (!recommendedAgent) {
      res.status(404).json({ error: 'O agente recomendado pela IA não foi encontrado na lista.' });
      return;
    }

    res.status(200).json({
      recommendedAgent,
      reasoning: aiSuggestion.reasoning,
      confidence: aiSuggestion.confidenceScore,
    });
    return;

  } catch (error: any) {
    res.status(500).json({
      error: 'Erro ao processar a busca inteligente.',
      details: error.message
    });
    return;
  }
};