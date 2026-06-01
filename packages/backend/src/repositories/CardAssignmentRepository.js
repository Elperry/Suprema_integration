/**
 * Card Assignment Repository
 * Data access layer for CardAssignment entity
 * Extends BaseRepository with card-specific operations
 */

import { BaseRepository } from '../core/base/BaseRepository.js';

/**
 * @class CardAssignmentRepository
 * @extends BaseRepository
 * @description Repository for CardAssignment entity operations
 */
export class CardAssignmentRepository extends BaseRepository {
    /**
     * @param {Object} prisma - Prisma client instance
     * @param {Object} logger - Logger instance
     */
    constructor(prisma, logger) {
        super(prisma, 'cardAssignment', logger);
    }

    /**
     * Find all active card assignments
     * 
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>}
     */
    async findActive(options = {}) {
        return this.findMany({
            where: { status: 'active', ...options.where },
            include: options.include || { enrollments: true },
            orderBy: options.orderBy || { assignedAt: 'desc' }
        });
    }

    /**
     * Find by user ID (local user table FK)
     *
     * @param {number} userId - User.id
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>}
     */
    async findByUserId(userId, options = {}) {
        return this.findMany({
            where: { user_id: userId },
            include: options.include || { user: true, enrollments: { include: { device: true } } },
            orderBy: { assignedAt: 'desc' }
        });
    }

    /**
     * Find by employee ID — resolves to user first, then queries by user_id.
     *
     * @param {number|string} employeeId - employee.id from the employee table
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>}
     */
    async findByEmployeeId(employeeId, options = {}) {
        const user = await this.prisma.user.findFirst({
            where: { employee_id: Number(employeeId) },
            select: { id: true },
        });
        if (!user) return [];
        return this.findByUserId(user.id, options);
    }

    /**
     * Find by card data
     * 
     * @param {string} cardData - Card data (hex or Base64)
     * @returns {Promise<Object|null>}
     */
    async findByCardData(cardData) {
        return this.findOne(
            { card_data: cardData },
            { include: { user: true, enrollments: { include: { device: true } } } }
        );
    }

    /**
     * Find with enrollments
     * 
     * @param {number} id - Assignment ID
     * @returns {Promise<Object|null>}
     */
    async findWithEnrollments(id) {
        return this.findById(id, {
            include: {
                user: true,
                enrollments: {
                    include: { device: true }
                }
            }
        });
    }

    /**
     * Revoke card assignment
     * 
     * @param {number} id - Assignment ID
     * @param {string} [reason] - Revocation reason
     * @returns {Promise<Object>}
     */
    async revoke(id, reason = '') {
        return this.update(id, {
            status: 'revoked',
            revokedAt: new Date(),
            notes: reason ? `Revoked: ${reason}` : 'Revoked'
        }, {
            include: {
                enrollments: { include: { device: true } }
            }
        });
    }

    /**
     * Reactivate card assignment
     * 
     * @param {number} id - Assignment ID
     * @returns {Promise<Object>}
     */
    async reactivate(id) {
        return this.update(id, {
            status: 'active',
            revokedAt: null,
            notes: null
        });
    }

    /**
     * Find assignments for sync
     * 
     * @returns {Promise<Array>}
     */
    async findForSync() {
        return this.findMany({
            where: { status: 'active' },
            include: {
                user: true,
                enrollments: {
                    include: { device: true },
                    where: { status: { in: ['active', 'pending'] } }
                }
            }
        });
    }

    /**
     * Get assignment statistics
     * 
     * @returns {Promise<Object>}
     */
    async getStatistics() {
        const [total, active, revoked] = await Promise.all([
            this.count(),
            this.count({ status: 'active' }),
            this.count({ status: 'revoked' }),
        ]);

        return { total, active, revoked };
    }
}

export default CardAssignmentRepository;
