/**
 * Location Management Routes
 * REST API endpoints for location tree operations
 */

import express from 'express';
const router = express.Router();

export default (services) => {
    const { database } = services;
    const prisma = database.getPrisma();

    /**
     * Get all locations as a tree structure
     * GET /api/locations/tree
     */
    router.get('/tree', async (req, res) => {
        try {
            // Get all locations with their devices
            const locations = await prisma.location.findMany({
                where: { isActive: true },
                include: {
                    devices: {
                        select: {
                            id: true,
                            name: true,
                            ip: true,
                            port: true,
                            status: true,
                            direction: true,
                            deviceType: true,
                            isActive: true
                        }
                    }
                },
                orderBy: [
                    { level: 'asc' },
                    { sortOrder: 'asc' },
                    { name: 'asc' }
                ]
            });

            // Build tree structure
            const buildTree = (items, parentId = null) => {
                return items
                    .filter(item => item.parentId === parentId)
                    .map(item => ({
                        ...item,
                        children: buildTree(items, item.id)
                    }));
            };

            const tree = buildTree(locations);

            res.json({
                success: true,
                data: tree
            });
        } catch (error) {
            console.error('Error fetching location tree:', error);
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    });

    /**
     * Get all locations (flat list)
     * GET /api/locations
     */
    router.get('/', async (req, res) => {
        try {
            const locations = await prisma.location.findMany({
                where: { isActive: true },
                include: {
                    parent: {
                        select: { id: true, name: true }
                    },
                    _count: {
                        select: { devices: true, children: true }
                    }
                },
                orderBy: [
                    { level: 'asc' },
                    { sortOrder: 'asc' },
                    { name: 'asc' }
                ]
            });

            res.json({
                success: true,
                data: locations,
                total: locations.length
            });
        } catch (error) {
            console.error('Error fetching locations:', error);
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    });

    /**
     * Get single location with devices
     * GET /api/locations/:id
     */
    router.get('/:id', async (req, res) => {
        try {
            const id = parseInt(req.params.id, 10);
            
            const location = await prisma.location.findUnique({
                where: { id },
                include: {
                    parent: true,
                    children: true,
                    devices: true
                }
            });

            if (!location) {
                return res.status(404).json({
                    error: 'Not Found',
                    message: 'Location not found'
                });
            }

            res.json({
                success: true,
                data: location
            });
        } catch (error) {
            console.error('Error fetching location:', error);
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    });

    /**
     * Create new location
     * POST /api/locations
     */
    router.post('/', async (req, res) => {
        try {
            const { name, description, parentId, locationType, sortOrder } = req.body;

            if (!name) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'Location name is required'
                });
            }

            // Calculate level based on parent
            let level = 0;
            if (parentId) {
                const parent = await prisma.location.findUnique({
                    where: { id: parentId }
                });
                if (parent) {
                    level = parent.level + 1;
                }
            }

            const location = await prisma.location.create({
                data: {
                    name,
                    description,
                    parentId: parentId || null,
                    locationType: locationType || 'zone',
                    level,
                    sortOrder: sortOrder || 0
                }
            });

            res.status(201).json({
                success: true,
                message: 'Location created successfully',
                data: location
            });
        } catch (error) {
            console.error('Error creating location:', error);
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    });

    /**
     * Update location
     * PUT /api/locations/:id
     */
    router.put('/:id', async (req, res) => {
        try {
            const id = parseInt(req.params.id, 10);
            const { name, description, parentId, locationType, sortOrder, isActive } = req.body;

            // Calculate new level if parent changed
            let level;
            if (parentId !== undefined) {
                if (parentId === null) {
                    level = 0;
                } else {
                    const parent = await prisma.location.findUnique({
                        where: { id: parentId }
                    });
                    if (parent) {
                        level = parent.level + 1;
                    }
                }
            }

            const updateData = {};
            if (name !== undefined) updateData.name = name;
            if (description !== undefined) updateData.description = description;
            if (parentId !== undefined) updateData.parentId = parentId;
            if (locationType !== undefined) updateData.locationType = locationType;
            if (sortOrder !== undefined) updateData.sortOrder = sortOrder;
            if (isActive !== undefined) updateData.isActive = isActive;
            if (level !== undefined) updateData.level = level;

            const location = await prisma.location.update({
                where: { id },
                data: updateData
            });

            res.json({
                success: true,
                message: 'Location updated successfully',
                data: location
            });
        } catch (error) {
            console.error('Error updating location:', error);
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    });

    /**
     * Delete location
     * DELETE /api/locations/:id
     */
    router.delete('/:id', async (req, res) => {
        try {
            const id = parseInt(req.params.id, 10);

            // Check if location has children
            const childCount = await prisma.location.count({
                where: { parentId: id }
            });

            if (childCount > 0) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'Cannot delete location with child locations. Delete children first or move them.'
                });
            }

            // Unassign devices from this location
            await prisma.device.updateMany({
                where: { locationId: id },
                data: { locationId: null }
            });

            await prisma.location.delete({
                where: { id }
            });

            res.json({
                success: true,
                message: 'Location deleted successfully'
            });
        } catch (error) {
            console.error('Error deleting location:', error);
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    });

    /**
     * Assign device to location
     * POST /api/locations/:id/devices
     */
    router.post('/:id/devices', async (req, res) => {
        try {
            const locationId = parseInt(req.params.id, 10);
            const { deviceId, direction } = req.body;

            if (!deviceId) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'Device ID is required'
                });
            }

            const device = await prisma.device.update({
                where: { id: deviceId },
                data: {
                    locationId,
                    direction: direction || 'in'
                }
            });

            res.json({
                success: true,
                message: 'Device assigned to location successfully',
                data: device
            });
        } catch (error) {
            console.error('Error assigning device:', error);
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    });

    /**
     * Remove device from location
     * DELETE /api/locations/:id/devices/:deviceId
     */
    router.delete('/:id/devices/:deviceId', async (req, res) => {
        try {
            const deviceId = parseInt(req.params.deviceId, 10);

            const device = await prisma.device.update({
                where: { id: deviceId },
                data: { locationId: null }
            });

            res.json({
                success: true,
                message: 'Device removed from location successfully',
                data: device
            });
        } catch (error) {
            console.error('Error removing device:', error);
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    });

    /**
     * Update device direction (in/out)
     * PATCH /api/locations/devices/:deviceId/direction
     */
    router.patch('/devices/:deviceId/direction', async (req, res) => {
        try {
            const deviceId = parseInt(req.params.deviceId, 10);
            const { direction } = req.body;

            if (!direction || !['in', 'out'].includes(direction)) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'Direction must be "in" or "out"'
                });
            }

            const device = await prisma.device.update({
                where: { id: deviceId },
                data: { direction }
            });

            res.json({
                success: true,
                message: 'Device direction updated successfully',
                data: device
            });
        } catch (error) {
            console.error('Error updating device direction:', error);
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    });

    return router;
};
