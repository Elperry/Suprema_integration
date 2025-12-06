/**
 * Rate Limiting Middleware
 * Prevents API abuse and protects against DDoS attacks
 */

/**
 * Simple in-memory rate limiter
 * For production, consider using Redis-based solution
 */
class RateLimiter {
    constructor(options = {}) {
        this.windowMs = options.windowMs || 60000; // 1 minute window
        this.maxRequests = options.maxRequests || 100; // 100 requests per window
        this.message = options.message || 'Too many requests, please try again later';
        this.statusCode = options.statusCode || 429;
        this.keyGenerator = options.keyGenerator || ((req) => req.ip);
        this.skipFailedRequests = options.skipFailedRequests || false;
        this.skipSuccessfulRequests = options.skipSuccessfulRequests || false;
        this.whitelist = options.whitelist || [];
        
        // Store for tracking requests: key -> { count, resetTime }
        this.store = new Map();
        
        // Cleanup old entries periodically
        this.cleanupInterval = setInterval(() => this.cleanup(), this.windowMs);
    }

    /**
     * Cleanup expired entries
     */
    cleanup() {
        const now = Date.now();
        for (const [key, data] of this.store.entries()) {
            if (data.resetTime <= now) {
                this.store.delete(key);
            }
        }
    }

    /**
     * Get middleware function
     */
    middleware() {
        return (req, res, next) => {
            const key = this.keyGenerator(req);
            
            // Check whitelist
            if (this.whitelist.includes(key)) {
                return next();
            }

            const now = Date.now();
            let data = this.store.get(key);

            // Initialize or reset if window expired
            if (!data || data.resetTime <= now) {
                data = {
                    count: 0,
                    resetTime: now + this.windowMs
                };
                this.store.set(key, data);
            }

            // Increment count
            data.count++;

            // Set rate limit headers
            const remaining = Math.max(0, this.maxRequests - data.count);
            const resetSeconds = Math.ceil((data.resetTime - now) / 1000);

            res.setHeader('X-RateLimit-Limit', this.maxRequests);
            res.setHeader('X-RateLimit-Remaining', remaining);
            res.setHeader('X-RateLimit-Reset', Math.ceil(data.resetTime / 1000));
            res.setHeader('X-RateLimit-Reset-After', resetSeconds);

            // Check if limit exceeded
            if (data.count > this.maxRequests) {
                res.setHeader('Retry-After', resetSeconds);
                return res.status(this.statusCode).json({
                    success: false,
                    error: 'Rate Limit Exceeded',
                    message: this.message,
                    retryAfter: resetSeconds,
                    limit: this.maxRequests,
                    windowMs: this.windowMs
                });
            }

            // Handle skip options in response
            if (this.skipFailedRequests || this.skipSuccessfulRequests) {
                const originalSend = res.send.bind(res);
                res.send = (body) => {
                    const shouldDecrement = 
                        (this.skipFailedRequests && res.statusCode >= 400) ||
                        (this.skipSuccessfulRequests && res.statusCode < 400);
                    
                    if (shouldDecrement && data.count > 0) {
                        data.count--;
                    }
                    return originalSend(body);
                };
            }

            next();
        };
    }

    /**
     * Destroy the rate limiter and clear cleanup interval
     */
    destroy() {
        if (this.cleanupInterval) {
            clearInterval(this.cleanupInterval);
        }
        this.store.clear();
    }
}

/**
 * Create rate limiter middleware with custom options
 */
export function createRateLimiter(options = {}) {
    const limiter = new RateLimiter(options);
    return limiter.middleware();
}

/**
 * Default rate limiter configurations for different route types
 */
export const rateLimitConfigs = {
    // Standard API routes - 100 requests per minute
    standard: {
        windowMs: 60000,
        maxRequests: 100,
        message: 'Too many requests. Please wait before trying again.'
    },
    
    // Auth routes - more restrictive (10 per minute)
    auth: {
        windowMs: 60000,
        maxRequests: 10,
        message: 'Too many authentication attempts. Please wait before trying again.',
        skipSuccessfulRequests: true
    },
    
    // Device operations - moderate limit (30 per minute)
    device: {
        windowMs: 60000,
        maxRequests: 30,
        message: 'Too many device operations. Please wait before trying again.'
    },
    
    // Biometric operations - stricter limit (20 per minute)
    biometric: {
        windowMs: 60000,
        maxRequests: 20,
        message: 'Too many biometric operations. Please wait before trying again.'
    },
    
    // Read-only operations - more lenient (200 per minute)
    readonly: {
        windowMs: 60000,
        maxRequests: 200,
        message: 'Too many requests. Please wait before trying again.'
    },
    
    // Webhook/integration endpoints - very lenient (500 per minute)
    webhook: {
        windowMs: 60000,
        maxRequests: 500,
        message: 'Rate limit exceeded for webhook endpoint.'
    }
};

// Default export - standard rate limiter
export default createRateLimiter(rateLimitConfigs.standard);
