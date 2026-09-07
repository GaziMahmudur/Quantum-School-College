import express from 'express';
import prisma from '../config/db.js';

export const getExams = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const exams = await prisma.exam.findMany({ include: { results: true }});
        res.json({ success: true, data: exams });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const createExam = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const { name, startDate, endDate, academicYear } = req.body;
        const exam = await prisma.exam.create({
            data: {
                name,
                startDate: startDate ? new Date(startDate) : null,
                endDate: endDate ? new Date(endDate) : null,
                academicYear
            }
        });
        res.status(201).json({ success: true, data: exam });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const updateExam = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const { id } = req.params;
        const data = req.body;
        if (data.startDate) data.startDate = new Date(data.startDate);
        if (data.endDate) data.endDate = new Date(data.endDate);

        const exam = await prisma.exam.update({
            where: { id },
            data
        });
        res.json({ success: true, data: exam });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const deleteExam = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const { id } = req.params;
        await prisma.exam.delete({ where: { id }});
        res.json({ success: true, message: 'Exam deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
