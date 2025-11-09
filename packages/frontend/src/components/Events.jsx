import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState({
    type: '',
    deviceId: '',
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    fetchEvents();
    const interval = setInterval(fetchEvents, 10000); // Refresh every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filter.type) params.append('type', filter.type);
      if (filter.deviceId) params.append('deviceId', filter.deviceId);
      if (filter.startDate) params.append('startDate', filter.startDate);
      if (filter.endDate) params.append('endDate', filter.endDate);
      
      const response = await axios.get(`/api/events?${params.toString()}`);
      setEvents(response.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (field, value) => {
    setFilter({ ...filter, [field]: value });
  };

  const applyFilter = () => {
    fetchEvents();
  };

  const clearFilter = () => {
    setFilter({ type: '', deviceId: '', startDate: '', endDate: '' });
    setTimeout(fetchEvents, 100);
  };

  const getEventIcon = (type) => {
    const icons = {
      'access_granted': '✓',
      'access_denied': '✗',
      'card_scanned': '💳',
      'device_connected': '🔌',
      'device_disconnected': '🔌',
      'error': '⚠️'
    };
    return icons[type] || '📋';
  };

  const getEventColor = (type) => {
    const colors = {
      'access_granted': 'var(--success-color)',
      'access_denied': 'var(--error-color)',
      'card_scanned': 'var(--primary-color)',
      'device_connected': 'var(--success-color)',
      'device_disconnected': 'var(--text-secondary)',
      'error': 'var(--error-color)'
    };
    return colors[type] || 'var(--text-secondary)';
  };

  if (loading && events.length === 0) {
    return <div className="loading">Loading events...</div>;
  }

  return (
    <div>
      <div className="card-header">
        <h2 className="card-title">📋 Events</h2>
        <button className="btn btn-secondary" onClick={fetchEvents}>
          🔄 Refresh
        </button>
      </div>

      {error && (
        <div className="card" style={{ marginBottom: '1rem', background: '#fee2e2' }}>
          <p style={{ color: 'var(--error-color)' }}>Error: {error}</p>
        </div>
      )}

      <div className="card" style={{ marginBottom: '1rem' }}>
        <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: '600' }}>
          Filters
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Event Type</label>
            <select
              className="form-select"
              value={filter.type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
            >
              <option value="">All Types</option>
              <option value="access_granted">Access Granted</option>
              <option value="access_denied">Access Denied</option>
              <option value="card_scanned">Card Scanned</option>
              <option value="device_connected">Device Connected</option>
              <option value="device_disconnected">Device Disconnected</option>
              <option value="error">Error</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Device ID</label>
            <input
              type="text"
              className="form-input"
              value={filter.deviceId}
              onChange={(e) => handleFilterChange('deviceId', e.target.value)}
              placeholder="Filter by device..."
            />
          </div>
          <div className="form-group">
            <label className="form-label">Start Date</label>
            <input
              type="datetime-local"
              className="form-input"
              value={filter.startDate}
              onChange={(e) => handleFilterChange('startDate', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">End Date</label>
            <input
              type="datetime-local"
              className="form-input"
              value={filter.endDate}
              onChange={(e) => handleFilterChange('endDate', e.target.value)}
            />
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
          <button className="btn btn-primary" onClick={applyFilter}>
            Apply Filters
          </button>
          <button className="btn btn-secondary" onClick={clearFilter}>
            Clear Filters
          </button>
        </div>
      </div>

      <div className="card">
        <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600' }}>
            Event Log ({events.length})
          </h3>
          {loading && (
            <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Updating...
            </span>
          )}
        </div>

        {events.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '2rem' }}>
            No events found matching the current filters.
          </p>
        ) : (
          <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
            <table className="table">
              <thead>
                <tr>
                  <th style={{ width: '50px' }}></th>
                  <th>Timestamp</th>
                  <th>Type</th>
                  <th>Device</th>
                  <th>User</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event, index) => (
                  <tr key={index}>
                    <td style={{ textAlign: 'center', fontSize: '1.25rem' }}>
                      <span style={{ color: getEventColor(event.type) }}>
                        {getEventIcon(event.type)}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.875rem' }}>
                      {new Date(event.timestamp).toLocaleString()}
                    </td>
                    <td>
                      <span style={{ 
                        color: getEventColor(event.type),
                        fontWeight: '500'
                      }}>
                        {event.type.replace(/_/g, ' ').toUpperCase()}
                      </span>
                    </td>
                    <td>{event.deviceId || '-'}</td>
                    <td>{event.userId || '-'}</td>
                    <td style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                      {event.details || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
