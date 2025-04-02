import passport from '../passport.ts';
import { generateToken, expireToken } from '../../utils/token.ts';
import type { Request, Response } from 'express';
import type { User } from '@prisma/client';
import { logger } from '../log/logger.ts';

const login = (req: Request, res: Response) => {
    try {
        passport.authenticate('local', { session: false, failureRedirect: '/login' }, (error: unknown, user: User) => {
            if (error || !user) {
                logger.error('Login failed', error);
                res.status(401).json({ message: 'Invalid credentials' });
            }
            const token = generateToken(user.id, user.email);
            res.cookie('jwt', token, { httpOnly: true });
            res.status(200).send({ message: 'User logged in' });
        })(req);
    }
    catch (error) {
        logger.error(error);
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: 'An unknown error occurred' });
        }
    }
};

const logout = async (req: Request, res: Response) => {
    const user = await getCurrentUser(req);
    logger.info('getCurrentUser result:', user);
    if (!user) {
        return res.status(401).json({ message: 'User not found' });
    }
    expireToken(req, res);
    res.status(200).json({ message: 'User logged out' });
    logger.info({ userId: user.id, username: user.email }, 'User logged out successfully');
};

async function getCurrentUser(req: Request) {
    try {
        const user: User | null = await new Promise<User | null>((resolve) => {
            passport.authenticate('jwt', { session: false }, (error: unknown, user: User) => {
                if (error || !user) {
                    return resolve(null);
                }
                resolve(user);
            })(req);
        });
        return user;
    } catch (error: unknown) {
        logger.error('Error getting current user', error);
        return null;
    }
}

export const authService = {
    login,
    logout,
    getCurrentUser,
};