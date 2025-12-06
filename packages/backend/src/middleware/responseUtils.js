/**
 * Response Utilities
 * Standardized API response helpers and utilities
 */

/**
 * Standard API response builder
 */
export const apiResponse = {
    /**
     * Success response
     */
    success(res, data, options = {}) {
        const { 
            statusCode = 200, 
            message = 'Success',
            meta = null 
        } = options;

        const response = {
            success: true,
            message,
            data,
            timestamp: new Date().toISOString()
        };

        if (meta) {
            response.meta = meta;
        }

        if (res.requestId) {
            response.requestId = res.requestId;
        }

        return res.status(statusCode).json(response);
    },

    /**
     * Created response (201)
     */
    created(res, data, message = 'Resource created successfully') {
        return this.success(res, data, { statusCode: 201, message });
    },

    /**
     * Paginated response
     */
    paginated(res, data, pagination) {
        const { page, limit, total } = pagination;
        const totalPages = Math.ceil(total / limit);

        return this.success(res, data, {
            meta: {
                pagination: {
                    page,
                    limit,
                    total,
                    totalPages,
                    hasNextPage: page < totalPages,
                    hasPrevPage: page > 1
                }
            }
        });
    },

    /**
     * Error response
     */
    error(res, error, options = {}) {
        const {
            statusCode = 500,
            code = 'INTERNAL_ERROR',
            details = null
        } = options;

        const message = typeof error === 'string' ? error : error.message;

        const response = {
            success: false,
            error: getErrorName(statusCode),
            message,
            code,
            timestamp: new Date().toISOString()
        };

        if (details) {
            response.details = details;
        }

        if (res.requestId) {
            response.requestId = res.requestId;
        }

        return res.status(statusCode).json(response);
    },

    /**
     * Bad Request (400)
     */
    badRequest(res, message = 'Bad request', details = null) {
        return this.error(res, message, { 
            statusCode: 400, 
            code: 'BAD_REQUEST',
            details 
        });
    },

    /**
     * Unauthorized (401)
     */
    unauthorized(res, message = 'Unauthorized') {
        return this.error(res, message, { 
            statusCode: 401, 
            code: 'UNAUTHORIZED' 
        });
    },

    /**
     * Forbidden (403)
     */
    forbidden(res, message = 'Forbidden') {
        return this.error(res, message, { 
            statusCode: 403, 
            code: 'FORBIDDEN' 
        });
    },

    /**
     * Not Found (404)
     */
    notFound(res, message = 'Resource not found') {
        return this.error(res, message, { 
            statusCode: 404, 
            code: 'NOT_FOUND' 
        });
    },

    /**
     * Conflict (409)
     */
    conflict(res, message = 'Resource conflict') {
        return this.error(res, message, { 
            statusCode: 409, 
            code: 'CONFLICT' 
        });
    },

    /**
     * Validation Error (422)
     */
    validationError(res, errors) {
        return this.error(res, 'Validation failed', { 
            statusCode: 422, 
            code: 'VALIDATION_ERROR',
            details: { errors }
        });
    },

    /**
     * Internal Server Error (500)
     */
    serverError(res, message = 'Internal server error') {
        return this.error(res, message, { 
            statusCode: 500, 
            code: 'INTERNAL_ERROR' 
        });
    },

    /**
     * Service Unavailable (503)
     */
    serviceUnavailable(res, message = 'Service temporarily unavailable') {
        return this.error(res, message, { 
            statusCode: 503, 
            code: 'SERVICE_UNAVAILABLE' 
        });
    },

    /**
     * Device Error (502)
     */
    deviceError(res, message, deviceId = null) {
        const details = deviceId ? { deviceId } : null;
        return this.error(res, message, { 
            statusCode: 502, 
            code: 'DEVICE_ERROR',
            details
        });
    }
};

/**
 * Get error name from status code
 */
function getErrorName(statusCode) {
    const errorNames = {
        400: 'Bad Request',
        401: 'Unauthorized',
        403: 'Forbidden',
        404: 'Not Found',
        405: 'Method Not Allowed',
        409: 'Conflict',
        422: 'Unprocessable Entity',
        429: 'Too Many Requests',
        500: 'Internal Server Error',
        502: 'Bad Gateway',
        503: 'Service Unavailable',
        504: 'Gateway Timeout'
    };
    return errorNames[statusCode] || 'Error';
}

/**
 * Async handler wrapper to catch errors in async route handlers
 */
export function asyncHandler(fn) {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}

/**
 * Response caching middleware
 * Simple in-memory cache for GET requests
 */
class ResponseCache {
    constructor(options = {}) {
        this.cache = new Map();
        this.defaultTTL = options.ttl || 60000; // 1 minute default
        this.maxSize = options.maxSize || 1000;
        
        // Cleanup expired entries periodically
        this.cleanupInterval = setInterval(() => this.cleanup(), 60000);
    }

    /**
     * Generate cache key from request
     */
    generateKey(req) {
        return `${req.method}:${req.originalUrl}`;
    }

    /**
     * Get cached response
     */
    get(key) {
        const entry = this.cache.get(key);
        if (!entry) return null;

        if (Date.now() > entry.expiresAt) {
            this.cache.delete(key);
            return null;
        }

        return entry.data;
    }

    /**
     * Set cached response
     */
    set(key, data, ttl = this.defaultTTL) {
        // Enforce max size by removing oldest entries
        if (this.cache.size >= this.maxSize) {
            const oldestKey = this.cache.keys().next().value;
            this.cache.delete(oldestKey);
        }

        this.cache.set(key, {
            data,
            expiresAt: Date.now() + ttl,
            createdAt: Date.now()
        });
    }

    /**
     * Invalidate cache entries matching a pattern
     */
    invalidate(pattern) {
        for (const key of this.cache.keys()) {
            if (key.includes(pattern)) {
                this.cache.delete(key);
            }
        }
    }

    /**
     * Clear all cache
     */
    clear() {
        this.cache.clear();
    }

    /**
     * Cleanup expired entries
     */
    cleanup() {
        const now = Date.now();
        for (const [key, entry] of this.cache.entries()) {
            if (now > entry.expiresAt) {
                this.cache.delete(key);
            }
        }
    }

    /**
     * Destroy cache and cleanup
     */
    destroy() {
        if (this.cleanupInterval) {
            clearInterval(this.cleanupInterval);
        }
        this.cache.clear();
    }
}

// Singleton cache instance
const responseCache = new ResponseCache();

/**
 * Cache middleware factory
 */
export function cacheResponse(options = {}) {
    const ttl = options.ttl || 60000;
    const condition = options.condition || (() => true);

    return (req, res, next) => {
        // Only cache GET requests
        if (req.method !== 'GET') {
            return next();
        }

        // Check condition
        if (!condition(req)) {
            return next();
        }

        const key = responseCache.generateKey(req);
        const cached = responseCache.get(key);

        if (cached) {
            res.setHeader('X-Cache', 'HIT');
            return res.json(cached);
        }

        // Intercept response to cache it
        const originalJson = res.json.bind(res);
        res.json = (data) => {
            if (res.statusCode === 200) {
                responseCache.set(key, data, ttl);
            }
            res.setHeader('X-Cache', 'MISS');
            return originalJson(data);
        };

        next();
    };
}

/**
 * Invalidate cache for a specific pattern
 */
export function invalidateCache(pattern) {
    responseCache.invalidate(pattern);
}

/**
 * Clear all cache
 */
export function clearCache() {
    responseCache.clear();
}

export default { apiResponse, asyncHandler, cacheResponse, invalidateCache, clearCache };
