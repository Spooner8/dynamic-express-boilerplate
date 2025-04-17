/**
 * @fileoverview
 * This file contains the way which the logger is configured in the application.
 * It uses the pino logger for local logging and a custom logger for remote logging.
 */

import 'dotenv/config';
import axios from 'axios';
import pino from 'pino';

const LOGGER_URL = process.env.LOGGER_URL || 'http://localhost:3001/api/log';
const LAAS = (process.env.LAAS || 'false') === 'true';
const LOG_LEVEL = process.env.LOG_LEVEL || 'info'

interface LAASLogger {
  info: (message: string, meta?: Record<string, unknown>) => void;
  error: (message: string, meta?: Record<string, unknown>) => void;
  warn: (message: string, meta?: Record<string, unknown>) => void;
}

const logService = axios.create({
  baseURL: LOGGER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * @description
 * Logs a message to the remote logging service.
 * 
 * @param {string} level The log level (info, error, warn)
 * @param {string} message The log message
 * @param {object} meta The log metadata (optional)
 */
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

let logger: typeof LAAS extends true ? pino.Logger : LAASLogger;
if (LAAS) {
  logger = {
    info: (message: string, meta?: Record<string, unknown>) => logToService('info', message, meta),
    error: (message: string, meta?: Record<string, unknown>) => logToService('error', message, meta),
    warn: (message: string, meta?: Record<string, unknown>) => logToService('warn', message, meta),
  };
} else {
  logger = pino({
    level: LOG_LEVEL,
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
      },
    },
  })
}

export { logger };