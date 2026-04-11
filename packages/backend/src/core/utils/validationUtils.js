/**
 * Validation Utilities
 * Common validation functions and patterns
 */

/**
 * Common validation patterns
 */
export const PATTERNS = {
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    IP_V4: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
    IP_V6: /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4})$/,
    MAC_ADDRESS: /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/,
    HEX_STRING: /^[0-9A-Fa-f]+$/,
    ALPHANUMERIC: /^[a-zA-Z0-9]+$/,
    ALPHANUMERIC_DASH: /^[a-zA-Z0-9_-]+$/,
    UUID: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
    PORT: /^([0-9]{1,4}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/
};

/**
 * Validate email format
 * 
 * @param {string} email - Email to validate
 * @returns {boolean}
 */
export function isValidEmail(email) {
    return PATTERNS.EMAIL.test(email);
}

/**
 * Validate IPv4 address
 * 
 * @param {string} ip - IP address to validate
 * @returns {boolean}
 */
export function isValidIPv4(ip) {
    return PATTERNS.IP_V4.test(ip);
}

/**
 * Validate IP address (v4 or v6)
 * 
 * @param {string} ip - IP address to validate
 * @returns {boolean}
 */
export function isValidIP(ip) {
    return PATTERNS.IP_V4.test(ip) || PATTERNS.IP_V6.test(ip);
}

/**
 * Validate port number
 * 
 * @param {number|string} port - Port to validate
 * @returns {boolean}
 */
export function isValidPort(port) {
    const num = parseInt(port);
    return !isNaN(num) && num >= 1 && num <= 65535;
}

/**
 * Validate MAC address
 * 
 * @param {string} mac - MAC address to validate
 * @returns {boolean}
 */
export function isValidMAC(mac) {
    return PATTERNS.MAC_ADDRESS.test(mac);
}

/**
 * Validate hex string
 * 
 * @param {string} str - String to validate
 * @returns {boolean}
 */
export function isValidHex(str) {
    return PATTERNS.HEX_STRING.test(str);
}

/**
 * Validate UUID
 * 
 * @param {string} uuid - UUID to validate
 * @returns {boolean}
 */
export function isValidUUID(uuid) {
    return PATTERNS.UUID.test(uuid);
}

/**
 * Check if value is a number
 * 
 * @param {*} value - Value to check
 * @returns {boolean}
 */
export function isNumber(value) {
    return typeof value === 'number' && !isNaN(value);
}

/**
 * Check if value is an integer
 * 
 * @param {*} value - Value to check
 * @returns {boolean}
 */
export function isInteger(value) {
    return Number.isInteger(value);
}

/**
 * Check if value is a positive number
 * 
 * @param {*} value - Value to check
 * @returns {boolean}
 */
export function isPositive(value) {
    return isNumber(value) && value > 0;
}

/**
 * Check if value is in range
 * 
 * @param {number} value - Value to check
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {boolean}
 */
export function isInRange(value, min, max) {
    return isNumber(value) && value >= min && value <= max;
}

/**
 * Check if value is a non-empty string
 * 
 * @param {*} value - Value to check
 * @returns {boolean}
 */
export function isNonEmptyString(value) {
    return typeof value === 'string' && value.trim().length > 0;
}

/**
 * Check if value is an array
 * 
 * @param {*} value - Value to check
 * @returns {boolean}
 */
export function isArray(value) {
    return Array.isArray(value);
}

/**
 * Check if value is a non-empty array
 * 
 * @param {*} value - Value to check
 * @returns {boolean}
 */
export function isNonEmptyArray(value) {
    return Array.isArray(value) && value.length > 0;
}

/**
 * Check if value is a plain object
 * 
 * @param {*} value - Value to check
 * @returns {boolean}
 */
export function isPlainObject(value) {
    return value !== null && typeof value === 'object' && !Array.isArray(value) && value.constructor === Object;
}

/**
 * Check if value is a date
 * 
 * @param {*} value - Value to check
 * @returns {boolean}
 */
export function isDate(value) {
    return value instanceof Date && !isNaN(value);
}

/**
 * Check if value is a valid date string
 * 
 * @param {string} value - Value to check
 * @returns {boolean}
 */
export function isValidDateString(value) {
    const date = new Date(value);
    return !isNaN(date.getTime());
}

/**
 * Validation result
 * @typedef {Object} ValidationResult
 * @property {boolean} valid - Is valid
 * @property {string[]} errors - Error messages
 */

/**
 * Validate object against schema
 * 
 * @param {Object} data - Data to validate
 * @param {Object} schema - Validation schema
 * @returns {ValidationResult}
 */
export function validate(data, schema) {
    const errors = [];
    
    for (const [field, rules] of Object.entries(schema)) {
        const value = data[field];
        
        if (rules.required && (value === undefined || value === null)) {
            errors.push(`${field} is required`);
            continue;
        }
        
        if (value === undefined || value === null) {
            continue; // Skip optional empty fields
        }
        
        if (rules.type) {
            const typeChecks = {
                string: () => typeof value === 'string',
                number: () => isNumber(value),
                integer: () => isInteger(value),
                boolean: () => typeof value === 'boolean',
                array: () => isArray(value),
                object: () => isPlainObject(value),
                date: () => isDate(value) || isValidDateString(value)
            };
            
            if (typeChecks[rules.type] && !typeChecks[rules.type]()) {
                errors.push(`${field} must be of type ${rules.type}`);
            }
        }
        
        if (rules.min !== undefined) {
            if (typeof value === 'number' && value < rules.min) {
                errors.push(`${field} must be at least ${rules.min}`);
            }
            if (typeof value === 'string' && value.length < rules.min) {
                errors.push(`${field} must be at least ${rules.min} characters`);
            }
            if (Array.isArray(value) && value.length < rules.min) {
                errors.push(`${field} must have at least ${rules.min} items`);
            }
        }
        
        if (rules.max !== undefined) {
            if (typeof value === 'number' && value > rules.max) {
                errors.push(`${field} must be at most ${rules.max}`);
            }
            if (typeof value === 'string' && value.length > rules.max) {
                errors.push(`${field} must be at most ${rules.max} characters`);
            }
            if (Array.isArray(value) && value.length > rules.max) {
                errors.push(`${field} must have at most ${rules.max} items`);
            }
        }
        
        if (rules.pattern && typeof value === 'string') {
            const pattern = typeof rules.pattern === 'string' ? new RegExp(rules.pattern) : rules.pattern;
            if (!pattern.test(value)) {
                errors.push(`${field} format is invalid`);
            }
        }
        
        if (rules.enum && !rules.enum.includes(value)) {
            errors.push(`${field} must be one of: ${rules.enum.join(', ')}`);
        }
        
        if (rules.custom && typeof rules.custom === 'function') {
            const customError = rules.custom(value, data);
            if (customError) {
                errors.push(customError);
            }
        }
    }
    
    return {
        valid: errors.length === 0,
        errors
    };
}

/**
 * Create a validator function from schema
 * 
 * @param {Object} schema - Validation schema
 * @returns {Function}
 */
export function createValidator(schema) {
    return (data) => validate(data, schema);
}

export default {
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
};
