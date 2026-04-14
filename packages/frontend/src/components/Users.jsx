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
    
    // Convert to string if not already
    const hexString = String(hexData)
    
    // Remove any spaces, newlines, and non-hex characters
    let cleanHex = hexString.replace(/[^0-9A-Fa-f]/g, '').toUpperCase()
    
    // Return early if empty after cleaning
    if (!cleanHex || cleanHex.length === 0) {
      return { hex: '', decimal: '0' }
    }
    
    // Pad to even length if needed
    if (cleanHex.length % 2 === 1) {
      cleanHex = '0' + cleanHex
    }
    
    // Strip leading zeros but keep at least one character
    let significant = cleanHex.replace(/^0+/, '')
    
    // If all zeros or empty, return '0'
    if (!significant || significant.length === 0) {
      return { hex: cleanHex, decimal: '0' }
    }
    
    // Ensure we have valid hex before BigInt conversion
    if (!/^[0-9A-Fa-f]+$/.test(significant)) {
      return { hex: cleanHex, decimal: 'Invalid' }
    }
    
    // Convert to decimal using BigInt for large numbers
    const cardNumber = BigInt('0x' + significant)
    
    return {
      hex: cleanHex,
      decimal: cardNumber.toString()
    }
  } catch (e) {
    console.error('Failed to decode hex card data:', e)
    return { hex: String(hexData || ''), decimal: 'Error' }
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

  // Pagination state (for "All Users" view when no device is selected or in database mode)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalUsers, setTotalUsers] = useState(0)
  const [statusFilter, setStatusFilter] = useState('')
  const [showAllUsers, setShowAllUsers] = useState(true)
  const PAGE_SIZE = 25

  useEffect(() => { 
    loadDevices()
    loadCardAssignments()
  }, [])

  // Load paginated "All Users" from database
  const loadAllUsers = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const params = { page, limit: PAGE_SIZE }
      if (searchTerm.trim()) params.search = searchTerm.trim()
      if (statusFilter) params.status = statusFilter
      const res = await userAPI.getAllUsers(params)
      setUsers(res.data.data || [])
      setTotalUsers(res.data.total || 0)
      setTotalPages(res.data.totalPages || 1)
    } catch (e) {
      setError('Failed to load users: ' + (e.userMessage || e.message))
      setUsers([])
    } finally {
      setLoading(false)
    }
  }, [page, searchTerm, statusFilter])

  useEffect(() => {
    if (showAllUsers) loadAllUsers()
  }, [showAllUsers, loadAllUsers])

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

  // Multi-device bulk actions
  const [bulkAction, setBulkAction] = useState('')
  const [bulkDevices, setBulkDevices] = useState([])
  const [showBulkModal, setShowBulkModal] = useState(false)
  const [bulkRunning, setBulkRunning] = useState(false)

  const openBulkAction = (action) => {
    if (selectedUsers.length === 0) { setError('Select users first'); return }
    setBulkAction(action)
    setBulkDevices([])
    setShowBulkModal(true)
  }

  const toggleBulkDevice = (id) => {
    setBulkDevices(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id])
  }

  const handleBulkExecute = async () => {
    if (bulkDevices.length === 0) { setError('Select at least one device'); return }
    setBulkRunning(true)
    setError(null)
    try {
      if (bulkAction === 'enroll') {
        const res = await userAPI.enrollMulti(bulkDevices, selectedUsers)
        const results = res.data?.results || []
        const ok = results.filter(r => r.success).length
        setSuccess(`Enrolled ${selectedUsers.length} user(s) on ${ok}/${bulkDevices.length} device(s)`)
      } else if (bulkAction === 'delete') {
        const res = await userAPI.deleteMulti(bulkDevices, selectedUsers)
        const results = res.data?.results || []
        const ok = results.filter(r => r.success).length
        setSuccess(`Deleted ${selectedUsers.length} user(s) from ${ok}/${bulkDevices.length} device(s)`)
      } else if (bulkAction === 'deleteAll') {
        const res = await userAPI.deleteFromAll(selectedUsers)
        setSuccess(`Deleted ${selectedUsers.length} user(s) from all devices. ${res.data?.message || ''}`)
      }
      setShowBulkModal(false)
      setSelectedUsers([])
      if (selectedDevice) loadUsers()
    } catch (e) {
      setError('Bulk action failed: ' + getErrorMessage(e))
    } finally {
      setBulkRunning(false)
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
            <button
              onClick={() => { setShowAllUsers(!showAllUsers); setSelectedDevice(''); setPage(1) }}
              className={`btn ${showAllUsers ? 'btn-warning' : 'btn-info'}`}
              title="View all users in database with pagination"
            >
              {showAllUsers ? '✖ Close' : '📋'} All Users
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

      {/* All Users (paginated, database-wide) */}
      {showAllUsers && (
        <div className="card">
          <div className="card-header-flex">
            <h3>📋 All Users in Database ({totalUsers})</h3>
            <div className="card-actions">
              <input
                type="search"
                placeholder="🔍 Search name or ID..."
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setPage(1) }}
                className="search-input"
              />
              <select
                value={statusFilter}
                onChange={(e) => { setStatusFilter(e.target.value); setPage(1) }}
                className="form-control"
                style={{ width: 'auto' }}
              >
                <option value="">All statuses</option>
                <option value="active">Active</option>
                <option value="revoked">Revoked</option>
                <option value="lost">Lost</option>
                <option value="expired">Expired</option>
              </select>
              <button onClick={loadAllUsers} className="btn btn-secondary btn-sm" disabled={loading}>🔄</button>
            </div>
          </div>

          {loading ? (
            <div className="loading-state"><div className="spinner"></div><p>Loading users...</p></div>
          ) : users.length === 0 ? (
            <div className="empty-state"><p>👤 No users found.</p></div>
          ) : (
            <>
              <table className="table users-table">
                <thead>
                  <tr>
                    <th>Employee ID</th>
                    <th>Name</th>
                    <th>Card Type</th>
                    <th>Card No.</th>
                    <th>Status</th>
                    <th>Assigned At</th>
                    <th>Enrolled Devices</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u.userID + (u.cardData || '')}>
                      <td><code>{u.userID}</code></td>
                      <td>{u.name || 'N/A'}</td>
                      <td>{u.cardType || '—'}</td>
                      <td><code>{u.cardData ? decodeHexCardData(u.cardData).decimal : '—'}</code></td>
                      <td>
                        <span className={`badge badge-${u.status === 'active' ? 'success' : 'secondary'}`}>
                          {u.status}
                        </span>
                      </td>
                      <td>{u.assignedAt ? new Date(u.assignedAt).toLocaleDateString() : '—'}</td>
                      <td>{u.enrolledDevices?.length || 0} device(s)</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {totalPages > 1 && (
                <div className="batch-actions" style={{ justifyContent: 'center' }}>
                  <button className="btn btn-sm btn-secondary" disabled={page === 1} onClick={() => setPage(p => p - 1)}>‹ Prev</button>
                  <span>Page {page} / {totalPages} ({totalUsers} total)</span>
                  <button className="btn btn-sm btn-secondary" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>Next ›</button>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {selectedDevice && !showAllUsers && (
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
                <button onClick={() => openBulkAction('enroll')} className="btn btn-primary btn-sm">
                  📟 Enroll on Devices
                </button>
                <button onClick={() => openBulkAction('delete')} className="btn btn-warning btn-sm">
                  🗑️ Delete from Devices
                </button>
                <button onClick={() => openBulkAction('deleteAll')} className="btn btn-danger btn-sm" title="Delete from ALL connected devices">
                  ⚠️ Delete from All
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
      {/* Bulk Multi-Device Action Modal */}
      {showBulkModal && (
        <div className="modal-overlay" onClick={() => setShowBulkModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{bulkAction === 'enroll' ? '📟 Enroll on Multiple Devices' : bulkAction === 'delete' ? '🗑️ Delete from Devices' : '⚠️ Delete from All Devices'}</h3>
              <button className="btn-close" onClick={() => setShowBulkModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <p style={{ marginBottom: 12 }}>
                <strong>{selectedUsers.length}</strong> user(s) selected.
                {bulkAction === 'deleteAll'
                  ? ' This will remove them from ALL connected devices.'
                  : ' Select target devices below:'}
              </p>
              {bulkAction !== 'deleteAll' && (
                <div className="device-checklist" style={{ maxHeight: 250, overflowY: 'auto', border: '1px solid #e2e8f0', borderRadius: 8, padding: 8 }}>
                  {devices.filter(d => d.status === 'connected').length === 0 ? (
                    <p style={{ color: '#94a3b8', textAlign: 'center', padding: 12 }}>No connected devices available.</p>
                  ) : devices.filter(d => d.status === 'connected').map(d => (
                    <label key={d.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 8px', cursor: 'pointer', borderRadius: 6 }}>
                      <input type="checkbox" checked={bulkDevices.includes(d.id)} onChange={() => toggleBulkDevice(d.id)} />
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', flexShrink: 0 }} />
                      <span>{d.name || d.ip}</span>
                      <span style={{ color: '#94a3b8', fontSize: 12, marginLeft: 'auto' }}>{d.ip}:{d.port}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
            <div className="modal-footer" style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', padding: 16, borderTop: '1px solid #e2e8f0' }}>
              <button className="btn btn-secondary" onClick={() => setShowBulkModal(false)}>Cancel</button>
              <button
                className={`btn ${bulkAction === 'enroll' ? 'btn-primary' : 'btn-danger'}`}
                disabled={bulkRunning || (bulkAction !== 'deleteAll' && bulkDevices.length === 0)}
                onClick={handleBulkExecute}
              >
                {bulkRunning ? '⏳ Running…' : bulkAction === 'enroll' ? `Enroll on ${bulkDevices.length} device(s)` : bulkAction === 'deleteAll' ? 'Delete from All' : `Delete from ${bulkDevices.length} device(s)`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
