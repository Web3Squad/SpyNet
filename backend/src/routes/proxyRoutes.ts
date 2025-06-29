import { Router } from 'express';
import { proxyAgentCall } from '../controllers/proxyController';

const router = Router();

router.post('/call/:agentId', proxyAgentCall); 

export default router;
