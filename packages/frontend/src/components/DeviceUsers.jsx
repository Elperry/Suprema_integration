import React, { useEffect, useState } from 'react';
import api, { deviceAPI, healthAPI } from '../services/api';
import ErrorBanner from './ErrorBanner';
import { deriveHealthSummary } from '../utils/healthStatus';
import { DEVICE_OFFLINE_MESSAGE, GATEWAY_OFFLINE_MESSAGE, isGatewayUnavailableMessage } from '../utils/gatewayErrors';
import './DeviceUsers.css';

const normalizeDevice = (device) => ({
    id: device.id ?? null,
    gatewayDeviceId: device.deviceid ?? device.deviceId ?? null,
    name: device.name || device.deviceName || (device.deviceid ? `Device ${device.deviceid}` : 'Unnamed Device'),
    ip: device.ip || device.ipaddr || '',
    port: Number(device.port || 51211),
    status: device.status || 'disconnected',
    useSSL: Boolean(device.useSSL ?? device.usessl ?? false),
});

const endpointKey = (device) => `${device.ip}:${device.port}`;

const mergeDevices = (dbDevices, connectedDevices) => {
    const connectedByEndpoint = new Map(
        connectedDevices.map((device) => [endpointKey(device), device])
    );
    const merged = dbDevices.map((device) => {
        const liveDevice = connectedByEndpoint.get(endpointKey(device));
        if (!liveDevice) {
            return device;
        }

        return {
            ...device,
            gatewayDeviceId: liveDevice.gatewayDeviceId || device.gatewayDeviceId,
            status: 'connected',
        };
    });

    const existingEndpoints = new Set(merged.map((device) => endpointKey(device)));
    for (const device of connectedDevices) {
        if (!existingEndpoints.has(endpointKey(device))) {
            merged.push(device);
        }
    }

    return merged.sort((left, right) => {
        if (left.status === right.status) {
            return left.name.localeCompare(right.name);
        }

        return left.status === 'connected' ? -1 : 1;
    });
};

const hexToBytes = (value) => {
    const compact = value.replace(/\s+/g, '');
    const bytes = [];

    for (let index = 0; index < compact.length; index += 2) {
        bytes.push(Number.parseInt(compact.slice(index, index + 2), 16));
    }

    return bytes;
};

const base64ToBytes = (value) => {
    const decoded = atob(value);
    return Array.from(decoded, (char) => char.charCodeAt(0));
};

const bytesToHex = (bytes) => bytes
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase();

const normalizeCardHex = (cardData) => {
    if (!cardData) {
        return '';
    }

    if (typeof cardData === 'string') {
        const rawValue = String(cardData).trim();

        if (!rawValue) {
            return '';
        }

        const compact = rawValue.replace(/\s+/g, '');

        if (/^[0-9A-Fa-f]+$/.test(compact) && compact.length % 2 === 0) {
            return compact.toUpperCase();
        }

        try {
            return bytesToHex(base64ToBytes(rawValue));
        } catch (_) {
            return compact;
        }
    }

    if (Array.isArray(cardData)) {
        return bytesToHex(cardData);
    }

    if (Array.isArray(cardData?.data)) {
        return bytesToHex(cardData.data);
    }

    return '';
};

const extractCardDetails = (card) => {
    const directCard = card || {};
    const csnData = directCard.csncarddata
        || directCard.csnCardData
        || directCard.csnCarddata
        || directCard.cardData?.csnCardData
        || directCard.cardData?.CSNCardData
        || directCard;

    return {
        hex: normalizeCardHex(csnData.data ?? directCard.data ?? directCard.cardData ?? ''),
        size: csnData.size ?? directCard.size ?? null,
        type: csnData.type ?? directCard.cardType ?? directCard.type ?? 'CSN',
    };
};

const getUserCards = (user) => user.cards || user.cardsList || [];

const parseCardNumber = (cardData) => {
    const rawValue = normalizeCardHex(cardData);

    if (!rawValue) {
        return 'N/A';
    }

    try {
        const bytes = hexToBytes(rawValue);
        let cardNumber = 0n;
        let started = false;

        for (const byte of bytes) {
            if (!started && byte === 0) {
                continue;
            }

            started = true;
            cardNumber = (cardNumber << 8n) | BigInt(byte);
        }

        return started ? cardNumber.toString() : '0';
    } catch (_) {
        return rawValue;
    }
};

const buildDeviceQuery = (device) => {
    if (device?.id !== null && device?.id !== undefined) {
        return { deviceId: device.id };
    }

    if (device?.gatewayDeviceId !== null && device?.gatewayDeviceId !== undefined) {
        return { deviceId: device.gatewayDeviceId };
    }

    return {
        ip: device?.ip,
        port: device?.port,
    };
};

const describeRequestError = (error, fallbackPrefix) => {
    const rawMessage = error?.response?.data?.message || error?.message || 'Unknown error';

    if (isGatewayUnavailableMessage(rawMessage)) {
        return GATEWAY_OFFLINE_MESSAGE;
    }

    if (/timeout/i.test(rawMessage)) {
        return `${fallbackPrefix}: the device gateway timed out while talking to the device.`;
    }

    if (/not connected/i.test(rawMessage)) {
        return `${fallbackPrefix}: the device is not connected to the gateway.`;
    }

    return `${fallbackPrefix}: ${rawMessage.replace(/^\d+\s+[A-Z_]+:\s*/i, '')}`;
};

const DeviceUsers = () => {
    const [devices, setDevices] = useState([]);
    const [selectedDevice, setSelectedDevice] = useState(null);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingUsers, setLoadingUsers] = useState(false);
    const [userLoadFailed, setUserLoadFailed] = useState(false);
    const [error, setError] = useState(null);
    const [expandedUser, setExpandedUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [showCardsOnly, setShowCardsOnly] = useState(false);
    const [copiedCardKey, setCopiedCardKey] = useState(null);

    useEffect(() => {
        loadDevices();
    }, []);

    const loadDevices = async () => {
        setLoading(true);
        setError(null);

        try {
            const [deviceResponse, healthResponse] = await Promise.all([
                deviceAPI.getAll(),
                healthAPI.check(),
            ]);

            const dbDevices = (deviceResponse.data?.data || []).map(normalizeDevice);
            const healthSummary = deriveHealthSummary(healthResponse);
            const connectedResponse = healthSummary.isGatewayConnected
                ? await api.get('/devices/direct/connected').catch(() => null)
                : null;
            const connectedDevices = (connectedResponse?.data?.data || []).map(normalizeDevice);
            const mergedDevices = mergeDevices(dbDevices, connectedDevices);

            setDevices(mergedDevices);
            if (!healthSummary.isGatewayConnected) {
                setError(GATEWAY_OFFLINE_MESSAGE);
            }

            if (selectedDevice) {
                const refreshedSelection = mergedDevices.find((device) => device.id === selectedDevice.id)
                    || mergedDevices.find((device) => endpointKey(device) === endpointKey(selectedDevice))
                    || null;
                setSelectedDevice(refreshedSelection);
            }
        } catch (err) {
            setError(describeRequestError(err, 'Failed to load devices'));
        } finally {
            setLoading(false);
        }
    };

    const loadUsersFromDevice = async (device) => {
        setSelectedDevice(device);
        setLoadingUsers(true);
        setUserLoadFailed(false);
        setError(null);
        setUsers([]);
        setExpandedUser(null);

        if (device.status !== 'connected') {
            setUserLoadFailed(true);
            setError(`${device.name || 'Selected device'} is offline. ${DEVICE_OFFLINE_MESSAGE}`);
            setLoadingUsers(false);
            return;
        }

        try {
            const response = await api.get('/devices/direct/users-cards', {
                params: buildDeviceQuery(device),
            });

            if (response.data.success) {
                setUsers(response.data.data || []);
            }
        } catch (err) {
            setUserLoadFailed(true);
            const deviceLabel = device.name || device.ip || 'selected device';
            setError(describeRequestError(err, `Failed to load users from ${deviceLabel}`));
        } finally {
            setLoadingUsers(false);
        }
    };

    const toggleUserExpand = (userId) => {
        setExpandedUser(expandedUser === userId ? null : userId);
    };

    const handleCopyValue = async (value, cardKey, label) => {
        if (!value || value === 'N/A') {
            return;
        }

        try {
            if (!navigator?.clipboard?.writeText) {
                throw new Error('Clipboard is not available in this browser');
            }

            await navigator.clipboard.writeText(String(value));
            setCopiedCardKey(cardKey);
            window.setTimeout(() => {
                setCopiedCardKey((currentKey) => (currentKey === cardKey ? null : currentKey));
            }, 1600);
        } catch (copyError) {
            setError(`Failed to copy ${label}: ${copyError.message}`);
        }
    };

    const filteredUsers = users.filter((user) => {
        const userCards = getUserCards(user);

        if (showCardsOnly && userCards.length === 0) {
            return false;
        }

        const term = searchTerm.toLowerCase();
        const matchesCard = userCards.some((card) => {
            const cardDetails = extractCardDetails(card);
            const rawCard = cardDetails.hex.toLowerCase();
            const decimalCard = parseCardNumber(cardDetails.hex).toLowerCase();
            return rawCard.includes(term) || decimalCard.includes(term);
        });

        return (
            String(user.id || '').toLowerCase().includes(term)
            || String(user.name || '').toLowerCase().includes(term)
            || matchesCard
        );
    });

    const usersWithCardsCount = users.filter((user) => getUserCards(user).length > 0).length;
    const totalCardsCount = users.reduce((sum, user) => sum + getUserCards(user).length, 0);

    return (
        <div className="device-users-container">
            <div className="device-users-header">
                <h2>Device Users & Cards</h2>
                <button
                    onClick={loadDevices}
                    className="btn-refresh"
                    disabled={loading}
                >
                    {loading ? 'Loading...' : 'Refresh Devices'}
                </button>
            </div>

            <ErrorBanner error={error} onDismiss={() => setError(null)} />

            <div className="device-users-content">
                <div className="devices-panel">
                    <h3>Devices ({devices.length})</h3>
                    <div className="device-list">
                        {devices.length === 0 && !loading && (
                            <div className="no-devices">No devices available</div>
                        )}

                        {devices.map((device) => (
                            <div
                                key={`${device.id ?? 'gateway'}-${endpointKey(device)}`}
                                className={`device-card ${selectedDevice?.id === device.id && endpointKey(selectedDevice) === endpointKey(device) ? 'selected' : ''} ${device.status !== 'connected' ? 'disabled' : ''}`}
                                onClick={() => loadUsersFromDevice(device)}
                            >
                                <div className="device-card-header">
                                    <span className="device-icon">DEV</span>
                                    <span className="device-name">{device.name}</span>
                                </div>
                                <div className="device-card-info">
                                    <span className="device-ip">{device.ip}:{device.port}</span>
                                    <span className={`device-status ${device.status || 'disconnected'}`}>
                                        {device.status || 'disconnected'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="users-panel">
                    {selectedDevice ? (
                        <>
                            <div className="users-panel-header">
                                <div>
                                    <h3>Users on {selectedDevice.name}</h3>
                                    <div className="users-device-meta">
                                        <span className={`device-status-pill ${selectedDevice.status || 'disconnected'}`}>
                                            {selectedDevice.status || 'disconnected'}
                                        </span>
                                        <span>{selectedDevice.ip}:{selectedDevice.port}</span>
                                        <span>{filteredUsers.length} shown</span>
                                    </div>
                                </div>
                                <div className="users-tools">
                                    <label className={`users-filter-toggle ${showCardsOnly ? 'active' : ''}`}>
                                        <input
                                            type="checkbox"
                                            checked={showCardsOnly}
                                            onChange={(event) => setShowCardsOnly(event.target.checked)}
                                        />
                                        Cards only
                                    </label>
                                    <button
                                        type="button"
                                        className="btn-refresh-secondary"
                                        onClick={() => loadUsersFromDevice(selectedDevice)}
                                        disabled={loadingUsers}
                                    >
                                        {loadingUsers ? 'Refreshing...' : 'Refresh Selected'}
                                    </button>
                                    <div className="users-search">
                                        <input
                                            type="text"
                                            placeholder="Search users or cards..."
                                            value={searchTerm}
                                            onChange={(event) => setSearchTerm(event.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            {loadingUsers ? (
                                <div className="loading-users">
                                    <div className="spinner"></div>
                                    <span>Loading users from device...</span>
                                </div>
                            ) : userLoadFailed ? (
                                <div className="no-users">
                                    User data is unavailable for this device until the gateway request succeeds.
                                </div>
                            ) : (
                                <>
                                    <div className="users-summary">
                                        <div className="summary-item">
                                            <span className="summary-value">{users.length}</span>
                                            <span className="summary-label">Total Users</span>
                                        </div>
                                        <div className="summary-item">
                                            <span className="summary-value">{usersWithCardsCount}</span>
                                            <span className="summary-label">With Cards</span>
                                        </div>
                                        <div className="summary-item">
                                            <span className="summary-value">{totalCardsCount}</span>
                                            <span className="summary-label">Total Cards</span>
                                        </div>
                                    </div>

                                    <div className="users-list">
                                        {filteredUsers.length === 0 && (
                                            <div className="no-users">
                                                {users.length === 0
                                                    ? 'No users enrolled on this device'
                                                    : 'No users match your search'}
                                            </div>
                                        )}

                                        {filteredUsers.map((user) => {
                                            const userCards = getUserCards(user);
                                            const displayedCardCount = user.numOfCard || userCards.length;

                                            return (
                                                <div
                                                    key={user.id}
                                                    className={`user-card ${expandedUser === user.id ? 'expanded' : ''}`}
                                                >
                                                    <div
                                                        className="user-card-header"
                                                        onClick={() => toggleUserExpand(user.id)}
                                                    >
                                                        <div className="user-info">
                                                            <span className="user-icon">USER</span>
                                                            <div className="user-details">
                                                                <span className="user-name">
                                                                    {user.name || 'Unknown'}
                                                                </span>
                                                                <span className="user-id">ID: {user.id}</span>
                                                            </div>
                                                        </div>
                                                        <div className="user-badges">
                                                            {displayedCardCount > 0 && (
                                                                <span className="badge badge-card" title="Cards">
                                                                    Card {displayedCardCount}
                                                                </span>
                                                            )}
                                                            {user.numOfFinger > 0 && (
                                                                <span className="badge badge-finger" title="Fingerprints">
                                                                    Finger {user.numOfFinger}
                                                                </span>
                                                            )}
                                                            {user.numOfFace > 0 && (
                                                                <span className="badge badge-face" title="Faces">
                                                                    Face {user.numOfFace}
                                                                </span>
                                                            )}
                                                            <span className="expand-icon">
                                                                {expandedUser === user.id ? 'v' : '>'}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {expandedUser === user.id && (
                                                        <div className="user-card-body">
                                                            <div className="credentials-section">
                                                                <h4>Cards ({userCards.length})</h4>
                                                                {userCards.length === 0 ? (
                                                                    <div className="no-credentials">No cards assigned</div>
                                                                ) : (
                                                                    <div className="cards-list">
                                                                        {userCards.map((card, index) => {
                                                                            const cardDetails = extractCardDetails(card);
                                                                            const cardNumber = parseCardNumber(cardDetails.hex);
                                                                            const numberCopyKey = `${user.id}-${index}-number`;
                                                                            const hexCopyKey = `${user.id}-${index}-hex`;

                                                                            return (
                                                                                <div key={index} className="card-item">
                                                                                    <div className="card-icon">CARD</div>
                                                                                    <div className="card-details">
                                                                                        <div className="card-data">
                                                                                            <span className="label">CSN</span>
                                                                                            <code>{cardNumber}</code>
                                                                                        </div>
                                                                                        <div className="card-meta">
                                                                                            <span>Hex: {cardDetails.hex || 'N/A'}</span>
                                                                                            <span>Type: {cardDetails.type ?? 'CSN'}</span>
                                                                                            <span>Size: {cardDetails.size ?? 'N/A'} bytes</span>
                                                                                        </div>
                                                                                        <div className="card-actions">
                                                                                            <button
                                                                                                type="button"
                                                                                                className="card-action-btn"
                                                                                                onClick={() => handleCopyValue(cardNumber, numberCopyKey, 'card number')}
                                                                                                disabled={cardNumber === 'N/A'}
                                                                                            >
                                                                                                {copiedCardKey === numberCopyKey ? 'Copied' : 'Copy Number'}
                                                                                            </button>
                                                                                            <button
                                                                                                type="button"
                                                                                                className="card-action-btn"
                                                                                                onClick={() => handleCopyValue(cardDetails.hex, hexCopyKey, 'card hex')}
                                                                                                disabled={!cardDetails.hex}
                                                                                            >
                                                                                                {copiedCardKey === hexCopyKey ? 'Copied' : 'Copy Hex'}
                                                                                            </button>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            );
                                                                        })}
                                                                    </div>
                                                                )}
                                                            </div>

                                                            {(user.numOfFinger > 0 || user.numOfFace > 0) && (
                                                                <div className="other-credentials">
                                                                    {user.numOfFinger > 0 && (
                                                                        <div className="credential-info">
                                                                            <span>{user.numOfFinger} fingerprint(s) enrolled</span>
                                                                        </div>
                                                                    )}
                                                                    {user.numOfFace > 0 && (
                                                                        <div className="credential-info">
                                                                            <span>{user.numOfFace} face(s) enrolled</span>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </>
                            )}
                        </>
                    ) : (
                        <div className="select-device-prompt">
                            <div className="prompt-icon">VIEW</div>
                            <p>Select a device from the list to view enrolled users and cards</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DeviceUsers;
