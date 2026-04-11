/**
 * Base Controller
 * Abstract base class for all API controllers
 * Provides common request handling patterns
 */

import { IController } from '../interfaces/IController.js';

/**
 * @class BaseController
 * @implements IController
 * @description Base implementation for Express controllers
 * 
 * Features:
 * - Standardized response formatting
 * - Error handling wrapper
 * - Request validation integration
 * - Route registration helpers
 */
export class BaseController {
    /**
     * @param {Object} options - Controller options
     * @param {Object} options.logger - Logger instance
     * @param {string} [options.basePath] - Base path for routes
     */
    constructor(options = {}) {
        if (!options.logger) {
            throw new Error('Logger is required for controller initialization');
        }
        
        this.logger = options.logger;
        this.basePath = options.basePath || '/';
        this.routes = [];
    }

    /**
     * Get base path for routes
     * @returns {string}
     */
    getBasePath() {
        return this.basePath;
    }

    /**
     * Get registered routes
     * @returns {Array}
     */
    getRoutes() {
        return this.routes;
    }

    /**
     * Register routes on Express router
     * @param {Object} router - Express router
     */
    registerRoutes(router) {
        for (const route of this.routes) {
            const { method, path, handler, middleware = [] } = route;
            const handlers = [...middleware, this.asyncHandler(handler)];
            router[method.toLowerCase()](path, ...handlers);
        }
    }

    /**
     * Add route definition
     * @protected
     * @param {string} method - HTTP method
     * @param {string} path - Route path
     * @param {Function} handler - Request handler
     * @param {Array} [middleware] - Route middleware
     */
    addRoute(method, path, handler, middleware = []) {
        this.routes.push({
            method: method.toUpperCase(),
            path,
            handler: handler.bind(this),
            middleware
        });
    }

    /**
     * Wrap async handlers to catch errors
     * @param {Function} fn - Async handler function
     * @returns {Function}
     */
    asyncHandler(fn) {
        return (req, res, next) => {
            Promise.resolve(fn(req, res, next)).catch(next);
        };
    }

    /**
     * Send success response
     * @protected
     * @param {Object} res - Express response
     * @param {*} data - Response data
     * @param {string} [message] - Success message
     * @param {number} [statusCode=200] - HTTP status code
     */
    sendSuccess(res, data, message = 'Success', statusCode = 200) {
        res.status(statusCode).json({
            success: true,
            data,
            message,
            timestamp: new Date().toISOString()
        });
    }

    /**
     * Send created response
     * @protected
     * @param {Object} res - Express response
     * @param {*} data - Created resource data
     * @param {string} [message] - Success message
     */
    sendCreated(res, data, message = 'Resource created') {
        this.sendSuccess(res, data, message, 201);
    }

    /**
     * Send no content response
     * @protected
     * @param {Object} res - Express response
     */
    sendNoContent(res) {
        res.status(204).send();
    }

    /**
     * Send error response
     * @protected
     * @param {Object} res - Express response
     * @param {string} message - Error message
     * @param {number} [statusCode=500] - HTTP status code
     * @param {string} [code] - Error code
     * @param {Object} [details] - Additional error details
     */
    sendError(res, message, statusCode = 500, code = 'ERROR', details = {}) {
        res.status(statusCode).json({
            success: false,
            error: code,
            message,
            ...details,
            timestamp: new Date().toISOString()
        });
    }

    /**
     * Send bad request response
     * @protected
     * @param {Object} res - Express response
     * @param {string} message - Error message
     * @param {Object} [details] - Validation details
     */
    sendBadRequest(res, message, details = {}) {
        this.sendError(res, message, 400, 'BAD_REQUEST', details);
    }

    /**
     * Send not found response
     * @protected
     * @param {Object} res - Express response
     * @param {string} [resource] - Resource name
     */
    sendNotFound(res, resource = 'Resource') {
        this.sendError(res, `${resource} not found`, 404, 'NOT_FOUND');
    }

    /**
     * Send unauthorized response
     * @protected
     * @param {Object} res - Express response
     * @param {string} [message] - Error message
     */
    sendUnauthorized(res, message = 'Unauthorized') {
        this.sendError(res, message, 401, 'UNAUTHORIZED');
    }

    /**
     * Send forbidden response
     * @protected
     * @param {Object} res - Express response
     * @param {string} [message] - Error message
     */
    sendForbidden(res, message = 'Forbidden') {
        this.sendError(res, message, 403, 'FORBIDDEN');
    }

    /**
     * Send paginated response
     * @protected
     * @param {Object} res - Express response
     * @param {Object} paginatedResult - Paginated result from repository
     */
    sendPaginated(res, paginatedResult) {
        res.status(200).json({
            success: true,
            data: paginatedResult.data,
            pagination: {
                total: paginatedResult.total,
                page: paginatedResult.page,
                pageSize: paginatedResult.pageSize,
                totalPages: paginatedResult.totalPages,
                hasNext: paginatedResult.hasNext,
                hasPrev: paginatedResult.hasPrev
            },
            timestamp: new Date().toISOString()
        });
    }

    /**
     * Parse pagination params from request
     * @protected
     * @param {Object} req - Express request
     * @returns {Object}
     */
    parsePagination(req) {
        const page = parseInt(req.query.page) || 1;
        const pageSize = Math.min(parseInt(req.query.pageSize) || 20, 100);
        const sortBy = req.query.sortBy || 'id';
        const sortOrder = req.query.sortOrder === 'asc' ? 'asc' : 'desc';

        return {
            page,
            pageSize,
            orderBy: { [sortBy]: sortOrder }
        };
    }

    /**
     * Parse ID from request params
     * @protected
     * @param {Object} req - Express request
     * @param {string} [paramName='id'] - Parameter name
     * @returns {number}
     */
    parseId(req, paramName = 'id') {
        const id = parseInt(req.params[paramName]);
        if (isNaN(id)) {
            throw new Error(`Invalid ${paramName} parameter`);
        }
        return id;
    }
}

export default BaseController;
