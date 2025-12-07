/**
 * Application Errors
 * Centralized error classes for the application
 * Provides consistent error handling across all layers
 */

/**
 * HTTP Status Codes
 */
export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,
    TOO_MANY_REQUESTS: 429,
    INTERNAL_SERVER_ERROR: 500,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504
};

/**
 * Error Codes
 */
export const ERROR_CODES = {
    // General
    UNKNOWN_ERROR: 'UNKNOWN_ERROR',
    INTERNAL_ERROR: 'INTERNAL_ERROR',
    VALIDATION_ERROR: 'VALIDATION_ERROR',
    
    // Authentication/Authorization
    AUTHENTICATION_ERROR: 'AUTHENTICATION_ERROR',
    AUTHORIZATION_ERROR: 'AUTHORIZATION_ERROR',
    TOKEN_EXPIRED: 'TOKEN_EXPIRED',
    TOKEN_INVALID: 'TOKEN_INVALID',
    
    // Resource
    NOT_FOUND: 'NOT_FOUND',
    ALREADY_EXISTS: 'ALREADY_EXISTS',
    CONFLICT: 'CONFLICT',
    
    // Device
    DEVICE_ERROR: 'DEVICE_ERROR',
    DEVICE_NOT_CONNECTED: 'DEVICE_NOT_CONNECTED',
    DEVICE_TIMEOUT: 'DEVICE_TIMEOUT',
    DEVICE_COMMUNICATION_ERROR: 'DEVICE_COMMUNICATION_ERROR',
    
    // Connection
    CONNECTION_ERROR: 'CONNECTION_ERROR',
    GATEWAY_ERROR: 'GATEWAY_ERROR',
    GRPC_ERROR: 'GRPC_ERROR',
    
    // Biometric
    BIOMETRIC_ERROR: 'BIOMETRIC_ERROR',
    BIOMETRIC_SCAN_FAILED: 'BIOMETRIC_SCAN_FAILED',
    BIOMETRIC_QUALITY_LOW: 'BIOMETRIC_QUALITY_LOW',
    
    // Card
    CARD_ERROR: 'CARD_ERROR',
    CARD_SCAN_FAILED: 'CARD_SCAN_FAILED',
    CARD_INVALID: 'CARD_INVALID',
    CARD_ALREADY_ASSIGNED: 'CARD_ALREADY_ASSIGNED',
    
    // Sync
    SYNC_ERROR: 'SYNC_ERROR',
    SYNC_CONFLICT: 'SYNC_CONFLICT',
    
    // Rate Limiting
    RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED'
};

/**
 * Base Application Error
 * All custom errors extend this class
 */
export class AppError extends Error {
    /**
     * @param {string} message - Error message
     * @param {string} [code] - Error code
     * @param {number} [statusCode] - HTTP status code
     * @param {Object} [details] - Additional error details
     */
    constructor(message, code = ERROR_CODES.INTERNAL_ERROR, statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR, details = {}) {
        super(message);
        
        this.name = this.constructor.name;
        this.code = code;
        this.statusCode = statusCode;
        this.details = details;
        this.timestamp = new Date().toISOString();
        this.isOperational = true; // Operational errors are expected, non-operational are bugs
        
        Error.captureStackTrace(this, this.constructor);
    }

    /**
     * Convert to JSON for API response
     * @returns {Object}
     */
    toJSON() {
        return {
            success: false,
            error: this.name,
            code: this.code,
            message: this.message,
            details: this.details,
            timestamp: this.timestamp
        };
    }
}

/**
 * Validation Error
 * For input validation failures
 */
export class ValidationError extends AppError {
    /**
     * @param {string} message - Error message
     * @param {string|string[]} [fields] - Invalid field(s)
     * @param {Object} [details] - Validation details
     */
    constructor(message, fields = null, details = {}) {
        super(message, ERROR_CODES.VALIDATION_ERROR, HTTP_STATUS.BAD_REQUEST, details);
        this.fields = Array.isArray(fields) ? fields : fields ? [fields] : [];
    }

    toJSON() {
        return {
            ...super.toJSON(),
            fields: this.fields
        };
    }
}

/**
 * Not Found Error
 * For missing resources
 */
export class NotFoundError extends AppError {
    /**
     * @param {string} [resource='Resource'] - Resource name
     * @param {string|number} [id] - Resource ID
     */
    constructor(resource = 'Resource', id = null) {
        const message = id ? `${resource} with ID '${id}' not found` : `${resource} not found`;
        super(message, ERROR_CODES.NOT_FOUND, HTTP_STATUS.NOT_FOUND);
        this.resource = resource;
        this.resourceId = id;
    }
}

/**
 * Already Exists Error
 * For duplicate resources
 */
export class AlreadyExistsError extends AppError {
    /**
     * @param {string} [resource='Resource'] - Resource name
     * @param {string} [field] - Conflicting field
     */
    constructor(resource = 'Resource', field = null) {
        const message = field 
            ? `${resource} with this ${field} already exists`
            : `${resource} already exists`;
        super(message, ERROR_CODES.ALREADY_EXISTS, HTTP_STATUS.CONFLICT);
        this.resource = resource;
        this.field = field;
    }
}

/**
 * Authentication Error
 * For authentication failures
 */
export class AuthenticationError extends AppError {
    /**
     * @param {string} [message='Authentication required'] - Error message
     */
    constructor(message = 'Authentication required') {
        super(message, ERROR_CODES.AUTHENTICATION_ERROR, HTTP_STATUS.UNAUTHORIZED);
    }
}

/**
 * Authorization Error
 * For permission failures
 */
export class AuthorizationError extends AppError {
    /**
     * @param {string} [message='Access denied'] - Error message
     */
    constructor(message = 'Access denied') {
        super(message, ERROR_CODES.AUTHORIZATION_ERROR, HTTP_STATUS.FORBIDDEN);
    }
}

/**
 * Device Error
 * For Suprema device operation failures
 */
export class DeviceError extends AppError {
    /**
     * @param {string} message - Error message
     * @param {string|number} [deviceId] - Device identifier
     * @param {string} [operation] - Failed operation
     */
    constructor(message, deviceId = null, operation = null) {
        super(message, ERROR_CODES.DEVICE_ERROR, HTTP_STATUS.BAD_GATEWAY);
        this.deviceId = deviceId;
        this.operation = operation;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            deviceId: this.deviceId,
            operation: this.operation
        };
    }
}

/**
 * Device Not Connected Error
 * When device is not available
 */
export class DeviceNotConnectedError extends DeviceError {
    /**
     * @param {string|number} deviceId - Device identifier
     */
    constructor(deviceId) {
        super(`Device ${deviceId} is not connected`, deviceId);
        this.code = ERROR_CODES.DEVICE_NOT_CONNECTED;
        this.statusCode = HTTP_STATUS.SERVICE_UNAVAILABLE;
    }
}

/**
 * Connection Error
 * For gateway/network connection failures
 */
export class ConnectionError extends AppError {
    /**
     * @param {string} message - Error message
     * @param {string} [host] - Target host
     * @param {number} [port] - Target port
     */
    constructor(message, host = null, port = null) {
        super(message, ERROR_CODES.CONNECTION_ERROR, HTTP_STATUS.SERVICE_UNAVAILABLE);
        this.host = host;
        this.port = port;
    }
}

/**
 * gRPC Error
 * For gRPC communication failures
 */
export class GrpcError extends AppError {
    /**
     * @param {string} message - Error message
     * @param {number} [grpcCode] - gRPC status code
     * @param {Object} [grpcDetails] - gRPC error details
     */
    constructor(message, grpcCode = null, grpcDetails = {}) {
        super(message, ERROR_CODES.GRPC_ERROR, HTTP_STATUS.BAD_GATEWAY, grpcDetails);
        this.grpcCode = grpcCode;
    }
}

/**
 * Biometric Error
 * For biometric operation failures
 */
export class BiometricError extends AppError {
    /**
     * @param {string} message - Error message
     * @param {string} [biometricType] - Type: 'fingerprint', 'face', etc.
     */
    constructor(message, biometricType = null) {
        super(message, ERROR_CODES.BIOMETRIC_ERROR, HTTP_STATUS.UNPROCESSABLE_ENTITY);
        this.biometricType = biometricType;
    }
}

/**
 * Card Error
 * For card operation failures
 */
export class CardError extends AppError {
    /**
     * @param {string} message - Error message
     * @param {string} [cardData] - Card data (masked)
     */
    constructor(message, cardData = null) {
        super(message, ERROR_CODES.CARD_ERROR, HTTP_STATUS.UNPROCESSABLE_ENTITY);
        this.cardData = cardData;
    }
}

/**
 * Sync Error
 * For synchronization failures
 */
export class SyncError extends AppError {
    /**
     * @param {string} message - Error message
     * @param {Object} [syncDetails] - Sync operation details
     */
    constructor(message, syncDetails = {}) {
        super(message, ERROR_CODES.SYNC_ERROR, HTTP_STATUS.INTERNAL_SERVER_ERROR, syncDetails);
    }
}

/**
 * Rate Limit Error
 * When rate limit is exceeded
 */
export class RateLimitError extends AppError {
    /**
     * @param {string} [message] - Error message
     * @param {number} [retryAfter] - Seconds until retry allowed
     */
    constructor(message = 'Too many requests', retryAfter = 60) {
        super(message, ERROR_CODES.RATE_LIMIT_EXCEEDED, HTTP_STATUS.TOO_MANY_REQUESTS);
        this.retryAfter = retryAfter;
    }
}

/**
 * Check if error is operational (expected) vs programming error
 * 
 * @param {Error} error - Error to check
 * @returns {boolean}
 */
export function isOperationalError(error) {
    return error instanceof AppError && error.isOperational;
}

/**
 * Wrap unknown errors in AppError
 * 
 * @param {Error|*} error - Error to wrap
 * @returns {AppError}
 */
export function wrapError(error) {
    if (error instanceof AppError) {
        return error;
    }
    
    const wrappedError = new AppError(
        error?.message || 'An unexpected error occurred',
        ERROR_CODES.INTERNAL_ERROR,
        HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
    wrappedError.originalError = error;
    wrappedError.stack = error?.stack;
    
    return wrappedError;
}

export default {
    HTTP_STATUS,
    ERROR_CODES,
    AppError,
    ValidationError,
    NotFoundError,
    AlreadyExistsError,
    AuthenticationError,
    AuthorizationError,
    DeviceError,
    DeviceNotConnectedError,
    ConnectionError,
    GrpcError,
    BiometricError,
    CardError,
    SyncError,
    RateLimitError,
    isOperationalError,
    wrapError
};
