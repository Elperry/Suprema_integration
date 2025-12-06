import { useState, useEffect, useCallback } from 'react'
import { userAPI, deviceAPI, enrollmentAPI } from '../services/api'
import './Users.css'

export default function Users() {
  const [devices, setDevices] = useState([])
  const [selectedDevice, setSelectedDevice] = useState('')
  const [users, setUsers] = useState([])
  const [formData, setFormData] = useState({ userID: '', name: '' })
  const [loading, setLoading] = useState(false)
  const [syncing, setSyncing] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedUsers, setSelectedUsers] = useState([])
  const [viewMode, setViewMode] = useState('table') // table, grid
  const [cardAssignments, setCardAssignments] = useState([])
  const [showCardModal, setShowCardModal] = useState(false)
  const [selectedUserForCard, setSelectedUserForCard] = useState(null)

  useEffect(() => { 
    loadDevices()
    loadCardAssignments()
  }, [])

  const loadDevices = async () => {
    try {
      const res = await deviceAPI.getAll()
      setDevices(res.data.data || [])
    } catch (e) { 
      setError('Failed to load devices: ' + e.message)
    }
  }

  const loadCardAssignments = async () => {
    try {
      const res = await enrollmentAPI.getCardAssignments()
      setCardAssignments(res.data.data || [])
    } catch (e) {
      console.error('Failed to load card assignments:', e)
    }
  }

  // Helper to get user-friendly error message
  const getErrorMessage = (error) => {
    const message = error.response?.data?.message || error.message || 'Unknown error'
    
    // Handle common gRPC errors
    if (message.includes('NOT_FOUND') && message.includes('connection')) {
      return 'Device is not connected. Please connect to the device first.'
    }
    if (message.includes('UNAVAILABLE')) {
      return 'Device gateway is not available. Please check the gateway service.'
    }
    if (message.includes('DEADLINE_EXCEEDED')) {
      return 'Connection timed out. The device may be offline or unreachable.'
    }
    
    return message
  }

  // Check if selected device is connected
  const isDeviceConnected = () => {
    const device = devices.find(d => d.id === parseInt(selectedDevice))
    return device?.status === 'connected'
  }

  const loadUsers = useCallback(async () => {
    if (!selectedDevice) return
    
    // Check if device is connected before making the call
    const device = devices.find(d => d.id === parseInt(selectedDevice))
    if (device && device.status !== 'connected') {
      setError('Device is not connected. Please connect to the device first.')
      setUsers([])
      return
    }
    
    try {
      setLoading(true)
      setError(null)
      const res = await userAPI.getUsers(selectedDevice, true)
      setUsers(res.data.data || [])
    } catch (e) { 
      setError('Failed to load users: ' + getErrorMessage(e))
      setUsers([])
    } finally {
      setLoading(false)
    }
  }, [selectedDevice, devices])

  useEffect(() => {
    if (selectedDevice) {
      loadUsers()
    }
  }, [selectedDevice, loadUsers])

  const handleEnroll = async (e) => {
    e.preventDefault()
    if (!selectedDevice) {
      setError('Please select a device')
      return
    }
    
    try {
      setLoading(true)
      setError(null)
      await userAPI.enroll(selectedDevice, [formData])
      setFormData({ userID: '', name: '' })
      setSuccess('User enrolled successfully!')
      loadUsers()
    } catch (e) { 
      setError('Enrollment failed: ' + getErrorMessage(e))
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (userID) => {
    if (!confirm(`Delete user ${userID}? This will remove them from the device.`)) return
    
    try {
      setLoading(true)
      await userAPI.delete(selectedDevice, [userID])
      setSuccess('User deleted successfully')
      loadUsers()
    } catch (e) { 
      setError('Delete failed: ' + getErrorMessage(e))
    } finally {
      setLoading(false)
    }
  }

  const handleBatchDelete = async () => {
    if (selectedUsers.length === 0) {
      setError('No users selected')
      return
    }
    
    if (!confirm(`Delete ${selectedUsers.length} users from device?`)) return

    try {
      setLoading(true)
      await userAPI.delete(selectedDevice, selectedUsers)
      setSuccess(`${selectedUsers.length} users deleted successfully`)
      setSelectedUsers([])
      loadUsers()
    } catch (e) {
      setError('Batch delete failed: ' + getErrorMessage(e))
    } finally {
      setLoading(false)
    }
  }

  const handleSync = async () => {
    if (!selectedDevice) return
    
    try {
      setSyncing(true)
      setError(null)
      await userAPI.sync(selectedDevice)
      setSuccess('Users synced to database successfully!')
    } catch (e) { 
      setError('Sync failed: ' + getErrorMessage(e))
    } finally {
      setSyncing(false)
    }
  }

  const handleSyncAll = async () => {
    try {
      setSyncing(true)
      setError(null)
      await userAPI.syncAll()
      setSuccess('All users synced to database successfully!')
    } catch (e) {
      setError('Sync all failed: ' + getErrorMessage(e))
    } finally {
      setSyncing(false)
    }
  }

  const toggleUserSelection = (userID) => {
    setSelectedUsers(prev => 
      prev.includes(userID)
        ? prev.filter(id => id !== userID)
        : [...prev, userID]
    )
  }

  const toggleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([])
    } else {
      setSelectedUsers(filteredUsers.map(u => u.userID))
    }
  }

  const getCardAssignment = (userID) => {
    return cardAssignments.find(ca => ca.employeeId === userID)
  }

  const handleViewCard = (user) => {
    setSelectedUserForCard(user)
    setShowCardModal(true)
  }

  const filteredUsers = users.filter(u =>
    u.userID?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.name?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const connectedDevices = devices.filter(d => d.status === 'connected')

  return (
    <div className="page users-page">
      <div className="page-header">
        <h2>👥 Users & Cards</h2>
        <div className="view-toggle">
          <button 
            className={`btn btn-sm ${viewMode === 'table' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setViewMode('table')}
          >
            📋 Table
          </button>
          <button 
            className={`btn btn-sm ${viewMode === 'grid' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setViewMode('grid')}
          >
            📱 Grid
          </button>
        </div>
      </div>

      {/* Alerts */}
      {error && (
        <div className="alert alert-danger">
          <span>⚠️ {error}</span>
          <button onClick={() => setError(null)} className="btn-close">×</button>
        </div>
      )}
      {success && (
        <div className="alert alert-success">
          <span>✅ {success}</span>
          <button onClick={() => setSuccess(null)} className="btn-close">×</button>
        </div>
      )}

      {/* Device Selection */}
      <div className="card">
        <h3>🖥️ Select Device</h3>
        <div className="device-select-row">
          <select 
            value={selectedDevice} 
            onChange={(e) => { 
              setSelectedDevice(e.target.value)
              setSelectedUsers([])
            }} 
            className="form-control device-select"
          >
            <option value="">-- Select Device --</option>
            {connectedDevices.length === 0 && (
              <option value="" disabled>No connected devices</option>
            )}
            {connectedDevices.map(d => (
              <option key={d.id} value={d.id}>
                {d.name} ({d.ip}) - 🟢 Connected
              </option>
            ))}
            <optgroup label="Offline Devices">
              {devices.filter(d => d.status !== 'connected').map(d => (
                <option key={d.id} value={d.id} disabled>
                  {d.name} ({d.ip}) - 🔴 Offline
                </option>
              ))}
            </optgroup>
          </select>
          
          <div className="sync-buttons">
            <button 
              onClick={handleSync} 
              className="btn btn-secondary"
              disabled={!selectedDevice || syncing}
            >
              {syncing ? '⏳' : '🔄'} Sync Device
            </button>
            <button 
              onClick={handleSyncAll} 
              className="btn btn-primary"
              disabled={syncing}
            >
              {syncing ? '⏳' : '🔄'} Sync All
            </button>
          </div>
        </div>
      </div>

      {selectedDevice && (
        <>
          {/* Enroll New User */}
          <div className="card">
            <h3>➕ Enroll New User</h3>
            <form onSubmit={handleEnroll} className="enroll-form">
              <div className="form-row">
                <div className="form-group">
                  <label>User ID</label>
                  <input 
                    placeholder="e.g., EMP001" 
                    value={formData.userID} 
                    onChange={(e) => setFormData({...formData, userID: e.target.value})} 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Name</label>
                  <input 
                    placeholder="e.g., John Smith" 
                    value={formData.name} 
                    onChange={(e) => setFormData({...formData, name: e.target.value})} 
                    required 
                  />
                </div>
                <div className="form-group form-action">
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? '⏳ Enrolling...' : '➕ Enroll User'}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Users List */}
          <div className="card">
            <div className="card-header-flex">
              <h3>📋 Users on Device ({filteredUsers.length})</h3>
              <div className="card-actions">
                <input 
                  type="search"
                  placeholder="🔍 Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
                <button onClick={loadUsers} className="btn btn-secondary btn-sm" disabled={loading}>
                  🔄
                </button>
              </div>
            </div>

            {/* Batch Actions */}
            {selectedUsers.length > 0 && (
              <div className="batch-actions">
                <span>{selectedUsers.length} users selected</span>
                <button onClick={handleBatchDelete} className="btn btn-danger btn-sm">
                  🗑️ Delete Selected
                </button>
                <button onClick={() => setSelectedUsers([])} className="btn btn-secondary btn-sm">
                  ✖ Clear
                </button>
              </div>
            )}

            {loading ? (
              <div className="loading-state">
                <div className="spinner"></div>
                <p>Loading users...</p>
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="empty-state">
                <p>👤 {searchTerm ? 'No users match your search' : 'No users on this device'}</p>
              </div>
            ) : viewMode === 'table' ? (
              <table className="table users-table">
                <thead>
                  <tr>
                    <th>
                      <input 
                        type="checkbox"
                        checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                        onChange={toggleSelectAll}
                      />
                    </th>
                    <th>User ID</th>
                    <th>Name</th>
                    <th>Card</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map(u => {
                    const cardAssign = getCardAssignment(u.userID)
                    return (
                      <tr key={u.userID} className={selectedUsers.includes(u.userID) ? 'selected-row' : ''}>
                        <td>
                          <input 
                            type="checkbox"
                            checked={selectedUsers.includes(u.userID)}
                            onChange={() => toggleUserSelection(u.userID)}
                          />
                        </td>
                        <td>
                          <code>{u.userID}</code>
                        </td>
                        <td>{u.name || 'N/A'}</td>
                        <td>
                          {cardAssign ? (
                            <span className="badge badge-success" title={cardAssign.cardData}>
                              🎫 {cardAssign.cardType || 'Card'}
                            </span>
                          ) : (
                            <span className="badge badge-secondary">No Card</span>
                          )}
                        </td>
                        <td className="action-buttons">
                          {cardAssign && (
                            <button 
                              className="btn btn-sm btn-info"
                              onClick={() => handleViewCard(u)}
                              title="View Card"
                            >
                              🎫
                            </button>
                          )}
                          <button 
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(u.userID)}
                            title="Delete"
                          >
                            🗑️
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            ) : (
              <div className="users-grid">
                {filteredUsers.map(u => {
                  const cardAssign = getCardAssignment(u.userID)
                  return (
                    <div 
                      key={u.userID} 
                      className={`user-card ${selectedUsers.includes(u.userID) ? 'selected' : ''}`}
                      onClick={() => toggleUserSelection(u.userID)}
                    >
                      <div className="user-avatar">
                        👤
                      </div>
                      <div className="user-info">
                        <div className="user-name">{u.name || 'Unknown'}</div>
                        <div className="user-id">{u.userID}</div>
                        {cardAssign && (
                          <div className="user-card-badge">🎫 {cardAssign.cardType}</div>
                        )}
                      </div>
                      <button 
                        className="btn btn-sm btn-danger user-delete"
                        onClick={(e) => { e.stopPropagation(); handleDelete(u.userID) }}
                      >
                        🗑️
                      </button>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </>
      )}

      {/* Card Details Modal */}
      {showCardModal && selectedUserForCard && (
        <div className="modal-overlay" onClick={() => setShowCardModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>🎫 Card Details</h3>
              <button className="btn-close" onClick={() => setShowCardModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <p><strong>User:</strong> {selectedUserForCard.name} ({selectedUserForCard.userID})</p>
              {getCardAssignment(selectedUserForCard.userID) && (
                <>
                  <p><strong>Card Type:</strong> {getCardAssignment(selectedUserForCard.userID).cardType}</p>
                  <p><strong>Card Data:</strong></p>
                  <code className="card-data-display">
                    {getCardAssignment(selectedUserForCard.userID).cardData}
                  </code>
                  <p><strong>Status:</strong> {getCardAssignment(selectedUserForCard.userID).status}</p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
