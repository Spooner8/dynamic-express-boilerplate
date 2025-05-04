import { Methods } from "../../generated/prisma_client"

enum DefaultRoles {
    ADMIN = 'Administrator',
    USER = 'User',
}

export const defaultData = {
    roles: [
        {
            name: DefaultRoles.ADMIN,
            description: 'Administrator role with all permissions',
            isSystem: true,
            isAdmin: true,
        },
        {
            name: DefaultRoles.USER,
            description: 'Regular user role',
            isSystem: true,
            isAdmin: false,
            isDefault: true,
        }
    ],
    permissions: [
        // Admin permissions
        {
            roleName: DefaultRoles.ADMIN,
            routePattern: '/api/user',
            method: Methods.GET,
        },
        {
            roleName: DefaultRoles.ADMIN,
            routePattern: '/api/user/:id',
            method: Methods.GET,
        },
        {
            roleName: DefaultRoles.ADMIN,
            routePattern: '/api/user',
            method: Methods.POST,
        },
        {
            roleName: DefaultRoles.ADMIN,
            routePattern: '/api/user/:id',
            method: Methods.PUT,
        },
        {
            roleName: DefaultRoles.ADMIN,
            routePattern: '/api/user/:id',
            method: Methods.DELETE,
        },
        {
            roleName: DefaultRoles.ADMIN,
            routePattern: '/api/user/name',
            method: Methods.GET,
        },
        {
            roleName: DefaultRoles.ADMIN,
            routePattern: '/api/roles',
            method: Methods.GET,
        },
        {
            roleName: DefaultRoles.ADMIN,
            routePattern: '/api/roles/:id',
            method: Methods.GET,
        },
        {
            roleName: DefaultRoles.ADMIN,
            routePattern: '/api/roles/:name',
            method: Methods.GET,
        },
        {
            roleName: DefaultRoles.ADMIN,
            routePattern: '/api/roles/id/:name',
            method: Methods.GET,
        },
        {
            roleName: DefaultRoles.ADMIN,
            routePattern: '/api/roles/:id/permissions',
            method: Methods.POST,
        },
        {
            roleName: DefaultRoles.ADMIN,
            routePattern: '/api/roles/:id/permissions/:permissionId',
            method: Methods.DELETE,
        },
        {
            roleName: DefaultRoles.ADMIN,
            routePattern: '/api/roles/:id',
            method: Methods.GET,
        },
        {
            roleName: DefaultRoles.ADMIN,
            routePattern: '/api/roles',
            method: Methods.POST,
        },
        {
            roleName: DefaultRoles.ADMIN,
            routePattern: '/api/roles/:id',
            method: Methods.PUT,
        },
        {
            roleName: DefaultRoles.ADMIN,
            routePattern: '/api/roles/:id',
            method: Methods.DELETE,
        },
        {
            roleName: DefaultRoles.ADMIN,
            routePattern: '/api/permissions',
            method: Methods.GET,
        },
        {
            roleName: DefaultRoles.ADMIN,
            routePattern: '/api/permissions/:id',
            method: Methods.GET,
        },
        {
            roleName: DefaultRoles.ADMIN,
            routePattern: '/api/permissions/role/:id',
            method: Methods.GET,
        },
        {
            roleName: DefaultRoles.ADMIN,
            routePattern: '/api/permissions/params',
            method: Methods.GET,
        },
        {
            roleName: DefaultRoles.ADMIN,
            routePattern: '/api/permissions/method/:id',
            method: Methods.GET,
        },
        {
            roleName: DefaultRoles.ADMIN,
            routePattern: '/api/permissions/role/:id',
            method: Methods.GET,
        },
        {
            roleName: DefaultRoles.ADMIN,
            routePattern: '/api/permissions/:id',
            method: Methods.GET,
        },
        {
            roleName: DefaultRoles.ADMIN,
            routePattern: '/api/permissions',
            method: Methods.POST,
        },
        {
            roleName: DefaultRoles.ADMIN,
            routePattern: '/api/permissions/:id',
            method: Methods.PUT,
        },
        {
            roleName: DefaultRoles.ADMIN,
            routePattern: '/api/permissions/:id',
            method: Methods.DELETE,
        },
        // User permissions
        {
            roleName: DefaultRoles.USER,
            routePattern: '/api/user/:id',
            method: Methods.GET,
        },
        {
            roleName: DefaultRoles.USER,
            routePattern: '/api/user/:id',
            method: Methods.PUT,
        },
        {
            roleName: DefaultRoles.USER,
            routePattern: '/api/user/:id',
            method: Methods.DELETE,
        }
    ],
    user: [
        {
            roleName: DefaultRoles.ADMIN,
            email: 'admin@api.org',
            password: 'Admin123!',
        },
        {
            roleName: DefaultRoles.USER,
            email: 'user@api.org',
            password: 'User123!',
        },
    ]
}