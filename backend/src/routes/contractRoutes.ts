import express from 'express';
import { postContract, getContracts, meuHandlerComCobrança } from '../controllers/contractController';
import { authMiddleware } from '../middleware/authMiddleware';
import { apiKeyAuth } from "../middleware/apiKeyAuth";

const router = express.Router();

router.post('/register', authMiddleware, postContract);
router.get('/list', authMiddleware, getContracts);
router.post('/key/:id', apiKeyAuth, meuHandlerComCobrança);

export default router;
