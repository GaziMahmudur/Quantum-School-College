import express from 'express';
import prisma from '../config/db.js';

export const getAttendance = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const { date, classId, sectionId, studentId, teacherId } = req.query;
        let filters: any = {};
        
        if (date) {
            const start = new Date(date as string);
            start.setHours(0,0,0,0);
            const end = new Date(start);
            end.setDate(end.getDate() + 1);
            filters.date = { gte: start, lt: end };
        }
        
        if (studentId) filters.studentId = studentId as string;
        if (teacherId) filters.teacherId = teacherId as string;
        
        if (classId || sectionId) {
            filters.student = { 
                ...(classId && { classId: classId as string }),
                ...(sectionId && { sectionId: sectionId as string })
            };
        }

        const records = await prisma.attendance.findMany({
            where: filters,
            include: { student: true, teacher: true }
        });
        res.json({ success: true, data: records });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const markAttendance = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const { date, studentId, teacherId, status } = req.body;
        const recordedBy = (req as any).user?.id;
        const targetDate = new Date(date || Date.now());
        
        // Use provider architecture mock log if Biometric is enabled but here we do manual
        if (process.env.ENABLE_BIOMETRIC === 'true' && !req.body.bypassBiometric) {
            // Wait for hardware adapter in real scenario
        }

        if (!studentId && !teacherId) {
            res.status(400).json({ success: false, message: 'Provide studentId or teacherId' });
            return;
        }

        const record = await prisma.attendance.upsert({
            where: {
                date_studentId_teacherId: {
                    date: targetDate,
                    studentId: studentId || '',
                    teacherId: teacherId || ''
                }
            },
            update: { status, recordedBy },
            create: {
                date: targetDate,
                studentId,
                teacherId,
                status,
                recordedBy
            }
        });

        res.status(200).json({ success: true, data: record });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
