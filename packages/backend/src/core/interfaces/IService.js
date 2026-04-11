/**
 * Service Interface
 * Base interface for all business logic services
 * Defines the contract that all services must follow
 */

/**
 * @interface IService
 * @description Base interface for service layer components
 * 
 * Service Layer Responsibilities:
 * - Implements business logic
 * - Orchestrates operations across repositories
 * - Handles transactions
 * - Emits domain events
 */

/**
 * Service configuration options
 * @typedef {Object} ServiceConfig
 * @property {Object} logger - Logger instance
 * @property {Object} [eventEmitter] - Event emitter for domain events
 * @property {Object} [cache] - Cache instance for service-level caching
 */

/**
 * Service result wrapper
 * @typedef {Object} ServiceResult
 * @property {boolean} success - Operation success status
 * @property {*} [data] - Result data
 * @property {string} [message] - Status message
 * @property {Object} [meta] - Additional metadata
 */

/**
 * Base Service Interface
 * All services should implement these core methods
 */
export class IService {
    /**
     * Initialize the service
     * @returns {Promise<void>}
     */
    async initialize() {
        throw new Error('Method initialize() must be implemented');
    }

    /**
     * Check if service is healthy/ready
     * @returns {Promise<boolean>}
     */
    async healthCheck() {
        throw new Error('Method healthCheck() must be implemented');
    }

    /**
     * Get service name for logging/identification
     * @returns {string}
     */
    getServiceName() {
        throw new Error('Method getServiceName() must be implemented');
    }

    /**
     * Cleanup resources on shutdown
     * @returns {Promise<void>}
     */
    async dispose() {
        throw new Error('Method dispose() must be implemented');
    }
}

/**
 * CRUD Service Interface
 * For services that manage entities
 * @extends IService
 */
export class ICrudService extends IService {
    /**
     * Get entity by ID
     * @param {string|number} id - Entity ID
     * @returns {Promise<ServiceResult>}
     */
    async getById(id) {
        throw new Error('Method getById() must be implemented');
    }

    /**
     * Get all entities with optional filters
     * @param {Object} [filters] - Query filters
     * @returns {Promise<ServiceResult>}
     */
    async getAll(filters) {
        throw new Error('Method getAll() must be implemented');
    }

    /**
     * Create a new entity
     * @param {Object} data - Entity data
     * @returns {Promise<ServiceResult>}
     */
    async create(data) {
        throw new Error('Method create() must be implemented');
    }

    /**
     * Update an existing entity
     * @param {string|number} id - Entity ID
     * @param {Object} data - Updated data
     * @returns {Promise<ServiceResult>}
     */
    async update(id, data) {
        throw new Error('Method update() must be implemented');
    }

    /**
     * Delete an entity
     * @param {string|number} id - Entity ID
     * @returns {Promise<ServiceResult>}
     */
    async delete(id) {
        throw new Error('Method delete() must be implemented');
    }
}

/**
 * Device Service Interface
 * For services that interact with Suprema devices
 * @extends IService
 */
export class IDeviceService extends IService {
    /**
     * Execute operation on device
     * @param {string|number} deviceId - Device identifier
     * @param {string} operation - Operation name
     * @param {Object} [params] - Operation parameters
     * @returns {Promise<ServiceResult>}
     */
    async executeOnDevice(deviceId, operation, params) {
        throw new Error('Method executeOnDevice() must be implemented');
    }

    /**
     * Check device connectivity
     * @param {string|number} deviceId - Device identifier
     * @returns {Promise<boolean>}
     */
    async isDeviceConnected(deviceId) {
        throw new Error('Method isDeviceConnected() must be implemented');
    }
}

/**
 * Sync Service Interface
 * For services that handle data synchronization
 * @extends IService
 */
export class ISyncService extends IService {
    /**
     * Sync from source to target
     * @param {Object} options - Sync options
     * @returns {Promise<ServiceResult>}
     */
    async sync(options) {
        throw new Error('Method sync() must be implemented');
    }

    /**
     * Get sync status
     * @returns {Promise<Object>}
     */
    async getSyncStatus() {
        throw new Error('Method getSyncStatus() must be implemented');
    }
}

export default {
    IService,
    ICrudService,
    IDeviceService,
    ISyncService
};
