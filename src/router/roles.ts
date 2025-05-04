/**
 * @fileoverview  
 * This file contains the routes for managing roles in the application. 
 * 
 * Routes:  
 * - POST /create: Create a new role.
 * - GET /:id: Get a role by ID.
 * - GET /: Get all roles.
 * - GET /name/:name: Get a role by name.
 * - GET /id/:name: Get a role ID by name.
 * - PUT /:id: Update a role by ID.
 * - DELETE /:id: Delete a role by ID. (Soft delete)
 */

import type { Request, Response } from 'express';
import { Router } from 'express';
import type { Role } from '../../generated/prisma_client';
import { roleService } from '../services/crud/roles';
import { handleError } from '../middleware/errorhandler';
import { checkPermissions } from '../middleware/protection';

const router = Router();

router.post('/', checkPermissions, async (req: Request, res: Response) => {
    try {
        const role: Role = req.body;
        if (!role.name) {
            res.status(400).send({ message: 'Rolename is required' });
            return;
        }
        const response = await roleService.createRole(role);
        if (!response) {
            res.status(401).send({ message: 'Role not created' });
        } else {
            res.status(201).send({ message: "Role successfully created", role: response });
        }
    } catch (error: unknown) {
        handleError(error, res);
    }
});

router.get('/', checkPermissions, async (_req: Request, res: Response) => {
    try {
        const roles = await roleService.getRoles();
        if (!roles) {
            res.status(404).send({ message: 'Roles not found' });
        } else {
            res.status(200).send(roles);
        }
    } catch (error: unknown) {
        handleError(error, res);
    }
});

router.get('/:id', checkPermissions, async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const role = id && (await roleService.getRoleById(id));
        if (!role) {
            res.status(404).send({ message: 'Role not found' });
        } else {
            res.status(200).send(role);
        }
    } catch (error: unknown) {
        handleError(error, res);
    }
});

router.get('/:name', checkPermissions, async (req: Request, res: Response) => {
    try {
        const name = req.params.name;
        const role = name && (await roleService.getRoleByName(name));
        if (!role) {
            res.status(404).send({ message: 'Role not found' });
        } else {
            res.status(200).send(role);
        }
    } catch (error: unknown) {
        handleError(error, res);
    }
});

router.get('/id/:name', checkPermissions, async (req: Request, res: Response) => {
    try {
        const name = req.params.name;
        const roleId = name && (await roleService.getRoleIdByName(name));
        if (!roleId) {
            res.status(404).send({ message: 'Role not found' });
        } else {
            res.status(200).send(roleId);
        }
    } catch (error: unknown) {
        handleError(error, res);
    }
});

router.put('/:id', checkPermissions, async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const role: Role = req.body;
        if (!role.name) {
            res.status(400).send({ message: 'Rolename is required' });
            return;
        }
        const response = id && (await roleService.updateRole(id, role));
        if (!response) {
            res.status(404).send({ message: 'Role not found' });
        } else {
            res.status(200).send({ message: "Role successfully updated", role: response });
        }
    } catch (error: unknown) {
        handleError(error, res);
    }
});

router.delete('/:id', checkPermissions, async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const response = id && (await roleService.deleteRole(id));
        if (!response) {
            res.status(404).send({ message: 'Role not found' });
        } else {
            res.status(200).send({ message: "Role sucessfully deactivated", role: response });
        }
    } catch (error: unknown) {
        handleError(error, res);
    }
});

export default router;