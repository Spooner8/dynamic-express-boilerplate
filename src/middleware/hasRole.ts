import type { NextFunction, Request, Response } from 'express';
import { Role } from '../../generated/prisma_client';
import { authService } from '../services/auth/auth';

export const hasRole = (roles: Role[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await authService.getCurrentUser(req);
            if (!user) {
                res.status(401).json({ message: 'Unautherized' });
                return;
            } else if (!roles.includes(user.role)) {
                res.status(403).json({ message: 'Forbidden' });
                return;
            }
            next();
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'An unknown error occurred' });
            }
        }
    };
};