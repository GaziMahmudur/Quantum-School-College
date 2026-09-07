import express from 'express';
import prisma from '../config/db.js';

// ---- CLASSES ----
export const getClasses = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const data = await prisma.class.findMany();
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const createClass = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const { name, numerical } = req.body;
        const newClass = await prisma.class.create({ data: { name, numerical } });
        res.status(201).json({ success: true, data: newClass });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// ---- SECTIONS ----
export const getSections = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const data = await prisma.section.findMany({ include: { class: true } });
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const createSection = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const { name, classId } = req.body;
        const newSection = await prisma.section.create({ data: { name, classId } });
        res.status(201).json({ success: true, data: newSection });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// ---- DEPARTMENTS ----
export const getDepartments = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const data = await prisma.department.findMany();
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const createDepartment = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const { name } = req.body;
        const dept = await prisma.department.create({ data: { name } });
        res.status(201).json({ success: true, data: dept });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// ---- SUBJECTS ----
export const getSubjects = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const data = await prisma.subject.findMany({ include: { class: true, teacher: true } });
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const createSubject = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const { name, code, classId, teacherId } = req.body;
        const subj = await prisma.subject.create({ 
            data: { name, code, classId, teacherId } 
        });
        res.status(201).json({ success: true, data: subj });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
