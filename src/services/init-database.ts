import { defaultData } from './default-data';
import type { Role } from '../../generated/prisma_client';
import { Permission } from '../../generated/prisma_client';
import { Methods } from '../../generated/prisma_client';
import { roleService } from './crud/roles';
import { permissionService } from './crud/permissions';
import { userService } from './crud/user';

export async function initializeDefautData() {
    console.info('Initializing default data...');
    const roles = defaultData.roles as Role[];
    const permissions = defaultData.permissions;
    const users = defaultData.user;

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
    console.info('Creating default roles...');
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

async function createdefaultPermissions(permissions: { roleName: string; routePattern: string; method: Methods }[]) {
    console.info('Creating default permissions...');
    const adminRoleId = await roleService.getAdminRoleId();
    const defaultRoleId = await roleService.getDefaultRoleId();
    
    if (!adminRoleId || !defaultRoleId) {
        console.error('Admin or default role not found. Skipping permission creation.');
        return;
    }

    for (const permission of permissions) {
        const roleId = await roleService.getRoleIdByName(permission.roleName);
        if (!roleId) {
            console.error(`Role ${permission.roleName} not found. Skipping permission creation.`);
            continue;
        }

        const permissionWithRoleId = { 
            routePattern: permission.routePattern,
            method: permission.method,
            roleId: roleId,
        };
        const existingPermission = await permissionService.getPermissionByParams(permissionWithRoleId as Permission);
        if (!existingPermission) {
            const createdPermission = await permissionService.createPermission(permissionWithRoleId as Permission);
            if (!createdPermission) {
                console.error(`Error creating permission ${permission.routePattern} for role ${permission.roleName}`);
            }
        } else {
            console.info(`Permission ${permission.routePattern} for role ${permission.roleName} already exists. Skipping creation.`);
        }
    }
}

async function createDefaultUser(users: { email: string; password: string; roleName: string }[]) {
    console.info('Creating default users...');
    for (const user of users) {
        const existingUser = await userService.getUserByUsername(user.email);
        if (!existingUser) {
            const roleId = await roleService.getRoleIdByName(user.roleName);
            if (!roleId) {
                console.error(`Role ${user.roleName} not found. Skipping user creation.`);
                continue;
            }

            const userWithRoleId = {
                email: user.email,
                password: user.password,
                roleId: roleId,
            }
            const createdUser = await userService.createUser(userWithRoleId.email, userWithRoleId.password, userWithRoleId.roleId);
            if (!createdUser) {
                console.error(`Error creating user ${user.email}`);
            }
        } else {
            console.info(`User ${user.email} already exists. Skipping creation.`);
        }
    }
}