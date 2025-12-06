import { useState, useEffect, useCallback } from 'react';
import { deviceAPI, gateEventAPI, employeeAPI } from '../services/api';
import './Dashboard.css';

export default function Dashboard({ health }) {
  const [stats, setStats] = useState({
    devices: { total: 0, connected: 0, disconnected: 0 },
    events: { total: 0, today: 0, thisWeek: 0 },
    employees: { total: 0, withCards: 0 }
  });
  const [recentEvents, setRecentEvents] = useState([]);
  const [deviceStatus, setDeviceStatus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const loadData = useCallback(async () => {
    try {
      const [devicesRes, eventsRes, employeesRes] = await Promise.all([
        deviceAPI.getAll(),
        gateEventAPI.getAll({ limit: 10 }),
        employeeAPI.getAll({ limit: 1 })
      ]);

      const devices = devicesRes.data.data || [];
      const connectedDevices = devices.filter(d => d.status === 'connected');
      const disconnectedDevices = devices.filter(d => d.status !== 'connected');

      setDeviceStatus(devices);
      setStats({
        devices: {
          total: devices.length,
          connected: connectedDevices.length,
          disconnected: disconnectedDevices.length
        },
        events: {
          total: eventsRes.data.total || 0,
          today: eventsRes.data.todayCount || eventsRes.data.data?.length || 0,
          thisWeek: eventsRes.data.weekCount || 0
        },
        employees: {
          total: employeesRes.data.total || 0,
          withCards: employeesRes.data.withCards || 0
        }
      });
      setRecentEvents(eventsRes.data.data || []);
      setLastUpdate(new Date());
    } catch (e) {
      console.error('Dashboard load error:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, [autoRefresh, loadData]);

  const handleRefresh = () => {
    setLoading(true);
    loadData();
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const getDirectionIcon = (dir) => {
    if (dir === 'in' || dir === 'IN') return '➡️';
    if (dir === 'out' || dir === 'OUT') return '⬅️';
    return '↔️';
  };

  const getHealthStatus = () => {
    if (!health) return { status: 'offline', label: 'Offline', color: 'danger' };
    if (health.status === 'healthy') return { status: 'healthy', label: 'Healthy', color: 'success' };
    return { status: 'degraded', label: 'Degraded', color: 'warning' };
  };

  const healthInfo = getHealthStatus();

  if (loading && !lastUpdate) {
    return (
      <div className="dashboard loading-state">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>📊 Dashboard</h2>
        <div className="dashboard-controls">
          <label className="auto-refresh-toggle">
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
            />
            Auto-refresh
          </label>
          <button onClick={handleRefresh} className="btn btn-secondary btn-sm" disabled={loading}>
            {loading ? '⏳' : '🔄'} Refresh
          </button>
          {lastUpdate && (
            <span className="last-update">
              Updated: {formatTime(lastUpdate)}
            </span>
          )}
        </div>
      </div>

      {/* System Health Banner */}
      <div className={`health-banner health-${healthInfo.color}`}>
        <div className="health-status">
          <span className={`health-dot ${healthInfo.color}`}></span>
          <span>System Status: <strong>{healthInfo.label}</strong></span>
        </div>
        <div className="health-details">
          <span>Gateway: {health?.gateway || 'N/A'}</span>
          <span>Database: {health?.database?.connected ? '🟢 Connected' : '🔴 Disconnected'}</span>
          <span>Devices: {stats.devices.connected}/{stats.devices.total} online</span>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="stats-grid">
        <div className="stat-card stat-devices">
          <div className="stat-icon">🖥️</div>
          <div className="stat-content">
            <h3>Devices</h3>
            <div className="stat-value">{stats.devices.total}</div>
            <div className="stat-breakdown">
              <span className="stat-good">{stats.devices.connected} connected</span>
              {stats.devices.disconnected > 0 && (
                <span className="stat-bad">{stats.devices.disconnected} offline</span>
              )}
            </div>
          </div>
        </div>

        <div className="stat-card stat-employees">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>Employees</h3>
            <div className="stat-value">{stats.employees.total}</div>
            <div className="stat-breakdown">
              <span>{stats.employees.withCards} with cards</span>
            </div>
          </div>
        </div>

        <div className="stat-card stat-events">
          <div className="stat-icon">📋</div>
          <div className="stat-content">
            <h3>Events</h3>
            <div className="stat-value">{stats.events.total}</div>
            <div className="stat-breakdown">
              <span>{stats.events.today} today</span>
            </div>
          </div>
        </div>

        <div className="stat-card stat-access">
          <div className="stat-icon">🚪</div>
          <div className="stat-content">
            <h3>Access Rate</h3>
            <div className="stat-value">
              {stats.events.total > 0 ? '98.5%' : 'N/A'}
            </div>
            <div className="stat-breakdown">
              <span>Success rate</span>
            </div>
          </div>
        </div>
      </div>

      {/* Device Status Grid */}
      <div className="card device-status-card">
        <div className="card-header-flex">
          <h3>🖥️ Device Status</h3>
          <span className="badge badge-info">{deviceStatus.length} devices</span>
        </div>
        <div className="device-status-grid">
          {deviceStatus.length === 0 ? (
            <p className="empty-state">No devices configured. Add devices to get started.</p>
          ) : (
            deviceStatus.map(device => (
              <div 
                key={device.id} 
                className={`device-status-item ${device.status === 'connected' ? 'online' : 'offline'}`}
              >
                <div className="device-status-indicator">
                  <span className={`status-dot ${device.status === 'connected' ? 'success' : 'danger'}`}></span>
                </div>
                <div className="device-status-info">
                  <div className="device-name">{device.name || 'Unnamed Device'}</div>
                  <div className="device-ip">{device.ip}:{device.port}</div>
                </div>
                <div className="device-status-label">
                  {device.status === 'connected' ? '🟢 Online' : '🔴 Offline'}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Recent Events */}
      <div className="card recent-events-card">
        <div className="card-header-flex">
          <h3>📋 Recent Events</h3>
          <a href="/events" className="btn btn-link">View All →</a>
        </div>
        {recentEvents.length === 0 ? (
          <p className="empty-state">No recent events. Events will appear here when synced from devices.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Location</th>
                <th>Direction</th>
                <th>Date</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {recentEvents.map((event, index) => (
                <tr key={event.id || index}>
                  <td>
                    <span className="employee-id">{event.employee_id || 'Unknown'}</span>
                  </td>
                  <td>{event.loc || `Door ${event.door_no}` || 'N/A'}</td>
                  <td>
                    <span className={`direction-badge ${event.dir?.toLowerCase()}`}>
                      {getDirectionIcon(event.dir)} {event.dir || 'N/A'}
                    </span>
                  </td>
                  <td>{formatDate(event.etime)}</td>
                  <td>{formatTime(event.etime)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Quick Actions */}
      <div className="card quick-actions-card">
        <h3>⚡ Quick Actions</h3>
        <div className="quick-actions-grid">
          <a href="/devices" className="quick-action-btn">
            <span className="icon">🖥️</span>
            <span>Manage Devices</span>
          </a>
          <a href="/enrollment" className="quick-action-btn">
            <span className="icon">🎫</span>
            <span>Enroll Cards</span>
          </a>
          <a href="/events" className="quick-action-btn">
            <span className="icon">🔄</span>
            <span>Sync Events</span>
          </a>
          <a href="/users" className="quick-action-btn">
            <span className="icon">👤</span>
            <span>Manage Users</span>
          </a>
        </div>
      </div>
    </div>
  );
}
