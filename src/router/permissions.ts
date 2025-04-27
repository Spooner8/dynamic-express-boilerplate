/**
 * @fileoverview  
 * This file contains the routes for managing permissions in the application.
 * 
 * Routes:  
 * - POST /create: Create a new permission.
 * - GET /:id: Get a permission by ID.
 * - GET /: Get all permissions.
 * - PUT /:id: Update a permission by ID.
 * - DELETE /:id: Delete a permission by ID. (Hard delete)
 */

import type { Request, Response } from 'express';
import { Router } from 'express';
import type { Permission } from '../../generated/prisma_client';
import { permissionService } from '../services/crud/permissions';
import { handleError } from '../middleware/errorhandler';
import { checkPermissions } from '../middleware/protection';

const router = Router();

/**
 * @swagger
 * /api/permissions:
 *      post:
 *          summary: Creates a new permission
 *          tags: [Permissions]
 *          requestBody:
 *              required: true
 *              content:
 *                 application/json:
 *                   schema:
 *                      $ref: '#/components/schemas/Permission'
 *          responses:
 *              201:
 *                  description: Returns a message and the created permission
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: Permission successfully created
 *                                  permission:
 *                                      type: object
 *                                      $ref: '#/components/schemas/Permission'
 *              400:
 *                  description: Returs a message
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: Not all required fields are given
 *              401:
 *                  description: Returs a message
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: Permission not created
 */
router.post('/', async (req: Request, res: Response) => {
    try {
        const permission: Permission = req.body;
        if (!permission.routePattern || !permission.method || !permission.roleId) {
            res.status(400).send({ message: 'Not all required fields are given' });
            return;
        }

        const response = await permissionService.createPermission(permission);
        if (!response) {
            res.status(401).send({ message: 'Permission not created' });
        } else {
            res.status(201).send({ message: 'Permission successfully created', permission: response });
        }
    }
    catch (error: unknown) {
        handleError(error, res);
    }
});

/**
 * @swagger
 * /api/permissions:
 *      get:
 *          summary: Get all permissions
 *          tags: [Permissions]
 *          responses:
 *              200:
 *                  description: Successfully retrieved all permissions
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Role'
 *              404:
 *                  description: Returns a message
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: Permissions not found
 */
router.get('/', async (_req: Request, res: Response) => {
    try {
        const permissions = await permissionService.getPermissions();
        if (!permissions) {
            res.status(404).send({ message: 'Permissions not found' });
        } else {
            res.status(200).send(permissions);
        }
    }
    catch (error: unknown) {
        handleError(error, res);
    }
});

/**
 * @swagger
 * /api/permissions/{id}:
 *      get:
 *          summary: Get a permission by ID
 *          tags: [Permissions]
 *          parameters:
 *              - name: id
 *                description: The id of the permission to delete
 *                in: path
 *                required: true
 *                schema:
 *                  type: string
 *                  format: string
 *          responses:
 *              200:
 *                  description: Returns a Permission object
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  permission:
 *                                      type: object
 *                                      $ref: '#/components/schemas/Permission'              
 *              404:
 *                  description: Returns a message
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: Permission not found
 */
router.get('/:id', checkPermissions, async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const permission = id && (await permissionService.getPermissionById(id));
        if (!permission) {
            res.status(404).send({ message: 'Permission not found' });
        } else {
            res.status(200).send(permission);
        }
    }
    catch (error: unknown) {
        handleError(error, res);
    }
});


/**
 * @swagger
 * /api/permissions/{id}:
 *      put:
 *          summary: Update a role
 *          tags: [Permissions]
 *          parameters:
 *              - name: id
 *                description: The id of the permission to update
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
 *                      $ref: '#/components/schemas/Permission'
 *          responses:
 *              200:
 *                  description: Returns a message and the updated permission
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: Permission successfully updated
 *                                  permission:
 *                                      type: object
 *                                      $ref: '#/components/schemas/Permission'
 *              400:
 *                  description: Returs a message
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: Not all required fields are given
 *              404:
 *                  description: Returns a message
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: Permission not found
 */
router.put('/:id', checkPermissions, async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const permission: Permission = req.body;
        if (!permission.routePattern || !permission.method || !permission.roleId) {
            res.status(400).send({ message: 'Not all required fields are given' });
            return;
        }
        const response = id && (await permissionService.updatePermission(id, permission));
        if (!response) {
            res.status(404).send({ message: 'Permission not found' });
        } else {
            res.status(200).send({ message: 'Permission successfully updated', permission: response });
        }
    }
    catch (error: unknown) {
        handleError(error, res);
    }
});

/**
 * @swagger
 * /api/permissions/{id}:
 *      delete:
 *          summary: Delete a permission (hard delete)
 *          tags: [Permissions]
 *          parameters:
 *              - name: id
 *                description: The id of the permission to delete
 *                in: path
 *                required: true
 *                schema:
 *                  type: string
 *                  format: string
 *          responses:
 *              200:
 *                  description: Returns a message and the deleted permission
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: Permission successfully deleted
 *                                  permission:
 *                                      type: object
 *                                      $ref: '#/components/schemas/Permission'              
 *              404:
 *                  description: Returns a message
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: Permission not found
 */
router.delete('/:id', checkPermissions, async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const response = id && (await permissionService.deletePermission(id));
        if (!response) {
            res.status(404).send({ message: 'Permission not found' });
        } else {
            res.status(200).send({ message: 'Permission successfully deleted', permission: response });
        }
    }
    catch (error: unknown) {
        handleError(error, res);
    }
});

export default router;