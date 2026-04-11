/**
 * Card Assignment Repository
 * Data access layer for CardAssignment entity
 * Extends BaseRepository with card-specific operations
 */

import { BaseRepository } from '../../core/base/BaseRepository.js';

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
     * Find by employee ID
     * 
     * @param {string} employeeId - Employee ID
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>}
     */
    async findByEmployeeId(employeeId, options = {}) {
        return this.findMany({
            where: { employeeId },
            include: options.include || { enrollments: { include: { device: true } } },
            orderBy: { assignedAt: 'desc' }
        });
    }

    /**
     * Find by card data
     * 
     * @param {string} cardData - Card data (hex or Base64)
     * @returns {Promise<Object|null>}
     */
    async findByCardData(cardData) {
        return this.findOne(
            { cardData },
            { include: { enrollments: { include: { device: true } } } }
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
        const [total, active, revoked, byType] = await Promise.all([
            this.count(),
            this.count({ status: 'active' }),
            this.count({ status: 'revoked' }),
            this.prisma.cardAssignment.groupBy({
                by: ['cardType'],
                _count: { cardType: true }
            })
        ]);

        return {
            total,
            active,
            revoked,
            byType: byType.reduce((acc, item) => {
                acc[item.cardType] = item._count.cardType;
                return acc;
            }, {})
        };
    }
}

export default CardAssignmentRepository;
