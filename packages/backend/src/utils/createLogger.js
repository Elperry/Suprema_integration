/**
 * Logger Factory
 * Centralized logger creation for consistent logging across all services.
 * Eliminates duplicate Winston configurations.
 */

import winston from 'winston';
import path from 'path';
import fs from 'fs';

/**
 * Create the application-level logger
 * Used as the single root logger registered in the DI container.
 * 
 * @param {Object} [options]
 * @param {string} [options.logDir] - Log directory
 * @param {string} [options.level] - Log level
 * @returns {winston.Logger}
 */
export function createAppLogger(options = {}) {
    const logDir = options.logDir || process.env.LOG_DIR || './logs';
    const level = options.level || process.env.LOG_LEVEL || 'info';

    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
    }

    return winston.createLogger({
        level,
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.errors({ stack: true }),
            winston.format.json()
        ),
        transports: [
            new winston.transports.Console({
                format: winston.format.combine(
                    winston.format.colorize(),
                    winston.format.timestamp(),
                    winston.format.printf(({ timestamp, level, message, ...meta }) => {
                        const metaStr = Object.keys(meta).length ? JSON.stringify(meta, null, 2) : '';
                        return `${timestamp} [${level}]: ${message} ${metaStr}`;
                    })
                )
            }),
            new winston.transports.File({
                filename: path.join(logDir, 'application.log'),
                maxsize: 10 * 1024 * 1024,
                maxFiles: 5
            }),
            new winston.transports.File({
                filename: path.join(logDir, 'application.error.log'),
                level: 'error',
                maxsize: 10 * 1024 * 1024,
                maxFiles: 5
            })
        ],
        exitOnError: false
    });
}

/**
 * Create a child logger for a specific service.
 * Falls back to creating a standalone logger if no parent is provided.
 * 
 * @param {string} serviceName - Service identifier
 * @param {Object} [options]
 * @param {winston.Logger} [options.parent] - Parent logger to create a child from
 * @param {string} [options.logDir] - Log directory (used for standalone)
 * @param {string} [options.level] - Log level override
 * @returns {winston.Logger}
 */
export function createServiceLogger(serviceName, options = {}) {
    if (options.parent) {
        return options.parent.child({ service: serviceName });
    }

    const logDir = options.logDir || process.env.LOG_DIR || './logs';
    const level = options.level || process.env.LOG_LEVEL || 'info';

    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
    }

    return winston.createLogger({
        level,
        defaultMeta: { service: serviceName },
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json()
        ),
        transports: [
            new winston.transports.Console({
                format: winston.format.combine(
                    winston.format.colorize(),
                    winston.format.simple()
                )
            }),
            new winston.transports.File({
                filename: path.join(logDir, `${serviceName}.log`)
            })
        ]
    });
}

export default { createAppLogger, createServiceLogger };
