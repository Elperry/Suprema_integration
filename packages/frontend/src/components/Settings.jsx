import { useState } from 'react'
import { eventAPI, userAPI } from '../services/api'

export default function Settings() {
  const [syncInterval, setSyncInterval] = useState(60)
  const [status, setStatus] = useState('')

  const handleSyncAll = async () => {
    setStatus('Syncing all events...')
    try {
      await eventAPI.syncAll(1000)
      setStatus('Events synced successfully!')
    } catch (e) {
      setStatus('Error: ' + e.message)
    }
  }

  const handleSyncUsers = async () => {
    setStatus('Syncing all users...')
    try {
      await userAPI.syncAll()
      setStatus('Users synced successfully!')
    } catch (e) {
      setStatus('Error: ' + e.message)
    }
  }

  return (
    <div className="page">
      <h2>⚙️ Settings</h2>

      <div className="card">
        <h3>Sync Configuration</h3>
        <div className="form">
          <label>
            Sync Interval (seconds):
            <input type="number" value={syncInterval} onChange={(e) => setSyncInterval(e.target.value)} className="form-control" />
          </label>
        </div>
      </div>

      <div className="card">
        <h3>Manual Sync Operations</h3>
        <div className="form">
          <button onClick={handleSyncAll} className="btn btn-primary">Sync All Events</button>
          <button onClick={handleSyncUsers} className="btn btn-primary">Sync All Users</button>
        </div>
        {status && <div className="alert">{status}</div>}
      </div>

      <div className="card">
        <h3>System Information</h3>
        <div className="info-grid">
          <div>
            <strong>Frontend Version:</strong> 1.0.0
          </div>
          <div>
            <strong>Backend API:</strong> http://localhost:3000
          </div>
          <div>
            <strong>Auto-Sync:</strong> {syncInterval}s interval
          </div>
        </div>
      </div>

      <div className="card">
        <h3>Endpoints Available</h3>
        <ul className="list">
          <li>✅ Device Management (CRUD)</li>
          <li>✅ User Management (Enrollment, Cards, Sync)</li>
          <li>✅ Card Operations (Scan, Blacklist)</li>
          <li>✅ Event Management (Logs, Monitoring, Sync)</li>
          <li>✅ Employee Queries</li>
          <li>✅ Gate Events</li>
        </ul>
      </div>
    </div>
  )
}
