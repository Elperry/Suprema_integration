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
 * Compare a gateway device entry against a DB device row by network endpoint.
 * Lenient on types: IPs are trimmed strings, ports compared numerically, so a
 * DB row edited by hand (string port, stray whitespace) still matches.
 *
 * @param {Object} gatewayInfo - Plain object from the gateway device list
 * @param {Object} dbDevice - Device row with `ip` and `port`
 * @returns {boolean}
 */
export function endpointMatches(gatewayInfo, dbDevice) {
    if (!gatewayInfo || !dbDevice) return false;
    return (
        String(gatewayInfo.ipaddr ?? '').trim() === String(dbDevice.ip ?? '').trim() &&
        Number(gatewayInfo.port) === Number(dbDevice.port)
    );
}

/**
 * Find a DB device's entry in the gateway device list.
 *
 * @param {Array} gatewayDevices - Result of connectionService.getConnectedDevices()
 * @param {Object} dbDevice - Device row with `ip` and `port`
 * @returns {Object|null} Plain gateway info object, or null when absent
 */
export function findGatewayDevice(gatewayDevices, dbDevice) {
    for (const device of gatewayDevices) {
        const info = device.toObject ? device.toObject() : device;
        if (endpointMatches(info, dbDevice)) {
            return info;
        }
    }
    return null;
}

/**
 * Resolve a database device ID to a Suprema device ID by looking up the
 * connected device list.  Large numbers (>100000) are assumed to already
 * be Suprema device IDs.
 *
 * When the device has no live gateway session (e.g. its DB status went
 * stale after a drop), a single reconnect via
 * connectionService.connectToDeviceFromDB() is attempted before failing,
 * so callers self-heal instead of erroring on stale state.
 *
 * @param {string|number} dbDeviceId - Database or Suprema device ID
 * @param {Object} connectionService - Connection service instance
 * @param {{ reconnect?: boolean }} [options] - Set reconnect:false to skip the self-heal attempt
 * @returns {Promise<number>} Suprema device ID
 * @throws {Error} If device not found, or not connected and reconnection failed
 */
export async function resolveSupremaDeviceId(dbDeviceId, connectionService, options = {}) {
    const { reconnect = true } = options;
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

    const match = findGatewayDevice(connectedDevices, dbDevice);
    if (match) {
        return match.deviceid;
    }

    // No live session on the gateway — try to re-establish it once.
    if (reconnect && typeof connectionService.connectToDeviceFromDB === 'function') {
        try {
            return await connectionService.connectToDeviceFromDB(dbDevice);
        } catch (reconnectError) {
            throw new Error(
                `Device ${dbDevice.name} (${dbDevice.ip}) is not connected and ` +
                `reconnection failed: ${reconnectError.message}`
            );
        }
    }

    throw new Error(
        `Device ${dbDevice.name} (${dbDevice.ip}) is not connected. Please connect the device first.`
    );
}

export default { extractUserIdFromEvent, resolveSupremaDeviceId, endpointMatches, findGatewayDevice };
