/**
 * Error Handling Utilities
 * Custom error classes and error handling middleware
 */

/**
 * Custom error classes
 */
class SupremaError extends Error {
    constructor(message, code = 'SUPREMA_ERROR', statusCode = 500) {
        super(message);
        this.name = 'SupremaError';
        this.code = code;
        this.statusCode = statusCode;
        this.timestamp = new Date().toISOString();
        Error.captureStackTrace(this, this.constructor);
    }
}

class ConnectionError extends SupremaError {
    constructor(message, deviceId = null) {
        super(message, 'CONNECTION_ERROR', 503);
        this.name = 'ConnectionError';
        this.deviceId = deviceId;
    }
}

class AuthenticationError extends SupremaError {
    constructor(message) {
        super(message, 'AUTHENTICATION_ERROR', 401);
        this.name = 'AuthenticationError';
    }
}

class ValidationError extends SupremaError {
    constructor(message, field = null) {
        super(message, 'VALIDATION_ERROR', 400);
        this.name = 'ValidationError';
        this.field = field;
    }
}

class DeviceError extends SupremaError {
    constructor(message, deviceId = null, deviceStatus = null) {
        super(message, 'DEVICE_ERROR', 502);
        this.name = 'DeviceError';
        this.deviceId = deviceId;
        this.deviceStatus = deviceStatus;
    }
}

class BiometricError extends SupremaError {
    constructor(message, biometricType = null) {
        super(message, 'BIOMETRIC_ERROR', 422);
        this.name = 'BiometricError';
        this.biometricType = biometricType;
    }
}

/**
 * Error handling middleware
 */
function errorHandler(logger) {
    return (err, req, res, next) => {
        // Log the error
        logger.error('API Error:', {
            message: err.message,
            code: err.code || 'UNKNOWN_ERROR',
            statusCode: err.statusCode || 500,
            stack: err.stack,
            url: req.url,
            method: req.method,
            ip: req.ip,
            userAgent: req.get('User-Agent'),
            requestId: req.headers['x-request-id']
        });

        // Determine response based on error type
        let response = {
            success: false,
            error: err.name || 'Error',
            message: err.message,
            code: err.code || 'UNKNOWN_ERROR',
            timestamp: err.timestamp || new Date().toISOString()
        };

        // Add additional context for specific error types
        if (err instanceof ConnectionError && err.deviceId) {
            response.deviceId = err.deviceId;
        }

        if (err instanceof ValidationError && err.field) {
            response.field = err.field;
        }

        if (err instanceof DeviceError) {
            if (err.deviceId) response.deviceId = err.deviceId;
            if (err.deviceStatus) response.deviceStatus = err.deviceStatus;
        }

        if (err instanceof BiometricError && err.biometricType) {
            response.biometricType = err.biometricType;
        }

        // Don't expose stack traces in production
        if (process.env.NODE_ENV !== 'production') {
            response.stack = err.stack;
        }

        // Send error response
        res.status(err.statusCode || 500).json(response);
    };
}

/**
 * Async error wrapper
 */
function asyncHandler(fn) {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}

/**
 * Not found middleware
 */
function notFoundHandler() {
    return (req, res, next) => {
        const error = new SupremaError(
            `Route not found: ${req.method} ${req.url}`,
            'NOT_FOUND',
            404
        );
        next(error);
    };
}

/**
 * Rate limiting error handler
 */
function rateLimitHandler() {
    return (req, res, next) => {
        const error = new SupremaError(
            'Too many requests. Please try again later.',
            'RATE_LIMIT_EXCEEDED',
            429
        );
        next(error);
    };
}

/**
 * Validation error formatter
 */
function formatValidationError(validationResult) {
    if (validationResult.errors && Array.isArray(validationResult.errors)) {
        const messages = validationResult.errors.map(err => err.message).join(', ');
        return new ValidationError(`Validation failed: ${messages}`);
    }
    return new ValidationError('Validation failed');
}

/**
 * Device error handler
 */
function handleDeviceError(error, deviceId = null) {
    if (error.message.includes('connection')) {
        return new ConnectionError(error.message, deviceId);
    }
    
    if (error.message.includes('authentication') || error.message.includes('unauthorized')) {
        return new AuthenticationError(error.message);
    }
    
    if (error.message.includes('timeout')) {
        return new DeviceError(`Device operation timed out: ${error.message}`, deviceId, 'TIMEOUT');
    }
    
    return new DeviceError(error.message, deviceId);
}

/**
 * Biometric error handler
 */
function handleBiometricError(error, biometricType = null) {
    if (error.message.includes('template')) {
        return new BiometricError(`Template error: ${error.message}`, biometricType);
    }
    
    if (error.message.includes('scan') || error.message.includes('capture')) {
        return new BiometricError(`Scan error: ${error.message}`, biometricType);
    }
    
    return new BiometricError(error.message, biometricType);
}

/**
 * Process gRPC errors
 */
function processGrpcError(grpcError, context = {}) {
    const { deviceId, operation } = context;
    
    switch (grpcError.code) {
        case 1: // CANCELLED
            return new DeviceError('Operation was cancelled', deviceId, 'CANCELLED');
        case 2: // UNKNOWN
            return new DeviceError('Unknown error occurred', deviceId, 'UNKNOWN');
        case 3: // INVALID_ARGUMENT
            return new ValidationError(`Invalid argument: ${grpcError.message}`);
        case 4: // DEADLINE_EXCEEDED
            return new DeviceError('Operation timeout', deviceId, 'TIMEOUT');
        case 5: // NOT_FOUND
            return new DeviceError('Device or resource not found', deviceId, 'NOT_FOUND');
        case 6: // ALREADY_EXISTS
            return new ValidationError('Resource already exists');
        case 7: // PERMISSION_DENIED
            return new AuthenticationError('Permission denied');
        case 8: // RESOURCE_EXHAUSTED
            return new DeviceError('Device resources exhausted', deviceId, 'EXHAUSTED');
        case 9: // FAILED_PRECONDITION
            return new ValidationError('Operation precondition failed');
        case 14: // UNAVAILABLE
            return new ConnectionError('Device unavailable', deviceId);
        default:
            return new SupremaError(grpcError.message || 'gRPC operation failed');
    }
}

module.exports = {
    // Error classes
    SupremaError,
    ConnectionError,
    AuthenticationError,
    ValidationError,
    DeviceError,
    BiometricError,
    
    // Middleware
    errorHandler,
    asyncHandler,
    notFoundHandler,
    rateLimitHandler,
    
    // Error formatters
    formatValidationError,
    handleDeviceError,
    handleBiometricError,
    processGrpcError
};