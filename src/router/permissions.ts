/**
 * @fileoverview  
 * This file contains the routes for managing permissions in the application.
 * 
 * Routes:  
 * - POST /create: Create a new permission.
 * - POST /add_role: Add a role to a permission.
 * - GET /:id: Get a permission by ID.
 * - GET /: Get all permissions.
 * - GET /role/:id: Get all permissions by role ID.
 * - GET /params: Get permission by params.
 * - PUT /:id: Update a permission by ID.
 * - DELETE /:id: Delete a permission by ID. (Hard delete)
 * - DELETE /remove_role: Remove a role from a permission.
 */

import type { Request, Response } from 'express';
import { Router } from 'express';
import type { Permission } from '../../generated/prisma_client';
import { permissionService } from '../services/crud/permissions';
import { handleError } from '../middleware/errorhandler';
import { checkPermissions } from '../middleware/protection';

const router = Router();

router.post('/', checkPermissions, async (req: Request, res: Response) => {
    try {
        const permission: Permission = req.body;
        if (!permission.routePattern || !permission.method) {
            res.status(400).send({ message: 'Not all required fields are given' });
            return;
        }

        const response = await permissionService.createPermission(permission);
        if (!response) {
            res.status(401).send({ message: 'Permission not created' });
        } else {
            res.status(201).send({ message: 'Permission successfully created', permission: response });
        }
    } catch (error: unknown) {
        handleError(error, res);
    }
});

router.post('/add_role', checkPermissions, async (req: Request, res: Response) => {
    try {
        const { permissionId, roleId } = req.body;
        if (!permissionId || !roleId) {
            res.status(400).send({ message: 'Permission ID and Role ID are required' });
            return;
        }

        const response = await permissionService.addRoleOnPermission(permissionId, roleId);
        if (!response) {
            res.status(404).send({ message: 'Permission or Role not found' });
        } else {
            res.status(200).send({ message: 'Role successfully added to permission', roleOnPermission: response });
        }
    } catch (error: unknown) {
        handleError(error, res);
    }
});

router.get('/', checkPermissions, async (_req: Request, res: Response) => {
    try {
        const permissions = await permissionService.getPermissions();
        if (!permissions) {
            res.status(404).send({ message: 'Permissions not found' });
        } else {
            res.status(200).send(permissions);
        }
    } catch (error: unknown) {
        handleError(error, res);
    }
});

router.get('/role/:id', checkPermissions, async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const permissions = id && (await permissionService.getPermissionsByRoleId(id));
        console.log('Permissions by role ID:', permissions);
        if (!permissions) {
            res.status(404).send({ message: 'No permissions found for this role!' });
        } else {
            res.status(200).send(permissions);
        }
    } catch (error: unknown) {
        handleError(error, res);
    }
});

router.get('/:id', checkPermissions, async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const permission = id && (await permissionService.getPermissionById(id));
        if (!permission) {
            res.status(404).send({ message: 'Permission not found' });
        } else {
            res.status(200).send(permission);
        }
    } catch (error: unknown) {
        handleError(error, res);
    }
});

router.get('/params', checkPermissions, async (req: Request, res: Response) => {
    try {
        const permission: Permission = req.body;
        if (!permission.routePattern || !permission.method) {
            res.status(400).send({ message: 'Not all required fields are given' });
            return;
        }
        const existingPermission = await permissionService.getPermissionByParams(permission);
        if (!existingPermission) {
            res.status(404).send({ message: 'Permission not found' });
        } else {
            res.status(200).send(existingPermission);
        }
    } catch (error: unknown) {
        handleError(error, res);
    }
});

router.put('/:id', checkPermissions, async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const permission: Permission = req.body;
        if (!permission.routePattern || !permission.method) {
            res.status(400).send({ message: 'Not all required fields are given' });
            return;
        }
        const response = id && (await permissionService.updatePermission(id, permission));
        if (!response) {
            res.status(404).send({ message: 'Permission not found' });
        } else {
            res.status(200).send({ message: 'Permission successfully updated', permission: response });
        }
    } catch (error: unknown) {
        handleError(error, res);
    }
});

router.delete('/:id', checkPermissions, async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const response = id && (await permissionService.deletePermission(id));
        if (!response) {
            res.status(404).send({ message: 'Permission not found' });
        } else {
            res.status(200).send({ message: 'Permission successfully deleted', permission: response });
        }
    } catch (error: unknown) {
        handleError(error, res);
    }
});

router.delete('/remove_role', checkPermissions, async (req: Request, res: Response) => {
    try {
        const { permissionId, roleId } = req.body;
        if (!permissionId || !roleId) {
            res.status(400).send({ message: 'Permission ID and Role ID are required' });
            return;
        }

        const response = await permissionService.removeRoleFromPermission(permissionId, roleId);
        if (!response) {
            res.status(404).send({ message: 'No permission for this role found!' });
        } else {
            res.status(200).send({ message: 'Role successfully removed from permission', roleOnPermission: response });
        }
    } catch (error: unknown) {
        handleError(error, res);
    }
});

export default router;