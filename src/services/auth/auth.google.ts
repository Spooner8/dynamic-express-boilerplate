import passport from '../passport';
import { tokenService } from '../../utils/token';
import type { Request, Response, NextFunction} from 'express';
import { User } from '../../../generated/prisma_client';
import { logger } from '../log/logger';
import { userService } from '../crud/user';
import { authService } from './auth';
import { handleError } from '../../middleware/errorhandler';

const login = (req: Request, res: Response, next: NextFunction) => {
    try {
        passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
    } catch (error: unknown) {
        handleError(error, res);
    }
};

const callback = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('google', { failureRedirect: '/api/auth/login' }, async (error: unknown, user: User) => {
        if (error) {
            handleError(error, null);
        }

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        try {
            const { accessToken, refreshToken } = await authService.generateTokens(user);

            tokenService.setTokenCookie('jwt', accessToken, res);
            tokenService.setTokenCookie('refreshToken', refreshToken, res);

            await tokenService.saveRefreshToken(user.id, refreshToken, req);
            await userService.updateUser(user.id, { ...user, lastLogin: new Date() });

            logger.info(`User ${user.email} logged in successfully`);
            return res.status(200).send({ message: 'User logged in' });
        } catch (error) {
            handleError(error, res);
        }
    })(req, res, next);
};

export const authGoogleService = {
    login,
    callback,
};