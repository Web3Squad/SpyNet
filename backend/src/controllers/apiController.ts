// src/controllers/apiController.ts
import { RequestHandler } from 'express';
import { registerApiService, getAllApisService } from '../services/apiService';

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