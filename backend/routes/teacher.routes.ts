import express from 'express';
import { getTeachers, getTeacherById, createTeacher, updateTeacher, deleteTeacher } from '../controllers/teacher.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', getTeachers);
router.get('/:id', getTeacherById);
router.post('/', protect as any, authorize('SUPER_ADMIN', 'ADMIN', 'PRINCIPAL'), createTeacher);
router.put('/:id', protect as any, authorize('SUPER_ADMIN', 'ADMIN', 'PRINCIPAL'), updateTeacher);
router.delete('/:id', protect as any, authorize('SUPER_ADMIN', 'ADMIN', 'PRINCIPAL'), deleteTeacher);

export default router;
