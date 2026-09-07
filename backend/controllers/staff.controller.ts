import express from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../config/db.js';

export const getStaff = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const staff = await prisma.staffProfile.findMany({
            include: { user: { select: { email: true, isActive: true } } }
        });
        res.json({ success: true, data: staff });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const getStaffById = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const { id } = req.params;
        const staff = await prisma.staffProfile.findUnique({
            where: { id },
            include: { user: { select: { email: true, isActive: true } } }
        });
        if (!staff) {
            res.status(404).json({ success: false, message: 'Staff not found' });
            return;
        }
        res.json({ success: true, data: staff });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const createStaff = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const { email, password, employeeId, firstName, lastName, role, phone } = req.body;
        
        const passwordHash = await bcrypt.hash(password || 'staffPass123', 10);

        const newStaff = await prisma.$transaction(async (tx) => {
            const user = await tx.user.create({
                data: {
                    email,
                    passwordHash,
                    role: 'STAFF'
                }
            });

            return await tx.staffProfile.create({
                data: {
                    userId: user.id,
                    employeeId,
                    firstName,
                    lastName,
                    role,
                    phone
                }
            });
        });

        res.status(201).json({ success: true, data: newStaff });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error or duplicate email/employee ID', error });
    }
};

export const updateStaff = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const { id } = req.params;
        const data = req.body;
        delete data.userId;
        delete data.email;
        delete data.password;
        
        const updated = await prisma.staffProfile.update({
            where: { id },
            data
        });
        res.json({ success: true, data: updated });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const deleteStaff = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const { id } = req.params;
        const staff = await prisma.staffProfile.findUnique({ where: { id }});
        if (!staff) {
            res.status(404).json({ success: false, message: 'Not found' });
            return;
        }
        
        await prisma.user.update({
            where: { id: staff.userId },
            data: { isActive: false }
        });
        
        await prisma.staffProfile.update({
            where: { id },
            data: { status: 'DEACTIVATED' }
        });
        
        res.json({ success: true, message: 'Staff deactivated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
