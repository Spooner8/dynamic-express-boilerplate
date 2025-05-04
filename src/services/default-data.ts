import { isAdmin } from "../middleware/protection";

export const defaultData = {
    roles: [
        {
            name: 'Administrator',
            description: 'Administrator role with all permissions',
            isSystem: true,
            isAdmin: true,
        },
        {
            name: 'User',
            description: 'Regular user role',
            isSystem: true,
            isAdmin: false,
            isDefault: true,
        }
    ],
    permissions: {
        adminPermissions: [
            {
                routePattern: '/api/user',
                method: 'GET',
            },
            {
                routePattern: '/api/user/:id',
                method: 'GET',
            },
            {
                routePattern: '/api/user',
                method: 'POST',
            },
            {
                routePattern: '/api/user/:id',
                method: 'PUT',
            },
            {
                routePattern: '/api/user/:id',
                method: 'DELETE',
            },
            {
                routePattern: '/api/roles',
                method: 'GET',
            },
            {
                routePattern: '/api/roles/:id',
                method: 'GET',
            },
            {
                routePattern: '/api/roles',
                method: 'POST',
            },
            {
                routePattern: '/api/roles/:id',
                method: 'PUT',
            },
            {
                routePattern: '/api/roles/:id',
                method: 'DELETE',
            },
            {
                routePattern: '/api/permissions',
                method: 'GET',
            },
            {
                routePattern: '/api/permissions/:id',
                method: 'GET',
            },
            {
                routePattern: '/api/permissions',
                method: 'POST',
            },
            {
                routePattern: '/api/permissions/:id',
                method: 'PUT',
            },
            {
                routePattern: '/api/permissions/:id',
                method: 'DELETE',
            }
        ],
        userPermissions: [
            {
                routePattern: '/api/user/:id',
                method: 'GET',
            },
            {
                routePattern: '/api/user/:id',
                method: 'PUT',
            },
            {
                routePattern: '/api/user/:id',
                method: 'DELETE',
            }
        ],
    },
    user: [
        {
            email: 'admin@api.org',
            password: 'admin',
        },
    ]
}