import { Router } from 'express';
import { registerAgent, getAllAgents, getAgentById, updateAgent, deleteAgent} from '../controllers/agentController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.post('/register', authMiddleware, registerAgent);
router.get('/list', getAllAgents);
router.get('/:id', getAgentById);
router.put('/:id', updateAgent);
router.delete('/:id', deleteAgent);

export default router;
