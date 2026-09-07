import express from 'express';
import { setupInitialAdmin, getInstitutionDetails } from '../controllers/setup.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', setupInitialAdmin);
router.get('/institution', getInstitutionDetails);

export default router;
