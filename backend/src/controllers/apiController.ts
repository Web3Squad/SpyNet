// src/controllers/apiController.ts

import { RequestHandler } from 'express';
import { registerApiService, getAllApisService } from '../services/apiService';



export const registerApi: RequestHandler = async (req, res) => {
    const { name, description, endpoint, pricePerCall, creatorWalletAddress } = req.body;

    if (!name || !description || !endpoint || !pricePerCall || !creatorWalletAddress) {
        res.status(400).json({ error: 'Todos os campos são obrigatórios' });
        return; 
    }

    try {
        const newApi = await registerApiService(
            name,
            description,
            endpoint,
            pricePerCall,
            creatorWalletAddress
        );
        res.status(201).json(newApi);
    } catch (error) {
        
        console.error('Erro ao registrar API:', error);
        res.status(500).json({ error: 'Falha ao registrar a API' });
    }
};


export const getAllApis: RequestHandler = async (req, res) => {
    try {
        const apis = await getAllApisService();
        res.status(200).json(apis);
    } catch (error) {
        console.error('Erro ao buscar APIs:', error);
        res.status(500).json({ error: 'Falha ao buscar APIs' });
    }
};
