/**
 * @fileoverview  
 * This file contains the routes for authentication-related operations.  
 * It includes routes for login, logout, and checking login status.  
 * 
 * Routes:  
 * - POST /api/auth/login: Authenticates a user with username and password.  
 * - GET /api/auth/logout: Logs out the current user.  
 * - GET /api/auth/loginstatus: Checks if the user is currently logged in.
 */

import type { Request, Response } from 'express';
import { Router } from 'express';
import { authService } from '../services/auth/auth';
import { handleError } from '../middleware/errorhandler';

const router = Router();

router.post('/login', async (req: Request, res: Response) => {
    try {
        await authService.login(req, res);
    } catch (error: unknown) {
        handleError(error, res);
    }
});

router.get('/logout', async (req: Request, res: Response) => {
    try {
        authService.logout(req, res);
    } catch (error: unknown) {
        handleError(error, res);
    }
});

router.post('/refresh-token', async (req: Request, res: Response) => {
    try {
        await authService.refreshTokens(req, res);
    } catch (error: unknown) {
        handleError(error, res);
    }
});

export default router;