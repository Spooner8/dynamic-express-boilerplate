/**
 * @fileoverview  
 * This file contains the routes for managing roles in the application. 
 * 
 * Routes:  
 * - POST /create: Create a new role.
 * - GET /:id: Get a role by ID.
 * - GET /: Get all roles.
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

/**
 * @swagger
 * /api/roles/:
 *      post:
 *          summary: Creates a new role
 *          tags: [Roles]
 *          requestBody:
 *              required: true
 *              content:
 *                 application/json:
 *                   schema:
 *                      $ref: '#/components/schemas/Role'
 *          responses:
 *              201:
 *                  description: Returns a message and the created role
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: Role successfully created
 *                                  role:
 *                                      type: object
 *                                      $ref: '#/components/schemas/Role'
 *              400:
 *                  description: Returs a message
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: Rolename is required
 *              401:
 *                  description: Returs a message
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: Role not created
 */
router.post('/', async (req: Request, res: Response) => {
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

/**
 * @swagger
 * /api/roles:
 *      get:
 *          summary: Get all roles
 *          tags: [Roles]
 *          responses:
 *              200:
 *                  description: Returns all roles as an array of Role objects
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
 *                                      example: Roles not found
 */
router.get('/', async (_req: Request, res: Response) => {
    try {
        const roles = await roleService.getRoles();
        if (!roles) {
            res.status(404).send({ message: 'Roles not found' });
        } else {
            res.status(200).send(roles);
        }
    }
    catch (error: unknown) {
        handleError(error, res);
    }
});

/**
 * @swagger
 * /api/roles/{id}:
 *      get:
 *          summary: Get a role by ID
 *          tags: [Roles]
 *          parameters:
 *              - name: id
 *                description: The id of the role to retrieve
 *                in: path
 *                required: true
 *                schema:
 *                  type: string
 *                  format: string
 *          responses:
 *              200:
 *                  description: Returns the role with the specified ID
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  role:
 *                                      type: object
 *                                      $ref: '#/components/schemas/Role'
 *              404:
 *                  description: Returns a message
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: Role not found
 */
router.get('/:id', checkPermissions, async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const role = id && (await roleService.getRoleById(id));
        if (!role) {
            res.status(404).send({ message: 'Role not found' });
        } else {
            res.status(200).send(role);
        }
    }
    catch (error: unknown) {
        handleError(error, res);
    }
});

/**
 * @swagger
 * /api/roles/{id}:
 *      put:
 *          summary: Update a role
 *          tags: [Roles]
 *          parameters:
 *              - name: id
 *                description: The id of the role to update
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
 *                      $ref: '#/components/schemas/Role'
 *          responses:
 *              200:
 *                  description: Returns a message and the updated role
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: Role successfully updated
 *                                  role:
 *                                      type: object
 *                                      $ref: '#/components/schemas/Role'
 *              400:
 *                  description: Returs a message
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: Rolename is required
 *              404:
 *                  description: Returns a message
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: Role not found
 */
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
    }
    catch (error: unknown) {
        handleError(error, res);
    }
});

/**
 * @swagger
 * /api/roles/{id}:
 *      delete:
 *          summary: Delete a role (soft delete)
 *          tags: [Roles]
 *          parameters:
 *              - name: id
 *                description: The id of the role to delete/deactivate
 *                in: path
 *                required: true
 *                schema:
 *                  type: string
 *                  format: string
 *          responses:
 *              200:
 *                  description: Returns a message and the deactivated role
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: Role successfully deactivated
 *                                  role:
 *                                      type: object
 *                                      $ref: '#/components/schemas/Role'              
 *              404:
 *                  description: Returns a message
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: Role not found
 */
router.delete('/:id', checkPermissions, async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const response = id && (await roleService.deleteRole(id));
        if (!response) {
            res.status(404).send({ message: 'Role not found' });
        } else {
            res.status(200).send({ message: "Role sucessfully deactivated", role: response });
        }
    }
    catch (error: unknown) {
        handleError(error, res);
    }
});

export default router;