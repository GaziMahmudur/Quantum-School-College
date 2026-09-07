import express from 'express';
import { getStaff, getStaffById, createStaff, updateStaff, deleteStaff } from '../controllers/staff.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', getStaff);
router.get('/:id', getStaffById);
router.post('/', protect as any, authorize('SUPER_ADMIN', 'ADMIN', 'PRINCIPAL'), createStaff);
router.put('/:id', protect as any, authorize('SUPER_ADMIN', 'ADMIN', 'PRINCIPAL'), updateStaff);
router.delete('/:id', protect as any, authorize('SUPER_ADMIN', 'ADMIN', 'PRINCIPAL'), deleteStaff);

export default router;
