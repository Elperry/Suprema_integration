import { useState, useEffect } from 'react'
import { userAPI, deviceAPI } from '../services/api'

export default function Users() {
  const [devices, setDevices] = useState([])
  const [selectedDevice, setSelectedDevice] = useState('')
  const [users, setUsers] = useState([])
  const [formData, setFormData] = useState({ userID: '', name: '' })

  useEffect(() => { loadDevices() }, [])

  const loadDevices = async () => {
    try {
      const res = await deviceAPI.getAll()
      setDevices(res.data.data || [])
    } catch (e) { console.error(e) }
  }

  const loadUsers = async () => {
    if (!selectedDevice) return
    try {
      const res = await userAPI.getUsers(selectedDevice, true)
      setUsers(res.data.data || [])
    } catch (e) { console.error(e) }
  }

  const handleEnroll = async (e) => {
    e.preventDefault()
    if (!selectedDevice) {
      alert('Please select a device')
      return
    }
    try {
      await userAPI.enroll(selectedDevice, [formData])
      setFormData({ userID: '', name: '' })
      loadUsers()
      alert('User enrolled successfully')
    } catch (e) { alert('Error: ' + e.message) }
  }

  const handleDelete = async (userID) => {
    if (!confirm('Delete this user?')) return
    try {
      await userAPI.delete(selectedDevice, [userID])
      loadUsers()
    } catch (e) { alert('Error: ' + e.message) }
  }

  const handleSync = async () => {
    if (!selectedDevice) return
    try {
      await userAPI.sync(selectedDevice)
      alert('Users synced to database')
    } catch (e) { alert('Error: ' + e.message) }
  }

  return (
    <div className="page">
      <h2>👥 Users & Cards</h2>
      <div className="card">
        <h3>Select Device</h3>
        <select value={selectedDevice} onChange={(e) => { setSelectedDevice(e.target.value); loadUsers() }} className="form-control">
          <option value="">-- Select Device --</option>
          {devices.map(d => (
            <option key={d.id} value={d.id}>{d.name}</option>
          ))}
        </select>
      </div>

      {selectedDevice && (
        <>
          <div className="card">
            <h3>Enroll New User</h3>
            <form onSubmit={handleEnroll} className="form">
              <input placeholder="User ID" value={formData.userID} onChange={(e) => setFormData({...formData, userID: e.target.value})} required />
              <input placeholder="Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
              <button type="submit" className="btn btn-primary">Enroll User</button>
            </form>
          </div>

          <div className="card">
            <div className="card-header">
              <h3>Users on Device</h3>
              <button onClick={handleSync} className="btn btn-secondary">Sync to DB</button>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.userID}>
                    <td>{u.userID}</td>
                    <td>{u.name || 'N/A'}</td>
                    <td>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(u.userID)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}
