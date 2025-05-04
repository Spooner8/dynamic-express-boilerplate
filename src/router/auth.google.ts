/**
 * @fileoverview  
 * This file contains the routes for authentication-related operations.  
 * It includes routes for login via Google  
 * 
 * Routes:  
 * - GET /api/auth/google/login: Redirects to Google for authentication.
 * - GET /api/auth/google/callback: Handles the callback from Google after authentication.
 */

import type { NextFunction, Request, Response } from 'express';
import { Router } from 'express';
import { authGoogleService } from '../services/auth/auth.google';
import { handleError } from '../middleware/errorhandler';

const router = Router();

router.get('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        authGoogleService.login(req, res, next);
    } catch (error: unknown) {
        handleError(error, res);
    }
});

router.get('/callback', async (req: Request, res: Response, next) => {
    try {
        authGoogleService.callback(req, res, next);
    } catch (error: unknown) {
        handleError(error, res);
    }
});

export default router;