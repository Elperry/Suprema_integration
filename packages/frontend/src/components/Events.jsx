import { useState, useEffect } from 'react'
import { eventAPI, deviceAPI } from '../services/api'

export default function Events() {
  const [devices, setDevices] = useState([])
  const [selectedDevice, setSelectedDevice] = useState('')
  const [events, setEvents] = useState([])
  const [monitoring, setMonitoring] = useState(false)

  useEffect(() => { loadDevices() }, [])

  const loadDevices = async () => {
    try {
      const res = await deviceAPI.getAll()
      setDevices(res.data.data || [])
    } catch (e) { console.error(e) }
  }

  const loadEvents = async () => {
    if (!selectedDevice) return
    try {
      const res = await eventAPI.getDeviceLog(selectedDevice, 0, 100)
      setEvents(res.data.data || [])
    } catch (e) { console.error(e) }
  }

  const handleMonitoring = async () => {
    if (!selectedDevice) return
    try {
      if (monitoring) {
        await eventAPI.disableMonitoring(selectedDevice)
        setMonitoring(false)
        alert('Monitoring disabled')
      } else {
        await eventAPI.enableMonitoring(selectedDevice)
        setMonitoring(true)
        alert('Monitoring enabled')
      }
    } catch (e) { alert('Error: ' + e.message) }
  }

  const handleSync = async () => {
    if (!selectedDevice) return
    try {
      await eventAPI.sync(selectedDevice, null, 1000)
      alert('Events synced to database')
    } catch (e) { alert('Error: ' + e.message) }
  }

  return (
    <div className="page">
      <h2>📋 Events</h2>
      <div className="card">
        <h3>Select Device</h3>
        <select value={selectedDevice} onChange={(e) => { setSelectedDevice(e.target.value); loadEvents() }} className="form-control">
          <option value="">-- Select Device --</option>
          {devices.map(d => (
            <option key={d.id} value={d.id}>{d.name}</option>
          ))}
        </select>
      </div>

      {selectedDevice && (
        <>
          <div className="card">
            <div className="card-header">
              <h3>Event Controls</h3>
              <div>
                <button onClick={handleMonitoring} className={`btn ${monitoring ? 'btn-warning' : 'btn-primary'}`}>
                  {monitoring ? 'Stop Monitoring' : 'Start Monitoring'}
                </button>
                <button onClick={handleSync} className="btn btn-secondary">Sync to DB</button>
                <button onClick={loadEvents} className="btn btn-secondary">Refresh</button>
              </div>
            </div>
          </div>

          <div className="card">
            <h3>Event Log ({events.length})</h3>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Event ID</th>
                    <th>User ID</th>
                    <th>Event Code</th>
                    <th>Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((e, i) => (
                    <tr key={i}>
                      <td>{e.eventID || i}</td>
                      <td>{e.userID || 'N/A'}</td>
                      <td>{e.eventCode || 'N/A'}</td>
                      <td>{new Date(e.timestamp).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
