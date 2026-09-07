import express from 'express';
import prisma from '../config/db.js';

export const getNotices = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const notices = await prisma.notice.findMany({
            orderBy: { publishedAt: 'desc' }
        });
        res.json({ success: true, data: notices });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const createNotice = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const { title, content, category, targetAudience, isPinned } = req.body;
        
        const notice = await prisma.notice.create({
            data: {
                title,
                content,
                category: category || 'GENERAL',
                targetAudience: targetAudience || 'ALL',
                isPinned: typeof isPinned === 'boolean' ? isPinned : false,
            }
        });
        
        res.status(201).json({ success: true, data: notice });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const updateNotice = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const { id } = req.params;
        const data = req.body;
        
        const updated = await prisma.notice.update({
            where: { id },
            data
        });
        res.json({ success: true, data: updated });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const deleteNotice = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const { id } = req.params;
        await prisma.notice.delete({ where: { id }});
        res.json({ success: true, message: 'Notice deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
