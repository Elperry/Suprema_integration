/**
 * Core Module
 * Central export for all core functionality
 * 
 * Architecture Overview:
 * =====================
 * 
 * This module provides the foundational components for a layered architecture:
 * 
 * ┌─────────────────────────────────────────────────────────────┐
 * │                     PRESENTATION LAYER                       │
 * │  ┌─────────────────────────────────────────────────────┐    │
 * │  │              Controllers (BaseController)            │    │
 * │  │  - HTTP request/response handling                   │    │
 * │  │  - Input validation                                 │    │
 * │  │  - Response formatting                              │    │
 * │  └─────────────────────────────────────────────────────┘    │
 * └─────────────────────────────────────────────────────────────┘
 *                              │
 *                              ▼
 * ┌─────────────────────────────────────────────────────────────┐
 * │                      BUSINESS LAYER                          │
 * │  ┌─────────────────────────────────────────────────────┐    │
 * │  │               Services (BaseService)                 │    │
 * │  │  - Business logic implementation                    │    │
 * │  │  - Transaction orchestration                        │    │
 * │  │  - Domain event emission                            │    │
 * │  └─────────────────────────────────────────────────────┘    │
 * └─────────────────────────────────────────────────────────────┘
 *                              │
 *                              ▼
 * ┌─────────────────────────────────────────────────────────────┐
 * │                       DATA ACCESS LAYER                      │
 * │  ┌─────────────────────────────────────────────────────┐    │
 * │  │             Repositories (BaseRepository)            │    │
 * │  │  - Database operations                              │    │
 * │  │  - Query building                                   │    │
 * │  │  - Data mapping                                     │    │
 * │  └─────────────────────────────────────────────────────┘    │
 * └─────────────────────────────────────────────────────────────┘
 *                              │
 *                              ▼
 * ┌─────────────────────────────────────────────────────────────┐
 * │                       INFRASTRUCTURE                         │
 * │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
 * │  │   Config    │  │   Logger    │  │    Error Handler    │  │
 * │  └─────────────┘  └─────────────┘  └─────────────────────┘  │
 * │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
 * │  │  Container  │  │   Utils     │  │     Validators      │  │
 * │  └─────────────┘  └─────────────┘  └─────────────────────┘  │
 * └─────────────────────────────────────────────────────────────┘
 * 
 * Usage:
 * ======
 * 
 * import { 
 *   BaseService, 
 *   BaseRepository, 
 *   BaseController,
 *   AppError,
 *   getConfig,
 *   cardUtils
 * } from './core/index.js';
 * 
 */

// ==================== INTERFACES ====================
export {
    IService,
    ICrudService,
    IDeviceService,
    ISyncService,
    IRepository,
    IController,
    ICrudController
} from './interfaces/index.js';

// ==================== BASE CLASSES ====================
export {
    BaseService,
    BaseRepository,
    BaseController
} from './base/index.js';

// ==================== ERRORS ====================
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
    wrapError,
    createErrorHandler,
    notFoundHandler,
    asyncHandler,
    validateRequest,
    setupUnhandledRejectionHandler,
    setupUncaughtExceptionHandler
} from './errors/index.js';

// ==================== CONFIGURATION ====================
export {
    default as config,
    getConfig,
    getSection,
    get as getConfigValue,
    isFeatureEnabled,
    isProduction,
    isDevelopment,
    isTest,
    getEnvironment,
    ENVIRONMENTS
} from './config/index.js';

// ==================== CONTAINER (DI) ====================
export {
    Container,
    getContainer,
    resetContainer,
    inject
} from './container/index.js';

// ==================== UTILITIES ====================
// Card utilities
export {
    cardUtils,
    CARD_TYPES,
    CARD_TYPE_NAMES,
    decodeBase64ToDecimal,
    decodeHexToDecimal,
    encodeDecimalToHex,
    encodeDecimalToBase64,
    hexToBuffer,
    bufferToHex,
    getCardTypeCode,
    getCardTypeName,
    validateCardData,
    normalizeToHex
} from './utils/index.js';

// Date utilities
export {
    dateUtils,
    formatISODate,
    formatLocalDate,
    startOfDay,
    endOfDay,
    todayRange,
    lastNDaysRange,
    thisWeekRange,
    thisMonthRange,
    addTime,
    dateDiff,
    isToday,
    isPast,
    isFuture,
    parseRelativeTime,
    formatDuration
} from './utils/index.js';

// String utilities
export {
    stringUtils,
    toCamelCase,
    toPascalCase,
    toSnakeCase,
    toKebabCase,
    truncate,
    capitalize,
    pad,
    randomString,
    isBlank,
    isNotBlank,
    escapeHtml,
    mask,
    interpolate,
    slugify
} from './utils/index.js';

// Object utilities
export {
    objectUtils,
    deepClone,
    deepMerge,
    isObject,
    isEmpty,
    pick,
    omit,
    get,
    set,
    flatten,
    unflatten,
    mapValues,
    filterObject,
    compact,
    mapKeys
} from './utils/index.js';

// Async utilities
export {
    asyncUtils,
    sleep,
    retry,
    withTimeout,
    parallelLimit,
    sequence,
    debounceAsync,
    throttleAsync,
    memoizeAsync,
    deferred,
    tryCatch,
    allSettled
} from './utils/index.js';

// Validation utilities
export {
    validationUtils,
    PATTERNS,
    isValidEmail,
    isValidIPv4,
    isValidIP,
    isValidPort,
    isValidMAC,
    isValidHex,
    isValidUUID,
    isNumber,
    isInteger,
    isPositive,
    isInRange,
    isNonEmptyString,
    isArray,
    isNonEmptyArray,
    isPlainObject,
    isDate,
    isValidDateString,
    validate,
    createValidator
} from './utils/index.js';
