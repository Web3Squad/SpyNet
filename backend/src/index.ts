import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import agentRoutes from './routes/agentRoutes';
import contractRoutes from './routes/contractRoutes';
import proxyRoutes from './routes/proxyRoutes'; // 1. Importar as novas rotas de proxy
import dashboardRoutes from './routes/dashboardRoutes'; // Importar as rotas do dashboard
import 'dotenv/config'; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API do Marketplace de Agentes está no ar!');
});

// Rotas existentes
app.use('/agent', agentRoutes);     // Rota para listar, registrar agentes, etc.
app.use('/contracts', contractRoutes); // Rota para criar/listar contratos

// 2. Adicionar a nova rota de proxy
app.use('/proxy', proxyRoutes);      // Rota para EXECUTAR os agentes

app.use('/dashboard', dashboardRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});