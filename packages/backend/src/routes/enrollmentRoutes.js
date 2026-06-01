/**
 * Enrollment Routes
 * REST API endpoints for card-based employee enrollment
 */

import express from 'express';
import { validate, schemas } from '../middleware/requestValidator.js';
import { asyncHandler } from '../core/errors/index.js';
const router = express.Router();

export default (services) => {
    const { enrollment } = services;
    const audit = services.audit;

    // ==================== CARD SCANNING ====================

    /**
     * Scan a card from a device
     * POST /api/enrollment/scan
     * Body: { deviceId, timeout }
     */
    router.post('/scan', validate.body(schemas.cardScan), asyncHandler(async (req, res) => {
        try {
            const { deviceId, timeout = 10 } = req.body;

            if (!deviceId) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'deviceId is required'
                });
            }

            const result = await enrollment.scanCard(deviceId, timeout);

            res.json({
                success: true,
                data: result
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message,
                failedDevices: error.failedDevices || undefined
            });
        }
    }));

    // ==================== CARD ASSIGNMENTS ====================

    /**
     * Get all card assignments
     * GET /api/enrollment/cards
     * Query: status, employeeId
     */
    router.get('/cards', asyncHandler(async (req, res) => {
        try {
            const { status, employeeId } = req.query;
            const assignments = await enrollment.getAllCardAssignments({ status, employeeId });

            res.json({
                success: true,
                data: assignments,
                total: assignments.length
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }));

    /**
     * Get a specific card assignment
     * GET /api/enrollment/cards/:id
     */
    router.get('/cards/:id', asyncHandler(async (req, res) => {
        try {
            const { id } = req.params;
            const assignment = await enrollment.getCardAssignment(id);

            if (!assignment) {
                return res.status(404).json({
                    error: 'Not Found',
                    message: 'Card assignment not found'
                });
            }

            res.json({
                success: true,
                data: assignment
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }));

    /**
     * Assign a card to an employee
     * POST /api/enrollment/cards
     * Body: { employeeId, cardNumber, cardData, notes }
     */
    router.post('/cards', asyncHandler(async (req, res) => {
        try {
            const { employeeId, cardNumber, cardData, notes } = req.body;

            services.logger.debug('POST /enrollment/cards - Request body:', JSON.stringify(req.body, null, 2));

            if (!employeeId || (!cardData && !cardNumber)) {
                services.logger.warn('Missing required fields:', {
                    employeeId: !!employeeId,
                    cardData: !!cardData,
                    cardNumber: !!cardNumber
                });
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'employeeId and either cardNumber or cardData are required'
                });
            }

            const assignment = await enrollment.assignCardToEmployee({
                employeeId: String(employeeId),
                cardData: cardData ? String(cardData) : undefined,
                cardNumber: cardNumber == null ? null : String(cardNumber),
                notes: notes || null
            });

            services.logger.info('Card assignment created:', assignment.id);

            audit?.log({
                action: 'assign-card',
                category: 'enrollment',
                targetType: 'employee',
                targetId: String(employeeId),
                details: { assignmentId: assignment.id },
                status: 'success',
                ipAddress: req.ip,
                requestId: req.requestId,
            });

            res.status(201).json({
                success: true,
                data: assignment,
                message: 'Card assigned successfully'
            });
        } catch (error) {
            services.logger.error('Error in POST /enrollment/cards:', { error: error.message });
            res.status(error.message.includes('already assigned') ? 409 : 500).json({
                error: error.message.includes('already assigned') ? 'Conflict' : 'Internal Server Error',
                message: error.message
            });
        }
    }));

    /**
     * Revoke a card assignment
     * DELETE /api/enrollment/cards/:id
     * Body: { reason }
     */
    router.delete('/cards/:id', asyncHandler(async (req, res) => {
        try {
            const { id } = req.params;
            const { reason } = req.body || {};

            const assignment = await enrollment.revokeCardAssignment(parseInt(id), reason);

            audit?.log({
                action: 'revoke-card',
                category: 'enrollment',
                targetType: 'card_assignment',
                targetId: id,
                details: { reason: reason || 'manual revocation' },
                status: 'success',
                ipAddress: req.ip,
                requestId: req.requestId,
            });

            res.json({
                success: true,
                data: assignment,
                message: 'Card assignment revoked'
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }));

    /**
     * Permanently delete an inactive card assignment
     * DELETE /api/enrollment/cards/:id/permanent
     */
    router.delete('/cards/:id/permanent', asyncHandler(async (req, res) => {
        try {
            const { id } = req.params;

            const result = await enrollment.deleteCardAssignment(parseInt(id));

            audit?.log({
                action: 'delete-card',
                category: 'enrollment',
                targetType: 'card_assignment',
                targetId: id,
                details: { deletedEnrollments: result.deletedEnrollments },
                status: 'success',
                ipAddress: req.ip,
                requestId: req.requestId,
            });

            res.json({
                success: true,
                data: result,
                message: 'Card assignment deleted permanently'
            });
        } catch (error) {
            const isConflict = /^Cannot /.test(error.message || '');
            res.status(isConflict ? 409 : 500).json({
                error: isConflict ? 'Conflict' : 'Internal Server Error',
                message: error.message
            });
        }
    }));

    /**
     * Update card assignment status
     * PATCH /api/enrollment/cards/:id/status
     * Body: { status, reason }
     */
    router.patch('/cards/:id/status', asyncHandler(async (req, res) => {
        try {
            const { id } = req.params;
            const { status, reason } = req.body;

            if (!status || !['active', 'revoked', 'lost', 'expired'].includes(status)) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'Valid status is required: active, revoked, lost, expired'
                });
            }

            let assignment;
            // Use revokeCardAssignment for revoked/lost/expired to remove from devices
            if (status === 'revoked' || status === 'lost' || status === 'expired') {
                assignment = await enrollment.revokeCardAssignment(parseInt(id), reason || status);
            } else {
                assignment = await enrollment.updateCardStatus(parseInt(id), status);
            }

            audit?.log({
                action: `card-status-${status}`,
                category: 'enrollment',
                targetType: 'card_assignment',
                targetId: id,
                details: { status, reason: reason || null },
                status: 'success',
                ipAddress: req.ip,
                requestId: req.requestId,
            });

            res.json({
                success: true,
                data: assignment
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }));

    /**
     * Replace a card with a new one
     * POST /api/enrollment/cards/:id/replace
     * Body: { cardNumber, cardData, cardType, cardFormat, notes }
     * 
     * Revokes old card, creates new assignment for the same employee,
     * and re-enrolls on the same devices.
     */
    router.post('/cards/:id/replace', asyncHandler(async (req, res) => {
        try {
            const { id } = req.params;
            const { cardNumber, cardData, cardType, cardFormat, notes } = req.body;

            if (!cardData && !cardNumber) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'cardNumber or cardData for the new card is required'
                });
            }

            const result = await enrollment.replaceCard(parseInt(id), {
                cardNumber,
                cardData,
                cardType,
                cardFormat,
                notes
            });

            res.json({
                success: true,
                data: result,
                message: `Card replaced successfully. New card assigned and enrolled on ${result.reenrolledDevices} device(s).`
            });
        } catch (error) {
            res.status(error.message.includes('not found') ? 404 : 500).json({
                error: error.message.includes('not found') ? 'Not Found' : 'Internal Server Error',
                message: error.message
            });
        }
    }));

    /**
     * Get card history for an employee
     * GET /api/enrollment/cards/history/:employeeId
     * 
     * Returns all card assignments (current and past) for an employee.
     */
    router.get('/cards/history/:employeeId', asyncHandler(async (req, res) => {
        try {
            const { employeeId } = req.params;
            const history = await enrollment.getCardHistory(employeeId);

            res.json({
                success: true,
                data: history,
                total: history.length
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }));

    // ==================== DEVICE ENROLLMENT ====================

    /**
     * Enroll a card assignment on a device
     * POST /api/enrollment/enroll
     * Body: { deviceId, assignmentId }
     */
    router.post('/enroll', asyncHandler(async (req, res) => {
        try {
            const { deviceId, assignmentId } = req.body;

            if (!deviceId || !assignmentId) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'deviceId and assignmentId are required'
                });
            }

            const result = await enrollment.enrollOnDevice(parseInt(deviceId), parseInt(assignmentId));

            res.json({
                success: true,
                data: result,
                message: 'Enrolled successfully'
            });
        } catch (error) {
            res.status(error.message.includes('Already enrolled') ? 409 : 500).json({
                error: error.message.includes('Already enrolled') ? 'Conflict' : 'Internal Server Error',
                message: error.message
            });
        }
    }));

    /**
     * Enroll on multiple devices
     * POST /api/enrollment/enroll-multi
     * Body: { deviceIds, assignmentId }
     */
    router.post('/enroll-multi', asyncHandler(async (req, res) => {
        try {
            const { deviceIds, assignmentId } = req.body;

            if (!deviceIds?.length || !assignmentId) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'deviceIds array and assignmentId are required'
                });
            }

            const result = await enrollment.enrollOnMultipleDevices(deviceIds, parseInt(assignmentId));
            const successCount = result.successful.length;
            const failureCount = result.failed.length;
            const results = [
                ...result.successful.map((entry) => ({ deviceId: entry.deviceId, success: true, enrollment: entry.enrollment })),
                ...result.failed.map((entry) => ({ deviceId: entry.deviceId, success: false, error: entry.error })),
            ];

            if (successCount === 0) {
                return res.status(500).json({
                    success: false,
                    data: result,
                    results,
                    message: failureCount > 0
                        ? `Failed to enroll on all ${deviceIds.length} device(s)`
                        : 'Enrollment failed'
                });
            }

            res.status(failureCount > 0 ? 207 : 200).json({
                success: failureCount === 0,
                partial: failureCount > 0,
                data: result,
                results,
                message: failureCount > 0
                    ? `Enrolled on ${successCount}/${deviceIds.length} devices (${failureCount} failed)`
                    : `Enrolled on ${successCount}/${deviceIds.length} devices`
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }));

    /**
     * Remove enrollment from a device
     * DELETE /api/enrollment/devices/:deviceId/assignments/:assignmentId
     */
    router.delete('/devices/:deviceId/assignments/:assignmentId', asyncHandler(async (req, res) => {
        try {
            const { deviceId, assignmentId } = req.params;

            const result = await enrollment.removeFromDevice(parseInt(deviceId), parseInt(assignmentId));

            res.json({
                success: true,
                data: result,
                message: 'Removed from device'
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }));

    /**
     * Get enrollments for a device
     * GET /api/enrollment/devices/:deviceId/enrollments
     */
    router.get('/devices/:deviceId/enrollments', asyncHandler(async (req, res) => {
        try {
            const { deviceId } = req.params;
            const enrollments = await enrollment.getDeviceEnrollments(parseInt(deviceId));

            res.json({
                success: true,
                data: enrollments,
                total: enrollments.length
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }));

    /**
     * Get enrollments for a card assignment
     * GET /api/enrollment/cards/:assignmentId/enrollments
     */
    router.get('/cards/:assignmentId/enrollments', asyncHandler(async (req, res) => {
        try {
            const { assignmentId } = req.params;
            const enrollments = await enrollment.getAssignmentEnrollments(parseInt(assignmentId));

            res.json({
                success: true,
                data: enrollments,
                total: enrollments.length
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }));

    // ==================== SYNC OPERATIONS ====================

    /**
     * Sync all enrollments to a device
     * POST /api/enrollment/devices/:deviceId/sync
     */
    router.post('/devices/:deviceId/sync', asyncHandler(async (req, res) => {
        try {
            const { deviceId } = req.params;
            const result = await enrollment.syncToDevice(parseInt(deviceId));

            res.json({
                success: true,
                data: result,
                message: `Synced ${result.synced}/${result.total} enrollments`
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }));

    /**
     * Sync a card assignment to all its enrolled devices
     * POST /api/enrollment/cards/:assignmentId/sync
     */
    router.post('/cards/:assignmentId/sync', asyncHandler(async (req, res) => {
        try {
            const { assignmentId } = req.params;
            const result = await enrollment.syncAssignmentToDevices(parseInt(assignmentId));

            res.json({
                success: true,
                data: result,
                message: `Synced to ${result.synced}/${result.total} devices`
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }));

    // ==================== EMPLOYEE QUERIES ====================

    /**
     * Search employees
     * GET /api/enrollment/employees/search
     * Query: q, limit
     */
    router.get('/employees/search', asyncHandler(async (req, res) => {
        try {
            const { q, limit = 20 } = req.query;

            if (!q || q.length < 2) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'Search term (q) must be at least 2 characters'
                });
            }

            const employees = await enrollment.searchEmployees(q, parseInt(limit));

            res.json({
                success: true,
                data: employees,
                total: employees.length
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }));

    /**
     * Get employees with enrollment status
     * GET /api/enrollment/employees
     * Query: limit, offset, enrolled (true/false)
     */
    router.get('/employees', asyncHandler(async (req, res) => {
        try {
            const { limit = 100, offset = 0, enrolled } = req.query;

            const employees = await enrollment.getEmployeesWithStatus({
                limit: parseInt(limit),
                offset: parseInt(offset),
                enrolled: enrolled === 'true' ? true : enrolled === 'false' ? false : null
            });

            res.json({
                success: true,
                data: employees,
                total: employees.length
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }));

    // ==================== QUICK ENROLLMENT ====================

    /**
     * Complete enrollment workflow in one step:
     * 1. Assign card to employee
     * 2. Enroll on specified devices
     * POST /api/enrollment/quick
     * Body: { employeeId, cardData, cardNumber, deviceIds, notes }
     */
    router.post('/quick', asyncHandler(async (req, res) => {
        try {
            const { employeeId, cardData, cardNumber, deviceIds = [], notes } = req.body;

            if (!employeeId || (!cardData && !cardNumber)) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'employeeId and either cardData or cardNumber are required'
                });
            }

            // Step 1: Assign card
            const assignment = await enrollment.assignCardToEmployee({
                employeeId,
                cardData,
                cardNumber,
                notes: notes || null
            });

            // Step 2: Enroll on devices
            let enrollmentResults = null;
            if (deviceIds.length > 0) {
                enrollmentResults = await enrollment.enrollOnMultipleDevices(deviceIds, assignment.id);
            }

            res.status(201).json({
                success: true,
                data: {
                    assignment,
                    enrollments: enrollmentResults
                },
                message: enrollmentResults 
                    ? `Card assigned and enrolled on ${enrollmentResults.successful.length}/${deviceIds.length} devices`
                    : 'Card assigned successfully'
            });
        } catch (error) {
            res.status(error.message.includes('already assigned') ? 409 : 500).json({
                error: error.message.includes('already assigned') ? 'Conflict' : 'Internal Server Error',
                message: error.message
            });
        }
    }));

    // ==================== STATISTICS ====================

    /**
     * Get enrollment statistics
     * GET /api/enrollment/statistics
     */
    router.get('/statistics', asyncHandler(async (req, res) => {
        try {
            const stats = await enrollment.getStatistics();

            res.json({
                success: true,
                data: stats
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }));

    return router;
};
