const permissionPaths = {
    '/api/permissions': {
        post: {
            summary: 'Creates a new permission',
            tags: ['Permissions'],
            security: [
                {
                    cookieAuth: [],
                },
            ],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/Permission',
                        },
                    },
                },
            },
            responses: {
                '201': {
                    description: 'Returns a message and the created permission',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example:
                                            'Permission successfully created',
                                    },
                                    permission: {
                                        $ref: '#/components/schemas/Permission',
                                    },
                                },
                            },
                        },
                    },
                },
                '400': {
                    description: 'Not all required fields are given',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example:
                                            'Not all required fields are given',
                                    },
                                },
                            },
                        },
                    },
                },
                '401': {
                    description: 'Permission not created',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example: 'Permission not created',
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        get: {
            summary: 'Get all permissions',
            tags: ['Permissions'],
            security: [
                {
                    cookieAuth: [],
                },
            ],
            responses: {
                '200': {
                    description: 'Successfully retrieved all permissions',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'array',
                                items: {
                                    $ref: '#/components/schemas/Permission',
                                },
                            },
                        },
                    },
                },
                '404': {
                    description: 'Permissions not found',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example: 'Permissions not found',
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    '/api/permissions/add_role': {
        post: {
            summary: 'Add a role to a permission',
            tags: ['Permissions'],
            security: [
                {
                    cookieAuth: [],
                },
            ],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                permissionId: {
                                    type: 'string',
                                    example: 'permission-id',
                                },
                                roleId: {
                                    type: 'string',
                                    example: 'role-id',
                                },
                            },
                            required: ['permissionId', 'roleId'],
                        },
                    },
                },
            },
            responses: {
                '200': {
                    description:
                        'Returns a message and the role added to the permission',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example:
                                            'Role successfully added to permission',
                                    },
                                    roleOnPermission: {
                                        type: 'object',
                                        additionalProperties: true,
                                    },
                                },
                            },
                        },
                    },
                },
                '404': {
                    description: 'Permission or Role not found',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example: 'Permission or Role not found',
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    '/api/permissions/{id}': {
        get: {
            summary: 'Get a permission by ID',
            tags: ['Permissions'],
            security: [
                {
                    cookieAuth: [],
                },
            ],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: {
                        type: 'string',
                    },
                    description: 'The ID of the permission to retrieve',
                },
            ],
            responses: {
                '200': {
                    description: 'Returns the permission with the specified ID',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Permission',
                            },
                        },
                    },
                },
                '404': {
                    description: 'Permissions not found',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example: 'No permissions found for this role!',
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        put: {
            summary: 'Update a permission',
            tags: ['Permissions'],
            security: [
                {
                    cookieAuth: [],
                },
            ],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: {
                        type: 'string',
                    },
                    description: 'The ID of the permission to update',
                },
            ],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/Permission',
                        },
                    },
                },
            },
            responses: {
                '200': {
                    description: 'Returns a message and the updated permission',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example:
                                            'Permission successfully updated',
                                    },
                                    permission: {
                                        $ref: '#/components/schemas/Permission',
                                    },
                                },
                            },
                        },
                    },
                },
                '404': {
                    description: 'Permission not found',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example: 'Permission not found',
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        delete: {
            summary: 'Delete a permission',
            tags: ['Permissions'],
            security: [
                {
                    cookieAuth: [],
                },
            ],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: {
                        type: 'string',
                    },
                    description: 'The ID of the permission to delete',
                },
            ],
            responses: {
                '200': {
                    description: 'Returns a message and the deleted permission',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example:
                                            'Permission successfully deleted',
                                    },
                                    permission: {
                                        $ref: '#/components/schemas/Permission',
                                    },
                                },
                            },
                        },
                    },
                },
                '404': {
                    description: 'Permission not found',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example: 'Permission not found',
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    '/api/permissions/role/{id}': {
        get: {
            summary: 'Get permissions by role ID',
            tags: ['Permissions'],
            security: [
                {
                    cookieAuth: [],
                },
            ],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: {
                        type: 'string',
                    },
                    description:
                        'The ID of the role to retrieve permissions for',
                },
            ],
            responses: {
                '200': {
                    description:
                        'Returns the permissions for the specified role ID',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'array',
                                $ref: '#/components/schemas/Permissions',
                            },
                        },
                    },
                },
                '404': {
                    description: 'Permissions not found',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example: 'Permissions not found',
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    '/api/permissions/params': {
        get: {
            summary: 'Get a permission by route pattern, method',
            tags: ['Permissions'],
            security: [
                {
                    cookieAuth: [],
                },
            ],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/Permission',
                        },
                    },
                },
            },
            responses: {
                '200': {
                    description:
                        'Returns the permission with the specified parameters',
                    content: {
                        'application/json': {
                            type: 'object',
                            schema: {
                                $ref: '#/components/schemas/Permission',
                            },
                        },
                    },
                },
                '404': {
                    description: 'Permission not found',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example: 'Permission not found',
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    '/api/permissions/remove_role': {
        post: {
            summary: 'Remove a role from a permission',
            tags: ['Permissions'],
            security: [
                {
                    cookieAuth: [],
                },
            ],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                permissionId: {
                                    type: 'string',
                                    example: 'permission-id',
                                },
                                roleId: {
                                    type: 'string',
                                    example: 'role-id',
                                },
                            },
                            required: ['permissionId', 'roleId'],
                        },
                    },
                },
            },
            responses: {
                '200': {
                    description:
                        'Returns a message and the role removed from the permission',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example:
                                            'Role successfully removed from permission',
                                    },
                                    roleOnPermission: {
                                        type: 'object',
                                        additionalProperties: true,
                                    },
                                },
                            },
                        },
                    },
                },
                '404': {
                    description: 'Permission or Role not found',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example: 'Permission or Role not found',
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
};

export default permissionPaths;
