import express from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../config/db.js';

export const setupInitialAdmin = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const { email, password, institutionName } = req.body;
        
        if (!email || !password || !institutionName) {
            res.status(400).json({ success: false, message: 'Missing required fields' });
            return;
        }

        // Check if admin already exists
        const adminCount = await prisma.user.count({ where: { role: 'SUPER_ADMIN' } });
        if (adminCount > 0) {
            res.status(403).json({ success: false, message: 'Setup already completed' });
            return;
        }

        const passwordHash = await bcrypt.hash(password, 10);
        
        await prisma.$transaction(async (tx) => {
            const admin = await tx.user.create({
                data: {
                    email,
                    passwordHash,
                    role: 'SUPER_ADMIN'
                }
            });

            await tx.institution.create({
                data: {
                    name: institutionName,
                    setupComplete: true
                }
            });
        });

        res.status(201).json({ success: true, message: 'Initial setup completed successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const getInstitutionDetails = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const institution = await prisma.institution.findFirst();
        res.json({ success: true, data: institution });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
