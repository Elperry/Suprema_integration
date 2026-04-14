import React, { useEffect, useState } from 'react';
import api, { deviceAPI } from '../services/api';
import ErrorBanner from './ErrorBanner';
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

const parseCardNumber = (cardData) => {
    if (!cardData) {
        return 'N/A';
    }

    const rawValue = String(cardData).trim();

    try {
        const isHex = /^[0-9A-Fa-f]+$/.test(rawValue) && rawValue.length % 2 === 0;
        const bytes = isHex ? hexToBytes(rawValue) : base64ToBytes(rawValue);
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

    useEffect(() => {
        loadDevices();
    }, []);

    const loadDevices = async () => {
        setLoading(true);
        setError(null);

        try {
            const [deviceResponse, connectedResponse] = await Promise.all([
                deviceAPI.getAll(),
                api.get('/devices/direct/connected').catch(() => null),
            ]);

            const dbDevices = (deviceResponse.data?.data || []).map(normalizeDevice);
            const connectedDevices = (connectedResponse?.data?.data || []).map(normalizeDevice);
            const mergedDevices = mergeDevices(dbDevices, connectedDevices);

            setDevices(mergedDevices);

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

    const filteredUsers = users.filter((user) => {
        const term = searchTerm.toLowerCase();
        const matchesCard = (user.cards || []).some((card) => {
            const rawCard = String(card.data || '').toLowerCase();
            const decimalCard = parseCardNumber(card.data).toLowerCase();
            return rawCard.includes(term) || decimalCard.includes(term);
        });

        return (
            String(user.id || '').toLowerCase().includes(term)
            || String(user.name || '').toLowerCase().includes(term)
            || matchesCard
        );
    });

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
                                className={`device-card ${selectedDevice?.id === device.id && endpointKey(selectedDevice) === endpointKey(device) ? 'selected' : ''}`}
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
                                <h3>Users on {selectedDevice.name}</h3>
                                <div className="users-search">
                                    <input
                                        type="text"
                                        placeholder="Search users or cards..."
                                        value={searchTerm}
                                        onChange={(event) => setSearchTerm(event.target.value)}
                                    />
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
                                            <span className="summary-value">
                                                {users.filter((user) => user.cards && user.cards.length > 0).length}
                                            </span>
                                            <span className="summary-label">With Cards</span>
                                        </div>
                                        <div className="summary-item">
                                            <span className="summary-value">
                                                {users.reduce((sum, user) => sum + (user.cards?.length || 0), 0)}
                                            </span>
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

                                        {filteredUsers.map((user) => (
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
                                                        {user.numOfCard > 0 && (
                                                            <span className="badge badge-card" title="Cards">
                                                                Card {user.numOfCard}
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
                                                            <h4>Cards ({user.cards?.length || 0})</h4>
                                                            {(!user.cards || user.cards.length === 0) ? (
                                                                <div className="no-credentials">No cards assigned</div>
                                                            ) : (
                                                                <div className="cards-list">
                                                                    {user.cards.map((card, index) => (
                                                                        <div key={index} className="card-item">
                                                                            <div className="card-icon">CARD</div>
                                                                            <div className="card-details">
                                                                                <div className="card-data">
                                                                                    <span className="label">CSN</span>
                                                                                    <code>{parseCardNumber(card.data)}</code>
                                                                                </div>
                                                                                <div className="card-meta">
                                                                                    <span>Hex: {card.data || 'N/A'}</span>
                                                                                    <span>Type: {card.cardType ?? card.type ?? 'CSN'}</span>
                                                                                    <span>Size: {card.size ?? 'N/A'} bytes</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    ))}
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
                                        ))}
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
