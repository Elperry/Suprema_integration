/**
 * Configuration Validation Utilities
 * Helper functions for validating system configuration
 */

/**
 * Validate environment variables
 */
function validateEnvironment() {
    const required = [
        'GATEWAY_HOST',
        'GATEWAY_PORT',
        'LOG_LEVEL'
    ];

    const missing = required.filter(key => !process.env[key]);
    
    if (missing.length > 0) {
        throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }

    // Validate numeric values
    const numericVars = {
        GATEWAY_PORT: process.env.GATEWAY_PORT,
        API_PORT: process.env.API_PORT,
        MAX_EVENTS: process.env.MAX_EVENTS
    };

    for (const [key, value] of Object.entries(numericVars)) {
        if (value && isNaN(parseInt(value))) {
            throw new Error(`${key} must be a valid number, got: ${value}`);
        }
    }

    return {
        valid: true,
        gateway: {
            host: process.env.GATEWAY_HOST,
            port: parseInt(process.env.GATEWAY_PORT),
            useSSL: process.env.GATEWAY_SSL === 'true'
        },
        api: {
            port: parseInt(process.env.API_PORT) || 3000,
            corsOrigin: process.env.CORS_ORIGIN || '*'
        },
        logging: {
            level: process.env.LOG_LEVEL || 'info',
            file: process.env.LOG_FILE || './logs/application.log'
        },
        features: {
            maxEvents: parseInt(process.env.MAX_EVENTS) || 1000,
            enableWebhooks: process.env.ENABLE_WEBHOOKS === 'true',
            webhookUrl: process.env.WEBHOOK_URL
        }
    };
}

/**
 * Validate device configuration
 */
function validateDeviceConfig(config) {
    const required = ['ip', 'port'];
    const missing = required.filter(key => !config[key]);

    if (missing.length > 0) {
        throw new Error(`Device config missing required fields: ${missing.join(', ')}`);
    }

    if (!isValidIP(config.ip)) {
        throw new Error(`Invalid IP address: ${config.ip}`);
    }

    if (!isValidPort(config.port)) {
        throw new Error(`Invalid port number: ${config.port}`);
    }

    return true;
}

/**
 * Validate user data for enrollment
 */
function validateUserData(userData) {
    const required = ['userID', 'name'];
    const missing = required.filter(key => !userData[key]);

    if (missing.length > 0) {
        throw new Error(`User data missing required fields: ${missing.join(', ')}`);
    }

    // Validate user ID format
    if (!/^[a-zA-Z0-9_-]+$/.test(userData.userID)) {
        throw new Error('User ID can only contain alphanumeric characters, hyphens, and underscores');
    }

    // Validate email format if provided
    if (userData.email && !isValidEmail(userData.email)) {
        throw new Error(`Invalid email format: ${userData.email}`);
    }

    return true;
}

/**
 * Validate biometric template data
 */
function validateTemplateData(template, biometricType) {
    if (!template || !template.data) {
        throw new Error('Template data is required');
    }

    if (!biometricType) {
        throw new Error('Biometric type is required');
    }

    const validTypes = ['FINGERPRINT', 'FACE', 'CARD'];
    if (!validTypes.includes(biometricType.toUpperCase())) {
        throw new Error(`Invalid biometric type: ${biometricType}. Must be one of: ${validTypes.join(', ')}`);
    }

    // Validate template size
    const maxSize = 8192; // 8KB max template size
    if (template.data.length > maxSize) {
        throw new Error(`Template size exceeds maximum limit of ${maxSize} bytes`);
    }

    return true;
}

/**
 * Validate access control configuration
 */
function validateAccessConfig(config) {
    if (!config.doorIds || !Array.isArray(config.doorIds)) {
        throw new Error('Door IDs must be provided as an array');
    }

    if (config.schedule) {
        validateScheduleConfig(config.schedule);
    }

    if (config.accessLevel && typeof config.accessLevel !== 'string') {
        throw new Error('Access level must be a string');
    }

    return true;
}

/**
 * Validate schedule configuration
 */
function validateScheduleConfig(schedule) {
    const requiredFields = ['startTime', 'endTime'];
    const missing = requiredFields.filter(field => !schedule[field]);

    if (missing.length > 0) {
        throw new Error(`Schedule missing required fields: ${missing.join(', ')}`);
    }

    // Validate time format (HH:MM)
    const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(schedule.startTime)) {
        throw new Error(`Invalid start time format: ${schedule.startTime}. Expected HH:MM`);
    }

    if (!timeRegex.test(schedule.endTime)) {
        throw new Error(`Invalid end time format: ${schedule.endTime}. Expected HH:MM`);
    }

    return true;
}

/**
 * Helper functions
 */
function isValidIP(ip) {
    const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipRegex.test(ip);
}

function isValidPort(port) {
    const portNum = parseInt(port);
    return !isNaN(portNum) && portNum > 0 && portNum <= 65535;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

module.exports = {
    validateEnvironment,
    validateDeviceConfig,
    validateUserData,
    validateTemplateData,
    validateAccessConfig,
    validateScheduleConfig,
    isValidIP,
    isValidPort,
    isValidEmail
};