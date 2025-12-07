import { useState, useEffect, useCallback } from 'react'
import { userAPI, deviceAPI, enrollmentAPI } from '../services/api'
import './Users.css'

/**
 * Decode Base64 card data and extract card number
 * Suprema card data is 32 bytes, with the card number in the last few bytes
 */
const decodeCardData = (base64Data) => {
  try {
    // Decode Base64 to binary
    const binaryStr = atob(base64Data)
    const bytes = new Uint8Array(binaryStr.length)
    for (let i = 0; i < binaryStr.length; i++) {
      bytes[i] = binaryStr.charCodeAt(i)
    }
    
    // Convert to hex string for display
    const hexStr = Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase()
    
    // Find significant bytes (skip leading zeros)
    let startIdx = 0
    while (startIdx < bytes.length && bytes[startIdx] === 0) {
      startIdx++
    }
    
    // Extract significant bytes
    const significantBytes = bytes.slice(startIdx)
    
    // Calculate decimal value using BigInt for large numbers
    let cardNumber = 0n
    for (const byte of significantBytes) {
      cardNumber = (cardNumber << 8n) | BigInt(byte)
    }
    
    return {
      hex: hexStr,
      decimal: cardNumber.toString(),
      bytes: Array.from(bytes)
    }
  } catch (e) {
    console.error('Failed to decode card data:', e)
    return { hex: 'Error', decimal: 'Error', bytes: [] }
  }
}

/**
 * Decode hex string card data to decimal
 * Used for database card data which is stored as hex string
 */
const decodeHexCardData = (hexData) => {
  try {
    if (!hexData) return { hex: '', decimal: '0' }
    
    // Remove any spaces and ensure uppercase
    let cleanHex = hexData.replace(/\s/g, '').toUpperCase()
    
    // Pad to even length if needed
    if (cleanHex.length % 2 === 1) {
      cleanHex = '0' + cleanHex
    }
    
    // Strip leading zeros but keep at least 2 chars
    let significant = cleanHex.replace(/^0+/, '') || '0'
    if (significant.length % 2 === 1) {
      significant = '0' + significant
    }
    
    // Convert to decimal using BigInt for large numbers
    const cardNumber = BigInt('0x' + significant)
    
    return {
      hex: cleanHex,
      decimal: cardNumber.toString()
    }
  } catch (e) {
    console.error('Failed to decode hex card data:', e)
    return { hex: hexData || '', decimal: 'Error' }
  }
}

export default function Users() {
  const [devices, setDevices] = useState([])
  const [selectedDevice, setSelectedDevice] = useState('')
  const [users, setUsers] = useState([])
  const [formData, setFormData] = useState({ userID: '', name: '' })
  const [loading, setLoading] = useState(false)
  const [syncing, setSyncing] = useState(false)
  const [importing, setImporting] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedUsers, setSelectedUsers] = useState([])
  const [viewMode, setViewMode] = useState('table') // table, grid
  const [dataSource, setDataSource] = useState('database') // database, device
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
    
    // For device source, check if device is connected
    if (dataSource === 'device') {
      const device = devices.find(d => d.id === parseInt(selectedDevice))
      if (device && device.status !== 'connected') {
        setError('Device is not connected. Please connect to the device first.')
        setUsers([])
        return
      }
    }
    
    try {
      setLoading(true)
      setError(null)
      // Pass dataSource to API call
      const res = await userAPI.getUsers(selectedDevice, true, dataSource)
      setUsers(res.data.data || [])
    } catch (e) { 
      setError('Failed to load users: ' + getErrorMessage(e))
      setUsers([])
    } finally {
      setLoading(false)
    }
  }, [selectedDevice, devices, dataSource])

  useEffect(() => {
    if (selectedDevice) {
      loadUsers()
    }
  }, [selectedDevice, loadUsers, dataSource])

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
      setSuccess('Database synced to device successfully!')
      loadUsers()
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
      const res = await userAPI.syncAll()
      const results = res.data.results || []
      const successCount = results.filter(r => r.success).length
      setSuccess(`Database synced to ${successCount}/${results.length} devices!`)
      loadUsers()
    } catch (e) {
      setError('Sync all failed: ' + getErrorMessage(e))
    } finally {
      setSyncing(false)
    }
  }

  // Import users from device to database
  const handleImportFromDevice = async () => {
    if (!selectedDevice) return
    if (!confirm('Import all users from device to database? This will add new card assignments for users not already in the database.')) return
    
    try {
      setImporting(true)
      setError(null)
      const res = await userAPI.importFromDevice(selectedDevice)
      setSuccess(`Imported ${res.data.imported} users from device. ${res.data.skipped} skipped (already exist).`)
      loadCardAssignments()
      loadUsers()
    } catch (e) {
      setError('Import failed: ' + getErrorMessage(e))
    } finally {
      setImporting(false)
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
          
          {/* Data Source Toggle */}
          <div className="source-toggle">
            <label>Data Source:</label>
            <select 
              value={dataSource} 
              onChange={(e) => setDataSource(e.target.value)}
              className="form-control"
            >
              <option value="database">💾 Database (Centralized)</option>
              <option value="device">📱 Device (Live)</option>
            </select>
          </div>
          
          <div className="sync-buttons">
            <button 
              onClick={handleImportFromDevice} 
              className="btn btn-info"
              disabled={!selectedDevice || importing || !isDeviceConnected()}
              title="Import users from device to database"
            >
              {importing ? '⏳' : '📥'} Import from Device
            </button>
            <button 
              onClick={handleSync} 
              className="btn btn-secondary"
              disabled={!selectedDevice || syncing || !isDeviceConnected()}
              title="Push database users to this device"
            >
              {syncing ? '⏳' : '�'} Push to Device
            </button>
            <button 
              onClick={handleSyncAll} 
              className="btn btn-primary"
              disabled={syncing}
              title="Push database users to all connected devices"
            >
              {syncing ? '⏳' : '🔄'} Sync All Devices
            </button>
          </div>
        </div>
        
        {/* Info Banner */}
        <div className="info-banner">
          <strong>💾 Database is the source of truth.</strong> 
          {dataSource === 'database' 
            ? ' Showing users from centralized database.' 
            : ' Showing live data from device.'}
          <span className="info-actions">
            Use <em>Import</em> to copy device users → database. 
            Use <em>Sync</em> to push database → devices.
          </span>
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
                    // Check if user has card from device data or from database
                    const hasDeviceCard = u.hasCard || (u.cardsList && u.cardsList.length > 0)
                    const hasCard = hasDeviceCard || cardAssign
                    
                    // Get decoded card number for tooltip
                    let cardTooltip = 'No card'
                    if (hasDeviceCard && u.cardsList && u.cardsList.length > 0) {
                      const decoded = decodeCardData(u.cardsList[0].data)
                      cardTooltip = `Card: ${decoded.decimal}`
                    } else if (cardAssign) {
                      const decoded = decodeHexCardData(cardAssign.cardData)
                      cardTooltip = `Card: ${decoded.decimal}`
                    }
                    
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
                          {hasDeviceCard ? (
                            <span className="badge badge-success" title={cardTooltip}>
                              🎫 {u.cardsList && u.cardsList.length > 0 ? decodeCardData(u.cardsList[0].data).decimal : 'Card'}
                            </span>
                          ) : cardAssign ? (
                            <span className="badge badge-warning" title={cardTooltip}>
                              🎫 {decodeHexCardData(cardAssign.cardData).decimal}
                            </span>
                          ) : (
                            <span className="badge badge-secondary">No Card</span>
                          )}
                        </td>
                        <td className="action-buttons">
                          {hasCard && (
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
              <p><strong>User:</strong> {selectedUserForCard.name || 'N/A'} ({selectedUserForCard.userID})</p>
              
              {/* Show cards from device */}
              {selectedUserForCard.cardsList && selectedUserForCard.cardsList.length > 0 && (
                <div className="device-cards">
                  <h4>📱 Cards on Device ({selectedUserForCard.cardsList.length})</h4>
                  {selectedUserForCard.cardsList.map((card, idx) => {
                    const decoded = decodeCardData(card.data)
                    return (
                      <div key={idx} className="card-item">
                        <p><strong>Card {idx + 1}:</strong></p>
                        <p><strong>Type:</strong> {card.type === 1 ? 'CSN' : card.type === 2 ? 'Secure' : card.type === 256 ? 'Wiegand' : `Type ${card.type}`}</p>
                        <p><strong>Size:</strong> {card.size} bytes</p>
                        <div className="card-number-display">
                          <p><strong>Card Number (Decimal):</strong></p>
                          <code className="card-number">{decoded.decimal}</code>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
              
              {/* Show cards from database */}
              {getCardAssignment(selectedUserForCard.userID) && (
                <div className="db-cards">
                  <h4>💾 Card in Database</h4>
                  {(() => {
                    const cardAssign = getCardAssignment(selectedUserForCard.userID)
                    const decoded = decodeHexCardData(cardAssign.cardData)
                    return (
                      <>
                        <p><strong>Card Type:</strong> {cardAssign.cardType}</p>
                        <div className="card-number-display">
                          <p><strong>Card Number (Decimal):</strong></p>
                          <code className="card-number">{decoded.decimal}</code>
                        </div>
                        <p><strong>Status:</strong> {cardAssign.status}</p>
                      </>
                    )
                  })()}
                </div>
              )}
              
              {/* No cards found */}
              {(!selectedUserForCard.cardsList || selectedUserForCard.cardsList.length === 0) && 
               !getCardAssignment(selectedUserForCard.userID) && (
                <p className="no-cards">No card data available for this user.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
