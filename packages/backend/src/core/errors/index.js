/**
 * Errors Module Index
 * Central export for error handling
 */

// Export all error classes
export {
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
} from './AppErrors.js';

// Export error handlers
export {
    createErrorHandler,
    notFoundHandler,
    asyncHandler,
    validateRequest,
    setupUnhandledRejectionHandler,
    setupUncaughtExceptionHandler
} from './errorHandler.js';
