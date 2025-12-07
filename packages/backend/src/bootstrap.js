/**
 * Application Bootstrap
 * Initializes and wires all application components
 * Uses dependency injection for loose coupling
 */

import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';
import winston from 'winston';
import { Container, getContainer } from './core/container/index.js';
import { createRepositories } from './repositories/index.js';
import config from './core/config/index.js';
import {
    createErrorHandler,
    notFoundHandler,
    setupUnhandledRejectionHandler,
    setupUncaughtExceptionHandler
} from './core/errors/index.js';

/**
 * Create application logger
 * 
 * @param {Object} options - Logger options
 * @returns {Object} Winston logger instance
 */
export function createLogger(options = {}) {
    const logConfig = config.logging;
    
    const transports = [];

    // Console transport
    if (logConfig.includeConsole) {
        transports.push(new winston.transports.Console({
            level: logConfig.level,
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.timestamp(),
                winston.format.printf(({ timestamp, level, message, ...meta }) => {
                    const metaStr = Object.keys(meta).length ? JSON.stringify(meta, null, 2) : '';
                    return `${timestamp} [${level}]: ${message} ${metaStr}`;
                })
            )
        }));
    }

    // File transport
    if (logConfig.file) {
        const logDir = path.dirname(logConfig.file);
        fs.mkdirSync(logDir, { recursive: true });

        transports.push(new winston.transports.File({
            filename: logConfig.file,
            level: logConfig.level,
            maxsize: logConfig.maxSize,
            maxFiles: logConfig.maxFiles,
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.errors({ stack: true }),
                winston.format.json()
            )
        }));

        // Error file transport
        transports.push(new winston.transports.File({
            filename: logConfig.file.replace('.log', '.error.log'),
            level: 'error',
            maxsize: logConfig.maxSize,
            maxFiles: logConfig.maxFiles,
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.errors({ stack: true }),
                winston.format.json()
            )
        }));
    }

    return winston.createLogger({
        level: logConfig.level,
        transports,
        exitOnError: false
    });
}

/**
 * Bootstrap the application
 * Sets up all services and dependencies
 * 
 * @returns {Promise<Container>}
 */
export async function bootstrap() {
    const container = getContainer();

    // Create logger first
    const logger = createLogger();
    container.registerInstance('logger', logger);

    // Setup global error handlers
    setupUnhandledRejectionHandler(logger);
    setupUncaughtExceptionHandler(logger);

    // Create Prisma client
    const prisma = new PrismaClient({
        log: config.database.logQueries 
            ? ['query', 'info', 'warn', 'error']
            : ['error']
    });
    container.registerInstance('prisma', prisma);

    // Create repositories
    const repositories = createRepositories(prisma, logger);
    container.registerInstance('repositories', repositories);
    
    // Register individual repositories
    container.registerInstance('cardAssignmentRepository', repositories.cardAssignment);
    container.registerInstance('deviceEnrollmentRepository', repositories.deviceEnrollment);
    container.registerInstance('deviceRepository', repositories.device);
    container.registerInstance('eventRepository', repositories.event);

    // Register configuration
    container.registerInstance('config', config);

    logger.info('Application bootstrap complete', {
        environment: config.app.env,
        version: config.app.version
    });

    return container;
}

/**
 * Create Express middleware stack
 * 
 * @param {Container} container - DI container
 * @returns {Object} Middleware functions
 */
export function createMiddleware(container) {
    const logger = container.resolve('logger');

    return {
        errorHandler: createErrorHandler({ logger }),
        notFoundHandler
    };
}

/**
 * Graceful shutdown handler
 * 
 * @param {Container} container - DI container
 * @returns {Function}
 */
export function createShutdownHandler(container) {
    const logger = container.resolve('logger');
    const prisma = container.resolve('prisma');

    return async (signal) => {
        logger.info(`Received ${signal}, starting graceful shutdown...`);

        try {
            // Disconnect Prisma
            await prisma.$disconnect();
            logger.info('Database connection closed');

            // Dispose container
            await container.dispose();
            logger.info('Container disposed');

            logger.info('Graceful shutdown complete');
            process.exit(0);
        } catch (error) {
            logger.error('Error during shutdown:', error);
            process.exit(1);
        }
    };
}

export default {
    bootstrap,
    createLogger,
    createMiddleware,
    createShutdownHandler
};
