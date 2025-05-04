/**
 * @fileoverview
 * This file contains the CRUD services for the users table.  
 * The services are used to interact with the database and perform CRUD operations.
 * 
 * It handles the following operations:
 * - Create a new user
 * - Get all users
 * - Get a user by ID
 * - Get a user by username
 * - Update a user
 * - Delete a user (Soft delete)
 */

import bcrypt from 'bcrypt';
import db from '../database';
import type { User } from '../../../generated/prisma_client';

/**
 * @description
 * Create a new user in the database.
 * 
 * @param {string} email - The username of the user.
 * @param {string} password - The password of the user.
 * 
 * @returns The created user.
*/
async function createUser(email: string, password: string, roleId?: string) {
    const userExists = await db.user.findUnique({
        where: { email },
    });

    if (userExists) {
        throw new Error('User already exists');
    }

    const defaultRole = await db.role.findFirst({
        where: { isDefault: true },
        select: { id: true },
    });

    if (!defaultRole) {
        throw new Error('Default role not found');
    }

    const salt = await bcrypt.genSalt(10);
    const data = {
        email: email,
        password: await bcrypt.hash(password, salt),
        roleId: roleId || defaultRole.id,
    };
    
    return await db.user.create({ data });
}

/**
 * @description
 * Fetch all users from the database and return the user objects.
*/
async function getUsers() {
    return await db.user.findMany();
}

/**
 * @description
 * Fetch a user by its ID from the database and return the user object.
 * 
 * @param {string} id - The ID of the user to fetch.
*/
async function getUserById(id: string) {
    return (
        await db.user.findUnique({
            where: { id }
        })
    );
}

async function getUserByUsername(username: string) {
    return await db.user.findUnique({
        where: { email: username }
    });
}

/**
 * @description
 * Update a user in the database.
 * 
 * @param {string} id - The ID of the user to update.
 * @param {User} updatedUser - The updated user data.
 * @returns The updated user object.
*/
async function updateUser(id: string, updatedUser: User) {
    const userExists = await db.user.findUnique({
        where: { id },
    });
    if (!userExists) {
        return null;
    }

    const existingUser = await db.user.findUnique({
        where: { email: updatedUser.email },
    });
    if (existingUser && existingUser.id !== id) {
        throw new Error('Email already exists');
    }

    if (!userExists.googleId && updatedUser.password && updatedUser.password === '') {
        updatedUser.password = userExists.password;
    }

    if (userExists.googleId && updatedUser.googleId && userExists.googleId !== updatedUser.googleId) {
        updatedUser.googleId = userExists.googleId;
    }

    if (updatedUser.password) {
        const user = await db.user.findUnique({ where: { id } });
        if (user && user.password !== updatedUser.password) {
            updatedUser.password = await bcrypt.hash(updatedUser.password, 10);
        }
    }
    
    return await db.user.update({
        where: { id }, data: updatedUser
    });
}

/**
 * @description
 * Delete a user from the database. (Soft delete)
 * 
 * @param {string} id - The ID of the user to delete.
*/
async function deleteUser(id: string) {
    return await db.user.update({
        where: { id },
        data: { isActive: false }
    });
}

export const userService = {
    createUser,
    getUsers,
    getUserById,
    getUserByUsername,
    updateUser,
    deleteUser,
};