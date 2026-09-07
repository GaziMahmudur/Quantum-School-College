import express from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
    id: string;
    role: string;
}

export const protect = (req: express.Request, res: express.Response, next: express.NextFunction): void => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        res.status(401).json({ success: false, message: 'Not authorized to access this route' });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as JwtPayload;
        (req as any).user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ success: false, message: 'Not authorized to access this route' });
    }
};

export const authorize = (...roles: string[]) => {
    return (req: express.Request, res: express.Response, next: express.NextFunction): void => {
        const userRole = (req as any).user?.role;
        if (!userRole || !roles.includes(userRole)) {
            res.status(403).json({ success: false, message: 'User role is not authorized' });
            return;
        }
        next();
    };
};
