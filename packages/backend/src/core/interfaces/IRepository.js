/**
 * Repository Interface
 * Base interface for data access layer
 * Abstracts database operations from business logic
 */

/**
 * @interface IRepository
 * @description Base interface for data access components
 * 
 * Repository Layer Responsibilities:
 * - CRUD operations on data entities
 * - Query building and execution
 * - Data mapping and transformation
 * - Transaction participation
 */

/**
 * Query options for repository methods
 * @typedef {Object} QueryOptions
 * @property {Object} [where] - Filter conditions
 * @property {Object} [orderBy] - Sort order
 * @property {number} [skip] - Offset for pagination
 * @property {number} [take] - Limit for pagination
 * @property {Object} [include] - Related entities to include
 * @property {Object} [select] - Fields to select
 */

/**
 * Paginated result
 * @typedef {Object} PaginatedResult
 * @property {Array} data - Result items
 * @property {number} total - Total count
 * @property {number} page - Current page
 * @property {number} pageSize - Items per page
 * @property {number} totalPages - Total pages
 */

/**
 * Base Repository Interface
 */
export class IRepository {
    /**
     * Find entity by ID
     * @param {string|number} id - Entity ID
     * @param {Object} [options] - Query options
     * @returns {Promise<Object|null>}
     */
    async findById(id, options) {
        throw new Error('Method findById() must be implemented');
    }

    /**
     * Find single entity matching criteria
     * @param {Object} where - Filter criteria
     * @param {Object} [options] - Query options
     * @returns {Promise<Object|null>}
     */
    async findOne(where, options) {
        throw new Error('Method findOne() must be implemented');
    }

    /**
     * Find all entities matching criteria
     * @param {QueryOptions} [options] - Query options
     * @returns {Promise<Array>}
     */
    async findMany(options) {
        throw new Error('Method findMany() must be implemented');
    }

    /**
     * Find with pagination
     * @param {QueryOptions} options - Query options with pagination
     * @returns {Promise<PaginatedResult>}
     */
    async findPaginated(options) {
        throw new Error('Method findPaginated() must be implemented');
    }

    /**
     * Create new entity
     * @param {Object} data - Entity data
     * @returns {Promise<Object>}
     */
    async create(data) {
        throw new Error('Method create() must be implemented');
    }

    /**
     * Create many entities
     * @param {Array<Object>} data - Array of entity data
     * @returns {Promise<Array>}
     */
    async createMany(data) {
        throw new Error('Method createMany() must be implemented');
    }

    /**
     * Update entity by ID
     * @param {string|number} id - Entity ID
     * @param {Object} data - Updated data
     * @returns {Promise<Object>}
     */
    async update(id, data) {
        throw new Error('Method update() must be implemented');
    }

    /**
     * Update many entities matching criteria
     * @param {Object} where - Filter criteria
     * @param {Object} data - Updated data
     * @returns {Promise<number>} - Count of updated entities
     */
    async updateMany(where, data) {
        throw new Error('Method updateMany() must be implemented');
    }

    /**
     * Upsert entity (create or update)
     * @param {Object} where - Unique identifier criteria
     * @param {Object} create - Data for creation
     * @param {Object} update - Data for update
     * @returns {Promise<Object>}
     */
    async upsert(where, create, update) {
        throw new Error('Method upsert() must be implemented');
    }

    /**
     * Delete entity by ID
     * @param {string|number} id - Entity ID
     * @returns {Promise<Object>}
     */
    async delete(id) {
        throw new Error('Method delete() must be implemented');
    }

    /**
     * Delete many entities matching criteria
     * @param {Object} where - Filter criteria
     * @returns {Promise<number>} - Count of deleted entities
     */
    async deleteMany(where) {
        throw new Error('Method deleteMany() must be implemented');
    }

    /**
     * Count entities matching criteria
     * @param {Object} [where] - Filter criteria
     * @returns {Promise<number>}
     */
    async count(where) {
        throw new Error('Method count() must be implemented');
    }

    /**
     * Check if entity exists
     * @param {Object} where - Filter criteria
     * @returns {Promise<boolean>}
     */
    async exists(where) {
        throw new Error('Method exists() must be implemented');
    }

    /**
     * Execute raw query (use sparingly)
     * @param {string} query - Raw query string
     * @param {Array} [params] - Query parameters
     * @returns {Promise<*>}
     */
    async executeRaw(query, params) {
        throw new Error('Method executeRaw() must be implemented');
    }

    /**
     * Execute operations in a transaction
     * @param {Function} operations - Operations to execute
     * @returns {Promise<*>}
     */
    async transaction(operations) {
        throw new Error('Method transaction() must be implemented');
    }
}

export default IRepository;
