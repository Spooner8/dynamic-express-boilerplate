import type { Request } from 'express'
import pinoHttp from 'pino-http'
import pino from 'pino'
import { authService } from '../auth/auth.ts';

const LOG_LEVEL = process.env.LOG_LEVEL || 'info'

/**
 * @description
 * Logger instance for logging messages
 */
const logger = pino({
  level: LOG_LEVEL,
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
})

/**
 * @description
 * Logger instance for logging http requests
 */
const httpLogger = pinoHttp({
  logger: logger,
  customProps: async (req: Request) => {
    try {
      const user = await authService.getCurrentUser(req);
      if (!user) {
        return { userId: null, username: null };
      }
      return {
        userId: user?.id,
        username: user?.email,
      };
    } catch (error) {
      logger.error(error);
      return { userId: null, username: null };
    }
  },
});

export { logger, httpLogger }