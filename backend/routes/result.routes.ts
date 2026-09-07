import express from 'express';
import { getResults, enterResult } from '../controllers/result.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', getResults);
router.post('/', protect as any, authorize('SUPER_ADMIN', 'ADMIN', 'TEACHER'), enterResult);

export default router;
