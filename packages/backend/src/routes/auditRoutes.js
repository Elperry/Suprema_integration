/**
 * Audit Log Routes
 * REST API endpoints for reading and exporting audit logs.
 */

import express from 'express';
import { toCsv, toExcelTable } from '../utils/csv.js';
import { asyncHandler } from '../core/errors/index.js';

const router = express.Router();

export default (services) => {
    const audit = services.audit;

    /**
     * GET /api/audit
     * Query audit logs with filtering and pagination.
     */
    router.get('/', asyncHandler(async (req, res) => {
        try {
            const {
                action,
                category,
                targetType,
                targetId,
                status,
                startDate,
                endDate,
                page = 1,
                limit = 50,
            } = req.query;

            const result = await audit.query({
                action,
                category,
                targetType,
                targetId,
                status,
                startDate,
                endDate,
                page: parseInt(page) || 1,
                limit: Math.min(parseInt(limit) || 50, 200),
            });

            res.json({
                success: true,
                data: result.logs,
                pagination: result.pagination,
            });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error', message: error.message });
        }
    }));

    /**
     * GET /api/audit/summary
     * Get audit log summary statistics.
     */
    router.get('/summary', asyncHandler(async (req, res) => {
        try {
            const { startDate, endDate } = req.query;
            const summary = await audit.getSummary({ startDate, endDate });

            res.json({ success: true, data: summary });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error', message: error.message });
        }
    }));

    /**
     * GET /api/audit/export
     * Export audit logs as CSV or Excel.
     */
    router.get('/export', asyncHandler(async (req, res) => {
        try {
            const {
                action,
                category,
                targetType,
                targetId,
                status,
                startDate,
                endDate,
                format = 'csv',
            } = req.query;

            const result = await audit.query({
                action,
                category,
                targetType,
                targetId,
                status,
                startDate,
                endDate,
                page: 1,
                limit: 10000,
            });

            const columns = [
                { header: 'ID', value: (r) => r.id },
                { header: 'Timestamp', value: (r) => r.createdAt },
                { header: 'Action', value: (r) => r.action },
                { header: 'Category', value: (r) => r.category },
                { header: 'Target Type', value: (r) => r.targetType },
                { header: 'Target ID', value: (r) => r.targetId },
                { header: 'Status', value: (r) => r.status },
                { header: 'Error', value: (r) => r.errorMessage },
                { header: 'Duration (ms)', value: (r) => r.duration },
                { header: 'IP Address', value: (r) => r.ipAddress },
                { header: 'Request ID', value: (r) => r.requestId },
                { header: 'Details', value: (r) => r.details ? JSON.stringify(r.details) : '' },
            ];

            if (format === 'xls') {
                const workbook = toExcelTable(result.logs, columns, 'Audit Log');
                res.setHeader('Content-Type', 'application/vnd.ms-excel');
                res.setHeader('Content-Disposition', `attachment; filename="audit_log_${Date.now()}.xls"`);
                return res.send(workbook);
            }

            const csvData = toCsv(result.logs, columns);
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader('Content-Disposition', `attachment; filename="audit_log_${Date.now()}.csv"`);
            return res.send(csvData);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error', message: error.message });
        }
    }));

    return router;
};
