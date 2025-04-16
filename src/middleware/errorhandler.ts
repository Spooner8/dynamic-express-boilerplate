import { logger } from '../services/log/logger';
import type { Response } from 'express';

export const handleError = (error: unknown, res: Response | null) => {
    if (error instanceof Error) {
        logger.error(error.message);
        if (res) {
            return res.status(400).json({ message: error.message });
        }
    } else {
        if (res) {
            return res.status(400).json({ message: 'An unknown error occurred' });
        }
    }
};