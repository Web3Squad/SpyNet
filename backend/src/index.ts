// src/index.ts

import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// A importação correta para um "export default"
import apiRoutes from './routes/apiRoutes'; 

import authRoutes from './routes/authRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

// Middlewares essenciais
app.use(cors());
app.use(express.json());

// Rota de teste
app.get('/', (req: Request, res: Response) => {
  res.send('API do SpyAgents está no ar!');
});

app.use('/api/auth', authRoutes);

app.use('/api', apiRoutes); 

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});