/**
 * Base Repository
 * Abstract base class for data access layer
 * Implements common Prisma operations
 */

import { IRepository } from '../interfaces/IRepository.js';

/**
 * @class BaseRepository
 * @implements IRepository
 * @description Base implementation for Prisma-based repositories
 * 
 * Features:
 * - Standard CRUD operations
 * - Pagination support
 * - Transaction handling
 * - Query building helpers
 */
export class BaseRepository {
    /**
     * @param {Object} prisma - Prisma client instance
     * @param {string} modelName - Name of the Prisma model
     * @param {Object} logger - Logger instance
     */
    constructor(prisma, modelName, logger) {
        if (!prisma) {
            throw new Error('Prisma client is required');
        }
        if (!modelName) {
            throw new Error('Model name is required');
        }
        
        this.prisma = prisma;
        this.modelName = modelName;
        this.model = prisma[modelName];
        this.logger = logger || console;
        
        if (!this.model) {
            throw new Error(`Model '${modelName}' not found in Prisma client`);
        }
    }

    /**
     * Find entity by ID
     * @param {string|number} id - Entity ID
     * @param {Object} [options] - Query options
     * @returns {Promise<Object|null>}
     */
    async findById(id, options = {}) {
        try {
            return await this.model.findUnique({
                where: { id: this._normalizeId(id) },
                ...options
            });
        } catch (error) {
            this.logger.error(`[${this.modelName}] findById error:`, error);
            throw error;
        }
    }

    /**
     * Find single entity matching criteria
     * @param {Object} where - Filter criteria
     * @param {Object} [options] - Query options
     * @returns {Promise<Object|null>}
     */
    async findOne(where, options = {}) {
        try {
            return await this.model.findFirst({
                where,
                ...options
            });
        } catch (error) {
            this.logger.error(`[${this.modelName}] findOne error:`, error);
            throw error;
        }
    }

    /**
     * Find all entities matching criteria
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>}
     */
    async findMany(options = {}) {
        try {
            return await this.model.findMany(options);
        } catch (error) {
            this.logger.error(`[${this.modelName}] findMany error:`, error);
            throw error;
        }
    }

    /**
     * Find with pagination
     * @param {Object} options - Query options with pagination
     * @returns {Promise<Object>}
     */
    async findPaginated(options = {}) {
        const {
            page = 1,
            pageSize = 20,
            where = {},
            orderBy = { id: 'desc' },
            include,
            select
        } = options;

        try {
            const skip = (page - 1) * pageSize;
            
            const [data, total] = await Promise.all([
                this.model.findMany({
                    where,
                    orderBy,
                    skip,
                    take: pageSize,
                    include,
                    select
                }),
                this.model.count({ where })
            ]);

            return {
                data,
                total,
                page,
                pageSize,
                totalPages: Math.ceil(total / pageSize),
                hasNext: page * pageSize < total,
                hasPrev: page > 1
            };
        } catch (error) {
            this.logger.error(`[${this.modelName}] findPaginated error:`, error);
            throw error;
        }
    }

    /**
     * Create new entity
     * @param {Object} data - Entity data
     * @param {Object} [options] - Additional options
     * @returns {Promise<Object>}
     */
    async create(data, options = {}) {
        try {
            return await this.model.create({
                data,
                ...options
            });
        } catch (error) {
            this.logger.error(`[${this.modelName}] create error:`, error);
            throw error;
        }
    }

    /**
     * Create many entities
     * @param {Array<Object>} data - Array of entity data
     * @returns {Promise<Object>}
     */
    async createMany(data) {
        try {
            return await this.model.createMany({
                data,
                skipDuplicates: true
            });
        } catch (error) {
            this.logger.error(`[${this.modelName}] createMany error:`, error);
            throw error;
        }
    }

    /**
     * Update entity by ID
     * @param {string|number} id - Entity ID
     * @param {Object} data - Updated data
     * @param {Object} [options] - Additional options
     * @returns {Promise<Object>}
     */
    async update(id, data, options = {}) {
        try {
            return await this.model.update({
                where: { id: this._normalizeId(id) },
                data,
                ...options
            });
        } catch (error) {
            this.logger.error(`[${this.modelName}] update error:`, error);
            throw error;
        }
    }

    /**
     * Update many entities matching criteria
     * @param {Object} where - Filter criteria
     * @param {Object} data - Updated data
     * @returns {Promise<Object>}
     */
    async updateMany(where, data) {
        try {
            return await this.model.updateMany({
                where,
                data
            });
        } catch (error) {
            this.logger.error(`[${this.modelName}] updateMany error:`, error);
            throw error;
        }
    }

    /**
     * Upsert entity
     * @param {Object} where - Unique identifier criteria
     * @param {Object} create - Data for creation
     * @param {Object} update - Data for update
     * @param {Object} [options] - Additional options
     * @returns {Promise<Object>}
     */
    async upsert(where, create, update, options = {}) {
        try {
            return await this.model.upsert({
                where,
                create,
                update,
                ...options
            });
        } catch (error) {
            this.logger.error(`[${this.modelName}] upsert error:`, error);
            throw error;
        }
    }

    /**
     * Delete entity by ID
     * @param {string|number} id - Entity ID
     * @returns {Promise<Object>}
     */
    async delete(id) {
        try {
            return await this.model.delete({
                where: { id: this._normalizeId(id) }
            });
        } catch (error) {
            this.logger.error(`[${this.modelName}] delete error:`, error);
            throw error;
        }
    }

    /**
     * Delete many entities matching criteria
     * @param {Object} where - Filter criteria
     * @returns {Promise<Object>}
     */
    async deleteMany(where) {
        try {
            return await this.model.deleteMany({ where });
        } catch (error) {
            this.logger.error(`[${this.modelName}] deleteMany error:`, error);
            throw error;
        }
    }

    /**
     * Count entities matching criteria
     * @param {Object} [where] - Filter criteria
     * @returns {Promise<number>}
     */
    async count(where = {}) {
        try {
            return await this.model.count({ where });
        } catch (error) {
            this.logger.error(`[${this.modelName}] count error:`, error);
            throw error;
        }
    }

    /**
     * Check if entity exists
     * @param {Object} where - Filter criteria
     * @returns {Promise<boolean>}
     */
    async exists(where) {
        try {
            const count = await this.model.count({ where });
            return count > 0;
        } catch (error) {
            this.logger.error(`[${this.modelName}] exists error:`, error);
            throw error;
        }
    }

    /**
     * Execute raw query
     * @param {string} query - Raw SQL query
     * @param {Array} [params] - Query parameters
     * @returns {Promise<*>}
     */
    async executeRaw(query, params = []) {
        try {
            return await this.prisma.$queryRawUnsafe(query, ...params);
        } catch (error) {
            this.logger.error(`[${this.modelName}] executeRaw error:`, error);
            throw error;
        }
    }

    /**
     * Execute operations in a transaction
     * @param {Function} operations - Operations function
     * @returns {Promise<*>}
     */
    async transaction(operations) {
        try {
            return await this.prisma.$transaction(operations);
        } catch (error) {
            this.logger.error(`[${this.modelName}] transaction error:`, error);
            throw error;
        }
    }

    /**
     * Normalize ID to proper type
     * @private
     * @param {string|number} id - Input ID
     * @returns {number}
     */
    _normalizeId(id) {
        return typeof id === 'string' ? parseInt(id, 10) : id;
    }

    /**
     * Build where clause from filters
     * @protected
     * @param {Object} filters - Filter object
     * @param {Object} fieldMappings - Field name mappings
     * @returns {Object}
     */
    buildWhereClause(filters = {}, fieldMappings = {}) {
        const where = {};
        
        for (const [key, value] of Object.entries(filters)) {
            if (value === undefined || value === null || value === '') {
                continue;
            }
            
            const fieldName = fieldMappings[key] || key;
            
            // Handle different value types
            if (typeof value === 'string' && value.includes('*')) {
                // Wildcard search
                where[fieldName] = {
                    contains: value.replace(/\*/g, '')
                };
            } else if (Array.isArray(value)) {
                where[fieldName] = { in: value };
            } else {
                where[fieldName] = value;
            }
        }
        
        return where;
    }
}

export default BaseRepository;
