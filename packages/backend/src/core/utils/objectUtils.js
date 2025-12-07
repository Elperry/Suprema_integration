/**
 * Object Utilities
 * Common object manipulation functions
 */

/**
 * Deep clone an object
 * 
 * @param {*} obj - Object to clone
 * @returns {*}
 */
export function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    
    if (obj instanceof Date) {
        return new Date(obj.getTime());
    }
    
    if (Array.isArray(obj)) {
        return obj.map(item => deepClone(item));
    }
    
    if (obj instanceof Map) {
        const clonedMap = new Map();
        obj.forEach((value, key) => {
            clonedMap.set(deepClone(key), deepClone(value));
        });
        return clonedMap;
    }
    
    if (obj instanceof Set) {
        const clonedSet = new Set();
        obj.forEach(value => {
            clonedSet.add(deepClone(value));
        });
        return clonedSet;
    }
    
    const cloned = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            cloned[key] = deepClone(obj[key]);
        }
    }
    return cloned;
}

/**
 * Deep merge objects
 * 
 * @param {Object} target - Target object
 * @param {...Object} sources - Source objects
 * @returns {Object}
 */
export function deepMerge(target, ...sources) {
    if (!sources.length) return target;
    
    const source = sources.shift();
    
    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key]) Object.assign(target, { [key]: {} });
                deepMerge(target[key], source[key]);
            } else {
                Object.assign(target, { [key]: source[key] });
            }
        }
    }
    
    return deepMerge(target, ...sources);
}

/**
 * Check if value is a plain object
 * 
 * @param {*} value - Value to check
 * @returns {boolean}
 */
export function isObject(value) {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
}

/**
 * Check if object is empty
 * 
 * @param {Object} obj - Object to check
 * @returns {boolean}
 */
export function isEmpty(obj) {
    if (!obj) return true;
    return Object.keys(obj).length === 0;
}

/**
 * Pick specified keys from object
 * 
 * @param {Object} obj - Source object
 * @param {string[]} keys - Keys to pick
 * @returns {Object}
 */
export function pick(obj, keys) {
    const result = {};
    for (const key of keys) {
        if (obj.hasOwnProperty(key)) {
            result[key] = obj[key];
        }
    }
    return result;
}

/**
 * Omit specified keys from object
 * 
 * @param {Object} obj - Source object
 * @param {string[]} keys - Keys to omit
 * @returns {Object}
 */
export function omit(obj, keys) {
    const result = { ...obj };
    for (const key of keys) {
        delete result[key];
    }
    return result;
}

/**
 * Get value at nested path
 * 
 * @param {Object} obj - Source object
 * @param {string} path - Dot-notation path (e.g., 'a.b.c')
 * @param {*} [defaultValue] - Default value if path not found
 * @returns {*}
 */
export function get(obj, path, defaultValue = undefined) {
    const keys = path.split('.');
    let result = obj;
    
    for (const key of keys) {
        if (result === null || result === undefined) {
            return defaultValue;
        }
        result = result[key];
    }
    
    return result === undefined ? defaultValue : result;
}

/**
 * Set value at nested path
 * 
 * @param {Object} obj - Target object
 * @param {string} path - Dot-notation path
 * @param {*} value - Value to set
 * @returns {Object}
 */
export function set(obj, path, value) {
    const keys = path.split('.');
    let current = obj;
    
    for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        if (!current[key] || typeof current[key] !== 'object') {
            current[key] = {};
        }
        current = current[key];
    }
    
    current[keys[keys.length - 1]] = value;
    return obj;
}

/**
 * Flatten nested object
 * 
 * @param {Object} obj - Object to flatten
 * @param {string} [prefix=''] - Key prefix
 * @param {string} [separator='.'] - Key separator
 * @returns {Object}
 */
export function flatten(obj, prefix = '', separator = '.') {
    const result = {};
    
    for (const key in obj) {
        if (!obj.hasOwnProperty(key)) continue;
        
        const newKey = prefix ? `${prefix}${separator}${key}` : key;
        
        if (isObject(obj[key]) && !Array.isArray(obj[key])) {
            Object.assign(result, flatten(obj[key], newKey, separator));
        } else {
            result[newKey] = obj[key];
        }
    }
    
    return result;
}

/**
 * Unflatten object
 * 
 * @param {Object} obj - Flattened object
 * @param {string} [separator='.'] - Key separator
 * @returns {Object}
 */
export function unflatten(obj, separator = '.') {
    const result = {};
    
    for (const key in obj) {
        if (!obj.hasOwnProperty(key)) continue;
        set(result, key.split(separator).join('.'), obj[key]);
    }
    
    return result;
}

/**
 * Map object values
 * 
 * @param {Object} obj - Source object
 * @param {Function} fn - Mapping function (value, key) => newValue
 * @returns {Object}
 */
export function mapValues(obj, fn) {
    const result = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            result[key] = fn(obj[key], key);
        }
    }
    return result;
}

/**
 * Filter object by predicate
 * 
 * @param {Object} obj - Source object
 * @param {Function} predicate - Filter function (value, key) => boolean
 * @returns {Object}
 */
export function filterObject(obj, predicate) {
    const result = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key) && predicate(obj[key], key)) {
            result[key] = obj[key];
        }
    }
    return result;
}

/**
 * Remove null/undefined values from object
 * 
 * @param {Object} obj - Source object
 * @returns {Object}
 */
export function compact(obj) {
    return filterObject(obj, value => value != null);
}

/**
 * Transform object keys
 * 
 * @param {Object} obj - Source object
 * @param {Function} fn - Key transform function
 * @returns {Object}
 */
export function mapKeys(obj, fn) {
    const result = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            result[fn(key, obj[key])] = obj[key];
        }
    }
    return result;
}

export default {
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
};
