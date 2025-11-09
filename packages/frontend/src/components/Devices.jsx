import { useState, useEffect } from 'react'
import { deviceAPI } from '../services/api'

export default function Devices() {
  const [devices, setDevices] = useState([])
  const [formData, setFormData] = useState({ name: '', ip: '', port: 51211 })
  const [editing, setEditing] = useState(null)

  useEffect(() => { loadDevices() }, [])

  const loadDevices = async () => {
    try {
      const res = await deviceAPI.getAll()
      setDevices(res.data.data || [])
    } catch (e) { console.error(e) }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editing) {
        await deviceAPI.update(editing, formData)
      } else {
        await deviceAPI.create(formData)
      }
      setFormData({ name: '', ip: '', port: 51211 })
      setEditing(null)
      loadDevices()
    } catch (e) { alert('Error: ' + e.message) }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this device?')) return
    try {
      await deviceAPI.delete(id)
      loadDevices()
    } catch (e) { alert('Error: ' + e.message) }
  }

  const handleConnect = async (id) => {
    try {
      await deviceAPI.connect(id)
      alert('Connected successfully')
      loadDevices()
    } catch (e) { alert('Error: ' + e.message) }
  }

  return (
    <div className="page">
      <h2>🖥️ Devices</h2>
      <div className="card">
        <h3>{editing ? 'Edit Device' : 'Add Device'}</h3>
        <form onSubmit={handleSubmit} className="form">
          <input placeholder="Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
          <input placeholder="IP Address" value={formData.ip} onChange={(e) => setFormData({...formData, ip: e.target.value})} required />
          <input type="number" placeholder="Port" value={formData.port} onChange={(e) => setFormData({...formData, port: e.target.value})} required />
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">{editing ? 'Update' : 'Add'}</button>
            {editing && <button type="button" className="btn btn-secondary" onClick={() => { setEditing(null); setFormData({ name: '', ip: '', port: 51211 }) }}>Cancel</button>}
          </div>
        </form>
      </div>
      <div className="card">
        <h3>Device List</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>IP</th>
              <th>Port</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {devices.map(d => (
              <tr key={d.id}>
                <td>{d.name}</td>
                <td>{d.ip}</td>
                <td>{d.port}</td>
                <td>
                  <span className={`badge badge-${d.status === 'connected' ? 'success' : 'warning'}`}>
                    {d.status || 'disconnected'}
                  </span>
                </td>
                <td>
                  <button className="btn btn-sm" onClick={() => handleConnect(d.id)}>Connect</button>
                  <button className="btn btn-sm" onClick={() => { setEditing(d.id); setFormData(d) }}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(d.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
