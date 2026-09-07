import express from 'express';
import { getExams, createExam, updateExam, deleteExam } from '../controllers/exam.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', getExams);
router.post('/', protect as any, authorize('SUPER_ADMIN', 'ADMIN'), createExam);
router.put('/:id', protect as any, authorize('SUPER_ADMIN', 'ADMIN'), updateExam);
router.delete('/:id', protect as any, authorize('SUPER_ADMIN', 'ADMIN'), deleteExam);

export default router;
