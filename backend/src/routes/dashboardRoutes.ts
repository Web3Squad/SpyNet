import { Router } from 'express';
import { getBuyerDashboard } from '../controllers/dashboardController';
import { authMiddleware } from '../middleware/authMiddleware';
import { getCreatorDashboard } from '../controllers/dashboardController';

const router = Router();

// Endpoint para o dashboard do comprador
router.get('/buyer', authMiddleware, getBuyerDashboard);

router.get('/creator', authMiddleware, getCreatorDashboard);

export default router;