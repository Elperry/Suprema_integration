/**
 * Async Utilities
 * Common async/await helper functions
 */

/**
 * Sleep for specified milliseconds
 * 
 * @param {number} ms - Milliseconds to sleep
 * @returns {Promise<void>}
 */
export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Retry a function with exponential backoff
 * 
 * @param {Function} fn - Async function to retry
 * @param {Object} [options] - Retry options
 * @param {number} [options.maxRetries=3] - Maximum retries
 * @param {number} [options.baseDelay=1000] - Base delay in ms
 * @param {number} [options.maxDelay=30000] - Maximum delay in ms
 * @param {Function} [options.shouldRetry] - Function to determine if should retry
 * @returns {Promise<*>}
 */
export async function retry(fn, options = {}) {
    const {
        maxRetries = 3,
        baseDelay = 1000,
        maxDelay = 30000,
        shouldRetry = () => true
    } = options;
    
    let lastError;
    
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            return await fn(attempt);
        } catch (error) {
            lastError = error;
            
            if (attempt >= maxRetries || !shouldRetry(error, attempt)) {
                throw error;
            }
            
            const delay = Math.min(baseDelay * Math.pow(2, attempt), maxDelay);
            await sleep(delay);
        }
    }
    
    throw lastError;
}

/**
 * Execute with timeout
 * 
 * @param {Promise} promise - Promise to execute
 * @param {number} timeoutMs - Timeout in milliseconds
 * @param {string} [message='Operation timed out'] - Timeout error message
 * @returns {Promise<*>}
 */
export function withTimeout(promise, timeoutMs, message = 'Operation timed out') {
    return Promise.race([
        promise,
        new Promise((_, reject) => {
            setTimeout(() => reject(new Error(message)), timeoutMs);
        })
    ]);
}

/**
 * Execute promises in parallel with concurrency limit
 * 
 * @param {Array} items - Items to process
 * @param {Function} fn - Async function to apply to each item
 * @param {number} [concurrency=5] - Max concurrent executions
 * @returns {Promise<Array>}
 */
export async function parallelLimit(items, fn, concurrency = 5) {
    const results = [];
    const executing = new Set();
    
    for (const [index, item] of items.entries()) {
        const promise = Promise.resolve().then(() => fn(item, index));
        results.push(promise);
        executing.add(promise);
        
        const cleanup = () => executing.delete(promise);
        promise.then(cleanup, cleanup);
        
        if (executing.size >= concurrency) {
            await Promise.race(executing);
        }
    }
    
    return Promise.all(results);
}

/**
 * Execute promises in sequence
 * 
 * @param {Array} items - Items to process
 * @param {Function} fn - Async function to apply to each item
 * @returns {Promise<Array>}
 */
export async function sequence(items, fn) {
    const results = [];
    for (const [index, item] of items.entries()) {
        results.push(await fn(item, index));
    }
    return results;
}

/**
 * Debounce async function
 * 
 * @param {Function} fn - Async function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function}
 */
export function debounceAsync(fn, delay) {
    let timeoutId;
    let pendingPromise;
    
    return function (...args) {
        return new Promise((resolve, reject) => {
            clearTimeout(timeoutId);
            
            timeoutId = setTimeout(async () => {
                try {
                    const result = await fn.apply(this, args);
                    resolve(result);
                } catch (error) {
                    reject(error);
                }
            }, delay);
        });
    };
}

/**
 * Throttle async function
 * 
 * @param {Function} fn - Async function to throttle
 * @param {number} limit - Minimum time between calls in ms
 * @returns {Function}
 */
export function throttleAsync(fn, limit) {
    let lastRun = 0;
    let pendingPromise = null;
    
    return async function (...args) {
        const now = Date.now();
        
        if (now - lastRun >= limit) {
            lastRun = now;
            return fn.apply(this, args);
        }
        
        if (!pendingPromise) {
            pendingPromise = new Promise(resolve => {
                setTimeout(async () => {
                    lastRun = Date.now();
                    pendingPromise = null;
                    resolve(fn.apply(this, args));
                }, limit - (now - lastRun));
            });
        }
        
        return pendingPromise;
    };
}

/**
 * Memoize async function
 * 
 * @param {Function} fn - Async function to memoize
 * @param {Object} [options] - Memoization options
 * @param {Function} [options.keyFn] - Custom cache key function
 * @param {number} [options.ttl] - Cache TTL in milliseconds
 * @returns {Function}
 */
export function memoizeAsync(fn, options = {}) {
    const cache = new Map();
    const { keyFn = JSON.stringify, ttl } = options;
    
    return async function (...args) {
        const key = keyFn(args);
        const cached = cache.get(key);
        
        if (cached) {
            if (!ttl || Date.now() - cached.timestamp < ttl) {
                return cached.value;
            }
            cache.delete(key);
        }
        
        const result = await fn.apply(this, args);
        cache.set(key, { value: result, timestamp: Date.now() });
        return result;
    };
}

/**
 * Create a deferred promise
 * 
 * @returns {Object} { promise, resolve, reject }
 */
export function deferred() {
    let resolve, reject;
    const promise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
    });
    return { promise, resolve, reject };
}

/**
 * Execute function and catch errors
 * 
 * @param {Function} fn - Async function
 * @returns {Promise<[Error|null, *]>}
 */
export async function tryCatch(fn) {
    try {
        const result = await fn();
        return [null, result];
    } catch (error) {
        return [error, null];
    }
}

/**
 * Run multiple async functions and collect all results (including errors)
 * 
 * @param {Array<Promise>} promises - Promises to execute
 * @returns {Promise<Array<{status: string, value?: *, reason?: Error}>>}
 */
export function allSettled(promises) {
    return Promise.allSettled(promises);
}

export default {
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
};
