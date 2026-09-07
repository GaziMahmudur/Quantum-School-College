import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

import authRoutes from './routes/auth.routes.js';
import studentRoutes from './routes/student.routes.js';
import setupRoutes from './routes/setup.routes.js';
import noticeRoutes from './routes/notice.routes.js';
import teacherRoutes from './routes/teacher.routes.js';
import staffRoutes from './routes/staff.routes.js';
import academicRoutes from './routes/academic.routes.js';
import eventRoutes from './routes/event.routes.js';
import fileRoutes from './routes/file.routes.js';
import examRoutes from './routes/exam.routes.js';
import resultRoutes from './routes/result.routes.js';
import attendanceRoutes from './routes/attendance.routes.js';
import institutionRoutes from './routes/institution.routes.js';
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/academic', academicRoutes);
app.use('/api/setup', setupRoutes);
app.use('/api/notices', noticeRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/results', resultRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/institution', institutionRoutes);
// App wide error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
});

export default app;
