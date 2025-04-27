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

/**
* @swagger
* /api/auth/google/login:
*      post:
*          summary: Login a user with Google
*          tags: [Auth]
*          responses:
*              200:
*                  description: Returns a message
*                  content:
*                      application/json:
*                          schema:
*                              type: object
*                              properties:
*                                  message:
*                                      type: string
*                                      example: User logged in
*              400:
*                  description: Returs a message
*                  content:
*                      application/json:
*                          schema:
*                              type: object
*                              properties:
*                                  message:
*                                      type: string
*                                      example: Some error occurred
*/
router.get('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        authGoogleService.login(req, res, next);
    } catch (error: unknown) {
        handleError(error, res);
    }
});

/**
* @swagger
* /api/auth/google/callback:
*      post:
*          summary: Login a user with Google callback
*          tags: [Auth]
*          responses:
*              200:
*                  description: Returns a message
*                  content:
*                      application/json:
*                          schema:
*                              type: object
*                              properties:
*                                  message:
*                                      type: string
*                                      example: User logged in
*              404:
*                  description: Returs a message
*                  content:
*                      application/json:
*                          schema:
*                              type: object
*                              properties:
*                                  message:
*                                      type: string
*                                      example: User not found
*/
router.get('/callback', async (req: Request, res: Response, next) => {
    try {
        authGoogleService.callback(req, res, next);
    } catch (error: unknown) {
        handleError(error, res);
    }
});

export default router;