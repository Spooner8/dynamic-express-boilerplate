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
import { logger } from '../log/logger';

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
    if (!validateUsername(email)) {
        throw new Error('Username must be a valid email address');
    }

    if (!validatePassword(password)) {
        throw new Error('Password doesen\'t reach the minimum security requirements (8 characters, 1 uppercase letter, 1 lowercase letter, 1 number, 1 special character)');
    }

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

/**
 * 
 * @param {string} username - The username (email) of the user to fetch.
 * @returns The user object or null if not found.
 */
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
        throw new Error('Username already in use');
    }

    // If the user is not using Google authentication. Check if the password is empty and set it to the existing password, to avoid overwriting it with an empty string.
    if (!userExists.googleId && updatedUser.password && updatedUser.password === '') {
        updatedUser.password = userExists.password;
    }

    // If the user is using Google authentication. Check if the googleId is empty and set it to the existing googleId, to avoid overwriting it with an empty string.
    if (userExists.googleId && updatedUser.googleId && userExists.googleId !== updatedUser.googleId) {
        updatedUser.googleId = userExists.googleId;
    }

    if (updatedUser.password) {
        if (!validatePassword(updatedUser.password)) {
            throw new Error('Password doesen\'t reach the minimum security requirements (8 characters, 1 uppercase letter, 1 lowercase letter, 1 number, 1 special character)');
        }
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


/**
 * @description
 * Validate the username (email) format.
 * 
 * @param {string} username - The username to validate.
 * @returns A boolean indicating whether the username is valid or not.
 */
function validateUsername(username: string) {
    const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return re.test(username);
}

/**
 * @description
 * Validate the password for a minimum of security requirements.
 * The password must contain at least:
 * - 8 characters
 * - 1 uppercase letter
 * - 1 lowercase letter
 * - 1 number
 * - 1 special character
 * 
 * @param {string} password - The password to validate.
 * @returns A boolean indicating whether the password is valid or not.
 */
function validatePassword(password: string) {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d])[a-zA-Z\d\S]{8,}$/;
    return re.test(password);
}

export const userService = {
    createUser,
    getUsers,
    getUserById,
    getUserByUsername,
    updateUser,
    deleteUser,
};