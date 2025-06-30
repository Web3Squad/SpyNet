import { Router } from 'express';
import { proxyAgentCall } from '../controllers/proxyController';
import { apiKeyAuth } from '../middleware/apiKeyAuth';

const router = Router();

router.post('/call', apiKeyAuth, proxyAgentCall);

export default router;
