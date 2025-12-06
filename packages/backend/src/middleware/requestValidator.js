/**
 * Request Validation Middleware
 * Validates incoming requests against defined schemas
 */

/**
 * Simple schema-based validator
 */
class RequestValidator {
    /**
     * Validate a value against a schema definition
     */
    static validateField(value, schema, fieldName) {
        const errors = [];

        // Check required
        if (schema.required && (value === undefined || value === null || value === '')) {
            errors.push(`${fieldName} is required`);
            return errors;
        }

        // Skip validation if not required and not provided
        if (value === undefined || value === null) {
            return errors;
        }

        // Type validation
        if (schema.type) {
            const actualType = Array.isArray(value) ? 'array' : typeof value;
            
            if (schema.type === 'integer') {
                if (!Number.isInteger(Number(value))) {
                    errors.push(`${fieldName} must be an integer`);
                }
            } else if (schema.type === 'number') {
                if (isNaN(Number(value))) {
                    errors.push(`${fieldName} must be a number`);
                }
            } else if (schema.type === 'boolean') {
                if (typeof value !== 'boolean' && value !== 'true' && value !== 'false') {
                    errors.push(`${fieldName} must be a boolean`);
                }
            } else if (schema.type === 'array') {
                if (!Array.isArray(value)) {
                    errors.push(`${fieldName} must be an array`);
                }
            } else if (schema.type !== actualType) {
                errors.push(`${fieldName} must be of type ${schema.type}`);
            }
        }

        // String validations
        if (typeof value === 'string') {
            if (schema.minLength && value.length < schema.minLength) {
                errors.push(`${fieldName} must be at least ${schema.minLength} characters`);
            }
            if (schema.maxLength && value.length > schema.maxLength) {
                errors.push(`${fieldName} must be at most ${schema.maxLength} characters`);
            }
            if (schema.pattern && !new RegExp(schema.pattern).test(value)) {
                errors.push(`${fieldName} format is invalid`);
            }
            if (schema.enum && !schema.enum.includes(value)) {
                errors.push(`${fieldName} must be one of: ${schema.enum.join(', ')}`);
            }
        }

        // Number validations
        if (typeof value === 'number' || schema.type === 'number' || schema.type === 'integer') {
            const numValue = Number(value);
            if (!isNaN(numValue)) {
                if (schema.min !== undefined && numValue < schema.min) {
                    errors.push(`${fieldName} must be at least ${schema.min}`);
                }
                if (schema.max !== undefined && numValue > schema.max) {
                    errors.push(`${fieldName} must be at most ${schema.max}`);
                }
            }
        }

        // Array validations
        if (Array.isArray(value)) {
            if (schema.minItems && value.length < schema.minItems) {
                errors.push(`${fieldName} must have at least ${schema.minItems} items`);
            }
            if (schema.maxItems && value.length > schema.maxItems) {
                errors.push(`${fieldName} must have at most ${schema.maxItems} items`);
            }
            if (schema.items) {
                value.forEach((item, index) => {
                    const itemErrors = RequestValidator.validateField(
                        item, 
                        schema.items, 
                        `${fieldName}[${index}]`
                    );
                    errors.push(...itemErrors);
                });
            }
        }

        // Custom validator
        if (schema.validate && typeof schema.validate === 'function') {
            const customError = schema.validate(value);
            if (customError) {
                errors.push(customError);
            }
        }

        return errors;
    }

    /**
     * Validate an object against a schema
     */
    static validate(data, schema) {
        const errors = [];

        for (const [field, fieldSchema] of Object.entries(schema)) {
            const fieldErrors = RequestValidator.validateField(data[field], fieldSchema, field);
            errors.push(...fieldErrors);
        }

        return {
            valid: errors.length === 0,
            errors
        };
    }
}

/**
 * Create validation middleware for a specific schema
 */
function createValidator(schema, source = 'body') {
    return (req, res, next) => {
        const data = source === 'body' ? req.body : 
                     source === 'query' ? req.query : 
                     source === 'params' ? req.params : req.body;

        const result = RequestValidator.validate(data, schema);

        if (!result.valid) {
            return res.status(400).json({
                success: false,
                error: 'Validation Error',
                message: 'Request validation failed',
                errors: result.errors,
                requestId: req.requestId
            });
        }

        next();
    };
}

/**
 * Predefined schemas for common operations
 */
export const schemas = {
    // Device schemas
    deviceConnect: {
        ip: {
            type: 'string',
            required: true,
            pattern: '^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$'
        },
        port: {
            type: 'integer',
            min: 1,
            max: 65535
        },
        useSSL: {
            type: 'boolean'
        }
    },

    deviceId: {
        deviceId: {
            type: 'string',
            required: true,
            pattern: '^[0-9]+$'
        }
    },

    // User schemas
    userCreate: {
        userID: {
            type: 'string',
            required: true,
            minLength: 1,
            maxLength: 32,
            pattern: '^[a-zA-Z0-9_-]+$'
        },
        name: {
            type: 'string',
            required: true,
            minLength: 1,
            maxLength: 48
        },
        email: {
            type: 'string',
            pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$'
        },
        accessGroups: {
            type: 'array',
            items: {
                type: 'integer'
            }
        }
    },

    userEnroll: {
        deviceId: {
            type: 'string',
            required: true
        },
        users: {
            type: 'array',
            required: true,
            minItems: 1
        }
    },

    // Card schemas
    cardAssign: {
        cardCSN: {
            type: 'string',
            required: true,
            pattern: '^[A-Fa-f0-9]+$'
        },
        employeeId: {
            type: 'string',
            required: true
        }
    },

    // TNA schemas
    tnaQuery: {
        startDate: {
            type: 'string',
            pattern: '^\\d{4}-\\d{2}-\\d{2}$'
        },
        endDate: {
            type: 'string',
            pattern: '^\\d{4}-\\d{2}-\\d{2}$'
        },
        userId: {
            type: 'string'
        }
    },

    // Event schemas
    eventQuery: {
        startTime: {
            type: 'string'
        },
        endTime: {
            type: 'string'
        },
        eventType: {
            type: 'integer'
        },
        limit: {
            type: 'integer',
            min: 1,
            max: 10000
        }
    },

    // Pagination schemas
    pagination: {
        page: {
            type: 'integer',
            min: 1
        },
        limit: {
            type: 'integer',
            min: 1,
            max: 100
        },
        sortBy: {
            type: 'string'
        },
        sortOrder: {
            type: 'string',
            enum: ['asc', 'desc']
        }
    },

    // Employee schemas
    employeeCreate: {
        employeeId: {
            type: 'string',
            required: true,
            minLength: 1,
            maxLength: 50
        },
        firstName: {
            type: 'string',
            required: true,
            minLength: 1,
            maxLength: 100
        },
        lastName: {
            type: 'string',
            required: true,
            minLength: 1,
            maxLength: 100
        },
        email: {
            type: 'string',
            pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$'
        },
        department: {
            type: 'string',
            maxLength: 100
        },
        position: {
            type: 'string',
            maxLength: 100
        }
    },

    // Location schemas
    locationCreate: {
        name: {
            type: 'string',
            required: true,
            minLength: 1,
            maxLength: 100
        },
        description: {
            type: 'string',
            maxLength: 500
        },
        address: {
            type: 'string',
            maxLength: 255
        }
    }
};

/**
 * Middleware factory functions
 */
export const validate = {
    body: (schema) => createValidator(schema, 'body'),
    query: (schema) => createValidator(schema, 'query'),
    params: (schema) => createValidator(schema, 'params'),
    
    // Convenience methods for common schemas
    deviceConnect: () => createValidator(schemas.deviceConnect, 'body'),
    userCreate: () => createValidator(schemas.userCreate, 'body'),
    cardAssign: () => createValidator(schemas.cardAssign, 'body'),
    pagination: () => createValidator(schemas.pagination, 'query'),
    tnaQuery: () => createValidator(schemas.tnaQuery, 'query'),
    eventQuery: () => createValidator(schemas.eventQuery, 'query')
};

export default validate;
