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