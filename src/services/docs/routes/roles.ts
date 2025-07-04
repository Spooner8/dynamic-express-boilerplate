const rolePaths = {
    '/api/roles/': {
        post: {
            summary: 'Creates a new role',
            tags: ['Roles'],
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
                            $ref: '#/components/schemas/Role',
                        },
                    },
                },
            },
            responses: {
                '201': {
                    description: 'Returns a message and the created role',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example: 'Role successfully created',
                                    },
                                    role: {
                                        type: 'object',
                                        $ref: '#/components/schemas/Role',
                                    },
                                },
                            },
                        },
                    },
                },
                '400': {
                    description: 'Returns a message',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example: 'Rolename is required',
                                    },
                                },
                            },
                        },
                    },
                },
                '401': {
                    description: 'Returns a message',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example: 'Role not created',
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        get: {
            summary: 'Get all roles',
            tags: ['Roles'],
            security: [
                {
                    cookieAuth: [],
                },
            ],
            responses: {
                '200': {
                    description:
                        'Returns all roles as an array of Role objects',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'array',
                                items: {
                                    $ref: '#/components/schemas/Role',
                                },
                            },
                        },
                    },
                },
                '404': {
                    description: 'Returns a message',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example: 'Roles not found',
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    '/api/roles/{id}': {
        get: {
            summary: 'Get a role by ID',
            tags: ['Roles'],
            security: [
                {
                    cookieAuth: [],
                },
            ],
            parameters: [
                {
                    name: 'id',
                    description: 'The id of the role to retrieve',
                    in: 'path',
                    required: true,
                    schema: {
                        type: 'string',
                        format: 'string',
                    },
                },
            ],
            responses: {
                '200': {
                    description: 'Returns the role with the specified ID',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    role: {
                                        type: 'object',
                                        $ref: '#/components/schemas/Role',
                                    },
                                },
                            },
                        },
                    },
                },
                '404': {
                    description: 'Returns a message',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example: 'Role not found',
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        put: {
            summary: 'Update a role',
            tags: ['Roles'],
            security: [
                {
                    cookieAuth: [],
                },
            ],
            parameters: [
                {
                    name: 'id',
                    description: 'The id of the role to update',
                    in: 'path',
                    required: true,
                    schema: {
                        type: 'string',
                        format: 'string',
                    },
                },
            ],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/Role',
                        },
                    },
                },
            },
            responses: {
                '200': {
                    description: 'Returns a message and the updated role',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example: 'Role successfully updated',
                                    },
                                    role: {
                                        type: 'object',
                                        $ref: '#/components/schemas/Role',
                                    },
                                },
                            },
                        },
                    },
                },
                '400': {
                    description: 'Returns a message',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example: 'Rolename is required',
                                    },
                                },
                            },
                        },
                    },
                },
                '404': {
                    description: 'Returns a message',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example: 'Role not found',
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        delete: {
            summary: 'Delete a role (soft delete)',
            tags: ['Roles'],
            security: [
                {
                    cookieAuth: [],
                },
            ],
            parameters: [
                {
                    name: 'id',
                    description: 'The id of the role to delete/deactivate',
                    in: 'path',
                    required: true,
                    schema: {
                        type: 'string',
                        format: 'string',
                    },
                },
            ],
            responses: {
                '200': {
                    description: 'Returns a message and the deactivated role',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example:
                                            'Role successfully deactivated',
                                    },
                                    role: {
                                        type: 'object',
                                        $ref: '#/components/schemas/Role',
                                    },
                                },
                            },
                        },
                    },
                },
                '404': {
                    description: 'Returns a message',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example: 'Role not found',
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    '/api/roles/{name}': {
        get: {
            summary: 'Get a role by name',
            tags: ['Roles'],
            security: [
                {
                    cookieAuth: [],
                },
            ],
            parameters: [
                {
                    name: 'name',
                    description: 'The name of the role to retrieve',
                    in: 'path',
                    required: true,
                    schema: {
                        type: 'string',
                        format: 'string',
                    },
                },
            ],
            responses: {
                '200': {
                    description: 'Returns the role with the specified name',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                $ref: '#/components/schemas/Role',
                            },
                        },
                    },
                },
                '404': {
                    description: 'Returns a message',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example: 'Role not found',
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    '/api/roles/id/{name}': {
        get: {
            summary: 'Get a role ID by name',
            tags: ['Roles'],
            security: [
                {
                    cookieAuth: [],
                },
            ],
            parameters: [
                {
                    name: 'name',
                    description: 'The name of the role to retrieve the ID for',
                    in: 'path',
                    required: true,
                    schema: {
                        type: 'string',
                        format: 'string',
                    },
                },
            ],
            responses: {
                '200': {
                    description:
                        'Returns the ID of the role with the specified name',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/RoleId',
                            },
                        },
                    },
                },
                '404': {
                    description: 'Returns a message',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example: 'Role not found',
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    '/api/roles/permission/{id}': {
        get: {
            summary: 'Get all roles for a permission',
            tags: ['Roles'],
            security: [
                {
                    cookieAuth: [],
                },
            ],
            parameters: [
                {
                    name: 'id',
                    description:
                        'The ID of the permission to retrieve roles for',
                    in: 'path',
                    required: true,
                    schema: {
                        type: 'string',
                        format: 'string',
                    },
                },
            ],
            responses: {
                '200': {
                    description:
                        'Returns an array of roles associated with the specified permission',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'array',
                                $ref: '#/components/schemas/Role',
                            },
                        },
                    },
                },
                '404': {
                    description:
                        'Returns a message if no roles are found for the permission',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example:
                                            'Permission has no roles assigned!',
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

export default rolePaths;
