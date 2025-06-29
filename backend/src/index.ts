import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import agentRoutes from './routes/agentRoutes';
import contractRoutes from './routes/contractRoutes';
import 'dotenv/config'; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.send('API do Marketplace AgentesJá está no ar!');
});

app.use('/agent', agentRoutes);
app.use('/contracts', contractRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
