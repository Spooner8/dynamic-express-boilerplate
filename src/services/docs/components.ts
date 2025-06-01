const components = {
    schemas: {
        Role: {
            type: 'object',
            required: ['name'],
            properties: {
                id: {
                    type: 'string',
                    description: 'The auto-generated id of the role',
                },
                name: {
                    type: 'string',
                    description: 'The name of the role',
                },
                createdAt: {
                    type: 'string',
                    description:
                        'The date the role was created (Auto-generated)',
                },
                updatedAt: {
                    type: 'string',
                    description:
                        'The date the role was updated (Automatically updated)',
                },
                description: {
                    type: 'string',
                    description: 'The description of the role',
                },
                isSystem: {
                    type: 'boolean',
                    description: 'Indicates if the role is a system role',
                },
                isAdmin: {
                    type: 'boolean',
                    description: 'Indicates if the role is an admin role',
                },
                isDefault: {
                    type: 'boolean',
                    description: 'Indicates if the role is a default role',
                },
                isActive: {
                    type: 'boolean',
                    description: 'Indicates if the role is active',
                },
                permissions: {
                    type: 'array',
                    items: {
                        $ref: '#/components/schemas/Permission',
                    },
                    description: 'The permissions associated with the role',
                },
                users: {
                    type: 'array',
                    items: {
                        $ref: '#/components/schemas/User',
                    },
                    description: 'The users associated with the role',
                },
            },
            example: {
                id: 'aef3b2c4-5d6e-4f7a-8b9c-0d1e2f3a4b5c',
                name: 'Admin',
                createdAt: '2023-01-01T00:00:00.000Z',
                updatedAt: '2023-01-01T00:00:00.000Z',
                description: 'Administrator role with full access',
                isSystem: true,
                isAdmin: true,
                isDefault: false,
                isActive: true,
                users: [],
                permissions: [],
            },
        },
        Permission: {
            type: 'object',
            required: ['routePattern', 'method', 'roleId'],
            properties: {
                id: {
                    type: 'string',
                    description: 'The auto-generated id of the permission',
                },
                routePattern: {
                    type: 'string',
                    description: 'The route pattern for the permission',
                },
                method: {
                    type: 'string',
                    enum: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
                    description: 'The HTTP method for the permission',
                },
                roleId: {
                    type: 'string',
                    description: 'The ID of the associated role',
                },
                createdAt: {
                    type: 'string',
                    description:
                        'The date the permission was created (Auto-generated)',
                },
                updatedAt: {
                    type: 'string',
                    description:
                        'The date the permission was updated (Automatically updated)',
                },
            },
            example: {
                id: 'b1234567-89ab-cdef-0123-456789abcdef',
                routePattern: '/api/user',
                method: 'GET',
                roleId: 'aef3b2c4-5d6e-4f7a-8b9c-0d1e2f3a4b5c',
                createdAt: '2023-01-01T00:00:00.000Z',
                updatedAt: '2023-01-01T00:00:00.000Z',
            },
        },
        Permissions: {
            type: 'array',
            items: {
                $ref: '#/components/schemas/Permission',
            },
            description: 'An array of permissions',
        },
        User: {
            type: 'object',
            required: ['email', 'roleId', 'password'],
            properties: {
                id: {
                    type: 'string',
                    description: 'The auto-generated id of the user',
                },
                firstName: {
                    type: 'string',
                    description: 'The first name of the user',
                },
                lastName: {
                    type: 'string',
                    description: 'The last name of the user',
                },
                email: {
                    type: 'string',
                    description: 'The email of the user',
                },
                password: {
                    type: 'string',
                    description:
                        'The password of the user (Only for registration with local strategy)',
                },
                roleId: {
                    type: 'string',
                    description: 'The ID of the associated role',
                },
                googleId: {
                    type: 'string',
                    description:
                        'The Google ID of the user (Saved automatically when using Google auth)',
                },
                createdAt: {
                    type: 'string',
                    description:
                        'The date the user was created (Automatically created)',
                },
                updatedAt: {
                    type: 'string',
                    description:
                        'The date the user was updated (Automatically updated)',
                },
                lastLogin: {
                    type: 'string',
                    description:
                        'The date the user last logged in (Automatically updated)',
                },
                isActive: {
                    type: 'boolean',
                    description: 'Indicates if the user is active',
                },
            },
            example: {
                id: 'c1234567-89ab-cdef-0123-456789abcdef',
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@examples.com',
                password: 'password123',
                roleId: 'aef3b2c4-5d6e-4f7a-8b9c-0d1e2f3a4b5c',
                googleId: '1234567890abcdefg',
                createdAt: '2023-01-01T00:00:00.000Z',
                updatedAt: '2023-01-01T00:00:00.000Z',
                lastLogin: '2023-01-01T00:00:00.000Z',
                isActive: true,
            },
        },
        RefreshToken: {
            type: 'object',
            required: [
                'userId',
                'token',
                'userAgent',
                'ipAddress',
                'expiresAt',
            ],
            properties: {
                id: {
                    type: 'string',
                    description: 'The auto-generated id of the refresh token',
                },
                userId: {
                    type: 'string',
                    description: 'The ID of the associated user',
                },
                token: {
                    type: 'string',
                    description: 'The refresh token string',
                },
                userAgent: {
                    type: 'string',
                    description: 'The user agent of the client',
                },
                ipAddress: {
                    type: 'string',
                    description: 'The IP address of the client',
                },
                createdAt: {
                    type: 'string',
                    description: 'The date the token was created',
                },
                expiresAt: {
                    type: 'string',
                    description:
                        'The expiration date of the token (Value in milliseconds)',
                },
            },
            example: {
                id: 'd1234567-89ab-cdef-0123-456789abcdef',
                userId: 'c1234567-89ab-cdef-0123-456789abcdef',
                token: 'abcdef1234567890',
                userAgent: 'Mozilla/5.0',
                ipAddress: '72.229.123.456',
                createdAt: '2023-01-01T00:00:00.000Z',
                expiresAt: '2023-01-02T00:00:00.000Z',
            },
        },
    },
};

export default components;
