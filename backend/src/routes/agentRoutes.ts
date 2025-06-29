import { Router } from 'express';
import { registerAgent, getAllAgents, getAgentById, updateAgent, deleteAgent} from '../controllers/agentController';
import { authMiddleware } from '../middleware/authMiddleware';
import multer from 'multer';
import { postAgent } from '../controllers/agentController';
import { findBestAgent } from '../controllers/agentController';

const upload = multer(); // usando memória (não salva em disco)

const router = Router();

router.post('/find-best', findBestAgent);

//router.post('/register', authMiddleware, registerAgent);
router.get('/list', getAllAgents);
router.get('/:id', getAgentById);
router.put('/:id', updateAgent);
router.delete('/:id', deleteAgent);
router.post('/register', authMiddleware, upload.single('image'), postAgent);
export default router;
