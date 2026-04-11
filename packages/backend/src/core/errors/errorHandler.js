/**
 * Error Handler Middleware
 * Centralized error handling for Express
 */

import {
    AppError,
    HTTP_STATUS,
    ERROR_CODES,
    isOperationalError,
    wrapError
} from './AppErrors.js';

/**
 * Create error handler middleware
 * 
 * @param {Object} options - Handler options
 * @param {Object} options.logger - Logger instance
 * @param {boolean} [options.includeStack=false] - Include stack trace in response
 * @param {Function} [options.onError] - Custom error callback
 * @returns {Function} Express error middleware
 */
export function createErrorHandler(options = {}) {
    const {
        logger,
        includeStack = process.env.NODE_ENV !== 'production',
        onError
    } = options;

    return (err, req, res, next) => {
        // Wrap non-operational errors
        const error = wrapError(err);
        
        // Log error
        const logData = {
            message: error.message,
            code: error.code,
            statusCode: error.statusCode,
            url: req.originalUrl,
            method: req.method,
            ip: req.ip,
            userId: req.user?.id,
            requestId: req.headers['x-request-id'],
            stack: error.stack
        };

        if (isOperationalError(err)) {
            logger?.warn('Operational error:', logData);
        } else {
            logger?.error('Unexpected error:', logData);
        }

        // Call custom error handler if provided
        if (onError) {
            try {
                onError(error, req);
            } catch (e) {
                logger?.error('Error in custom error handler:', e);
            }
        }

        // Build response
        const response = {
            success: false,
            error: error.name,
            code: error.code,
            message: error.message,
            timestamp: error.timestamp || new Date().toISOString(),
            requestId: req.headers['x-request-id']
        };

        // Add details for specific error types
        if (error.details && Object.keys(error.details).length > 0) {
            response.details = error.details;
        }

        if (error.fields && error.fields.length > 0) {
            response.fields = error.fields;
        }

        // Include stack in development
        if (includeStack && error.stack) {
            response.stack = error.stack.split('\n');
        }

        // Send response
        res.status(error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR).json(response);
    };
}

/**
 * Not found handler for undefined routes
 * 
 * @param {Object} req - Express request
 * @param {Object} res - Express response
 * @param {Function} next - Next function
 */
export function notFoundHandler(req, res, next) {
    res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        error: 'Not Found',
        code: ERROR_CODES.NOT_FOUND,
        message: `Route ${req.method} ${req.originalUrl} not found`,
        requestId: req.headers['x-request-id'],
        timestamp: new Date().toISOString()
    });
}

/**
 * Async handler wrapper for route handlers
 * Catches async errors and passes to error middleware
 * 
 * @param {Function} fn - Async route handler
 * @returns {Function} Wrapped handler
 */
export function asyncHandler(fn) {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}

/**
 * Validate request body against schema
 * 
 * @param {Object} schema - Validation schema
 * @param {Function} [validator] - Custom validator function
 * @returns {Function} Express middleware
 */
export function validateRequest(schema, validator = null) {
    return (req, res, next) => {
        const { validate } = require('../utils/validationUtils.js');
        const result = validator ? validator(req.body) : validate(req.body, schema);
        
        if (!result.valid) {
            const error = new AppError(
                result.errors.join(', '),
                ERROR_CODES.VALIDATION_ERROR,
                HTTP_STATUS.BAD_REQUEST,
                { errors: result.errors }
            );
            return next(error);
        }
        
        next();
    };
}

/**
 * Global unhandled rejection handler
 * 
 * @param {Object} logger - Logger instance
 */
export function setupUnhandledRejectionHandler(logger) {
    process.on('unhandledRejection', (reason, promise) => {
        logger?.error('Unhandled Rejection:', {
            reason: reason?.message || reason,
            stack: reason?.stack
        });
    });
}

/**
 * Global uncaught exception handler
 * 
 * @param {Object} logger - Logger instance
 */
export function setupUncaughtExceptionHandler(logger) {
    process.on('uncaughtException', (error) => {
        logger?.error('Uncaught Exception:', {
            message: error.message,
            stack: error.stack
        });
        
        // Give time to log, then exit
        setTimeout(() => {
            process.exit(1);
        }, 1000);
    });
}

export default {
    createErrorHandler,
    notFoundHandler,
    asyncHandler,
    validateRequest,
    setupUnhandledRejectionHandler,
    setupUncaughtExceptionHandler
};
