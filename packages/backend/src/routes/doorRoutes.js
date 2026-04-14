/**
 * Door & Access Control Routes
 * REST API endpoints for door management and access control
 */

import express from 'express';
import { asyncHandler } from '../core/errors/index.js';
const router = express.Router();

export default (services) => {
    /**
     * Get all doors
     * GET /api/doors
     */
    router.get('/', asyncHandler(async (req, res) => {
        try {
            const { deviceId } = req.query;

            if (!deviceId) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'deviceId is required'
                });
            }

            const doors = await services.door.getDoors(deviceId);

            res.json({
                success: true,
                data: doors,
                total: doors.length
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }));

    /**
     * Create new door
     * POST /api/doors
     */
    router.post('/', asyncHandler(async (req, res) => {
        try {
            const { deviceId, doorConfig } = req.body;

            if (!deviceId || !doorConfig) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'deviceId and doorConfig are required'
                });
            }

            const door = await services.door.createDoor(deviceId, doorConfig);

            res.status(201).json({
                success: true,
                message: 'Door created successfully',
                data: door
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }));

    /**
     * Get door details
     * GET /api/doors/:doorId
     */
    router.get('/:doorId', asyncHandler(async (req, res) => {
        try {
            const { doorId } = req.params;
            const { deviceId } = req.query;

            if (!deviceId) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'deviceId is required'
                });
            }

            const door = await services.door.getDoorById(deviceId, doorId);

            if (!door) {
                return res.status(404).json({
                    error: 'Not Found',
                    message: 'Door not found'
                });
            }

            res.json({
                success: true,
                data: door
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }));

    /**
     * Update door configuration
     * PUT /api/doors/:doorId
     */
    router.put('/:doorId', asyncHandler(async (req, res) => {
        try {
            const { doorId } = req.params;
            const { deviceId, doorConfig } = req.body;

            if (!deviceId || !doorConfig) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'deviceId and doorConfig are required'
                });
            }

            const updatedDoor = await services.door.updateDoor(deviceId, doorId, doorConfig);

            res.json({
                success: true,
                message: 'Door updated successfully',
                data: updatedDoor
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }));

    /**
     * Delete door
     * DELETE /api/doors/:doorId
     */
    router.delete('/:doorId', asyncHandler(async (req, res) => {
        try {
            const { doorId } = req.params;
            const { deviceId } = req.query;

            if (!deviceId) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'deviceId is required'
                });
            }

            await services.door.deleteDoor(deviceId, doorId);

            res.json({
                success: true,
                message: 'Door deleted successfully'
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }));

    /**
     * Unlock door
     * POST /api/doors/:doorId/unlock
     */
    router.post('/:doorId/unlock', asyncHandler(async (req, res) => {
        try {
            const { doorId } = req.params;
            const { deviceId, duration = 5 } = req.body;

            if (!deviceId) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'deviceId is required'
                });
            }

            await services.door.unlockDoors(deviceId, [doorId], parseInt(duration));

            res.json({
                success: true,
                message: 'Door unlocked successfully',
                duration: parseInt(duration)
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }));

    /**
     * Lock door
     * POST /api/doors/:doorId/lock
     */
    router.post('/:doorId/lock', asyncHandler(async (req, res) => {
        try {
            const { doorId } = req.params;
            const { deviceId } = req.body;

            if (!deviceId) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'deviceId is required'
                });
            }

            await services.door.lockDoors(deviceId, [doorId]);

            res.json({
                success: true,
                message: 'Door locked successfully'
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }));

    /**
     * Get door status
     * GET /api/doors/:doorId/status
     */
    router.get('/:doorId/status', asyncHandler(async (req, res) => {
        try {
            const { doorId } = req.params;
            const { deviceId } = req.query;

            if (!deviceId) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'deviceId is required'
                });
            }

            const status = await services.door.getDoorStatus(deviceId, doorId);

            res.json({
                success: true,
                data: status
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }));

    /**
     * Get access levels
     * GET /api/doors/access-levels
     */
    router.get('/access-levels', asyncHandler(async (req, res) => {
        try {
            const { deviceId } = req.query;

            if (!deviceId) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'deviceId is required'
                });
            }

            const accessLevels = await services.door.getAccessLevels(deviceId);

            res.json({
                success: true,
                data: accessLevels,
                total: accessLevels.length
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }));

    /**
     * Create access level
     * POST /api/doors/access-levels
     */
    router.post('/access-levels', asyncHandler(async (req, res) => {
        try {
            const { deviceId, accessLevelConfig } = req.body;

            if (!deviceId || !accessLevelConfig) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'deviceId and accessLevelConfig are required'
                });
            }

            const accessLevel = await services.door.createAccessLevel(deviceId, accessLevelConfig);

            res.status(201).json({
                success: true,
                message: 'Access level created successfully',
                data: accessLevel
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }));

    /**
     * Setup basic access control
     * POST /api/doors/setup-basic-access
     */
    router.post('/setup-basic-access', asyncHandler(async (req, res) => {
        try {
            const { deviceId } = req.body;

            if (!deviceId) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'deviceId is required'
                });
            }

            const result = await services.door.setupBasicAccessControl(deviceId);

            res.json({
                success: true,
                message: 'Basic access control setup completed',
                data: result
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }));

    /**
     * Get access schedules
     * GET /api/doors/schedules
     */
    router.get('/schedules', asyncHandler(async (req, res) => {
        try {
            const { deviceId } = req.query;

            if (!deviceId) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'deviceId is required'
                });
            }

            const schedules = await services.door.getAccessSchedules(deviceId);

            res.json({
                success: true,
                data: schedules,
                total: schedules.length
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }));

    /**
     * Create access schedule
     * POST /api/doors/schedules
     */
    router.post('/schedules', asyncHandler(async (req, res) => {
        try {
            const { deviceId, scheduleConfig } = req.body;

            if (!deviceId || !scheduleConfig) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'deviceId and scheduleConfig are required'
                });
            }

            const schedule = await services.door.createAccessSchedule(deviceId, scheduleConfig);

            res.status(201).json({
                success: true,
                message: 'Access schedule created successfully',
                data: schedule
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }));

    /**
     * Delete access levels
     * DELETE /api/doors/access-levels
     * Body: { deviceId, accessLevelIds }
     */
    router.delete('/access-levels', asyncHandler(async (req, res) => {
        try {
            const { deviceId, accessLevelIds } = req.body;

            if (!deviceId || !accessLevelIds?.length) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'deviceId and accessLevelIds array are required'
                });
            }

            await services.door.deleteAccessLevels(deviceId, accessLevelIds);

            res.json({
                success: true,
                message: `Deleted ${accessLevelIds.length} access level(s)`
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }));

    /**
     * Delete schedules
     * DELETE /api/doors/schedules
     * Body: { deviceId, scheduleIds }
     */
    router.delete('/schedules', asyncHandler(async (req, res) => {
        try {
            const { deviceId, scheduleIds } = req.body;

            if (!deviceId || !scheduleIds?.length) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'deviceId and scheduleIds array are required'
                });
            }

            await services.door.deleteSchedules(deviceId, scheduleIds);

            res.json({
                success: true,
                message: `Deleted ${scheduleIds.length} schedule(s)`
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }));

    // ==================== ACCESS GROUPS ====================

    /**
     * Get access groups
     * GET /api/doors/access-groups
     */
    router.get('/access-groups', asyncHandler(async (req, res) => {
        try {
            const { deviceId } = req.query;

            if (!deviceId) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'deviceId is required'
                });
            }

            const groups = await services.door.getAccessGroups(deviceId);

            res.json({
                success: true,
                data: groups,
                total: groups.length
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }));

    /**
     * Create access group
     * POST /api/doors/access-groups
     * Body: { deviceId, accessGroupConfig: { id, name, levelIds } }
     */
    router.post('/access-groups', asyncHandler(async (req, res) => {
        try {
            const { deviceId, accessGroupConfig } = req.body;

            if (!deviceId || !accessGroupConfig) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'deviceId and accessGroupConfig are required'
                });
            }

            await services.door.createAccessGroup(deviceId, accessGroupConfig);

            res.status(201).json({
                success: true,
                message: 'Access group created successfully'
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }));

    /**
     * Delete access groups
     * DELETE /api/doors/access-groups
     * Body: { deviceId, accessGroupIds }
     */
    router.delete('/access-groups', asyncHandler(async (req, res) => {
        try {
            const { deviceId, accessGroupIds } = req.body;

            if (!deviceId || !accessGroupIds?.length) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'deviceId and accessGroupIds array are required'
                });
            }

            await services.door.deleteAccessGroups(deviceId, accessGroupIds);

            res.json({
                success: true,
                message: `Deleted ${accessGroupIds.length} access group(s)`
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }));

    /**
     * Get full access control status for a device
     * GET /api/doors/access-status
     */
    router.get('/access-status', asyncHandler(async (req, res) => {
        try {
            const { deviceId } = req.query;

            if (!deviceId) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'deviceId is required'
                });
            }

            const status = await services.door.getAccessControlStatus(deviceId);

            res.json({
                success: true,
                data: status
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