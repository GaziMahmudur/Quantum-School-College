import express from 'express';
import { getStudents, getStudentById, createStudent, updateStudent, deleteStudent } from '../controllers/student.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', protect as any, authorize('SUPER_ADMIN', 'ADMIN', 'PRINCIPAL', 'TEACHER'), getStudents);
router.get('/:id', protect as any, getStudentById);
router.post('/', protect as any, authorize('SUPER_ADMIN', 'ADMIN'), createStudent);
router.put('/:id', protect as any, authorize('SUPER_ADMIN', 'ADMIN'), updateStudent);
router.delete('/:id', protect as any, authorize('SUPER_ADMIN', 'ADMIN'), deleteStudent);

export default router;
