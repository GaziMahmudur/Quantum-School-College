import express from 'express';
import { getClasses, createClass, getSections, createSection, getDepartments, createDepartment, getSubjects, createSubject } from '../controllers/academic.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/classes', getClasses);
router.post('/classes', protect as any, authorize('SUPER_ADMIN', 'ADMIN'), createClass);

router.get('/sections', getSections);
router.post('/sections', protect as any, authorize('SUPER_ADMIN', 'ADMIN'), createSection);

router.get('/departments', getDepartments);
router.post('/departments', protect as any, authorize('SUPER_ADMIN', 'ADMIN'), createDepartment);

router.get('/subjects', getSubjects);
router.post('/subjects', protect as any, authorize('SUPER_ADMIN', 'ADMIN'), createSubject);

export default router;
