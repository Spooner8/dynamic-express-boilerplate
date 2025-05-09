/**
 * @fileoverview
 * The main entry point of the application.
 * The SERVER_ROLE environment variable determines which services to start.
 */

import express from 'express';
import { initializeAPI } from './services/api';
import { initializeDefautData } from './services/init-database';

const SERVER_ROLE = process.env.SERVER_ROLE || 'all';
const allowedRoles = ['all', 'api', 'worker'];

if (!allowedRoles.includes(SERVER_ROLE)) {
    console.error(`Invalid SERVER_ROLE: ${SERVER_ROLE}`);
    process.exit(1);
}

if (SERVER_ROLE === 'worker') {
    // Start the worker
    // This is where the worker would be initialized
}

if (SERVER_ROLE === 'all' || SERVER_ROLE === 'api') {
    const app = express();
    initializeAPI(app);
    initializeDefautData();
}