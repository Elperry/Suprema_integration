/**
 * Event Repository
 * Data access layer for Event entity
 */

import { BaseRepository } from '../core/base/BaseRepository.js';

/**
 * @class EventRepository
 * @extends BaseRepository
 * @description Repository for Event entity operations
 */
export class EventRepository extends BaseRepository {
    /**
     * @param {Object} prisma - Prisma client instance
     * @param {Object} logger - Logger instance
     */
    constructor(prisma, logger) {
        super(prisma, 'event', logger);
    }

    /**
     * Find events by device
     * 
     * @param {number} deviceId - Device database ID
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>}
     */
    async findByDevice(deviceId, options = {}) {
        return this.findMany({
            where: { deviceId, ...options.where },
            orderBy: options.orderBy || { timestamp: 'desc' },
            take: options.limit || 100
        });
    }

    /**
     * Find events by user
     * 
     * @param {string} userId - User ID
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>}
     */
    async findByUser(userId, options = {}) {
        return this.findMany({
            where: { userId, ...options.where },
            orderBy: { timestamp: 'desc' },
            take: options.limit || 100
        });
    }

    /**
     * Find events by type
     * 
     * @param {string} eventType - Event type
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>}
     */
    async findByType(eventType, options = {}) {
        return this.findMany({
            where: { eventType, ...options.where },
            orderBy: { timestamp: 'desc' },
            take: options.limit || 100
        });
    }

    /**
     * Find events in time range
     * 
     * @param {Date} startTime - Start time
     * @param {Date} endTime - End time
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>}
     */
    async findInTimeRange(startTime, endTime, options = {}) {
        return this.findMany({
            where: {
                timestamp: {
                    gte: startTime,
                    lte: endTime
                },
                ...options.where
            },
            orderBy: { timestamp: 'desc' },
            take: options.limit || 1000
        });
    }

    /**
     * Find latest event for device
     * 
     * @param {number} deviceId - Device database ID
     * @returns {Promise<Object|null>}
     */
    async findLatestByDevice(deviceId) {
        return this.findOne(
            { deviceId },
            { orderBy: { supremaEventId: 'desc' } }
        );
    }

    /**
     * Find the latest persisted event for every device in a single query.
     * Returns a Map<deviceId, { supremaEventId, timestamp }> for O(1) lookup
     * in health-status reporting — avoids N per-device round-trips.
     *
     * @param {number[]} [deviceIds] - Optional whitelist; omit to fetch all devices.
     * @returns {Promise<Map<number, { supremaEventId: BigInt, timestamp: Date }>>}
     */
    async findLatestPerDevice(deviceIds = null) {
        // GROUP BY deviceId, pick the row with the highest supremaEventId.
        // Prisma doesn't support window functions natively, so we use a raw
        // aggregate + a second targeted lookup only for the matched IDs.
        const where = deviceIds?.length ? { deviceId: { in: deviceIds } } : undefined;

        const maxRows = await this.prisma.event.groupBy({
            by: ['deviceId'],
            ...(where ? { where } : {}),
            _max: { supremaEventId: true, timestamp: true },
        });

        const result = new Map();
        for (const row of maxRows) {
            result.set(row.deviceId, {
                supremaEventId: row._max.supremaEventId,
                timestamp: row._max.timestamp,
            });
        }
        return result;
    }

    /**
     * Find authentication events
     * 
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>}
     */
    async findAuthenticationEvents(options = {}) {
        return this.findByType('authentication', options);
    }

    /**
     * Find failed authentication attempts
     * 
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>}
     */
    async findFailedAuth(options = {}) {
        return this.findMany({
            where: {
                eventType: 'authentication',
                authResult: 'fail',
                ...options.where
            },
            orderBy: { timestamp: 'desc' },
            take: options.limit || 100
        });
    }

    /**
     * Get event count by type for a time range
     * 
     * @param {Date} startTime - Start time
     * @param {Date} endTime - End time
     * @returns {Promise<Object>}
     */
    async getCountByType(startTime, endTime) {
        const result = await this.prisma.event.groupBy({
            by: ['eventType'],
            where: {
                timestamp: {
                    gte: startTime,
                    lte: endTime
                }
            },
            _count: { eventType: true }
        });

        return result.reduce((acc, item) => {
            acc[item.eventType] = item._count.eventType;
            return acc;
        }, {});
    }

    /**
     * Check if event exists (for deduplication)
     * 
     * @param {number} deviceId - Device database ID
     * @param {BigInt|number} supremaEventId - Suprema event ID
     * @returns {Promise<boolean>}
     */
    async eventExists(deviceId, supremaEventId) {
        return this.exists({
            deviceId_supremaEventId: { deviceId, supremaEventId }
        });
    }

    /**
     * Bulk create events (skipping duplicates)
     * 
     * @param {Array<Object>} events - Events to create
     * @returns {Promise<Object>}
     */
    async bulkCreate(events) {
        return this.createMany(events);
    }

    /**
     * Get daily event summary
     * 
     * @param {number} [days=7] - Number of days
     * @returns {Promise<Array>}
     */
    async getDailySummary(days = 7) {
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);
        startDate.setHours(0, 0, 0, 0);

        return this.prisma.$queryRaw`
            SELECT 
                DATE(timestamp) as date,
                eventType,
                COUNT(*) as count
            FROM events
            WHERE timestamp >= ${startDate}
            GROUP BY DATE(timestamp), eventType
            ORDER BY date DESC, eventType
        `;
    }
}

export default EventRepository;
