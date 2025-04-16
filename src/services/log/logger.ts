import 'dotenv/config';
import axios from 'axios';

const LOGGER_URL = process.env.LOGGER_URL || 'http://localhost:3001/api/log';

const logService = axios.create({
  baseURL: LOGGER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const logToService = async (level: string, message: string, meta?: object) => {
  try {
    await logService.post('/', {
      level,
      message,
      meta,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('An unknown error occurred while logging to service');
    }
  }
}

const logger = {
  info: (message: string, meta?: Record<string, unknown>) => logToService('info', message, meta),
  error: (message: string, meta?: Record<string, unknown>) => logToService('error', message, meta),
  warn: (message: string, meta?: Record<string, unknown>) => logToService('warn', message, meta),
};

export { logger };