/**
 * Device Resolution Utilities
 * Shared helpers for device ID resolution and event data extraction.
 * Eliminates duplication across routes and services.
 */

/**
 * Extract user ID from a Suprema device event.
 * For user-related events (0x5000-0x5FFF), the user ID may be
 * in entityid instead of userid.
 * 
 * @param {Object} event - Event object from device
 * @returns {string|null} User ID or null
 */
export function extractUserIdFromEvent(event) {
    if (event.userid && event.userid !== '' && event.userid !== '0') {
        return event.userid;
    }

    const eventCode = event.eventcode || 0;
    if (eventCode >= 0x5000 && eventCode <= 0x5FFF) {
        if (event.entityid && event.entityid !== 0) {
            return String(event.entityid);
        }
    }

    return null;
}

/**
 * Resolve a database device ID to a Suprema device ID by looking up the
 * connected device list.  Large numbers (>100000) are assumed to already
 * be Suprema device IDs.
 * 
 * @param {string|number} dbDeviceId - Database or Suprema device ID
 * @param {Object} connectionService - Connection service instance
 * @returns {Promise<number>} Suprema device ID
 * @throws {Error} If device not found or not connected
 */
export async function resolveSupremaDeviceId(dbDeviceId, connectionService) {
    const parsedId = parseInt(dbDeviceId, 10);

    if (isNaN(parsedId)) {
        throw new Error('Invalid device ID format. Must be a number.');
    }

    // Large numbers are already Suprema device IDs
    if (parsedId > 100000) {
        return parsedId;
    }

    const connectedDevices = await connectionService.getConnectedDevices();
    const devices = await connectionService.getAllDevicesFromDB();
    const dbDevice = devices.find(d => d.id === parsedId);

    if (!dbDevice) {
        throw new Error(`Device with ID ${parsedId} not found in database`);
    }

    for (const device of connectedDevices) {
        const info = device.toObject ? device.toObject() : device;
        if (info.ipaddr === dbDevice.ip && info.port === dbDevice.port) {
            return info.deviceid;
        }
    }

    throw new Error(
        `Device ${dbDevice.name} (${dbDevice.ip}) is not connected. Please connect the device first.`
    );
}

export default { extractUserIdFromEvent, resolveSupremaDeviceId };
