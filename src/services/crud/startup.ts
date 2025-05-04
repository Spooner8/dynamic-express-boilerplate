import { defaultData } from '../default-data';
import type { Role } from '../../../generated/prisma_client';
import { User } from '../../../generated/prisma_client';
import { Permission } from '../../../generated/prisma_client';
import { roleService } from '../crud/roles';
import { permissionService } from '../crud/permissions';
import { userService } from '../crud/user';
import { logger } from '../../services/log/logger';

export async function initializeDefautData() {
    console.log('Initializing default data...');
    const roles = defaultData.roles as Role[];
    const permissions = defaultData.permissions;
    const users = defaultData.user as User[];

    try {
        await createDefaultRoles(roles);
        await createdefaultPermissions(permissions);
        await createDefaultUser(users);
        console.log('Default data initialized successfully.');
    } catch (error: unknown) {
        console.error(`Error initializing default data: ${error}`);
    }
}

async function createDefaultRoles(roles: Role[]) {
    logger.info('Creating default roles...');
    for (const role of roles) {
        const existingRole = await roleService.getRoleByName(role.name);
        if (!existingRole) {
            const createdRole = await roleService.createRole(role as Role);
            if (!createdRole) {
            }
        } else {
        }
    }
}

async function createdefaultPermissions(permissions: object) {
    logger.info('Creating default permissions...');
    const adminRoleId = await roleService.getAdminRoleId();
    const defaultRoleId = await roleService.getDefaultRoleId();
    
    const { adminPermissions, userPermissions} = permissions as {adminPermissions: Permission[], userPermissions: Permission[]};


    if (!adminRoleId || !defaultRoleId) {
        return;
    }


    adminPermissions.forEach(async (permission) => {
        permission.roleId = adminRoleId;
        const existingPermission = await permissionService.getPermissionByParams(permission);
        if (!existingPermission) {
            const createdPermission = await permissionService.createPermission(permission as Permission);
            if (!createdPermission) {
            }
        } else {
        }
    });

    userPermissions.forEach(async (permission) => {
        permission.roleId = defaultRoleId;
        const existingPermission = await permissionService.getPermissionByParams(permission);
        if (!existingPermission) {
            const createdPermission = await permissionService.createPermission(permission as Permission);
            if (!createdPermission) {
            }
        } else {
        }
    });
}

async function createDefaultUser(users: User[]) {
    logger.info('Creating default users...');
    const adminRoleId = await roleService.getAdminRoleId();

    for (let user of users) {
        const existingUser = await userService.getUserByUsername(user.email);
        if (!existingUser) {
            const isAdmin = user.email.includes('admin') || user.email.includes('Admin');
            if(isAdmin) {
                user = {
                    ...user,
                    roleId: adminRoleId ?? '',
                }
            }
            const createdUser = user.password && await userService.createUser(user.email, user.password, user.roleId);
            if (!createdUser) {
                logger.error(`Error creating user ${user.email}`);
            }
        } else {
            logger.info(`User ${user.email} already exists. Skipping creation.`);
        }
    }
}