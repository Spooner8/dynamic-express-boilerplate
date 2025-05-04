/**
 * @fileoverview
 * This file contains the CRUD services for the users table.  
 * The services are used to interact with the database and perform CRUD operations.
 * 
 * It handles the following operations:  
 * - Create a new role
 * - Get all roles
 * - Get a role by ID
 * - Get the default role
 * - Get the admin role
 * - Update a role
 * - Delete a role (Soft delete)
 */

import db from '../database';
import { Role } from '../../../generated/prisma_client';

/**
 * @description
 * Create a new role in the database.
 * 
 * @returns The the created role.
*/
async function createRole(role: Role) {
    const existingRole = await db.role.findUnique({
        where: { name: role.name }
    });
    if (existingRole) {
        throw new Error('Role already exists');
    }

    if (role.isAdmin) {
        const existingAdminRole = await db.role.findFirst({
            where: { isAdmin: true },
        });
        if (existingAdminRole && existingAdminRole.id !== role.id) {
            throw new Error('Admin role already exists');
        }
    }

    if (role.isDefault) {
        const existingDefaultRole = await db.role.findFirst({
            where: { isDefault: true },
        });
        if (existingDefaultRole && existingDefaultRole.id !== role.id) {
            throw new Error('Default role already exists');
        }
    }

    return await db.role.create({ data: role });
}

/**
 * @description
 * Fetch all roles from the database and return the role objects.
*/
async function getRoles() {
    return await db.role.findMany();
}

async function getRoleByName(name: string) {
    return await db.role.findUnique({
        where: { name }
    });
}

/**
 * @description
 * Fetch a role by its ID from the database and return the role object.
 * 
 * @param {string} id - The ID of the role to fetch.
 * @returns The role object or null if not found.
 */
async function getRoleById(id: string) {
    return (
        await db.role.findUnique({
            where: { id }
        })
    );
}

/**
 * @description
 * Fetch the default role from the database and return the id.
 * 
 * @returns The id of the default role or null if not found.
 */
async function getDefaultRoleId() {
    const defaultRoleId = await db.role.findFirst({
        where: { isDefault: true },
    });

    return defaultRoleId?.id;
}


/**
 * @description
 * Fetch the admin role from the database and return the id.
 * 
 * @returns The id of the admin role or null if not found.
 */
async function getAdminRoleId() {
    const adminRoleId = await db.role.findFirst({
        where: { isAdmin: true },
    });

    return adminRoleId?.id;
}


/**
 * @description
 * Update a role in the database.
 * 
 * @param {string} id - The ID of the role to update.
 * @param {Role} role - The updated role data.
 */
async function updateRole(id: string, role: Role) {
    const existingRole = await db.role.findUnique({ where: { id } });
    if (!existingRole) {
        return;
    }
    return await db.role.update({
        where: { id },
        data: role,
    });
}

/**
 * @description
 * Delete a role from the database by setting isActive to false.  
 * This is a soft delete.
 * 
 * @param {string} id - The ID of the role to deactivate.
 */
async function deleteRole(id: string) {
    const existingRole = await db.role.findUnique({ where: { id } });
    if (!existingRole) {
        return null;
    }
    return await db.role.update({
        where: { id },
        data: {
            isActive: false,
        },
    });
}

export const roleService = {
    createRole,
    getRoles,
    getRoleById,
    getRoleByName,
    getDefaultRoleId,
    getAdminRoleId,
    updateRole,
    deleteRole,
};
