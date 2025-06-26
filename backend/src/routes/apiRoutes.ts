// src/routes/apiRoutes.ts
import { Router } from 'express';
import { registerApi, getAllApis } from '../controllers/apiController';

const router = Router();

router.post('/register', registerApi);
router.get('/list', getAllApis);

export default router;