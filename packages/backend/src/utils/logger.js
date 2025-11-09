/**
 * Logging Utilities
 * Enhanced logging helpers and formatters
 */

import winston from 'winston';
import path from 'path';

/**
 * Create application logger with custom configuration
 */
function createLogger(options = {}) {
    const {
        level = process.env.LOG_LEVEL || 'info',
        filename = process.env.LOG_FILE || './logs/application.log',
        maxSize = '10m',
        maxFiles = 5,
        includeConsole = true
    } = options;

    // Ensure logs directory exists
    const logDir = path.dirname(filename);
    require('fs').mkdirSync(logDir, { recursive: true });

    const transports = [];

    // Console transport
    if (includeConsole) {
        transports.push(new winston.transports.Console({
            level: level,
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
    transports.push(new winston.transports.File({
        filename: filename,
        level: level,
        maxsize: maxSize,
        maxFiles: maxFiles,
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.errors({ stack: true }),
            winston.format.json()
        )
    }));

    // Error file transport
    transports.push(new winston.transports.File({
        filename: filename.replace('.log', '.error.log'),
        level: 'error',
        maxsize: maxSize,
        maxFiles: maxFiles,
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.errors({ stack: true }),
            winston.format.json()
        )
    }));

    return winston.createLogger({
        level: level,
        transports: transports,
        exitOnError: false
    });
}

/**
 * Device operation logger
 */
function createDeviceLogger(deviceId, logger) {
    return {
        info: (message, meta = {}) => {
            logger.info(message, { ...meta, deviceId, component: 'device' });
        },
        warn: (message, meta = {}) => {
            logger.warn(message, { ...meta, deviceId, component: 'device' });
        },
        error: (message, meta = {}) => {
            logger.error(message, { ...meta, deviceId, component: 'device' });
        },
        debug: (message, meta = {}) => {
            logger.debug(message, { ...meta, deviceId, component: 'device' });
        }
    };
}

/**
 * Service operation logger
 */
function createServiceLogger(serviceName, logger) {
    return {
        info: (message, meta = {}) => {
            logger.info(message, { ...meta, service: serviceName });
        },
        warn: (message, meta = {}) => {
            logger.warn(message, { ...meta, service: serviceName });
        },
        error: (message, meta = {}) => {
            logger.error(message, { ...meta, service: serviceName });
        },
        debug: (message, meta = {}) => {
            logger.debug(message, { ...meta, service: serviceName });
        }
    };
}

/**
 * API request logger middleware
 */
function createRequestLogger(logger) {
    return (req, res, next) => {
        const startTime = Date.now();
        const requestId = req.headers['x-request-id'] || generateRequestId();
        
        req.requestId = requestId;
        req.startTime = startTime;

        // Log request
        logger.info('API Request', {
            requestId: requestId,
            method: req.method,
            url: req.url,
            ip: req.ip,
            userAgent: req.get('User-Agent'),
            contentType: req.get('Content-Type'),
            contentLength: req.get('Content-Length')
        });

        // Override res.end to log response
        const originalEnd = res.end;
        res.end = function(chunk, encoding) {
            const duration = Date.now() - startTime;
            
            logger.info('API Response', {
                requestId: requestId,
                method: req.method,
                url: req.url,
                statusCode: res.statusCode,
                duration: `${duration}ms`,
                contentLength: res.get('Content-Length')
            });

            originalEnd.call(res, chunk, encoding);
        };

        next();
    };
}

/**
 * Event logging formatter
 */
function formatEventLog(event, deviceId) {
    return {
        timestamp: new Date().toISOString(),
        deviceId: deviceId,
        eventId: event.id,
        eventCode: event.code,
        eventName: event.name,
        userId: event.userId,
        doorId: event.doorId,
        eventTime: event.datetime,
        component: 'event'
    };
}

/**
 * Biometric operation logger
 */
function formatBiometricLog(operation, biometricType, deviceId, result) {
    return {
        timestamp: new Date().toISOString(),
        deviceId: deviceId,
        operation: operation,
        biometricType: biometricType,
        success: result.success,
        duration: result.duration,
        quality: result.quality,
        component: 'biometric'
    };
}

/**
 * Performance logger
 */
function createPerformanceLogger(logger) {
    const timers = new Map();

    return {
        start: (operation, context = {}) => {
            const timerId = `${operation}_${Date.now()}_${Math.random()}`;
            timers.set(timerId, {
                operation,
                startTime: Date.now(),
                context
            });
            return timerId;
        },

        end: (timerId, additionalContext = {}) => {
            const timer = timers.get(timerId);
            if (!timer) return;

            const duration = Date.now() - timer.startTime;
            timers.delete(timerId);

            logger.info('Performance Metric', {
                operation: timer.operation,
                duration: `${duration}ms`,
                ...timer.context,
                ...additionalContext,
                component: 'performance'
            });

            return duration;
        }
    };
}

/**
 * Security logger
 */
function createSecurityLogger(logger) {
    return {
        logAuthentication: (userId, success, ip, reason = null) => {
            logger.info('Authentication Attempt', {
                userId: userId,
                success: success,
                ip: ip,
                reason: reason,
                component: 'security'
            });
        },

        logAuthorization: (userId, resource, action, success, reason = null) => {
            logger.info('Authorization Check', {
                userId: userId,
                resource: resource,
                action: action,
                success: success,
                reason: reason,
                component: 'security'
            });
        },

        logSuspiciousActivity: (description, context = {}) => {
            logger.warn('Suspicious Activity', {
                description: description,
                ...context,
                component: 'security'
            });
        }
    };
}

/**
 * Generate unique request ID
 */
function generateRequestId() {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Log rotation helper
 */
function setupLogRotation(logger, options = {}) {
    const {
        rotateInterval = '24h',
        maxLogFiles = 7,
        compressOldLogs = true
    } = options;

    // This would typically use a library like 'winston-daily-rotate-file'
    // For now, we'll provide the configuration structure
    return {
        rotateInterval,
        maxLogFiles,
        compressOldLogs,
        // Implementation would depend on chosen rotation library
    };
}

module.exports = {
    createLogger,
    createDeviceLogger,
    createServiceLogger,
    createRequestLogger,
    createPerformanceLogger,
    createSecurityLogger,
    formatEventLog,
    formatBiometricLog,
    generateRequestId,
    setupLogRotation
};