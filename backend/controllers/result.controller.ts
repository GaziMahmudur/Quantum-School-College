import express from 'express';
import prisma from '../config/db.js';

export const getResults = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const { examId, studentId, classId } = req.query;
        let filters: any = {};
        
        if (examId) filters.examId = examId as string;
        if (studentId) filters.studentId = studentId as string;
        if (classId) filters.student = { classId: classId as string };

        const results = await prisma.result.findMany({
            where: filters,
            include: { student: true, exam: true, subject: true }
        });
        res.json({ success: true, data: results });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

const calculateGrade = (marksObtained: number, totalMarks: number) => {
    const percentage = (marksObtained / totalMarks) * 100;
    if (percentage >= 80) return { grade: 'A+', gpa: 5.0 };
    if (percentage >= 70) return { grade: 'A', gpa: 4.0 };
    if (percentage >= 60) return { grade: 'A-', gpa: 3.5 };
    if (percentage >= 50) return { grade: 'B', gpa: 3.0 };
    if (percentage >= 40) return { grade: 'C', gpa: 2.0 };
    if (percentage >= 33) return { grade: 'D', gpa: 1.0 };
    return { grade: 'F', gpa: 0.0 };
};

export const enterResult = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const { studentId, examId, subjectId, marksObtained, totalMarks, remarks } = req.body;
        
        const { grade, gpa } = calculateGrade(marksObtained, totalMarks);

        const result = await prisma.result.upsert({
            where: {
                studentId_examId_subjectId: {
                    studentId,
                    examId,
                    subjectId
                }
            },
            update: {
                marksObtained,
                totalMarks,
                grade,
                gpa,
                remarks
            },
            create: {
                studentId,
                examId,
                subjectId,
                marksObtained,
                totalMarks,
                grade,
                gpa,
                remarks
            }
        });

        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
