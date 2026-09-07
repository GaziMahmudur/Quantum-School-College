import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/db.js';

export const login = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !user.isActive) {
            res.status(401).json({ success: false, message: 'Invalid credentials or inactive account' });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
            return;
        }

        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET || 'fallback-secret',
            { expiresIn: (process.env.JWT_EXPIRES_IN || '7d') as any }
        );

        res.json({
            success: true,
            token,
            user: {
                id: user.id,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const getMe = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        // Assume req.user is set by auth middleware
        const userId = (req as any).user?.id;
        
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { id: true, email: true, role: true, isActive: true }
        });
        
        if (!user) {
            res.status(404).json({ success: false, message: 'User not found' });
            return;
        }
        
        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
