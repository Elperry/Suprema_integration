import React, { useState, useEffect } from 'react';
import api from '../services/api';
import './DeviceUsers.css';

const DeviceUsers = () => {
    const [devices, setDevices] = useState([]);
    const [selectedDevice, setSelectedDevice] = useState(null);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingUsers, setLoadingUsers] = useState(false);
    const [error, setError] = useState(null);
    const [expandedUser, setExpandedUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Load connected devices on mount
    useEffect(() => {
        loadConnectedDevices();
    }, []);

    const loadConnectedDevices = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get('/api/devices/direct/connected');
            if (response.data.success) {
                setDevices(response.data.data);
            }
        } catch (err) {
            setError('Failed to load connected devices: ' + (err.response?.data?.message || err.message));
        } finally {
            setLoading(false);
        }
    };

    const loadUsersFromDevice = async (device) => {
        setSelectedDevice(device);
        setLoadingUsers(true);
        setError(null);
        setUsers([]);
        
        try {
            const response = await api.get('/api/devices/direct/users-cards', {
                params: { deviceId: device.deviceid }
            });
            
            if (response.data.success) {
                setUsers(response.data.data);
            }
        } catch (err) {
            setError('Failed to load users: ' + (err.response?.data?.message || err.message));
        } finally {
            setLoadingUsers(false);
        }
    };

    const toggleUserExpand = (userId) => {
        setExpandedUser(expandedUser === userId ? null : userId);
    };

    /**
     * Decode Base64 card data to decimal number
     */
    const decodeCardToDecimal = (base64Data) => {
        try {
            if (!base64Data) return 'N/A';
            
            // Decode Base64 to binary
            const binaryStr = atob(base64Data);
            const bytes = new Uint8Array(binaryStr.length);
            for (let i = 0; i < binaryStr.length; i++) {
                bytes[i] = binaryStr.charCodeAt(i);
            }
            
            // Find significant bytes (skip leading zeros)
            let startIdx = 0;
            while (startIdx < bytes.length && bytes[startIdx] === 0) {
                startIdx++;
            }
            
            // Extract significant bytes
            const significantBytes = bytes.slice(startIdx);
            
            // Calculate decimal value using BigInt for large numbers
            let cardNumber = 0n;
            for (const byte of significantBytes) {
                cardNumber = (cardNumber << 8n) | BigInt(byte);
            }
            
            return cardNumber.toString();
        } catch (e) {
            console.error('Failed to decode card data:', e);
            return 'Error';
        }
    };

    const formatCardData = (cardData) => {
        if (!cardData) return 'N/A';
        // Return decimal card number
        return decodeCardToDecimal(cardData);
    };

    const filteredUsers = users.filter(user => {
        const term = searchTerm.toLowerCase();
        return (
            user.id?.toLowerCase().includes(term) ||
            user.name?.toLowerCase().includes(term) ||
            user.cards?.some(card => card.data?.toLowerCase().includes(term))
        );
    });

    return (
        <div className="device-users-container">
            <div className="device-users-header">
                <h2>Device Users & Cards</h2>
                <button 
                    onClick={loadConnectedDevices} 
                    className="btn-refresh"
                    disabled={loading}
                >
                    {loading ? 'Loading...' : '🔄 Refresh Devices'}
                </button>
            </div>

            {error && (
                <div className="error-banner">
                    <span>⚠️ {error}</span>
                    <button onClick={() => setError(null)}>✕</button>
                </div>
            )}

            <div className="device-users-content">
                {/* Device Selection Panel */}
                <div className="devices-panel">
                    <h3>Connected Devices ({devices.length})</h3>
                    <div className="device-list">
                        {devices.length === 0 && !loading && (
                            <div className="no-devices">No devices connected</div>
                        )}
                        {devices.map((device) => (
                            <div
                                key={device.deviceid}
                                className={`device-card ${selectedDevice?.deviceid === device.deviceid ? 'selected' : ''}`}
                                onClick={() => loadUsersFromDevice(device)}
                            >
                                <div className="device-card-header">
                                    <span className="device-icon">📟</span>
                                    <span className="device-name">Device {device.deviceid}</span>
                                </div>
                                <div className="device-card-info">
                                    <span className="device-ip">{device.ipaddr}:{device.port}</span>
                                    <span className={`device-status ${device.status || 'connected'}`}>
                                        ● {device.status || 'Connected'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Users Panel */}
                <div className="users-panel">
                    {selectedDevice ? (
                        <>
                            <div className="users-panel-header">
                                <h3>Users on Device {selectedDevice.deviceid}</h3>
                                <div className="users-search">
                                    <input
                                        type="text"
                                        placeholder="Search users or cards..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>

                            {loadingUsers ? (
                                <div className="loading-users">
                                    <div className="spinner"></div>
                                    <span>Loading users from device...</span>
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
                                                {users.filter(u => u.cards && u.cards.length > 0).length}
                                            </span>
                                            <span className="summary-label">With Cards</span>
                                        </div>
                                        <div className="summary-item">
                                            <span className="summary-value">
                                                {users.reduce((sum, u) => sum + (u.cards?.length || 0), 0)}
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
                                                        <span className="user-icon">👤</span>
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
                                                                💳 {user.numOfCard}
                                                            </span>
                                                        )}
                                                        {user.numOfFinger > 0 && (
                                                            <span className="badge badge-finger" title="Fingerprints">
                                                                👆 {user.numOfFinger}
                                                            </span>
                                                        )}
                                                        {user.numOfFace > 0 && (
                                                            <span className="badge badge-face" title="Faces">
                                                                😀 {user.numOfFace}
                                                            </span>
                                                        )}
                                                        <span className="expand-icon">
                                                            {expandedUser === user.id ? '▼' : '▶'}
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
                                                                    {user.cards.map((card, idx) => (
                                                                        <div key={idx} className="card-item">
                                                                            <div className="card-icon">💳</div>
                                                                            <div className="card-details">
                                                                                <div className="card-data">
                                                                                    <span className="label">CSN:</span>
                                                                                    <code>{formatCardData(card.data)}</code>
                                                                                </div>
                                                                                <div className="card-meta">
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
                                                                        <span>👆 {user.numOfFinger} fingerprint(s) enrolled</span>
                                                                    </div>
                                                                )}
                                                                {user.numOfFace > 0 && (
                                                                    <div className="credential-info">
                                                                        <span>😀 {user.numOfFace} face(s) enrolled</span>
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
                            <div className="prompt-icon">👈</div>
                            <p>Select a device from the list to view enrolled users and cards</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DeviceUsers;
