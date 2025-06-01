/**
 * @fileoverview
 * This file contains the CRUD services for the users table.  
 * The services are used to interact with the database and perform CRUD operations.
 * 
 * It handles the following operations:  
 * - Create a new permission
 * - Add a role to a permission
 * - Get all permissions
 * - Get all permissions for a role
 * - Get a permission by ID
 * - Get permissions by role ID
 * - Update a permission
 * - Delete a permission (Hard delete)
 * - Remove a role from a permission
 */

import db from '../database';
import { Permission } from '../../../generated/prisma_client';
import { Methods } from '../../../generated/prisma_client';
import { handleError } from '../../middleware/errorhandler';

/**
 * @description
 * Create a new permission in the database.
 * 
 * @param {Permission} permission - The permission object to create.
 * @returns The created permission.
 */
async function createPermission(permission: Permission) {
    try {
        await validateNewPermission(permission);
    } catch(error: unknown) {
        handleError(error, null);
        return null;
    }

    const permissionExists = await db.permission.findUnique({
        where: { unique_routePattern_method: { routePattern: permission.routePattern, method: permission.method } }
    });
    if (permissionExists) {
        throw new Error('Permission already exists');
    }

    return await db.permission.create({ data: permission });
}

/**
 * @description
 * Add a new role for a permission in the database.
 * 
 * @returns The the created role on permission.
*/
async function addRoleOnPermission(permissionId: string, roleId: string) {
    const permissionExists = await db.permission.findUnique({
        where: { id: permissionId }
    });
    if (!permissionExists) {
        return null;
    }

    const roleExists = await db.role.findUnique({
        where: { id: roleId }
    });
    if (!roleExists) {
        return null;
    }

    const existingRoleOnPermission = await db.rolesOnPermission.findUnique({
        where: {
            unique_roleId_permissionId: {
                roleId,
                permissionId
            }
        }
    });

    if (existingRoleOnPermission) {
        throw new Error('Permission already has this role assigned');
    }

    return await db.rolesOnPermission.create({
        data: {
            roleId,
            permissionId
        }
    });
}

/**
 * @description
 * Fetch all permissions from the database and return the permission objects.
 * 
 * @returns The array of permission objects.
 */
async function getPermissions() {
    return await db.permission.findMany();
}

/**
 * @description
 * Fetch permissions by role ID from the database and return the permission objects.
 * 
 * @param {string} roleId - The ID of the role to fetch permissions for.
 * @returns The array of permission objects for the given role ID.
 */
async function getPermissionsByRoleId(roleId: string) {
    const permissions = await db.permission.findMany({
        where: {
            roles: {
                some: {
                    role: {
                        id: roleId
                    }
                }
            }
        }
    });

    console.log(`Permissions for role ID ${roleId}:`, permissions);

    return permissions
}

/**
 * @description
 * Fetch a permission by its route pattern, method, and role ID from the database and return the permission object.
 * 
 * @param {Permission} permission - The permission object to fetch.
 * @returns The permission object or null if not found.
 */
async function getPermissionByParams(permission: Permission) {
    return await db.permission.findUnique({
        where: {
            unique_routePattern_method: {
                routePattern: permission.routePattern,
                method: permission.method
            }
        }
    });
}

/**
 * @description
 * Fetch a permission by its ID from the database and return the permission object.
 * 
 * @param {string} id - The ID of the permission to fetch.
 * @returns The permission object or null if not found.
 */
async function getPermissionById(id: string) {
    return (
        await db.permission.findUnique({
            where: { id }
        })
    );
}

/**
 * @description
 * Update a permission in the database.
 * 
 * @param {string} id - The ID of the permission to update.
 * @param {Permission} permission - The updated permission object.
 * @returns The updated permission object.
 */
async function updatePermission(id: string, permission: Permission) {
    const permissionExists = await db.permission.findUnique({
        where: { id }
    });
    if (!permissionExists) {
        return null;
    }
    return await db.permission.update({
        where: { id },
        data: permission
    });
}

/**
 * @description
 * Delete a permission by its ID from the database.
 * This is a hard delete operation.
 * 
 * @param {string} id - The ID of the permission to delete.
 * @returns The deleted permission object.
 */
async function deletePermission(id: string) {
    const permissionExists = await db.permission.findUnique({
        where: { id }
    });
    if (!permissionExists) {
        return null;
    }
    return await db.permission.delete({
        where: { id }
    });
}

/**
 * @description
 * Validate the new permission object before creating it.
 * Sets the method to uppercase and checks if the method is valid.
 * Checks if the route pattern is valid and if the role ID exists.
 * 
 * @param {Permission} permission - The permission object to validate.
 * @throws {Error} If the permission object is invalid.
 */
async function validateNewPermission(permission: Permission) {
    permission.method = permission.method.toUpperCase() as Methods;
    const validMethods = Object.values(Methods);
    if (!validMethods.includes(permission.method)) {
        throw new Error('Invalid method');
    }

    const validRoutePattern = /^\/api\/(?!\/)([a-zA-Z0-9._-]+|:[a-zA-Z][a-zA-Z0-9_-]*\??)(\/([a-zA-Z0-9._-]+|:[a-zA-Z][a-zA-Z0-9_-]*\??))*$/;
    if (!validRoutePattern.test(permission.routePattern)) {
        throw new Error('Invalid route pattern');
    }
}

/**
 * @description
 * Remove a role from a permission in the database.
 * 
 * @returns The deleted role on permission.
*/
async function removeRoleFromPermission(permissionId: string, roleId: string) {
    const existingRoleOnPermission = await db.rolesOnPermission.findUnique({
        where: {
            unique_roleId_permissionId: {
                roleId,
                permissionId
            }
        }
    });

    if (!existingRoleOnPermission) {
        return null;
    }

    return await db.rolesOnPermission.delete({
        where: {
            unique_roleId_permissionId: {
                roleId,
                permissionId
            }
        }
    });
}

export const permissionService = {
    createPermission,
    addRoleOnPermission,
    getPermissions,
    getPermissionsByRoleId,
    getPermissionById,
    getPermissionByParams,
    updatePermission,
    deletePermission,
    removeRoleFromPermission
};