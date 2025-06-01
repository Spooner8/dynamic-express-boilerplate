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
                console.error(`Error creating role ${role.name}`);
            }
        }
    }
}

async function createdefaultPermissions(
    permissions: { roleNames: string[]; routePattern: string; method: Methods }[]
) {
    console.info('Creating default permissions...');
    for (const permission of permissions) {
        const data = {
            routePattern: permission.routePattern,
            method: permission.method,
        }
        const existingPermission = await permissionService.getPermissionByParams(
            data as Permission
        );

        if (!existingPermission) {
            const newPermission = await permissionService.createPermission(
                data as Permission
            );

            if (!newPermission) {
                console.error(
                    `Error creating permission for ${permission.routePattern} with method ${permission.method}`
                )
                continue;
            }

            for (const roleName of permission.roleNames) {
                const roleId = await roleService.getRoleIdByName(roleName);
                if (!roleId) {
                    console.error(`Role ${roleName} not found. Skipping.`);
                    continue;
                }
                const roleOnPermission = await permissionService.addRoleOnPermission(
                    newPermission.id,
                    roleId
                );
                if (!roleOnPermission) {
                    console.error(
                        `Error adding role ${roleName} to permission ${newPermission.id}`
                    );
                }
            }
        }
        else {
            console.info(
                `Permission for ${permission.routePattern} with method ${permission.method} already exists. Skipping creation.`
            );
        }
    }
}

async function createDefaultUser(
    users: { email: string; password: string; roleName: string }[]
) {
    console.info('Creating default users...');
    for (const user of users) {
        const existingUser = await userService.getUserByUsername(user.email);
        if (!existingUser) {
            const roleId = await roleService.getRoleIdByName(user.roleName);
            if (!roleId) {
                console.error(
                    `Role ${user.roleName} not found. Skipping user creation.`
                );
                continue;
            }

            const userWithRoleId = {
                email: user.email,
                password: user.password,
                roleId: roleId,
            };
            const createdUser = await userService.createUser(
                userWithRoleId.email,
                userWithRoleId.password,
                userWithRoleId.roleId
            );
            if (!createdUser) {
                console.error(`Error creating user ${user.email}`);
            }
        } else {
            console.info(
                `User ${user.email} already exists. Skipping creation.`
            );
        }
    }
}
