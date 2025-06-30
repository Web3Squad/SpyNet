import { RequestHandler } from 'express';
import { getBuyerDashboardDataService, getCreatorDashboardDataService } from '../services/dashboardService';

export const getBuyerDashboard: RequestHandler = async (req, res) => {
  const userId = req.user?.user_id;

  if (!userId) {
    res.status(401).json({ error: 'Usuário não autenticado.' });
    return;
  }

  try {
    const dashboardData = await getBuyerDashboardDataService(userId);
    res.status(200).json(dashboardData);
  } catch (error: any) {
    res.status(500).json({ error: 'Erro ao buscar dados do dashboard do comprador.', details: error.message });
  }
};
export const getCreatorDashboard: RequestHandler = async (req, res) => {
  const userId = req.user?.user_id;

  if (!userId) {
    res.status(401).json({ error: 'Usuário não autenticado.' });
    return;
  }

  try {
    const dashboardData = await getCreatorDashboardDataService(userId);
    res.status(200).json(dashboardData);
  } catch (error: any) {
    res.status(500).json({ error: 'Erro ao buscar dados do dashboard do criador.', details: error.message });
  }
}
