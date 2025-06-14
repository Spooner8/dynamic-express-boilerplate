import { type Express } from 'express';
import bodyParser from 'body-parser';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { limiter } from '../middleware/rate-limiter';
import { logger } from './log/logger';
import { prometheus } from '../middleware/prometheus';
import passport from './passport';
import swaggerSpec from './docs/swagger';
import swaggerUi from 'swagger-ui-express';

// Routers
import rolesRouter from '../router/roles';
import permissionsRouter from '../router/permissions';
import authRouter from '../router/auth';
import authGoogleRouter from '../router/auth.google';
import userRouter from '../router/user';

const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.API_PORT || 3000;
const LIMITER = (process.env.RATE_LIMITER || 'true') === 'true';
const COLLECT_METRICS = (process.env.COLLECT_METRICS || 'false') === 'true';
const RBAC = (process.env.RBAC || 'false') === 'true';
const USE_GOOGLE_AUTH = (process.env.USE_GOOGLE_AUTH || 'false') === 'true';
const allowedOrigins =
    process.env.ALLOWED_ORIGINS?.split(',').map((origin) => origin.trim()) ||
    [];

/**
 * @description
 * Initialize the API server
 *
 * @param {Express} app - Express app
 */
export const initializeAPI = (app: Express) => {
    console.log('Allowed Origins :', allowedOrigins);

    const corsOptions = {
        origin: allowedOrigins,
        credentials: true,
    };

    app.set('trust proxy', 1);

    if (COLLECT_METRICS) {
        app.use(prometheus);
    }
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(cors(corsOptions));
    app.use(passport.initialize());

    if (LIMITER) {
        app.use(limiter);
    }

    // Routers
    app.use('/api/auth', authRouter);
    app.use('/api/user', userRouter);

    if (RBAC) {
        app.use('/api/roles', rolesRouter);
        app.use('/api/permissions', permissionsRouter);
    }

    if (USE_GOOGLE_AUTH) {
        app.use('/api/auth/google', authGoogleRouter);
    }

    if (NODE_ENV === 'development') {
        app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    }

    app.listen(PORT, () => {
        logger.info(`API-Server is running on port ${PORT}`);
    });
};
