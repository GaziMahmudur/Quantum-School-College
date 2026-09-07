import express from 'express';
import prisma from '../config/db.js';

export const getEvents = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const events = await prisma.eventNews.findMany({
            orderBy: { date: 'desc' }
        });
        res.json({ success: true, data: events });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const createEvent = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const { title, description, type, date, imageUrl, isPublished } = req.body;
        const newEvent = await prisma.eventNews.create({
            data: {
                title,
                description,
                type,
                date: date ? new Date(date) : new Date(),
                imageUrl,
                isPublished: isPublished !== undefined ? isPublished : true
            }
        });
        res.status(201).json({ success: true, data: newEvent });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const updateEvent = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const { id } = req.params;
        const data = req.body;
        
        if (data.date) data.date = new Date(data.date);

        const updated = await prisma.eventNews.update({
            where: { id },
            data
        });
        res.json({ success: true, data: updated });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const deleteEvent = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const { id } = req.params;
        await prisma.eventNews.delete({ where: { id } });
        res.json({ success: true, message: 'Deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
