import express from 'express';
import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import prisma from '../config/db.js';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, '../../uploads');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = crypto.randomUUID();
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = (req: any, file: any, cb: any) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf', 'application/msword'];
    if (allowed.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type'), false);
    }
};

export const upload = multer({ 
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter
});

export const handleFileUpload = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        if (!req.file) {
            res.status(400).json({ success: false, message: 'No file uploaded' });
            return;
        }

        const originalName = req.file.originalname;
        const filename = req.file.filename;
        const mimeType = req.file.mimetype;
        const size = req.file.size;
        
        // Abstract cloud logic here if ENABLE_CLOUD_STORAGE is true
        const isCloud = process.env.ENABLE_CLOUD_STORAGE === 'true';
        const url = isCloud 
            ? `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${filename}`
            : `/uploads/${filename}`;

        const newFile = await prisma.fileStorage.create({
            data: {
                originalName,
                filename,
                mimeType,
                size,
                url,
                provider: isCloud ? 'S3' : 'LOCAL'
            }
        });

        res.status(201).json({ success: true, data: newFile });
    } catch (error) {
        res.status(500).json({ success: false, message: 'File upload failed' });
    }
};
