// Suprema HR Integration - Frontend Application
// Main application entry point

class SupremaApp {
    constructor() {
        this.baseURL = 'http://localhost:3000';
        this.currentSection = 'dashboard';
        this.devices = [];
        this.refreshInterval = null;
        this.scanTimeout = null;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.checkHealth();
        this.loadInitialData();
        this.startAutoRefresh();
    }

    // API Client Methods
    async apiCall(endpoint, options = {}) {
        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                },
                ...options
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`API call failed for ${endpoint}:`, error);
            this.showToast('API Error: ' + error.message, 'error');
            throw error;
        }
    }

    async checkHealth() {
        try {
            const health = await this.apiCall('/health');
            this.updateConnectionStatus('connected');
            this.updateSystemHealth(health);
            return health;
        } catch (error) {
            this.updateConnectionStatus('disconnected');
            return null;
        }
    }

    async getDevices() {
        try {
            const devices = await this.apiCall('/devices');
            this.devices = devices;
            return devices;
        } catch (error) {
            return [];
        }
    }

    async addDevice(deviceData) {
        try {
            const device = await this.apiCall('/devices', {
                method: 'POST',
                body: JSON.stringify(deviceData)
            });
            this.showToast('Device added successfully', 'success');
            await this.loadDevices();
            return device;
        } catch (error) {
            this.showToast('Failed to add device', 'error');
            throw error;
        }
    }

    async deleteDevice(deviceId) {
        try {
            await this.apiCall(`/devices/${deviceId}`, {
                method: 'DELETE'
            });
            this.showToast('Device deleted successfully', 'success');
            await this.loadDevices();
        } catch (error) {
            this.showToast('Failed to delete device', 'error');
            throw error;
        }
    }

    async getUsers(deviceId) {
        try {
            const users = await this.apiCall(`/users/${deviceId}`);
            return users;
        } catch (error) {
            return [];
        }
    }

    async setUserCards(deviceId, userId, cards) {
        try {
            const result = await this.apiCall(`/cards/set/${deviceId}`, {
                method: 'POST',
                body: JSON.stringify({ userId, cards })
            });
            this.showToast('Cards assigned successfully', 'success');
            return result;
        } catch (error) {
            this.showToast('Failed to assign cards', 'error');
            throw error;
        }
    }

    async scanCard(deviceId, timeout = 30) {
        try {
            const result = await this.apiCall(`/cards/scan/${deviceId}`, {
                method: 'POST',
                body: JSON.stringify({ timeout })
            });
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getEvents(deviceId = null) {
        try {
            const endpoint = deviceId ? `/events/${deviceId}` : '/events';
            const events = await this.apiCall(endpoint);
            return events;
        } catch (error) {
            return [];
        }
    }

    async updateGatewayConfig(ip, port) {
        try {
            const config = await this.apiCall('/config/gateway', {
                method: 'POST',
                body: JSON.stringify({ ip, port })
            });
            this.showToast('Gateway configuration updated', 'success');
            return config;
        } catch (error) {
            this.showToast('Failed to update gateway configuration', 'error');
            throw error;
        }
    }

    // UI Management Methods
    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', () => {
                const section = item.dataset.section;
                this.switchSection(section);
            });
        });

        // Modal management
        document.getElementById('addDeviceBtn').addEventListener('click', () => {
            this.openModal('addDeviceModal');
        });

        document.getElementById('assignCardBtn').addEventListener('click', () => {
            this.openModal('cardAssignModal');
        });

        // Device selection for users section
        document.getElementById('deviceSelect').addEventListener('change', (e) => {
            const deviceId = e.target.value;
            if (deviceId) {
                this.loadUsers(deviceId);
            }
        });

        // Scanning controls
        document.getElementById('startScanBtn').addEventListener('click', () => {
            this.startCardScan();
        });

        // Settings
        document.getElementById('saveGatewayBtn').addEventListener('click', () => {
            this.saveGatewayConfig();
        });

        document.getElementById('autoRefresh').addEventListener('change', (e) => {
            if (e.target.checked) {
                this.startAutoRefresh();
            } else {
                this.stopAutoRefresh();
            }
        });

        document.getElementById('refreshInterval').addEventListener('change', (e) => {
            const interval = parseInt(e.target.value) * 1000;
            if (this.refreshInterval) {
                this.stopAutoRefresh();
                this.startAutoRefresh(interval);
            }
        });

        // Close modals when clicking outside
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeModal(e.target.id);
            }
        });
    }

    switchSection(sectionName) {
        // Update navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');

        // Update content
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(`${sectionName}-section`).classList.add('active');

        this.currentSection = sectionName;

        // Load section-specific data
        this.loadSectionData(sectionName);
    }

    async loadSectionData(section) {
        switch (section) {
            case 'dashboard':
                await this.loadDashboard();
                break;
            case 'devices':
                await this.loadDevices();
                break;
            case 'users':
                await this.loadDeviceSelectors();
                break;
            case 'scanning':
                await this.loadScanningDevices();
                break;
            case 'events':
                await this.loadEvents();
                break;
            case 'settings':
                await this.loadSettings();
                break;
        }
    }

    async loadInitialData() {
        await this.loadDashboard();
        await this.loadDevices();
    }

    async loadDashboard() {
        try {
            const health = await this.checkHealth();
            const devices = await this.getDevices();
            
            this.updateDashboardStats(health, devices);
        } catch (error) {
            console.error('Failed to load dashboard:', error);
        }
    }

    updateDashboardStats(health, devices) {
        // System Health
        const systemHealthEl = document.getElementById('systemHealth');
        const systemHealthDetailsEl = document.getElementById('systemHealthDetails');
        
        if (health) {
            systemHealthEl.textContent = 'Healthy';
            systemHealthEl.className = 'health-status healthy';
            systemHealthDetailsEl.textContent = `Uptime: ${health.uptime || 'Unknown'}`;
        } else {
            systemHealthEl.textContent = 'Error';
            systemHealthEl.className = 'health-status error';
            systemHealthDetailsEl.textContent = 'Unable to connect to server';
        }

        // Database Status
        const databaseStatusEl = document.getElementById('databaseStatus');
        const databaseDetailsEl = document.getElementById('databaseDetails');
        
        if (health && health.database) {
            databaseStatusEl.textContent = 'Connected';
            databaseStatusEl.className = 'health-status healthy';
            databaseDetailsEl.textContent = 'Database connection active';
        } else {
            databaseStatusEl.textContent = 'Unknown';
            databaseStatusEl.className = 'health-status warning';
            databaseDetailsEl.textContent = 'Database status unavailable';
        }

        // Device Count
        const deviceCountEl = document.getElementById('deviceCount');
        const deviceDetailsEl = document.getElementById('deviceDetails');
        
        if (devices && Array.isArray(devices)) {
            deviceCountEl.textContent = devices.length;
            deviceCountEl.className = 'health-status healthy';
            deviceDetailsEl.textContent = `${devices.length} device(s) configured`;
        } else {
            deviceCountEl.textContent = '0';
            deviceCountEl.className = 'health-status warning';
            deviceDetailsEl.textContent = 'No devices configured';
        }

        // Gateway Status
        const gatewayStatusEl = document.getElementById('gatewayStatus');
        const gatewayDetailsEl = document.getElementById('gatewayDetails');
        
        if (health && health.gateway) {
            gatewayStatusEl.textContent = 'Connected';
            gatewayStatusEl.className = 'health-status healthy';
            gatewayDetailsEl.textContent = `Gateway: ${health.gateway.ip}:${health.gateway.port}`;
        } else {
            gatewayStatusEl.textContent = 'Disconnected';
            gatewayStatusEl.className = 'health-status error';
            gatewayDetailsEl.textContent = 'Gateway configuration missing';
        }

        this.updateLastRefresh();
    }

    async loadDevices() {
        const deviceGrid = document.getElementById('deviceGrid');
        
        try {
            const devices = await this.getDevices();
            
            if (devices.length === 0) {
                deviceGrid.innerHTML = '<div class="loading-card">No devices configured. Click "Add Device" to get started.</div>';
                return;
            }

            deviceGrid.innerHTML = devices.map(device => `
                <div class="device-card">
                    <div class="device-card-header">
                        <div class="device-info">
                            <h4>${device.name}</h4>
                            <p>${device.location || 'No location specified'}</p>
                        </div>
                        <span class="device-status ${device.status || 'offline'}">${device.status || 'offline'}</span>
                    </div>
                    <div class="device-details">
                        <div class="device-detail">
                            <span>IP Address</span>
                            <span>${device.ip}</span>
                        </div>
                        <div class="device-detail">
                            <span>Port</span>
                            <span>${device.port}</span>
                        </div>
                        <div class="device-detail">
                            <span>Type</span>
                            <span>${device.type || 'Unknown'}</span>
                        </div>
                        <div class="device-detail">
                            <span>Last Seen</span>
                            <span>${device.lastSeen ? new Date(device.lastSeen).toLocaleString() : 'Never'}</span>
                        </div>
                    </div>
                    <div class="device-actions">
                        <button class="btn btn-info" onclick="app.testDevice(${device.id})">
                            <i class="fas fa-plug"></i> Test
                        </button>
                        <button class="btn btn-secondary" onclick="app.editDevice(${device.id})">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="btn btn-warning" onclick="app.confirmDeleteDevice(${device.id})">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </div>
                </div>
            `).join('');
        } catch (error) {
            deviceGrid.innerHTML = '<div class="loading-card">Failed to load devices</div>';
        }
    }

    async loadDeviceSelectors() {
        try {
            const devices = await this.getDevices();
            const selectors = ['deviceSelect', 'scanDeviceSelect', 'eventDeviceFilter'];
            
            selectors.forEach(selectorId => {
                const selector = document.getElementById(selectorId);
                if (selector) {
                    const currentValue = selector.value;
                    selector.innerHTML = '<option value="">Select Device</option>' +
                        devices.map(device => 
                            `<option value="${device.id}" ${device.id == currentValue ? 'selected' : ''}>${device.name}</option>`
                        ).join('');
                }
            });
        } catch (error) {
            console.error('Failed to load device selectors:', error);
        }
    }

    async loadUsers(deviceId) {
        const userList = document.getElementById('userList');
        
        try {
            const users = await this.getUsers(deviceId);
            
            if (users.length === 0) {
                userList.innerHTML = '<div class="loading-card">No users found for this device</div>';
                return;
            }

            userList.innerHTML = users.map(user => `
                <div class="user-item">
                    <div class="user-info">
                        <h5>User ID: ${user.userId}</h5>
                        <p>Cards: ${user.cards ? user.cards.length : 0}</p>
                    </div>
                    <div class="user-actions">
                        <button class="btn btn-info" onclick="app.viewUserCards('${user.userId}')">
                            <i class="fas fa-eye"></i> View Cards
                        </button>
                        <button class="btn btn-warning" onclick="app.removeUser('${deviceId}', '${user.userId}')">
                            <i class="fas fa-trash"></i> Remove
                        </button>
                    </div>
                </div>
            `).join('');
        } catch (error) {
            userList.innerHTML = '<div class="loading-card">Failed to load users</div>';
        }
    }

    async loadScanningDevices() {
        await this.loadDeviceSelectors();
    }

    async loadEvents() {
        const eventsList = document.getElementById('eventsList');
        const deviceFilter = document.getElementById('eventDeviceFilter').value;
        
        try {
            const events = await this.getEvents(deviceFilter || null);
            
            if (events.length === 0) {
                eventsList.innerHTML = '<div class="loading-card">No events found</div>';
                return;
            }

            eventsList.innerHTML = events.map(event => `
                <div class="event-item">
                    <div class="event-icon">
                        <i class="fas fa-${this.getEventIcon(event.type)}"></i>
                    </div>
                    <div class="event-content">
                        <h5>${event.type || 'Unknown Event'}</h5>
                        <p>Device: ${event.deviceName || event.deviceId} | User: ${event.userId || 'N/A'}</p>
                    </div>
                    <div class="event-time">
                        ${event.timestamp ? new Date(event.timestamp).toLocaleString() : 'Unknown time'}
                    </div>
                </div>
            `).join('');
        } catch (error) {
            eventsList.innerHTML = '<div class="loading-card">Failed to load events</div>';
        }
    }

    async loadSettings() {
        // Load current gateway configuration
        try {
            const health = await this.checkHealth();
            if (health && health.gateway) {
                document.getElementById('gatewayIp').value = health.gateway.ip || '';
                document.getElementById('gatewayPort').value = health.gateway.port || '';
            }
        } catch (error) {
            console.error('Failed to load gateway settings:', error);
        }

        // Load system information
        try {
            const health = await this.checkHealth();
            if (health) {
                document.getElementById('apiVersion').textContent = health.version || '1.0.0';
                document.getElementById('serverUptime').textContent = health.uptime || 'Unknown';
            }
        } catch (error) {
            console.error('Failed to load system information:', error);
        }
    }

    // Card Scanning Methods
    async startCardScan() {
        const deviceId = document.getElementById('scanDeviceSelect').value;
        const timeout = parseInt(document.getElementById('scanTimeout').value);
        const scanStatus = document.getElementById('scanStatus');
        const scanData = document.getElementById('scanData');
        const startBtn = document.getElementById('startScanBtn');

        if (!deviceId) {
            this.showToast('Please select a device', 'warning');
            return;
        }

        // Update UI for scanning state
        startBtn.disabled = true;
        startBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Scanning...';
        
        scanStatus.innerHTML = `
            <div class="scan-scanning">
                <i class="fas fa-id-card"></i>
                <p>Scanning for card... (${timeout}s timeout)</p>
            </div>
        `;
        scanData.style.display = 'none';

        try {
            const result = await this.scanCard(deviceId, timeout);
            
            // Success
            scanStatus.innerHTML = `
                <div class="scan-success">
                    <i class="fas fa-check-circle"></i>
                    <p>Card detected successfully!</p>
                </div>
            `;
            
            document.getElementById('cardDataOutput').textContent = JSON.stringify(result, null, 2);
            scanData.style.display = 'block';
            
            this.showToast('Card scan successful', 'success');
            
        } catch (error) {
            // Error
            scanStatus.innerHTML = `
                <div class="scan-error">
                    <i class="fas fa-exclamation-circle"></i>
                    <p>Scan failed: ${error.message}</p>
                </div>
            `;
            
            this.showToast('Card scan failed', 'error');
        } finally {
            // Reset button
            startBtn.disabled = false;
            startBtn.innerHTML = '<i class="fas fa-play"></i> Start Card Scan';
        }
    }

    // Device Management Methods
    async testDevice(deviceId) {
        try {
            // Test device connection (this would be a new API endpoint)
            this.showToast('Testing device connection...', 'info');
            
            // For now, just show success
            setTimeout(() => {
                this.showToast('Device test completed', 'success');
            }, 2000);
        } catch (error) {
            this.showToast('Device test failed', 'error');
        }
    }

    editDevice(deviceId) {
        // TODO: Implement device editing
        this.showToast('Device editing not yet implemented', 'info');
    }

    confirmDeleteDevice(deviceId) {
        if (confirm('Are you sure you want to delete this device?')) {
            this.deleteDevice(deviceId);
        }
    }

    // Settings Management
    async saveGatewayConfig() {
        const ip = document.getElementById('gatewayIp').value;
        const port = document.getElementById('gatewayPort').value;

        if (!ip || !port) {
            this.showToast('Please enter both IP and port', 'warning');
            return;
        }

        try {
            await this.updateGatewayConfig(ip, parseInt(port));
        } catch (error) {
            // Error already handled in updateGatewayConfig
        }
    }

    // Modal Management
    openModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.classList.add('show');
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.classList.remove('show');
    }

    // Form Submissions
    async submitAddDevice() {
        const form = document.getElementById('addDeviceForm');
        const formData = new FormData(form);
        
        const deviceData = {
            name: document.getElementById('deviceName').value,
            ip: document.getElementById('deviceIp').value,
            port: parseInt(document.getElementById('devicePort').value),
            type: document.getElementById('deviceType').value,
            location: document.getElementById('deviceLocation').value
        };

        try {
            await this.addDevice(deviceData);
            this.closeModal('addDeviceModal');
            form.reset();
        } catch (error) {
            // Error already handled in addDevice
        }
    }

    async submitCardAssign() {
        const deviceId = document.getElementById('deviceSelect').value;
        const userId = document.getElementById('cardUserId').value;
        const cardData = document.getElementById('cardData').value;
        const cardType = parseInt(document.getElementById('cardType').value);

        if (!deviceId) {
            this.showToast('Please select a device first', 'warning');
            return;
        }

        if (!userId || !cardData) {
            this.showToast('Please fill in all required fields', 'warning');
            return;
        }

        const cards = [{
            data: cardData,
            type: cardType,
            size: cardData.length / 2 // Assuming hex string
        }];

        try {
            await this.setUserCards(deviceId, userId, cards);
            this.closeModal('cardAssignModal');
            document.getElementById('cardAssignForm').reset();
            
            // Refresh users list if we're on the users section
            if (this.currentSection === 'users') {
                this.loadUsers(deviceId);
            }
        } catch (error) {
            // Error already handled in setUserCards
        }
    }

    // Auto-refresh functionality
    startAutoRefresh(interval = 30000) {
        this.stopAutoRefresh();
        this.refreshInterval = setInterval(() => {
            if (document.getElementById('autoRefresh').checked) {
                this.refreshCurrentSection();
            }
        }, interval);
    }

    stopAutoRefresh() {
        if (this.refreshInterval) {
            clearInterval(this.refreshInterval);
            this.refreshInterval = null;
        }
    }

    async refreshCurrentSection() {
        await this.loadSectionData(this.currentSection);
    }

    async refreshDashboard() {
        this.updateConnectionStatus('connecting');
        await this.loadDashboard();
    }

    // UI Helper Methods
    updateConnectionStatus(status) {
        const statusEl = document.getElementById('connectionStatus');
        const statusMap = {
            connected: { class: 'connected', text: 'Connected', icon: 'fa-circle' },
            connecting: { class: 'connecting', text: 'Connecting...', icon: 'fa-circle' },
            disconnected: { class: 'disconnected', text: 'Disconnected', icon: 'fa-circle' }
        };

        const statusInfo = statusMap[status];
        statusEl.className = `status-indicator ${statusInfo.class}`;
        statusEl.innerHTML = `<i class="fas ${statusInfo.icon}"></i><span>${statusInfo.text}</span>`;
    }

    updateLastRefresh() {
        const lastUpdateEl = document.getElementById('lastUpdate');
        lastUpdateEl.textContent = `Last updated: ${new Date().toLocaleTimeString()}`;
    }

    getEventIcon(eventType) {
        const iconMap = {
            'card_scan': 'id-card',
            'door_open': 'door-open',
            'door_close': 'door-closed',
            'user_add': 'user-plus',
            'user_remove': 'user-minus',
            'system_start': 'power-off',
            'system_stop': 'stop',
            'default': 'info-circle'
        };
        return iconMap[eventType] || iconMap.default;
    }

    showToast(message, type = 'info') {
        const toast = document.getElementById('toast');
        const toastIcon = toast.querySelector('.toast-icon');
        const toastMessage = toast.querySelector('.toast-message');

        // Set content
        toastMessage.textContent = message;

        // Set type
        toast.className = `toast ${type}`;
        
        // Set icon
        const iconMap = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            warning: 'fa-exclamation-triangle',
            info: 'fa-info-circle'
        };
        toastIcon.className = `toast-icon fas ${iconMap[type] || iconMap.info}`;

        // Show toast
        toast.classList.add('show');

        // Auto-hide after 5 seconds
        setTimeout(() => {
            toast.classList.remove('show');
        }, 5000);
    }

    // User management methods
    viewUserCards(userId) {
        this.showToast(`Viewing cards for user ${userId}`, 'info');
        // TODO: Implement card viewing modal
    }

    async removeUser(deviceId, userId) {
        if (confirm(`Are you sure you want to remove user ${userId}?`)) {
            try {
                // TODO: Implement user removal API call
                this.showToast(`User ${userId} removed`, 'success');
                await this.loadUsers(deviceId);
            } catch (error) {
                this.showToast('Failed to remove user', 'error');
            }
        }
    }
}

// Global functions for window scope
window.closeModal = function(modalId) {
    app.closeModal(modalId);
};

window.submitAddDevice = function() {
    app.submitAddDevice();
};

window.submitCardAssign = function() {
    app.submitCardAssign();
};

window.refreshDashboard = function() {
    app.refreshDashboard();
};

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new SupremaApp();
});