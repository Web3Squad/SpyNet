import express from 'express';
import { postContract, getContracts } from '../controllers/contractController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/register', authMiddleware, postContract);
router.get('/list', authMiddleware, getContracts);

export default router;
