import { PrismaClient } from "../../generated/prisma_client";
import { handleError } from "../middleware/errorhandler";
import { logger } from './log/logger';

const db = new PrismaClient();

async function verifyDatabaseConnection() {
    try {
        await db.$connect();
        logger.info("Database connection established successfully.");
    } catch (error: unknown) {
        handleError(error, null);
        process.exit(1);
    }
}

verifyDatabaseConnection();

export default db