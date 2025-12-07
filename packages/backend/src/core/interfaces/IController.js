/**
 * Controller Interface
 * Base interface for API controllers
 * Handles HTTP requests and responses
 */

/**
 * @interface IController
 * @description Base interface for HTTP controllers
 * 
 * Controller Layer Responsibilities:
 * - Request parsing and validation
 * - Response formatting
 * - Error handling for HTTP layer
 * - Route registration
 */

/**
 * HTTP Context
 * @typedef {Object} HttpContext
 * @property {Object} req - Express request object
 * @property {Object} res - Express response object
 * @property {Function} next - Express next function
 */

/**
 * Controller route definition
 * @typedef {Object} RouteDefinition
 * @property {string} method - HTTP method (GET, POST, etc.)
 * @property {string} path - Route path
 * @property {Function} handler - Route handler
 * @property {Array<Function>} [middleware] - Route-specific middleware
 * @property {Object} [schema] - Validation schema
 */

/**
 * Base Controller Interface
 */
export class IController {
    /**
     * Get base path for all routes in this controller
     * @returns {string}
     */
    getBasePath() {
        throw new Error('Method getBasePath() must be implemented');
    }

    /**
     * Get all route definitions
     * @returns {Array<RouteDefinition>}
     */
    getRoutes() {
        throw new Error('Method getRoutes() must be implemented');
    }

    /**
     * Register routes on Express router
     * @param {Object} router - Express router instance
     * @returns {void}
     */
    registerRoutes(router) {
        throw new Error('Method registerRoutes() must be implemented');
    }
}

/**
 * CRUD Controller Interface
 * Standard REST controller with CRUD operations
 * @extends IController
 */
export class ICrudController extends IController {
    /**
     * GET / - List all resources
     * @param {Object} req - Express request
     * @param {Object} res - Express response
     * @returns {Promise<void>}
     */
    async index(req, res) {
        throw new Error('Method index() must be implemented');
    }

    /**
     * GET /:id - Get single resource
     * @param {Object} req - Express request
     * @param {Object} res - Express response
     * @returns {Promise<void>}
     */
    async show(req, res) {
        throw new Error('Method show() must be implemented');
    }

    /**
     * POST / - Create new resource
     * @param {Object} req - Express request
     * @param {Object} res - Express response
     * @returns {Promise<void>}
     */
    async create(req, res) {
        throw new Error('Method create() must be implemented');
    }

    /**
     * PUT /:id - Update resource
     * @param {Object} req - Express request
     * @param {Object} res - Express response
     * @returns {Promise<void>}
     */
    async update(req, res) {
        throw new Error('Method update() must be implemented');
    }

    /**
     * DELETE /:id - Delete resource
     * @param {Object} req - Express request
     * @param {Object} res - Express response
     * @returns {Promise<void>}
     */
    async destroy(req, res) {
        throw new Error('Method destroy() must be implemented');
    }
}

export default {
    IController,
    ICrudController
};
