import swaggerJSDoc from 'swagger-jsdoc';
import components from './components';
import tags from './tags';
import rolePaths from './routes/roles';
import authPaths from './routes/auth';
import userPaths from './routes/user';
import permissionPaths from './routes/permissions';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Dynamic Express Boilerplate API',
            version: '1.0.0',
            description: 'API documentation for my application',
        },
        servers: [
            {
                url: 'http://localhost:3000/',
                description: 'Development server',
            },
            {
                url: 'http://localhost/',
                description: 'Production server',
            },
        ],

        paths: {
            ...rolePaths,
            ...authPaths,
            ...userPaths,
            ...permissionPaths,
        },
        components: {
            ...components,
            securitySchemes: {
                cookieAuth: {
                    type: 'apiKey',
                    in: 'cookie',
                    name: 'jwt',
                    description: 'JWT token for authentication',
                },
            },
        },
        tags: [
            ...tags,
        ],
    },
    apis: [
        './src/services/docs/*.ts',
    ],
}

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;