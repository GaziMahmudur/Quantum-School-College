import express from 'express';
import { getInstitution, updateInstitution } from '../controllers/institution.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', getInstitution);
router.put('/', protect as any, authorize('SUPER_ADMIN', 'ADMIN', 'PRINCIPAL'), updateInstitution);

export default router;
