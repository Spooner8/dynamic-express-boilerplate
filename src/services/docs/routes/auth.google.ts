const authGooglePaths = {
    '/api/auth/google/login': {
        get: {
            summary: 'Login a user with Google',
            tags: ['Auth'],
            responses: {
                '200': {
                    description: 'Returns a message',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example: 'User logged in',
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
                                        example: 'Some error occurred',
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    '/api/auth/google/callback': {
        get: {
            summary: 'Login a user with Google callback',
            tags: ['Auth'],
            responses: {
                '200': {
                    description: 'Returns a message',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example: 'User logged in',
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
                                        example: 'User not found',
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

export default authGooglePaths;
