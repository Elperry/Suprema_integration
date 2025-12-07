/**
 * Base Service
 * Abstract base class for all services
 * Provides common functionality and enforces interface contract
 */

import { EventEmitter } from 'events';
import { IService } from '../interfaces/IService.js';

/**
 * @class BaseService
 * @extends EventEmitter
 * @implements IService
 * @description Base implementation for service layer
 * 
 * Features:
 * - Event emission for domain events
 * - Logging integration
 * - Health check capability
 * - Lifecycle management
 */
export class BaseService extends EventEmitter {
    /**
     * @param {Object} options - Service options
     * @param {Object} options.logger - Logger instance
     * @param {string} [options.serviceName] - Service name for identification
     */
    constructor(options = {}) {
        super();
        
        if (!options.logger) {
            throw new Error('Logger is required for service initialization');
        }
        
        this.logger = options.logger;
        this.serviceName = options.serviceName || this.constructor.name;
        this.isInitialized = false;
        this.isDisposed = false;
        
        // Performance metrics
        this.metrics = {
            operationsCount: 0,
            errorsCount: 0,
            lastOperationTime: null
        };
    }

    /**
     * Initialize the service
     * Override in subclasses for specific initialization
     * @returns {Promise<void>}
     */
    async initialize() {
        if (this.isInitialized) {
            this.logger.warn(`${this.serviceName} already initialized`);
            return;
        }
        
        this.logger.info(`Initializing ${this.serviceName}...`);
        this.isInitialized = true;
        this.emit('initialized', { service: this.serviceName });
    }

    /**
     * Check if service is healthy
     * Override in subclasses for specific health checks
     * @returns {Promise<boolean>}
     */
    async healthCheck() {
        return this.isInitialized && !this.isDisposed;
    }

    /**
     * Get service name
     * @returns {string}
     */
    getServiceName() {
        return this.serviceName;
    }

    /**
     * Dispose service resources
     * Override in subclasses for cleanup
     * @returns {Promise<void>}
     */
    async dispose() {
        if (this.isDisposed) {
            return;
        }
        
        this.logger.info(`Disposing ${this.serviceName}...`);
        this.isDisposed = true;
        this.removeAllListeners();
        this.emit('disposed', { service: this.serviceName });
    }

    /**
     * Log and track operation
     * @protected
     * @param {string} operation - Operation name
     * @param {Function} fn - Operation function
     * @returns {Promise<*>}
     */
    async executeOperation(operation, fn) {
        const startTime = Date.now();
        
        try {
            this.metrics.operationsCount++;
            this.logger.debug(`[${this.serviceName}] Starting ${operation}`);
            
            const result = await fn();
            
            const duration = Date.now() - startTime;
            this.metrics.lastOperationTime = new Date();
            
            this.logger.debug(`[${this.serviceName}] ${operation} completed in ${duration}ms`);
            
            return result;
        } catch (error) {
            this.metrics.errorsCount++;
            this.logger.error(`[${this.serviceName}] ${operation} failed:`, error);
            throw error;
        }
    }

    /**
     * Create a success result
     * @protected
     * @param {*} data - Result data
     * @param {string} [message] - Success message
     * @param {Object} [meta] - Additional metadata
     * @returns {Object}
     */
    successResult(data, message = 'Operation successful', meta = {}) {
        return {
            success: true,
            data,
            message,
            meta: {
                ...meta,
                timestamp: new Date().toISOString(),
                service: this.serviceName
            }
        };
    }

    /**
     * Create an error result
     * @protected
     * @param {string} message - Error message
     * @param {string} [code] - Error code
     * @param {Object} [details] - Error details
     * @returns {Object}
     */
    errorResult(message, code = 'OPERATION_ERROR', details = {}) {
        return {
            success: false,
            error: {
                message,
                code,
                ...details
            },
            meta: {
                timestamp: new Date().toISOString(),
                service: this.serviceName
            }
        };
    }

    /**
     * Get service metrics
     * @returns {Object}
     */
    getMetrics() {
        return {
            ...this.metrics,
            isInitialized: this.isInitialized,
            isDisposed: this.isDisposed
        };
    }
}

export default BaseService;
