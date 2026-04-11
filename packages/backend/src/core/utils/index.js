/**
 * Core Utilities Index
 * Central export for all utility modules
 */

// Card utilities
export * as cardUtils from './cardUtils.js';
export {
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
} from './cardUtils.js';

// Date utilities
export * as dateUtils from './dateUtils.js';
export {
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
} from './dateUtils.js';

// String utilities
export * as stringUtils from './stringUtils.js';
export {
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
} from './stringUtils.js';

// Object utilities
export * as objectUtils from './objectUtils.js';
export {
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
} from './objectUtils.js';

// Async utilities
export * as asyncUtils from './asyncUtils.js';
export {
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
} from './asyncUtils.js';

// Validation utilities
export * as validationUtils from './validationUtils.js';
export {
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
} from './validationUtils.js';
