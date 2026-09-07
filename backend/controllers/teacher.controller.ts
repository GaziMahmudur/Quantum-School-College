import express from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../config/db.js';

export const getTeachers = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const teachers = await prisma.teacherProfile.findMany({
            include: { user: { select: { email: true, isActive: true } }, department: true }
        });
        res.json({ success: true, data: teachers });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const getTeacherById = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const { id } = req.params;
        const teacher = await prisma.teacherProfile.findUnique({
            where: { id },
            include: { user: { select: { email: true, isActive: true } }, department: true, subjects: true }
        });
        if (!teacher) {
            res.status(404).json({ success: false, message: 'Teacher not found' });
            return;
        }
        res.json({ success: true, data: teacher });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const createTeacher = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const { email, password, employeeId, firstName, lastName, departmentId, designation, phone } = req.body;
        
        const passwordHash = await bcrypt.hash(password || 'teacherPass123', 10);

        const newTeacher = await prisma.$transaction(async (tx) => {
            const user = await tx.user.create({
                data: {
                    email,
                    passwordHash,
                    role: 'TEACHER'
                }
            });

            return await tx.teacherProfile.create({
                data: {
                    userId: user.id,
                    employeeId,
                    firstName,
                    lastName,
                    departmentId,
                    designation,
                    phone
                }
            });
        });

        res.status(201).json({ success: true, data: newTeacher });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error or duplicate email/employee ID', error });
    }
};

export const updateTeacher = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const { id } = req.params;
        const data = req.body;
        // Don't update user relation directly from here
        delete data.userId;
        delete data.email;
        delete data.password;
        
        const updated = await prisma.teacherProfile.update({
            where: { id },
            data
        });
        res.json({ success: true, data: updated });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const deleteTeacher = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const { id } = req.params;
        const teacher = await prisma.teacherProfile.findUnique({ where: { id }});
        if (!teacher) {
            res.status(404).json({ success: false, message: 'Not found' });
            return;
        }
        
        await prisma.user.update({
            where: { id: teacher.userId },
            data: { isActive: false }
        });
        
        await prisma.teacherProfile.update({
            where: { id },
            data: { status: 'DEACTIVATED' }
        });
        
        res.json({ success: true, message: 'Teacher deactivated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
