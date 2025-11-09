import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/health');
      setStats(response.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading dashboard...</div>;
  if (error) return <div className="card"><p style={{ color: 'var(--error-color)' }}>Error: {error}</p></div>;

  return (
    <div>
      <div className="card-header">
        <h2 className="card-title">📊 Dashboard</h2>
        <button className="btn btn-primary" onClick={fetchDashboardStats}>
          🔄 Refresh
        </button>
      </div>

      <div className="grid">
        <div className="card">
          <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: '600' }}>
            System Status
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Server</span>
              <span style={{ color: 'var(--success-color)', fontWeight: '500' }}>
                {stats?.status === 'ok' ? '✓ Running' : '✗ Down'}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Database</span>
              <span style={{ color: 'var(--success-color)', fontWeight: '500' }}>✓ Connected</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>gRPC Gateway</span>
              <span style={{ color: 'var(--success-color)', fontWeight: '500' }}>✓ Active</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: '600' }}>
            Quick Stats
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Total Devices</span>
              <span style={{ fontWeight: '600', fontSize: '1.25rem' }}>-</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Active Users</span>
              <span style={{ fontWeight: '600', fontSize: '1.25rem' }}>-</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Events Today</span>
              <span style={{ fontWeight: '600', fontSize: '1.25rem' }}>-</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: '600' }}>
            Recent Activity
          </h3>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            No recent activity
          </div>
        </div>
      </div>
    </div>
  );
}
