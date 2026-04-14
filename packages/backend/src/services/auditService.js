/**
 * Audit Logging Service
 * Records administrative and operator actions for accountability and traceability.
 */

export default class AuditService {
    constructor(prisma, logger) {
        this.prisma = prisma;
        this.logger = logger || console;
    }

    /**
     * Record an audit log entry.
     * @param {Object} entry
     * @param {string} entry.action - Action performed (e.g. 'repair-device', 'sync-all')
     * @param {string} [entry.category] - Category grouping (sync, enrollment, export, device, user)
     * @param {string} [entry.targetType] - Type of entity being acted on
     * @param {string|number} [entry.targetId] - ID of the entity
     * @param {Object} [entry.details] - Structured outcome data
     * @param {string} [entry.status] - 'success' | 'failure' | 'partial'
     * @param {string} [entry.errorMessage] - Error description if failed
     * @param {string} [entry.ipAddress] - Requester IP
     * @param {string} [entry.requestId] - Request correlation ID
     * @param {number} [entry.duration] - Duration in ms
     */
    async log(entry) {
        try {
            return await this.prisma.auditLog.create({
                data: {
                    action: entry.action,
                    category: entry.category || 'general',
                    targetType: entry.targetType || null,
                    targetId: entry.targetId != null ? String(entry.targetId) : null,
                    details: entry.details || null,
                    status: entry.status || 'success',
                    errorMessage: entry.errorMessage || null,
                    ipAddress: entry.ipAddress || null,
                    requestId: entry.requestId || null,
                    duration: entry.duration || null,
                }
            });
        } catch (err) {
            // Never let audit logging break the main operation
            this.logger.error('[AuditService] Failed to write audit log', { error: err.message, entry });
            return null;
        }
    }

    /**
     * Convenience: wrap an async operation with audit logging.
     * Records duration, success/failure, and structured details.
     */
    async wrap(meta, fn) {
        const start = Date.now();
        try {
            const result = await fn();
            await this.log({
                ...meta,
                status: 'success',
                details: result?.auditDetails || meta.details || null,
                duration: Date.now() - start,
            });
            return result;
        } catch (err) {
            await this.log({
                ...meta,
                status: 'failure',
                errorMessage: err.message,
                duration: Date.now() - start,
            });
            throw err;
        }
    }

    /**
     * Query audit logs with filtering and pagination.
     */
    async query({ action, category, targetType, targetId, status, startDate, endDate, page = 1, limit = 50 } = {}) {
        const where = {};

        if (action) where.action = action;
        if (category) where.category = category;
        if (targetType) where.targetType = targetType;
        if (targetId) where.targetId = String(targetId);
        if (status) where.status = status;

        if (startDate || endDate) {
            where.createdAt = {};
            if (startDate) where.createdAt.gte = new Date(startDate);
            if (endDate) where.createdAt.lte = new Date(endDate);
        }

        const [total, logs] = await Promise.all([
            this.prisma.auditLog.count({ where }),
            this.prisma.auditLog.findMany({
                where,
                orderBy: { createdAt: 'desc' },
                skip: (page - 1) * limit,
                take: limit,
            })
        ]);

        return {
            logs,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            }
        };
    }

    /**
     * Get summary statistics for audit logs.
     */
    async getSummary({ startDate, endDate } = {}) {
        const where = {};
        if (startDate || endDate) {
            where.createdAt = {};
            if (startDate) where.createdAt.gte = new Date(startDate);
            if (endDate) where.createdAt.lte = new Date(endDate);
        }

        const [byAction, byStatus, byCategory, total] = await Promise.all([
            this.prisma.auditLog.groupBy({
                by: ['action'],
                where,
                _count: { action: true },
                orderBy: { _count: { action: 'desc' } },
                take: 20,
            }),
            this.prisma.auditLog.groupBy({
                by: ['status'],
                where,
                _count: { status: true },
            }),
            this.prisma.auditLog.groupBy({
                by: ['category'],
                where,
                _count: { category: true },
            }),
            this.prisma.auditLog.count({ where }),
        ]);

        return {
            total,
            byAction: byAction.map(r => ({ action: r.action, count: r._count.action })),
            byStatus: byStatus.map(r => ({ status: r.status, count: r._count.status })),
            byCategory: byCategory.map(r => ({ category: r.category, count: r._count.category })),
        };
    }
}
