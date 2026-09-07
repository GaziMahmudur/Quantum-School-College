import express from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../config/db.js';

export const getStudents = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const students = await prisma.studentProfile.findMany({
            include: { user: { select: { email: true, isActive: true } }, class: true, section: true }
        });
        res.json({ success: true, data: students });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const getStudentById = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const { id } = req.params;
        const student = await prisma.studentProfile.findUnique({
            where: { id },
            include: { user: { select: { email: true, isActive: true } }, class: true, section: true }
        });
        if (!student) {
            res.status(404).json({ success: false, message: 'Student not found' });
            return;
        }
        res.json({ success: true, data: student });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const createStudent = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const { email, password, studentId, firstName, lastName, classId, sectionId, rollNumber } = req.body;
        
        const passwordHash = await bcrypt.hash(password || 'defaultPassword123', 10);

        const newStudent = await prisma.$transaction(async (tx) => {
            const user = await tx.user.create({
                data: {
                    email,
                    passwordHash,
                    role: 'STUDENT'
                }
            });

            return await tx.studentProfile.create({
                data: {
                    userId: user.id,
                    studentId,
                    firstName,
                    lastName,
                    classId,
                    sectionId,
                    rollNumber
                }
            });
        });

        res.status(201).json({ success: true, data: newStudent });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error or duplicate email/student ID' });
    }
};

export const updateStudent = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const { id } = req.params;
        const data = req.body;
        
        delete data.userId;
        delete data.email;
        delete data.password;

        const updated = await prisma.studentProfile.update({
            where: { id },
            data
        });
        res.json({ success: true, data: updated });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const deleteStudent = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const { id } = req.params;
        const student = await prisma.studentProfile.findUnique({ where: { id }});
        if (!student) {
            res.status(404).json({ success: false, message: 'Not found' });
            return;
        }
        
        // Instead of hard delete, deactivate the user
        await prisma.user.update({
            where: { id: student.userId },
            data: { isActive: false }
        });
        
        await prisma.studentProfile.update({
            where: { id },
            data: { status: 'DEACTIVATED' }
        });
        
        res.json({ success: true, message: 'Student deactivated' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
