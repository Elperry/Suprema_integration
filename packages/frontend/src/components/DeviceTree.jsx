import { useState, useEffect } from 'react'
import { locationAPI, deviceAPI } from '../services/api'
import './DeviceTree.css'

export default function DeviceTree() {
  const [tree, setTree] = useState([])
  const [locations, setLocations] = useState([])
  const [devices, setDevices] = useState([])
  const [unassignedDevices, setUnassignedDevices] = useState([])
  const [expandedNodes, setExpandedNodes] = useState(new Set())
  const [selectedNode, setSelectedNode] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  // Modal states
  const [showLocationModal, setShowLocationModal] = useState(false)
  const [showAssignModal, setShowAssignModal] = useState(false)
  const [editingLocation, setEditingLocation] = useState(null)
  const [locationForm, setLocationForm] = useState({
    name: '',
    description: '',
    parentId: null,
    locationType: 'zone'
  })
  const [assignForm, setAssignForm] = useState({
    deviceId: '',
    direction: 'in'
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    setError(null)
    try {
      const [treeRes, locationsRes, devicesRes] = await Promise.all([
        locationAPI.getTree(),
        locationAPI.getAll(),
        deviceAPI.getAll()
      ])
      
      setTree(treeRes.data.data || [])
      setLocations(locationsRes.data.data || [])
      
      const allDevices = devicesRes.data.data || []
      setDevices(allDevices)
      
      // Find unassigned devices
      const unassigned = allDevices.filter(d => !d.locationId)
      setUnassignedDevices(unassigned)
    } catch (err) {
      console.error('Error loading data:', err)
      setError(err.message || 'Failed to load data')
    } finally {
      setLoading(false)
    }
  }

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

  const selectNode = (node, type) => {
    setSelectedNode({ ...node, type })
  }

  const handleCreateLocation = () => {
    setEditingLocation(null)
    setLocationForm({
      name: '',
      description: '',
      parentId: selectedNode?.type === 'location' ? selectedNode.id : null,
      locationType: 'zone'
    })
    setShowLocationModal(true)
  }

  const handleEditLocation = (location) => {
    setEditingLocation(location)
    setLocationForm({
      name: location.name,
      description: location.description || '',
      parentId: location.parentId,
      locationType: location.locationType
    })
    setShowLocationModal(true)
  }

  const handleSaveLocation = async () => {
    try {
      if (editingLocation) {
        await locationAPI.update(editingLocation.id, locationForm)
      } else {
        await locationAPI.create(locationForm)
      }
      setShowLocationModal(false)
      loadData()
    } catch (err) {
      alert('Error saving location: ' + err.message)
    }
  }

  const handleDeleteLocation = async (locationId) => {
    if (!confirm('Are you sure you want to delete this location?')) return
    try {
      await locationAPI.delete(locationId)
      loadData()
    } catch (err) {
      alert('Error deleting location: ' + err.message)
    }
  }

  const handleAssignDevice = (locationId) => {
    setAssignForm({ deviceId: '', direction: 'in' })
    setSelectedNode({ id: locationId, type: 'location' })
    setShowAssignModal(true)
  }

  const handleSaveAssignment = async () => {
    try {
      await locationAPI.assignDevice(
        selectedNode.id,
        parseInt(assignForm.deviceId),
        assignForm.direction
      )
      setShowAssignModal(false)
      loadData()
    } catch (err) {
      alert('Error assigning device: ' + err.message)
    }
  }

  const handleRemoveDevice = async (locationId, deviceId) => {
    if (!confirm('Remove this device from location?')) return
    try {
      await locationAPI.removeDevice(locationId, deviceId)
      loadData()
    } catch (err) {
      alert('Error removing device: ' + err.message)
    }
  }

  const handleToggleDirection = async (deviceId, currentDirection) => {
    try {
      const newDirection = currentDirection === 'in' ? 'out' : 'in'
      await locationAPI.updateDeviceDirection(deviceId, newDirection)
      loadData()
    } catch (err) {
      alert('Error updating direction: ' + err.message)
    }
  }

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
    switch (status) {
      case 'connected': return 'status-connected'
      case 'disconnected': return 'status-disconnected'
      case 'error': return 'status-error'
      default: return 'status-unknown'
    }
  }

  const renderDevice = (device, locationId = null) => (
    <div 
      key={device.id} 
      className={`tree-device ${selectedNode?.id === device.id && selectedNode?.type === 'device' ? 'selected' : ''}`}
      onClick={() => selectNode(device, 'device')}
    >
      <div className="device-info">
        <span className={`device-direction ${device.direction || 'in'}`}>
          {device.direction === 'out' ? '⬅️ OUT' : '➡️ IN'}
        </span>
        <span className="device-icon">🖥️</span>
        <span className="device-name">{device.name || 'Unnamed'}</span>
        <span className={`device-status ${getStatusColor(device.status)}`}>
          {device.status || 'unknown'}
        </span>
      </div>
      <div className="device-details">
        <span className="device-ip">{device.ip}:{device.port}</span>
      </div>
      <div className="device-actions">
        <button 
          className="btn-icon" 
          title="Toggle Direction"
          onClick={(e) => { e.stopPropagation(); handleToggleDirection(device.id, device.direction) }}
        >
          🔄
        </button>
        {locationId && (
          <button 
            className="btn-icon btn-danger" 
            title="Remove from location"
            onClick={(e) => { e.stopPropagation(); handleRemoveDevice(locationId, device.id) }}
          >
            ❌
          </button>
        )}
      </div>
    </div>
  )

  const renderTreeNode = (node, level = 0) => {
    const isExpanded = expandedNodes.has(node.id)
    const hasChildren = (node.children && node.children.length > 0) || (node.devices && node.devices.length > 0)
    
    return (
      <div key={node.id} className="tree-node" style={{ marginLeft: level * 20 }}>
        <div 
          className={`tree-node-header ${selectedNode?.id === node.id && selectedNode?.type === 'location' ? 'selected' : ''}`}
          onClick={() => selectNode(node, 'location')}
        >
          <span 
            className={`tree-toggle ${hasChildren ? 'clickable' : 'hidden'}`}
            onClick={(e) => { e.stopPropagation(); toggleNode(node.id) }}
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
              onClick={(e) => { e.stopPropagation(); setSelectedNode({ id: node.id, type: 'location' }); handleCreateLocation() }}
            >
              ➕
            </button>
            <button 
              className="btn-icon" 
              title="Assign device"
              onClick={(e) => { e.stopPropagation(); handleAssignDevice(node.id) }}
            >
              🔗
            </button>
            <button 
              className="btn-icon" 
              title="Edit"
              onClick={(e) => { e.stopPropagation(); handleEditLocation(node) }}
            >
              ✏️
            </button>
            <button 
              className="btn-icon btn-danger" 
              title="Delete"
              onClick={(e) => { e.stopPropagation(); handleDeleteLocation(node.id) }}
            >
              🗑️
            </button>
          </div>
        </div>
        
        {isExpanded && (
          <div className="tree-children">
            {/* Render devices at this location */}
            {node.devices && node.devices.map(device => renderDevice(device, node.id))}
            
            {/* Render child locations */}
            {node.children && node.children.map(child => renderTreeNode(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  if (loading) {
    return <div className="loading">Loading device tree...</div>
  }

  if (error) {
    return (
      <div className="error-container">
        <p>Error: {error}</p>
        <button onClick={loadData}>Retry</button>
      </div>
    )
  }

  return (
    <div className="device-tree-container">
      <div className="tree-header">
        <h2>📍 Device Location Tree</h2>
        <div className="tree-toolbar">
          <button className="btn btn-primary" onClick={handleCreateLocation}>
            ➕ Add Root Location
          </button>
          <button className="btn btn-secondary" onClick={loadData}>
            🔄 Refresh
          </button>
        </div>
      </div>

      <div className="tree-content">
        {/* Main Tree */}
        <div className="tree-panel">
          <h3>📁 Location Hierarchy</h3>
          {tree.length === 0 ? (
            <div className="empty-tree">
              <p>No locations defined yet.</p>
              <p>Click "Add Root Location" to create your first location.</p>
            </div>
          ) : (
            <div className="tree-view">
              {tree.map(node => renderTreeNode(node))}
            </div>
          )}
        </div>

        {/* Unassigned Devices */}
        <div className="unassigned-panel">
          <h3>🖥️ Unassigned Devices ({unassignedDevices.length})</h3>
          {unassignedDevices.length === 0 ? (
            <p className="no-devices">All devices are assigned to locations.</p>
          ) : (
            <div className="unassigned-list">
              {unassignedDevices.map(device => renderDevice(device))}
            </div>
          )}
        </div>
      </div>

      {/* Location Legend */}
      <div className="tree-legend">
        <h4>Legend:</h4>
        <div className="legend-items">
          <span><span className="device-direction in">➡️ IN</span> Entry device</span>
          <span><span className="device-direction out">⬅️ OUT</span> Exit device</span>
          <span><span className="status-dot status-connected"></span> Connected</span>
          <span><span className="status-dot status-disconnected"></span> Disconnected</span>
        </div>
      </div>

      {/* Location Modal */}
      {showLocationModal && (
        <div className="modal-overlay" onClick={() => setShowLocationModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>{editingLocation ? 'Edit Location' : 'Create Location'}</h3>
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
                    {'  '.repeat(loc.level)}{getLocationTypeIcon(loc.locationType)} {loc.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="modal-actions">
              <button className="btn btn-primary" onClick={handleSaveLocation}>
                {editingLocation ? 'Update' : 'Create'}
              </button>
              <button className="btn btn-secondary" onClick={() => setShowLocationModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Assign Device Modal */}
      {showAssignModal && (
        <div className="modal-overlay" onClick={() => setShowAssignModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>Assign Device to Location</h3>
            <div className="form-group">
              <label>Select Device:</label>
              <select
                value={assignForm.deviceId}
                onChange={e => setAssignForm({ ...assignForm, deviceId: e.target.value })}
              >
                <option value="">-- Select Device --</option>
                {devices.map(device => (
                  <option key={device.id} value={device.id}>
                    {device.name} ({device.ip}:{device.port})
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Direction:</label>
              <div className="direction-toggle">
                <button
                  className={`direction-btn ${assignForm.direction === 'in' ? 'active' : ''}`}
                  onClick={() => setAssignForm({ ...assignForm, direction: 'in' })}
                >
                  ➡️ IN (Entry)
                </button>
                <button
                  className={`direction-btn ${assignForm.direction === 'out' ? 'active' : ''}`}
                  onClick={() => setAssignForm({ ...assignForm, direction: 'out' })}
                >
                  ⬅️ OUT (Exit)
                </button>
              </div>
            </div>
            <div className="modal-actions">
              <button 
                className="btn btn-primary" 
                onClick={handleSaveAssignment}
                disabled={!assignForm.deviceId}
              >
                Assign
              </button>
              <button className="btn btn-secondary" onClick={() => setShowAssignModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
