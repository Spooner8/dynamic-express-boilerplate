/**
 * @fileoverview  
 * This file contains the routes for user-related operations.  
 * It includes routes for creating, updating, and deleting users.  
 * 
 * Routes:  
 * - POST /api/user/signup: Creates a new user.  
 * - GET /api/user: Retrieves all users.  
 * - GET /api/user/:id: Retrieves a user by ID.  
 * - PUT /api/user/:id: Updates a user by ID.  
 * - DELETE /api/user/:id: Deletes a user by ID.
 */

import type { Request, Response } from 'express';
import { Router } from 'express';
import { userService } from '../services/crud/user';
import type { User } from '../../generated/prisma_client';
import { checkPermissions } from '../middleware/protection';
import { handleError } from '../middleware/errorhandler';

const router = Router();

/**
* @swagger
* /api/user/signup:
*      post:
*          summary: Register a new user
*          tags: [Users]
*          requestBody:
*              required: true
*              content:
*                 application/json:
*                   schema:
*                      $ref: '#/components/schemas/User'
*          responses:
*              201:
*                  description: Returns a message and the created user
*                  content:
*                      application/json:
*                          schema:
*                              type: object
*                              properties:
*                                  message:
*                                      type: string
*                                      example: User successfully created
*                                  user:
*                                      type: object
*                                      $ref: '#/components/schemas/User'
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
*                                      example: User not created
*/
router.post('/signup', async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(400).send({ message: 'Username and password are required' });
            return;
        }
        const response = await userService.createUser(username, password);
        if (!response) {
            res.status(401).send({ message: 'User not created' });
        } else {
            res.status(201).send({ message: 'User successfully created', user: response });
        }
    } catch (error: unknown) {
        handleError(error, res);
    }
});

/**
 * @swagger
 * /api/user:
 *      get:
 *          summary: Get all users
 *          tags: [Users]
 *          responses:
 *              200:
 *                  description: Returns all user as an array of User objects
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/User'
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
router.get('/', checkPermissions, async (_req: Request, res: Response) => {
    try {
        const users = await userService.getUsers();
        if (!users) {
            res.status(404).send({ message: 'Users not found' });
        } else {
            res.status(200).send(users);
        }
    } catch (error: unknown) {
        handleError(error, res);
    }
});

/**
 * @swagger
 * /api/user/{id}:
 *      get:
 *          summary: Get a user by ID
 *          tags: [Users]
 *          parameters:
 *              - name: id
 *                description: The id of the user to retrieve
 *                in: path
 *                required: true
 *                schema:
 *                  type: string
 *                  format: string
 *          responses:
 *              200:
 *                  description: Returns the user with the specified ID
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  role:
 *                                      type: object
 *                                      $ref: '#/components/schemas/User'
 *              404:
 *                  description: Returns a message
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: User not found
 */
router.get('/:id', checkPermissions, async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const user = id && (await userService.getUserById(id));
        if (!user) {
            res.status(404).send({ message: 'User not found' });
        } else {
            res.status(200).send(user);
        }
    } catch (error: unknown) {
        handleError(error, res);
    }
});

/**
 * @swagger
 * /api/user/{id}:
 *      put:
 *          summary: Update a user
 *          tags: [Users]
 *          parameters:
 *              - name: id
 *                description: The id of the user to update
 *                in: path
 *                required: true
 *                schema:
 *                  type: string
 *                  format: string
 *          requestBody:
 *              required: true
 *              content:
 *                 application/json:
 *                   schema:
 *                      $ref: '#/components/schemas/User'
 *          responses:
 *              200:
 *                  description: Returns a message and the updated user
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: User successfully updated
 *                                  user:
 *                                      type: object
 *                                      $ref: '#/components/schemas/User'
 *              400:
 *                  description: Returs a message
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: Username can not be cleared
 *              404:
 *                  description: Returns a message
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: User not found
 */
router.put('/:id', checkPermissions, async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const user: User = req.body;
        if (user.email && user.email === '') {
            res.status(400).send({ message: 'Username can not be cleared' });
            return;
        }

        const response = id && (await userService.updateUser(id, user));
        if (!response) {
            res.status(404).send({ message: 'User not found' });
        } else {
            res.status(200).send({ message: 'User successfully updated', user: response });
        }
    } catch (error: unknown) {
        handleError(error, res);
    }
});

/**
 * @swagger
 * /api/user/{id}:
 *      delete:
 *          summary: Delete a user (soft delete)
 *          tags: [Users]
 *          parameters:
 *              - name: id
 *                description: The id of the user to delete/deactivate
 *                in: path
 *                required: true
 *                schema:
 *                  type: string
 *                  format: string
 *          responses:
 *              200:
 *                  description: Returns a message and the deactivated user
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: User successfully deactivated
 *                                  user:
 *                                      type: object
 *                                      $ref: '#/components/schemas/User'              
 *              404:
 *                  description: Returns a message
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: User not found
 */
router.delete('/:id', checkPermissions, async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const response = id && (await userService.deleteUser(id));
        if (!response) {
            res.status(404).send({ message: 'User not found' });
        } else {
            res.status(200).send({ message: 'User successfully deactivated', user: response });
        }
    } catch (error: unknown) {
        handleError(error, res);
    }
});

export default router;