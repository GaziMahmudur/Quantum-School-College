import express from 'express';
import { handleFileUpload, upload } from '../controllers/file.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/upload', protect as any, authorize('SUPER_ADMIN', 'ADMIN', 'TEACHER'), upload.single('file'), handleFileUpload);

export default router;
