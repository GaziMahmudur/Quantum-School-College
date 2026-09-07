import express from 'express';
import { getNotices, createNotice, updateNotice, deleteNotice } from '../controllers/notice.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', getNotices); // Public or private based on targetAudience later
router.post('/', protect as any, authorize('SUPER_ADMIN', 'ADMIN', 'PRINCIPAL', 'TEACHER'), createNotice);
router.put('/:id', protect as any, authorize('SUPER_ADMIN', 'ADMIN', 'PRINCIPAL', 'TEACHER'), updateNotice);
router.delete('/:id', protect as any, authorize('SUPER_ADMIN', 'ADMIN', 'PRINCIPAL', 'TEACHER'), deleteNotice);

export default router;
