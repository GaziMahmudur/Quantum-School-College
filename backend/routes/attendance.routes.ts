import express from 'express';
import { getAttendance, markAttendance } from '../controllers/attendance.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', protect as any, authorize('SUPER_ADMIN', 'ADMIN', 'TEACHER', 'PRINCIPAL', 'STAFF'), getAttendance);
router.post('/', protect as any, authorize('SUPER_ADMIN', 'ADMIN', 'TEACHER', 'PRINCIPAL'), markAttendance);

export default router;
