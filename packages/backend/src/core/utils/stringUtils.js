/**
 * String Utilities
 * Common string manipulation and formatting functions
 */

/**
 * Convert string to camelCase
 * 
 * @param {string} str - Input string
 * @returns {string}
 */
export function toCamelCase(str) {
    return str
        .replace(/[-_\s]+(.)?/g, (_, c) => c ? c.toUpperCase() : '')
        .replace(/^(.)/, c => c.toLowerCase());
}

/**
 * Convert string to PascalCase
 * 
 * @param {string} str - Input string
 * @returns {string}
 */
export function toPascalCase(str) {
    return str
        .replace(/[-_\s]+(.)?/g, (_, c) => c ? c.toUpperCase() : '')
        .replace(/^(.)/, c => c.toUpperCase());
}

/**
 * Convert string to snake_case
 * 
 * @param {string} str - Input string
 * @returns {string}
 */
export function toSnakeCase(str) {
    return str
        .replace(/([A-Z])/g, '_$1')
        .replace(/[-\s]+/g, '_')
        .toLowerCase()
        .replace(/^_/, '');
}

/**
 * Convert string to kebab-case
 * 
 * @param {string} str - Input string
 * @returns {string}
 */
export function toKebabCase(str) {
    return str
        .replace(/([A-Z])/g, '-$1')
        .replace(/[_\s]+/g, '-')
        .toLowerCase()
        .replace(/^-/, '');
}

/**
 * Truncate string to specified length
 * 
 * @param {string} str - Input string
 * @param {number} length - Max length
 * @param {string} [suffix='...'] - Suffix for truncated strings
 * @returns {string}
 */
export function truncate(str, length, suffix = '...') {
    if (!str || str.length <= length) return str;
    return str.substring(0, length - suffix.length) + suffix;
}

/**
 * Capitalize first letter
 * 
 * @param {string} str - Input string
 * @returns {string}
 */
export function capitalize(str) {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Pad string to specified length
 * 
 * @param {string|number} value - Value to pad
 * @param {number} length - Target length
 * @param {string} [char='0'] - Padding character
 * @param {string} [direction='start'] - 'start' or 'end'
 * @returns {string}
 */
export function pad(value, length, char = '0', direction = 'start') {
    const str = String(value);
    if (str.length >= length) return str;
    
    const padding = char.repeat(length - str.length);
    return direction === 'start' ? padding + str : str + padding;
}

/**
 * Generate random string
 * 
 * @param {number} length - String length
 * @param {string} [charset='alphanumeric'] - Character set
 * @returns {string}
 */
export function randomString(length, charset = 'alphanumeric') {
    const charsets = {
        alphanumeric: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
        alpha: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
        numeric: '0123456789',
        hex: '0123456789ABCDEF'
    };
    
    const chars = charsets[charset] || charset;
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

/**
 * Check if string is empty or whitespace
 * 
 * @param {string} str - Input string
 * @returns {boolean}
 */
export function isBlank(str) {
    return !str || /^\s*$/.test(str);
}

/**
 * Check if string is not empty
 * 
 * @param {string} str - Input string
 * @returns {boolean}
 */
export function isNotBlank(str) {
    return !isBlank(str);
}

/**
 * Escape HTML special characters
 * 
 * @param {string} str - Input string
 * @returns {string}
 */
export function escapeHtml(str) {
    if (!str) return str;
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

/**
 * Mask sensitive data (show only first/last chars)
 * 
 * @param {string} str - Input string
 * @param {number} [showFirst=2] - Chars to show at start
 * @param {number} [showLast=2] - Chars to show at end
 * @param {string} [maskChar='*'] - Masking character
 * @returns {string}
 */
export function mask(str, showFirst = 2, showLast = 2, maskChar = '*') {
    if (!str || str.length <= showFirst + showLast) {
        return maskChar.repeat(str ? str.length : 4);
    }
    
    const first = str.substring(0, showFirst);
    const last = str.substring(str.length - showLast);
    const masked = maskChar.repeat(str.length - showFirst - showLast);
    
    return first + masked + last;
}

/**
 * Template string interpolation
 * 
 * @param {string} template - Template with {placeholders}
 * @param {Object} data - Data object
 * @returns {string}
 */
export function interpolate(template, data) {
    return template.replace(/\{(\w+)\}/g, (match, key) => {
        return data.hasOwnProperty(key) ? data[key] : match;
    });
}

/**
 * Slugify string (URL-safe)
 * 
 * @param {string} str - Input string
 * @returns {string}
 */
export function slugify(str) {
    return str
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

export default {
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
};
