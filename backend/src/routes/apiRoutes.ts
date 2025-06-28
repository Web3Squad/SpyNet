// src/routes/apiRoutes.ts
import { Router } from 'express';
import { registerApi, getAllApis, getApiById, updateApi, deleteApi } from '../controllers/apiController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.post('/register', authMiddleware,registerApi);
router.get('/list', getAllApis);
router.get('/:id', getApiById);
router.put('/:id', updateApi)
router.delete('/:id', deleteApi)

export default router;