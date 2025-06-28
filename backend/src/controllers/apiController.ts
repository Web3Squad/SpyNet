// src/controllers/apiController.ts
import { RequestHandler } from 'express';
import { registerApiService, getAllApisService, getApiByIdService, updateApiService, deleteApiService } from '../services/apiService';



export const registerApi: RequestHandler = async (req, res) => {
    const { name, description, endpoint, pricePerCall } = req.body;

    // --- LOGS DE DEPURAÇÃO ---
    console.log('DEBUG: Conteúdo de req.user:', req.user);
    // -------------------------

    const creatorEmail = req.user?.sub; 

    if (!name || !description || !endpoint || !pricePerCall) {
        res.status(400).json({ error: 'Os campos name, description, endpoint e pricePerCall são obrigatórios.' });
        return;
    }
    if (!creatorEmail) { 
        res.status(401).json({ error: 'Não foi possível identificar o criador (email) a partir do token.' });
        return;
    }

    try {
        const newApi = await registerApiService(
            name,
            description,
            endpoint,
            pricePerCall,
            creatorEmail 
        );
        res.status(201).json(newApi);
        return;
    } catch (error: any) {
        res.status(500).json({ error: 'Falha ao registrar a API', details: error.message });
        return;
    }
};

export const getAllApis: RequestHandler = async (req, res) => {
    try {
        const apis = await getAllApisService();
        res.status(200).json(apis);
    } catch (error: any) {
        res.status(500).json({ error: 'Falha ao buscar APIs' });
    }
};

export const getApiById: RequestHandler = async (req, res) => {
    try {
        const api = await getApiByIdService(req.params.id);

        if (!api) {
            res.status(404).json({ error: 'API não encontrada' });
            return;
        }

        res.json(api);
    } catch (error) {
        console.error('Erro ao buscar API:', error);
        res.status(500).json({ error: 'Falha ao buscar a API' });
    }
};

export const updateApi: RequestHandler = async (req, res) => {
    try {
        const updated = await updateApiService(req.params.id, req.body);
        res.json(updated);
    } catch (error) {
        console.error('Erro ao atualizar API:', error);
        res.status(500).json({ error: 'Falha ao atualizar a API' });
    }
};

export const deleteApi: RequestHandler = async (req, res) => {
    try {
        await deleteApiService(req.params.id);
        res.status(204).send();
    } catch (error) {
        console.error('Erro ao deletar API:', error);
        res.status(500).json({ error: 'Falha ao deletar a API' });
    }
};
