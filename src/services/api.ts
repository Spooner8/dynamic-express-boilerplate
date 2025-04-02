import { type Express } from 'express';
import bodyParser from 'body-parser';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { limiter } from '../middleware/rate-limiter.ts';
import { httpLogger, logger } from './log/logger.ts';
import { prometheus } from '../middleware/prometheus.ts';
import passport from './passport.ts';

// Routers
import authRouter from '../router/auth.ts';
import userRouter from '../router/user.ts';;

const PORT = process.env.API_PORT || 3000;
const LIMITER = (process.env.RATE_LIMITER || 'true') === 'true';

/**
 * @description
 * Initialize the API server
 * 
 * @param {Express} app - Express app
 */
export const initializeAPI = (app: Express) => {
    const allowedOrigins = ['http://localhost:80'];

    const corsOptions = {
        origin: allowedOrigins,
        credentials: true,
    };

    app.use(prometheus);
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(cors(corsOptions));

    if (LIMITER) {
        app.use(limiter);
    }
    app.use(httpLogger);
    app.use(passport.initialize());

    // Router
    app.use('/api/auth', authRouter);
    app.use('/api/user', userRouter);

    app.listen(PORT, () => {
        logger.info(`Server is running on port ${PORT}`);
    });
};