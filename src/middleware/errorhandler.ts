import { logger } from '../services/log/logger';
import type { Response } from 'express';

/**
 * @description
 * Handles errors by logging them and sending a response to the client.  
 * This function checks if the error is an instance of Error. If it is, it logs the error message and sends a 400 response with the error message. 
 * 
 * @param {unknown} error The error object to handle
 * @param {Response} res The response object to send the error message to the client
 * @returns The response object with the error message
 */
export const handleError = (error: unknown, res: Response | null) => {
    if (error instanceof Error) {
        logger.error(error.message);
        if (res) {
            return res.status(400).json({ message: error.message });
        }
    } else {
        if (res) {
            return res.status(400).json({ message: 'An unknown error occurred' });
        }
    }
};