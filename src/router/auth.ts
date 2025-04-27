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

/**
* @swagger
* /api/auth/login:
*      post:
*          summary: Login a user with username and password
*          tags: [Auth]
*          requestBody:
*              required: true
*              content:
*                 application/json:
*                   schema:
*                       type: object
*                       properties:
*                          username:
*                               type: string
*                               description: The username of the user
*                               example: johndoe
*                          password:
*                               type: string
*                               description: The password of the user
*                               example: password123
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
*                                      example: Username and password are required
*              401:
*                  description: Returs a message
*                  content:
*                      application/json:
*                          schema:
*                              type: object
*                              properties:
*                                  message:
*                                      type: string
*                                      example: Invalid credentials
*/
router.post('/login', async (req: Request, res: Response) => {
    try {
        await authService.login(req, res);
    } catch (error: unknown) {
        handleError(error, res);
    }
});

/**
 * @swagger
 * /api/auth/logout:
 *      get:
 *          summary: Logout the current user
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
 *                                      example: Users logged out
 *              404:
 *                  description: Returns a message
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: Users not found
 */
router.get('/logout', async (req: Request, res: Response) => {
    try {
        authService.logout(req, res);
    } catch (error: unknown) {
        handleError(error, res);
    }
});

/**
* @swagger
* /api/auth/refresh-token:
*      post:
*          summary: Refresh the access token using the refresh token
*          tags: [Auth]
*          requestBody:
*              required: true
*              content:
*                 application/json:
*                   schema:
*                       type: object
*                       properties:
*                          username:
*                               type: string
*                               description: The username of the user
*                               example: johndoe
*                          password:
*                               type: string
*                               description: The password of the user
*                               example: password123
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
*                                      example: Tokens refreshed successfully
*              400:
*                  description: Returs a message
*                  content:
*                      application/json:
*                          schema:
*                              type: object
*                              properties:
*                                  message:
*                                      type: string
*                                      example: Invalid token payload
*              404:
*                  description: Returs a message
*                  content:
*                      application/json:
*                          schema:
*                              type: object
*                              properties:
*                                  message:
*                                      type: string
*                                      example: Refresh token not found || User not found
*/
router.post('/refresh-token', async (req: Request, res: Response) => {
    try {
        await authService.refreshTokens(req, res);
    } catch (error: unknown) {
        handleError(error, res);
    }
});

export default router;