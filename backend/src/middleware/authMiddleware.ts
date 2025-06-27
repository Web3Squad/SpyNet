import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const authMiddleware: RequestHandler = (req, res, next) => {
    console.log('--- Auth Middleware Iniciado ---');
    console.log('Cabeçalhos Recebidos:', JSON.stringify(req.headers, null, 2));

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log('Falha: Cabeçalho de autorização ausente ou mal formatado.');
        res.status(401).json({ error: 'Acesso negado. Nenhum token fornecido.' });
        return;
    }

    const token = authHeader.split(' ')[1];
    console.log('Token Extraído:', token);

    try {
        if (!process.env.JWT_SECRET) {
            console.error('Falha Crítica: JWT_SECRET não está definido no servidor. Saindo do middleware.');
            res.status(500).json({ error: 'Erro de configuração do servidor: JWT_SECRET não definido.' });
            return;
        }
        
        console.log('JWT_SECRET usado para verificação:', process.env.JWT_SECRET); 
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Token Descodificado com Sucesso:', decoded);

        req.user = decoded;
        console.log('Objeto req.user definido como:', req.user);

        next();
    } catch (error) {
        console.error('Erro na verificação do token (detalhes):', error); 
        if (error instanceof jwt.TokenExpiredError) {
            console.error('ERRO ESPECÍFICO: Token Expirado!'); 
            res.status(403).json({ error: 'Token expirado.' });
        } else if (error instanceof jwt.JsonWebTokenError) {
            console.error('ERRO ESPECÍFICO: Token Inválido (problema de assinatura ou formato)!'); 
            res.status(403).json({ error: 'Token inválido.' });
        } else {
            console.error('ERRO ESPECÍFICO: Erro Genérico na Verificação do Token!');
            res.status(500).json({ error: 'Erro interno na autenticação.' });
        }
    }
};