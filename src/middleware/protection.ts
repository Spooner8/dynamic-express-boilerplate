/**
 * @fileoverview
 * This file contains middleware functions for role-based access control (RBAC) in the application.
 * 
 * Middleware:
 * - isAdmin: Checks if the user is an admin.
 * - checkPermissions: Checks if the user has the required permissions to access a specific route.
 * 
 */

import db from "../services/database";
import type { Request, Response, NextFunction } from 'express';
import { authService } from "../services/auth/auth";
import { match } from "path-to-regexp";
import { permissionService } from "../services/crud/permissions";
import { logger } from "../services/log/logger";
import { handleError } from "./errorhandler";

const RBAC = (process.env.RBAC  || 'false') === 'true';

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    if (!RBAC) {
        return next();
    }
    (async () => {
        try {
            const user = await authService.getCurrentUser(req);
            const role = user && await db.role.findUnique({
                where: { id: user.roleId },
            });
            
            if (!user || !role || !role.isAdmin) {
                return res.status(403).json({ message: 'Forbidden' });
            }
            
            next();
        } catch (error: unknown) {
            handleError(error, res);
        }
    })();
};

export const checkPermissions = (req: Request, res: Response, next: NextFunction): void => {
    if (!RBAC) {
        return next();
    }
    
    (async () => {
        try {
            const user = await authService.getCurrentUser(req);
            const method = req.method.toUpperCase();
            const url = req.originalUrl.split('?')[0];

            if (!user) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            const permissions = await permissionService.getPermissionByRoleId(user.roleId);

            const hasPermission = permissions.some(permission => {
                const matchPath = match(permission.routePattern, { decode: decodeURIComponent });
                return permission.method === method && matchPath(url);
            });

            if (!hasPermission) {
                logger.warn(`User ${user.id} tried to access ${url} without permission`);
                return res.status(403).json({ message: 'Forbidden' });
            }

            next();
        } catch (error: unknown) {
            handleError(error, res);
        }
    })();
};