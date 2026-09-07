import express from 'express';
import { getEvents, createEvent, updateEvent, deleteEvent } from '../controllers/event.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', getEvents);
router.post('/', protect as any, authorize('SUPER_ADMIN', 'ADMIN'), createEvent);
router.put('/:id', protect as any, authorize('SUPER_ADMIN', 'ADMIN'), updateEvent);
router.delete('/:id', protect as any, authorize('SUPER_ADMIN', 'ADMIN'), deleteEvent);

export default router;
