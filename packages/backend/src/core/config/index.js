/**
 * Application Configuration
 * Centralized configuration management with validation
 * Supports environment-based configuration with defaults
 */

import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

/**
 * Environment types
 */
export const ENVIRONMENTS = {
    DEVELOPMENT: 'development',
    PRODUCTION: 'production',
    TEST: 'test'
};

/**
 * Get current environment
 * @returns {string}
 */
export function getEnvironment() {
    return process.env.NODE_ENV || ENVIRONMENTS.DEVELOPMENT;
}

/**
 * Check if running in production
 * @returns {boolean}
 */
export function isProduction() {
    return getEnvironment() === ENVIRONMENTS.PRODUCTION;
}

/**
 * Check if running in development
 * @returns {boolean}
 */
export function isDevelopment() {
    return getEnvironment() === ENVIRONMENTS.DEVELOPMENT;
}

/**
 * Check if running in test
 * @returns {boolean}
 */
export function isTest() {
    return getEnvironment() === ENVIRONMENTS.TEST;
}

/**
 * Parse boolean environment variable
 * @param {string} value - String value
 * @param {boolean} [defaultValue=false] - Default value
 * @returns {boolean}
 */
function parseBoolean(value, defaultValue = false) {
    if (value === undefined || value === null) return defaultValue;
    return value === 'true' || value === '1';
}

/**
 * Parse integer environment variable
 * @param {string} value - String value
 * @param {number} defaultValue - Default value
 * @returns {number}
 */
function parseInteger(value, defaultValue) {
    if (value === undefined || value === null) return defaultValue;
    const parsed = parseInt(value, 10);
    return isNaN(parsed) ? defaultValue : parsed;
}

/**
 * Configuration schema
 */
const configSchema = {
    // Application
    app: {
        name: process.env.APP_NAME || 'Suprema Integration API',
        version: process.env.APP_VERSION || '1.0.0',
        env: getEnvironment(),
        debug: parseBoolean(process.env.DEBUG, isDevelopment())
    },
    
    // Server
    server: {
        host: process.env.HOST || '0.0.0.0',
        port: parseInteger(process.env.PORT, 3000),
        corsOrigin: process.env.CORS_ORIGIN || '*',
        trustProxy: parseBoolean(process.env.TRUST_PROXY, false)
    },
    
    // Gateway (Suprema Device Gateway)
    gateway: {
        host: process.env.GATEWAY_HOST || 'localhost',
        port: parseInteger(process.env.GATEWAY_PORT, 4000),
        ip: process.env.GATEWAY_IP || process.env.GATEWAY_HOST || 'localhost',
        useSSL: parseBoolean(process.env.GATEWAY_SSL, false),
        caFile: process.env.GATEWAY_CA_FILE || null,
        reconnectInterval: parseInteger(process.env.GATEWAY_RECONNECT_INTERVAL, 5000),
        maxReconnectAttempts: parseInteger(process.env.GATEWAY_MAX_RECONNECT, 5)
    },
    
    // Database
    database: {
        url: process.env.DATABASE_URL,
        provider: process.env.DB_PROVIDER || 'mysql',
        host: process.env.DB_HOST || 'localhost',
        port: parseInteger(process.env.DB_PORT, 3306),
        name: process.env.DB_NAME || 'suprema_integration',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        poolMin: parseInteger(process.env.DB_POOL_MIN, 2),
        poolMax: parseInteger(process.env.DB_POOL_MAX, 10),
        logQueries: parseBoolean(process.env.DB_LOG_QUERIES, isDevelopment())
    },
    
    // Logging
    logging: {
        level: process.env.LOG_LEVEL || (isProduction() ? 'info' : 'debug'),
        format: process.env.LOG_FORMAT || 'json',
        file: process.env.LOG_FILE || './logs/application.log',
        maxSize: process.env.LOG_MAX_SIZE || '10m',
        maxFiles: parseInteger(process.env.LOG_MAX_FILES, 5),
        includeConsole: parseBoolean(process.env.LOG_CONSOLE, true)
    },
    
    // Security
    security: {
        jwtSecret: process.env.JWT_SECRET || 'change-this-secret-in-production',
        jwtExpiresIn: process.env.JWT_EXPIRES_IN || '24h',
        bcryptRounds: parseInteger(process.env.BCRYPT_ROUNDS, 10),
        rateLimitWindow: parseInteger(process.env.RATE_LIMIT_WINDOW, 15 * 60 * 1000), // 15 min
        rateLimitMax: parseInteger(process.env.RATE_LIMIT_MAX, 100)
    },
    
    // Features
    features: {
        enableWebhooks: parseBoolean(process.env.ENABLE_WEBHOOKS, false),
        webhookUrl: process.env.WEBHOOK_URL,
        enableMetrics: parseBoolean(process.env.ENABLE_METRICS, false),
        enableSwagger: parseBoolean(process.env.ENABLE_SWAGGER, isDevelopment()),
        maxEventsPerRequest: parseInteger(process.env.MAX_EVENTS, 1000),
        defaultTimeout: parseInteger(process.env.DEFAULT_TIMEOUT, 30000)
    },
    
    // Sync
    sync: {
        autoSyncInterval: parseInteger(process.env.AUTO_SYNC_INTERVAL, 0), // 0 = disabled
        eventPollInterval: parseInteger(process.env.EVENT_POLL_INTERVAL, 5000),
        batchSize: parseInteger(process.env.SYNC_BATCH_SIZE, 100)
    },
    
    // Paths
    paths: {
        root: process.cwd(),
        logs: process.env.LOG_DIR || './logs',
        certs: process.env.CERT_DIR || './cert',
        uploads: process.env.UPLOAD_DIR || './uploads'
    }
};

/**
 * Validate configuration
 * @returns {Object} Validation result
 */
function validateConfig() {
    const errors = [];
    
    // Required in production
    if (isProduction()) {
        if (!configSchema.database.url && !configSchema.database.host) {
            errors.push('Database configuration is required in production');
        }
        
        if (configSchema.security.jwtSecret === 'change-this-secret-in-production') {
            errors.push('JWT_SECRET must be set in production');
        }
    }
    
    // Port validation
    if (configSchema.server.port < 1 || configSchema.server.port > 65535) {
        errors.push('Server port must be between 1 and 65535');
    }
    
    return {
        valid: errors.length === 0,
        errors
    };
}

/**
 * Frozen configuration object
 */
const config = Object.freeze(configSchema);

/**
 * Get entire configuration
 * @returns {Object}
 */
export function getConfig() {
    return config;
}

/**
 * Get specific configuration section
 * @param {string} section - Configuration section name
 * @returns {Object|undefined}
 */
export function getSection(section) {
    return config[section];
}

/**
 * Get configuration value by path
 * @param {string} path - Dot-notation path (e.g., 'server.port')
 * @param {*} [defaultValue] - Default value if not found
 * @returns {*}
 */
export function get(path, defaultValue = undefined) {
    const keys = path.split('.');
    let result = config;
    
    for (const key of keys) {
        if (result === undefined || result === null) {
            return defaultValue;
        }
        result = result[key];
    }
    
    return result === undefined ? defaultValue : result;
}

/**
 * Check if feature is enabled
 * @param {string} feature - Feature name
 * @returns {boolean}
 */
export function isFeatureEnabled(feature) {
    const key = `enable${feature.charAt(0).toUpperCase() + feature.slice(1)}`;
    return config.features[key] === true;
}

// Validate on import
const validation = validateConfig();
if (!validation.valid) {
    console.warn('Configuration warnings:', validation.errors);
}

export default {
    ...config,
    getConfig,
    getSection,
    get,
    isFeatureEnabled,
    isProduction,
    isDevelopment,
    isTest,
    getEnvironment,
    ENVIRONMENTS
};
