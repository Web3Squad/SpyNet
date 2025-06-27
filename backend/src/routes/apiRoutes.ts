// src/routes/apiRoutes.ts
import { Router } from 'express';
import { registerApi, getAllApis } from '../controllers/apiController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.post('/register', authMiddleware,registerApi);
router.get('/list', getAllApis);

export default router;