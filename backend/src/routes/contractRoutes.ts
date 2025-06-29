import express from 'express';
import { postContract, getContracts, meuHandlerComCobrança } from '../controllers/contractController';
import { authMiddleware } from '../middleware/authMiddleware';
import { apiKeyAuth } from "../middleware/apiKeyAuth";
import { monitorarUsoDaAPI } from '../controllers/proxyController';

const router = express.Router();

router.post('/register', authMiddleware, postContract);
router.get('/list', authMiddleware, getContracts);
router.post('/key/:id', apiKeyAuth, meuHandlerComCobrança);
router.post('/monitor', apiKeyAuth, monitorarUsoDaAPI);

export default router;
