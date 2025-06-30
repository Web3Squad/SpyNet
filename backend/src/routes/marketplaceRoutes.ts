import { Router } from 'express';
import { startMarketplaceListener } from '../services/marketplaceListener';

const router = Router();

startMarketplaceListener();

router.get('/status', (req, res) => {
  res.json({ status: 'Marketplace listener ativo 🚀' });
});

export default router;
