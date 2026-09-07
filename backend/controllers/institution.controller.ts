import express from 'express';
import prisma from '../config/db.js';

export const getInstitution = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const inst = await prisma.institution.findFirst();
        res.json({ success: true, data: inst });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const updateInstitution = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const data = req.body;
        const current = await prisma.institution.findFirst();
        
        if (!current) {
            const newInst = await prisma.institution.create({ data: { ...data, setupComplete: true } });
            res.json({ success: true, data: newInst });
            return;
        }

        const updated = await prisma.institution.update({
            where: { id: current.id },
            data
        });
        res.json({ success: true, data: updated });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
