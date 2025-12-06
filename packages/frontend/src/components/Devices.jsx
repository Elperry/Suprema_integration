import { useState, useEffect } from 'react'
import { deviceAPI, locationAPI } from '../services/api'
import './Devices.css'
import './DeviceTree.css'

export default function Devices() {
  // Device state
  const [devices, setDevices] = useState([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState({})
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  
  // Tree state
  const [tree, setTree] = useState([])
  const [locations, setLocations] = useState([])
  const [unassignedDevices, setUnassignedDevices] = useState([])
  const [expandedNodes, setExpandedNodes] = useState(new Set())
  
  // Drag and drop state
  const [draggedDevice, setDraggedDevice] = useState(null)
  const [dragOverLocation, setDragOverLocation] = useState(null)
  
  // Modal state
  const [showDeviceModal, setShowDeviceModal] = useState(false)
  const [showLocationModal, setShowLocationModal] = useState(false)
  const [editingDevice, setEditingDevice] = useState(null)
  const [editingLocation, setEditingLocation] = useState(null)
  
  // Forms
  const [deviceForm, setDeviceForm] = useState({ 
    name: '', 
    ip: '', 
    port: 51211,
    direction: 'in'
  })
  const [locationForm, setLocationForm] = useState({
    name: '',
    description: '',
    parentId: null,
    locationType: 'zone'
  })

  useEffect(() => { 
    loadAllData()
  }, [])

  const loadAllData = async () => {
    try {
      setLoading(true)
      const [treeRes, locationsRes, devicesRes] = await Promise.all([
        locationAPI.getTree(),
        locationAPI.getAll(),
        deviceAPI.getAll()
      ])
      
      setTree(treeRes.data.data || [])
      setLocations(locationsRes.data.data || [])
      
      const allDevices = devicesRes.data.data || []
      setDevices(allDevices)
      setUnassignedDevices(allDevices.filter(d => !d.locationId))
      
      // Auto-expand root nodes
      const rootIds = (treeRes.data.data || []).map(n => n.id)
      setExpandedNodes(new Set(rootIds))
    } catch (err) {
      setError('Failed to load data: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  // Tree functions
  const toggleNode = (nodeId) => {
    setExpandedNodes(prev => {
      const next = new Set(prev)
      if (next.has(nodeId)) {
        next.delete(nodeId)
      } else {
        next.add(nodeId)
      }
      return next
    })
  }

  // Drag and Drop handlers
  const handleDragStart = (e, device) => {
    setDraggedDevice(device)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', device.id.toString())
  }

  const handleDragEnd = () => {
    setDraggedDevice(null)
    setDragOverLocation(null)
  }

  const handleDragOver = (e, locationId) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setDragOverLocation(locationId)
  }

  const handleDragLeave = () => {
    setDragOverLocation(null)
  }

  const handleDrop = async (e, locationId) => {
    e.preventDefault()
    setDragOverLocation(null)
    
    if (!draggedDevice) return
    
    try {
      setActionLoading(prev => ({ ...prev, [draggedDevice.id]: 'moving' }))
      
      if (locationId === 'unassigned') {
        // Remove from current location
        if (draggedDevice.locationId) {
          await locationAPI.removeDevice(draggedDevice.locationId, draggedDevice.id)
        }
      } else {
        // Assign to new location
        await locationAPI.assignDevice(locationId, draggedDevice.id, draggedDevice.direction || 'in')
      }
      
      setSuccess(`Device "${draggedDevice.name}" moved successfully`)
      loadAllData()
    } catch (err) {
      setError('Failed to move device: ' + err.message)
    } finally {
      setActionLoading(prev => ({ ...prev, [draggedDevice.id]: null }))
      setDraggedDevice(null)
    }
  }

  // Device CRUD
  const handleAddDevice = () => {
    setEditingDevice(null)
    setDeviceForm({ name: '', ip: '', port: 51211, direction: 'in' })
    setShowDeviceModal(true)
  }

  const handleEditDevice = (device) => {
    setEditingDevice(device)
    setDeviceForm({
      name: device.name || '',
      ip: device.ip || '',
      port: device.port || 51211,
      direction: device.direction || 'in'
    })
    setShowDeviceModal(true)
  }

  const handleSaveDevice = async () => {
    try {
      setActionLoading(prev => ({ ...prev, saveDevice: true }))
      
      if (editingDevice) {
        await deviceAPI.update(editingDevice.id, deviceForm)
        setSuccess('Device updated successfully')
      } else {
        await deviceAPI.create(deviceForm)
        setSuccess('Device added successfully')
      }
      
      setShowDeviceModal(false)
      loadAllData()
    } catch (err) {
      setError('Failed to save device: ' + err.message)
    } finally {
      setActionLoading(prev => ({ ...prev, saveDevice: false }))
    }
  }

  const handleDeleteDevice = async (device) => {
    if (!confirm(`Delete device "${device.name}"? This cannot be undone.`)) return
    
    try {
      setActionLoading(prev => ({ ...prev, [device.id]: 'delete' }))
      await deviceAPI.delete(device.id)
      setSuccess('Device deleted successfully')
      loadAllData()
    } catch (err) {
      setError('Failed to delete device: ' + err.message)
    } finally {
      setActionLoading(prev => ({ ...prev, [device.id]: null }))
    }
  }

  const handleConnectDevice = async (device) => {
    try {
      setActionLoading(prev => ({ ...prev, [device.id]: 'connect' }))
      await deviceAPI.connect(device.id)
      setSuccess(`Connected to ${device.name}`)
      loadAllData()
    } catch (err) {
      setError('Connection failed: ' + err.message)
    } finally {
      setActionLoading(prev => ({ ...prev, [device.id]: null }))
    }
  }

  const handleDisconnectDevice = async (device) => {
    try {
      setActionLoading(prev => ({ ...prev, [device.id]: 'disconnect' }))
      await deviceAPI.disconnect(device.id)
      setSuccess(`Disconnected from ${device.name}`)
      loadAllData()
    } catch (err) {
      setError('Disconnect failed: ' + err.message)
    } finally {
      setActionLoading(prev => ({ ...prev, [device.id]: null }))
    }
  }

  const handleToggleDirection = async (device) => {
    try {
      const newDirection = device.direction === 'in' ? 'out' : 'in'
      await locationAPI.updateDeviceDirection(device.id, newDirection)
      setSuccess(`Direction changed to ${newDirection.toUpperCase()}`)
      loadAllData()
    } catch (err) {
      setError('Failed to toggle direction: ' + err.message)
    }
  }

  // Location CRUD
  const handleAddLocation = (parentId = null) => {
    setEditingLocation(null)
    setLocationForm({
      name: '',
      description: '',
      parentId: parentId,
      locationType: 'zone'
    })
    setShowLocationModal(true)
  }

  const handleEditLocation = (location) => {
    setEditingLocation(location)
    setLocationForm({
      name: location.name || '',
      description: location.description || '',
      parentId: location.parentId,
      locationType: location.locationType || 'zone'
    })
    setShowLocationModal(true)
  }

  const handleSaveLocation = async () => {
    try {
      if (editingLocation) {
        await locationAPI.update(editingLocation.id, locationForm)
        setSuccess('Location updated successfully')
      } else {
        await locationAPI.create(locationForm)
        setSuccess('Location created successfully')
      }
      setShowLocationModal(false)
      loadAllData()
    } catch (err) {
      setError('Failed to save location: ' + err.message)
    }
  }

  const handleDeleteLocation = async (locationId) => {
    if (!confirm('Delete this location? Devices will become unassigned.')) return
    
    try {
      await locationAPI.delete(locationId)
      setSuccess('Location deleted successfully')
      loadAllData()
    } catch (err) {
      setError('Failed to delete location: ' + err.message)
    }
  }

  // Helper functions
  const getLocationTypeIcon = (type) => {
    switch (type) {
      case 'building': return '🏢'
      case 'floor': return '🏗️'
      case 'zone': return '📍'
      case 'room': return '🚪'
      case 'gate': return '🚧'
      default: return '📁'
    }
  }

  const getStatusColor = (status) => {
    return status === 'connected' ? 'status-connected' : 'status-disconnected'
  }

  const connectedCount = devices.filter(d => d.status === 'connected').length
  const disconnectedCount = devices.filter(d => d.status !== 'connected').length

  // Render a device item (draggable)
  const renderDevice = (device, inLocation = false) => {
    const isLoading = !!actionLoading[device.id]
    const isDragging = draggedDevice?.id === device.id
    
    return (
      <div 
        key={device.id} 
        className={`tree-device ${isDragging ? 'dragging' : ''} ${isLoading ? 'loading' : ''}`}
        draggable={!isLoading}
        onDragStart={(e) => handleDragStart(e, device)}
        onDragEnd={handleDragEnd}
      >
        <div className="device-drag-handle" title="Drag to move">
          ⠿
        </div>
        <div className="device-info">
          {inLocation && (
            <span className={`device-direction ${device.direction || 'in'}`}>
              {device.direction === 'out' ? '⬅️ OUT' : '➡️ IN'}
            </span>
          )}
          <span className={`device-status-dot ${getStatusColor(device.status)}`}></span>
          <span className="device-name">{device.name || 'Unnamed Device'}</span>
          <span className="device-ip">{device.ip}:{device.port}</span>
        </div>
        <div className="device-actions">
          {inLocation && (
            <button 
              className="btn-icon" 
              title="Toggle IN/OUT"
              onClick={() => handleToggleDirection(device)}
              disabled={isLoading}
            >
              🔄
            </button>
          )}
          {device.status === 'connected' ? (
            <button 
              className="btn-icon btn-warning" 
              title="Disconnect"
              onClick={() => handleDisconnectDevice(device)}
              disabled={isLoading}
            >
              {actionLoading[device.id] === 'disconnect' ? '⏳' : '🔌'}
            </button>
          ) : (
            <button 
              className="btn-icon btn-success" 
              title="Connect"
              onClick={() => handleConnectDevice(device)}
              disabled={isLoading}
            >
              {actionLoading[device.id] === 'connect' ? '⏳' : '🔗'}
            </button>
          )}
          <button 
            className="btn-icon" 
            title="Edit"
            onClick={() => handleEditDevice(device)}
            disabled={isLoading}
          >
            ✏️
          </button>
          <button 
            className="btn-icon btn-danger" 
            title="Delete"
            onClick={() => handleDeleteDevice(device)}
            disabled={isLoading}
          >
            {actionLoading[device.id] === 'delete' ? '⏳' : '🗑️'}
          </button>
        </div>
      </div>
    )
  }

  // Render a tree node (location)
  const renderTreeNode = (node, level = 0) => {
    const isExpanded = expandedNodes.has(node.id)
    const hasChildren = (node.children && node.children.length > 0) || (node.devices && node.devices.length > 0)
    const isDropTarget = dragOverLocation === node.id
    
    return (
      <div key={node.id} className="tree-node">
        <div 
          className={`tree-node-header ${isDropTarget ? 'drop-target' : ''}`}
          onDragOver={(e) => handleDragOver(e, node.id)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, node.id)}
        >
          <span 
            className={`tree-toggle ${hasChildren ? 'clickable' : 'hidden'}`}
            onClick={() => toggleNode(node.id)}
          >
            {hasChildren ? (isExpanded ? '▼' : '▶') : ''}
          </span>
          <span className="tree-icon">{getLocationTypeIcon(node.locationType)}</span>
          <span className="tree-label">{node.name}</span>
          <span className="tree-badge">
            {node.devices?.length || 0} devices
          </span>
          <div className="tree-actions">
            <button 
              className="btn-icon" 
              title="Add sub-location"
              onClick={() => handleAddLocation(node.id)}
            >
              📁+
            </button>
            <button 
              className="btn-icon" 
              title="Edit location"
              onClick={() => handleEditLocation(node)}
            >
              ✏️
            </button>
            <button 
              className="btn-icon btn-danger" 
              title="Delete location"
              onClick={() => handleDeleteLocation(node.id)}
            >
              🗑️
            </button>
          </div>
        </div>
        
        {isExpanded && (
          <div className="tree-children">
            {node.devices && node.devices.map(device => renderDevice(device, true))}
            {node.children && node.children.map(child => renderTreeNode(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="page devices-page">
      {/* Header */}
      <div className="page-header">
        <h2>🖥️ Devices & Locations</h2>
        <div className="page-stats">
          <span className="stat-badge success">{connectedCount} connected</span>
          <span className="stat-badge warning">{disconnectedCount} offline</span>
          <span className="stat-badge info">{locations.length} locations</span>
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

      {/* Toolbar */}
      <div className="card toolbar-card">
        <div className="toolbar">
          <button className="btn btn-primary" onClick={handleAddDevice}>
            ➕ Add Device
          </button>
          <button className="btn btn-secondary" onClick={() => handleAddLocation(null)}>
            📁 Add Location
          </button>
          <button className="btn btn-outline" onClick={loadAllData} disabled={loading}>
            🔄 Refresh
          </button>
        </div>
        <div className="toolbar-hint">
          💡 Drag and drop devices between locations to move them
        </div>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading devices and locations...</p>
        </div>
      ) : (
        <div className="tree-layout">
          {/* Main Tree Panel */}
          <div className="tree-panel card">
            <h3>📁 Location Hierarchy</h3>
            {tree.length === 0 ? (
              <div className="empty-tree">
                <p>No locations defined yet.</p>
                <p>Click "Add Location" to create your first location, or add devices directly.</p>
              </div>
            ) : (
              <div className="tree-view">
                {tree.map(node => renderTreeNode(node))}
              </div>
            )}
          </div>

          {/* Unassigned Devices Panel */}
          <div 
            className={`unassigned-panel card ${dragOverLocation === 'unassigned' ? 'drop-target' : ''}`}
            onDragOver={(e) => handleDragOver(e, 'unassigned')}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, 'unassigned')}
          >
            <h3>🖥️ Unassigned Devices ({unassignedDevices.length})</h3>
            <p className="panel-hint">Drag devices here to unassign them from locations</p>
            {unassignedDevices.length === 0 ? (
              <p className="no-devices">All devices are assigned to locations.</p>
            ) : (
              <div className="unassigned-list">
                {unassignedDevices.map(device => renderDevice(device, false))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="tree-legend card">
        <h4>Legend:</h4>
        <div className="legend-items">
          <span><span className="device-direction in">➡️ IN</span> Entry device</span>
          <span><span className="device-direction out">⬅️ OUT</span> Exit device</span>
          <span><span className="status-dot status-connected"></span> Connected</span>
          <span><span className="status-dot status-disconnected"></span> Disconnected</span>
          <span>⠿ Drag handle</span>
        </div>
      </div>

      {/* Device Modal */}
      {showDeviceModal && (
        <div className="modal-overlay" onClick={() => setShowDeviceModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>{editingDevice ? '✏️ Edit Device' : '➕ Add Device'}</h3>
            <div className="form-group">
              <label>Device Name:</label>
              <input
                type="text"
                value={deviceForm.name}
                onChange={e => setDeviceForm({ ...deviceForm, name: e.target.value })}
                placeholder="e.g., Main Entrance Reader"
                required
              />
            </div>
            <div className="form-group">
              <label>IP Address:</label>
              <input
                type="text"
                value={deviceForm.ip}
                onChange={e => setDeviceForm({ ...deviceForm, ip: e.target.value })}
                placeholder="e.g., 192.168.1.100"
                pattern="^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$"
                required
              />
            </div>
            <div className="form-group">
              <label>Port:</label>
              <input
                type="number"
                value={deviceForm.port}
                onChange={e => setDeviceForm({ ...deviceForm, port: parseInt(e.target.value) || 51211 })}
                min="1"
                max="65535"
                required
              />
            </div>
            <div className="form-group">
              <label>Default Direction:</label>
              <div className="direction-toggle">
                <button
                  type="button"
                  className={`direction-btn ${deviceForm.direction === 'in' ? 'active' : ''}`}
                  onClick={() => setDeviceForm({ ...deviceForm, direction: 'in' })}
                >
                  ➡️ IN (Entry)
                </button>
                <button
                  type="button"
                  className={`direction-btn ${deviceForm.direction === 'out' ? 'active' : ''}`}
                  onClick={() => setDeviceForm({ ...deviceForm, direction: 'out' })}
                >
                  ⬅️ OUT (Exit)
                </button>
              </div>
            </div>
            <div className="modal-actions">
              <button 
                className="btn btn-primary" 
                onClick={handleSaveDevice}
                disabled={actionLoading.saveDevice || !deviceForm.name || !deviceForm.ip}
              >
                {actionLoading.saveDevice ? '⏳ Saving...' : (editingDevice ? 'Update' : 'Add Device')}
              </button>
              <button className="btn btn-secondary" onClick={() => setShowDeviceModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Location Modal */}
      {showLocationModal && (
        <div className="modal-overlay" onClick={() => setShowLocationModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>{editingLocation ? '✏️ Edit Location' : '📁 Add Location'}</h3>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                value={locationForm.name}
                onChange={e => setLocationForm({ ...locationForm, name: e.target.value })}
                placeholder="e.g., Main Building"
                required
              />
            </div>
            <div className="form-group">
              <label>Description:</label>
              <textarea
                value={locationForm.description}
                onChange={e => setLocationForm({ ...locationForm, description: e.target.value })}
                placeholder="Optional description"
              />
            </div>
            <div className="form-group">
              <label>Type:</label>
              <select
                value={locationForm.locationType}
                onChange={e => setLocationForm({ ...locationForm, locationType: e.target.value })}
              >
                <option value="building">🏢 Building</option>
                <option value="floor">🏗️ Floor</option>
                <option value="zone">📍 Zone</option>
                <option value="room">🚪 Room</option>
                <option value="gate">🚧 Gate</option>
              </select>
            </div>
            <div className="form-group">
              <label>Parent Location:</label>
              <select
                value={locationForm.parentId || ''}
                onChange={e => setLocationForm({ ...locationForm, parentId: e.target.value ? parseInt(e.target.value) : null })}
              >
                <option value="">-- Root Level --</option>
                {locations.map(loc => (
                  <option key={loc.id} value={loc.id}>
                    {'  '.repeat(loc.level || 0)}{getLocationTypeIcon(loc.locationType)} {loc.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="modal-actions">
              <button 
                className="btn btn-primary" 
                onClick={handleSaveLocation}
                disabled={!locationForm.name}
              >
                {editingLocation ? 'Update' : 'Create'}
              </button>
              <button className="btn btn-secondary" onClick={() => setShowLocationModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
