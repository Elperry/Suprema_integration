/**
 * Enrollment Routes
 * REST API endpoints for card-based employee enrollment
 */

import express from 'express';
const router = express.Router();

export default (services) => {
    const { enrollment } = services;

    // ==================== CARD SCANNING ====================

    /**
     * Scan a card from a device
     * POST /api/enrollment/scan
     * Body: { deviceId, timeout }
     */
    router.post('/scan', async (req, res) => {
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
                message: error.message
            });
        }
    });

    // ==================== CARD ASSIGNMENTS ====================

    /**
     * Get all card assignments
     * GET /api/enrollment/cards
     * Query: status, employeeId
     */
    router.get('/cards', async (req, res) => {
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
    });

    /**
     * Get a specific card assignment
     * GET /api/enrollment/cards/:id
     */
    router.get('/cards/:id', async (req, res) => {
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
    });

    /**
     * Assign a card to an employee
     * POST /api/enrollment/cards
     * Body: { employeeId, employeeName, cardData, cardType, cardFormat, cardSize, notes }
     */
    router.post('/cards', async (req, res) => {
        try {
            const { employeeId, employeeName, cardData, cardType, cardFormat, cardSize, notes } = req.body;

            console.log('POST /enrollment/cards - Request body:', JSON.stringify(req.body, null, 2));

            if (!employeeId || !cardData) {
                console.log('Missing required fields:', { employeeId: !!employeeId, cardData: !!cardData });
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'employeeId and cardData are required'
                });
            }

            const assignment = await enrollment.assignCardToEmployee({
                employeeId: String(employeeId),
                employeeName: employeeName || null,
                cardData: String(cardData),
                cardType: cardType || 'CSN',
                cardFormat: cardFormat || 0,
                cardSize: cardSize || 0,
                notes: notes || null
            });

            console.log('Card assignment created:', assignment.id);

            res.status(201).json({
                success: true,
                data: assignment,
                message: 'Card assigned successfully'
            });
        } catch (error) {
            console.error('Error in POST /enrollment/cards:', error);
            res.status(error.message.includes('already assigned') ? 409 : 500).json({
                error: error.message.includes('already assigned') ? 'Conflict' : 'Internal Server Error',
                message: error.message
            });
        }
    });

    /**
     * Revoke a card assignment
     * DELETE /api/enrollment/cards/:id
     * Body: { reason }
     */
    router.delete('/cards/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const { reason } = req.body || {};

            const assignment = await enrollment.revokeCardAssignment(parseInt(id), reason);

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
    });

    /**
     * Update card assignment status
     * PATCH /api/enrollment/cards/:id/status
     * Body: { status }
     */
    router.patch('/cards/:id/status', async (req, res) => {
        try {
            const { id } = req.params;
            const { status } = req.body;

            if (!status || !['active', 'revoked', 'lost', 'expired'].includes(status)) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'Valid status is required: active, revoked, lost, expired'
                });
            }

            const assignment = await enrollment.updateCardStatus(parseInt(id), status);

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
    });

    // ==================== DEVICE ENROLLMENT ====================

    /**
     * Enroll a card assignment on a device
     * POST /api/enrollment/enroll
     * Body: { deviceId, assignmentId }
     */
    router.post('/enroll', async (req, res) => {
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
    });

    /**
     * Enroll on multiple devices
     * POST /api/enrollment/enroll-multi
     * Body: { deviceIds, assignmentId }
     */
    router.post('/enroll-multi', async (req, res) => {
        try {
            const { deviceIds, assignmentId } = req.body;

            if (!deviceIds?.length || !assignmentId) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'deviceIds array and assignmentId are required'
                });
            }

            const result = await enrollment.enrollOnMultipleDevices(deviceIds, parseInt(assignmentId));

            res.json({
                success: true,
                data: result,
                message: `Enrolled on ${result.successful.length}/${deviceIds.length} devices`
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    });

    /**
     * Remove enrollment from a device
     * DELETE /api/enrollment/devices/:deviceId/assignments/:assignmentId
     */
    router.delete('/devices/:deviceId/assignments/:assignmentId', async (req, res) => {
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
    });

    /**
     * Get enrollments for a device
     * GET /api/enrollment/devices/:deviceId/enrollments
     */
    router.get('/devices/:deviceId/enrollments', async (req, res) => {
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
    });

    /**
     * Get enrollments for a card assignment
     * GET /api/enrollment/cards/:assignmentId/enrollments
     */
    router.get('/cards/:assignmentId/enrollments', async (req, res) => {
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
    });

    // ==================== SYNC OPERATIONS ====================

    /**
     * Sync all enrollments to a device
     * POST /api/enrollment/devices/:deviceId/sync
     */
    router.post('/devices/:deviceId/sync', async (req, res) => {
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
    });

    /**
     * Sync a card assignment to all its enrolled devices
     * POST /api/enrollment/cards/:assignmentId/sync
     */
    router.post('/cards/:assignmentId/sync', async (req, res) => {
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
    });

    // ==================== EMPLOYEE QUERIES ====================

    /**
     * Search employees
     * GET /api/enrollment/employees/search
     * Query: q, limit
     */
    router.get('/employees/search', async (req, res) => {
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
    });

    /**
     * Get employees with enrollment status
     * GET /api/enrollment/employees
     * Query: limit, offset, enrolled (true/false)
     */
    router.get('/employees', async (req, res) => {
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
    });

    // ==================== QUICK ENROLLMENT ====================

    /**
     * Complete enrollment workflow in one step:
     * 1. Assign card to employee
     * 2. Enroll on specified devices
     * POST /api/enrollment/quick
     * Body: { employeeId, employeeName, cardData, cardType, cardSize, deviceIds }
     */
    router.post('/quick', async (req, res) => {
        try {
            const { employeeId, employeeName, cardData, cardType, cardSize, deviceIds = [] } = req.body;

            if (!employeeId || !cardData) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'employeeId and cardData are required'
                });
            }

            // Step 1: Assign card
            const assignment = await enrollment.assignCardToEmployee({
                employeeId,
                employeeName,
                cardData,
                cardType,
                cardSize: cardSize || 0
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
    });

    // ==================== STATISTICS ====================

    /**
     * Get enrollment statistics
     * GET /api/enrollment/statistics
     */
    router.get('/statistics', async (req, res) => {
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
    });

    return router;
};
