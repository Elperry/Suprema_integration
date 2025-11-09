/**
 * Door & Access Control Routes
 * REST API endpoints for door management and access control
 */

import express from 'express';
const router = express.Router();

export default (services) => {
    /**
     * Get all doors
     * GET /api/doors
     */
    router.get('/', async (req, res) => {
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
    });

    /**
     * Create new door
     * POST /api/doors
     */
    router.post('/', async (req, res) => {
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
    });

    /**
     * Get door details
     * GET /api/doors/:doorId
     */
    router.get('/:doorId', async (req, res) => {
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
    });

    /**
     * Update door configuration
     * PUT /api/doors/:doorId
     */
    router.put('/:doorId', async (req, res) => {
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
    });

    /**
     * Delete door
     * DELETE /api/doors/:doorId
     */
    router.delete('/:doorId', async (req, res) => {
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
    });

    /**
     * Unlock door
     * POST /api/doors/:doorId/unlock
     */
    router.post('/:doorId/unlock', async (req, res) => {
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
    });

    /**
     * Lock door
     * POST /api/doors/:doorId/lock
     */
    router.post('/:doorId/lock', async (req, res) => {
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
    });

    /**
     * Get door status
     * GET /api/doors/:doorId/status
     */
    router.get('/:doorId/status', async (req, res) => {
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
    });

    /**
     * Get access levels
     * GET /api/doors/access-levels
     */
    router.get('/access-levels', async (req, res) => {
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
    });

    /**
     * Create access level
     * POST /api/doors/access-levels
     */
    router.post('/access-levels', async (req, res) => {
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
    });

    /**
     * Setup basic access control
     * POST /api/doors/setup-basic-access
     */
    router.post('/setup-basic-access', async (req, res) => {
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
    });

    /**
     * Get access schedules
     * GET /api/doors/schedules
     */
    router.get('/schedules', async (req, res) => {
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
    });

    /**
     * Create access schedule
     * POST /api/doors/schedules
     */
    router.post('/schedules', async (req, res) => {
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
    });

    return router;
};