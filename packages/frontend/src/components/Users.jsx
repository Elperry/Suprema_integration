import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { userAPI, deviceAPI, enrollmentAPI, processAPI } from '../services/api'
import { formatDeviceOptionLabel, getDeviceSelectGroups, isDeviceOnline } from '../utils/deviceOptions'
import 'sweetalert2/dist/sweetalert2.min.css'
import './Users.css'

/**
 * Decode Suprema card data from hex or Base64 and extract card number.
 */
const decodeCardData = (cardData) => {
  try {
    if (!cardData) return { hex: '', decimal: '0', bytes: [] }

    const rawValue = String(cardData).trim()
    if (!rawValue) return { hex: '', decimal: '0', bytes: [] }

    let bytes

    if (/^[0-9A-Fa-f]+$/.test(rawValue)) {
      const cleanHex = rawValue.length % 2 === 1 ? `0${rawValue}` : rawValue
      const hexPairs = cleanHex.match(/.{1,2}/g) || []
      bytes = new Uint8Array(hexPairs.map((pair) => parseInt(pair, 16)))
    } else {
      const binaryStr = atob(rawValue)
      bytes = new Uint8Array(binaryStr.length)
      for (let i = 0; i < binaryStr.length; i++) {
        bytes[i] = binaryStr.charCodeAt(i)
      }
    }
    
    const hexStr = Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase()
    
    let startIdx = 0
    while (startIdx < bytes.length && bytes[startIdx] === 0) {
      startIdx++
    }
    
    const significantBytes = bytes.slice(startIdx)
    
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

const CARD_TYPE_OPTIONS = ['CSN', 'SmartCard', 'QR', 'BLE', 'Mobile']

const DEVICE_CHECK_STATUS_META = {
  matched: { label: 'Matched', badgeClass: 'badge-success' },
  'card-mismatch': { label: 'Card Mismatch', badgeClass: 'badge-warning' },
  'missing-on-device': { label: 'Missing on Device', badgeClass: 'badge-danger' },
  'device-only': { label: 'Device Only', badgeClass: 'badge-info' },
  'not-assigned': { label: 'Not Assigned', badgeClass: 'badge-secondary' },
  'repair-sent': { label: 'Repair Sent', badgeClass: 'badge-success' },
  'check-failed': { label: 'Check Failed', badgeClass: 'badge-danger' },
  unknown: { label: 'Unknown', badgeClass: 'badge-secondary' },
}

const DRIFT_DEVICE_STATUSES = new Set(['card-mismatch', 'missing-on-device', 'device-only'])

const escapeHtml = (value = '') => String(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;')

const createEmptyAllUsersComparison = () => ({
  summary: null,
  byUserId: {},
  offlineDeviceIds: [],
  deviceOnlyUsers: 0,
})

const buildAllUsersReconciliationIndex = (overview) => {
  const emptyState = createEmptyAllUsersComparison()

  if (!overview || !Array.isArray(overview.devices)) {
    return emptyState
  }

  const byUserId = {}
  const offlineDeviceIds = new Set()
  const deviceOnlyUsers = new Set()

  const ensureUserEntry = (userId) => {
    const normalizedUserId = String(userId || '').trim()
    if (!normalizedUserId) return null

    if (!byUserId[normalizedUserId]) {
      byUserId[normalizedUserId] = {
        missingOnDevice: 0,
        cardMismatch: 0,
        missingDevices: [],
        mismatchDevices: [],
      }
    }

    return byUserId[normalizedUserId]
  }

  for (const deviceEntry of overview.devices) {
    const deviceId = String(deviceEntry?.device?.databaseDeviceId ?? '').trim()
    const deviceLabel = deviceEntry?.device?.name || (deviceId ? `Device ${deviceId}` : 'Unknown device')

    if (deviceEntry?.device?.connected === false && deviceId) {
      offlineDeviceIds.add(deviceId)
    }

    for (const difference of deviceEntry?.differences?.missingOnDevice || []) {
      const userEntry = ensureUserEntry(difference?.userId)
      if (!userEntry) continue

      userEntry.missingOnDevice += 1
      userEntry.missingDevices.push(deviceLabel)
    }

    for (const difference of deviceEntry?.differences?.cardMismatches || []) {
      const userEntry = ensureUserEntry(difference?.userId)
      if (!userEntry) continue

      userEntry.cardMismatch += 1
      userEntry.mismatchDevices.push(deviceLabel)
    }

    for (const difference of deviceEntry?.differences?.missingInDatabase || []) {
      const userId = String(difference?.userId || '').trim()
      if (userId) {
        deviceOnlyUsers.add(userId)
      }
    }
  }

  return {
    summary: overview.summary || null,
    byUserId,
    offlineDeviceIds: [...offlineDeviceIds],
    deviceOnlyUsers: deviceOnlyUsers.size,
  }
}

const getDeviceCheckStatusMeta = (status) => DEVICE_CHECK_STATUS_META[status] || DEVICE_CHECK_STATUS_META.unknown

const buildUserDeviceStatusKey = (deviceId, userId) => {
  const normalizedDeviceId = String(deviceId || '').trim()
  const normalizedUserId = String(userId || '').trim()

  if (!normalizedDeviceId || !normalizedUserId) {
    return ''
  }

  return `${normalizedDeviceId}:${normalizedUserId}`
}

const createDeviceCheckStatusEntry = (status, recommendedAction = '', checkedAt = new Date().toISOString()) => ({
  status: String(status || 'unknown').trim() || 'unknown',
  recommendedAction: String(recommendedAction || '').trim(),
  checkedAt,
})

const createDeviceCheckStatusEntryFromReport = (report) => createDeviceCheckStatusEntry(
  report?.status,
  report?.recommendedAction,
)

const formatDeviceCheckTimestamp = (value) => {
  if (!value) {
    return ''
  }

  const parsedDate = new Date(value)
  if (Number.isNaN(parsedDate.getTime())) {
    return ''
  }

  return parsedDate.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit'
  })
}

export default function Users() {
  const navigate = useNavigate()
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
  const [showDriftOnly, setShowDriftOnly] = useState(false)
  const [selectedUsers, setSelectedUsers] = useState([])
  const [viewMode, setViewMode] = useState('table') // table, grid
  const [dataSource, setDataSource] = useState('database') // database, device
  const [userDeviceActionKey, setUserDeviceActionKey] = useState('')
  const [userDeviceStatusByKey, setUserDeviceStatusByKey] = useState({})
  const [cardAssignments, setCardAssignments] = useState([])
  const [showCardModal, setShowCardModal] = useState(false)
  const [selectedUserForCard, setSelectedUserForCard] = useState(null)
  const [showCardDeviceModal, setShowCardDeviceModal] = useState(false)
  const [cardDeviceAction, setCardDeviceAction] = useState('enroll')
  const [cardDeviceTarget, setCardDeviceTarget] = useState(null)
  const [cardDeviceOptions, setCardDeviceOptions] = useState([])
  const [cardDeviceSelectedIds, setCardDeviceSelectedIds] = useState([])
  const [cardDeviceLoading, setCardDeviceLoading] = useState(false)
  const [cardDeviceRunning, setCardDeviceRunning] = useState(false)

  // Pagination state (for "All Users" view when no device is selected or in database mode)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalUsers, setTotalUsers] = useState(0)
  const [statusFilter, setStatusFilter] = useState('')
  const [showAllUsers, setShowAllUsers] = useState(true)
  const [selectedDeviceComparison, setSelectedDeviceComparison] = useState(null)
  const [allUsersComparison, setAllUsersComparison] = useState(createEmptyAllUsersComparison())
  const [pageSize, setPageSize] = useState(25)

  const { onlineDevices, offlineDevices, hasOnlineDevices } = getDeviceSelectGroups(devices)

  useEffect(() => {
    if (selectedDevice && !onlineDevices.some((device) => String(device.id) === String(selectedDevice))) {
      setSelectedDevice('')
      setShowAllUsers(true)
    }
  }, [onlineDevices, selectedDevice])

  useEffect(() => {
    if (showAllUsers && viewMode !== 'table') {
      setViewMode('table')
    }
  }, [showAllUsers, viewMode])

  // Load paginated "All Users" from database
  const loadAllUsers = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const params = { page, limit: pageSize === 'all' ? 9999 : pageSize }
      if (searchTerm.trim()) params.search = searchTerm.trim()
      if (statusFilter) params.status = statusFilter
      const res = await userAPI.getAllUsers(params)
      setUsers(res.data.data || [])
      setTotalUsers(res.data.total || 0)
      setTotalPages(res.data.totalPages || 1)
      setAllUsersComparison(createEmptyAllUsersComparison())
    } catch (e) {
      setError('Failed to load users: ' + (e.userMessage || e.message))
      setUsers([])
      setAllUsersComparison(createEmptyAllUsersComparison())
    } finally {
      setLoading(false)
    }
  }, [page, pageSize, searchTerm, statusFilter])

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

  const loadCardAssignments = useCallback(async () => {
    try {
      const res = await enrollmentAPI.getCardAssignments()
      setCardAssignments(res.data.data || [])
    } catch (e) {
      console.error('Failed to load card assignments:', e)
    }
  }, [])

  useEffect(() => {
    loadDevices()
    loadCardAssignments()
  }, [loadCardAssignments])

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

  const setCachedUserDeviceStatus = (deviceId, userId, statusEntry) => {
    const statusKey = buildUserDeviceStatusKey(deviceId, userId)

    if (!statusKey) {
      return
    }

    setUserDeviceStatusByKey((prev) => ({
      ...prev,
      [statusKey]: statusEntry,
    }))
  }

  const getCachedUserDeviceStatus = (deviceId, userId) => {
    const statusKey = buildUserDeviceStatusKey(deviceId, userId)
    return statusKey ? userDeviceStatusByKey[statusKey] || null : null
  }

  const isDriftDeviceStatus = (status) => DRIFT_DEVICE_STATUSES.has(String(status || '').trim())

  const renderUserDeviceStatus = (user) => {
    const deviceId = String(selectedDevice || '').trim()
    const userId = String(user?.userID || '').trim()

    if (!deviceId || !userId) {
      return (
        <div className="device-check-stack">
          <span className="badge badge-secondary device-check-badge">Not Checked</span>
        </div>
      )
    }

    const checkActionKey = `check:${deviceId}:${userId}`
    const repairActionKey = `repair:${deviceId}:${userId}`

    if (userDeviceActionKey === checkActionKey || userDeviceActionKey === repairActionKey) {
      const pendingLabel = userDeviceActionKey === checkActionKey ? 'Checking…' : 'Repairing…'
      return (
        <div className="device-check-stack">
          <span className="badge badge-info device-check-badge">{pendingLabel}</span>
          <span className="device-check-meta">Live device request in progress</span>
        </div>
      )
    }

    const statusEntry = getCachedUserDeviceStatus(deviceId, userId)
    if (!statusEntry) {
      return (
        <div className="device-check-stack">
          <span className="badge badge-secondary device-check-badge">Not Checked</span>
          <span className="device-check-meta">Use Check Device</span>
        </div>
      )
    }

    const statusMeta = getDeviceCheckStatusMeta(statusEntry.status)
    const checkedAtLabel = formatDeviceCheckTimestamp(statusEntry.checkedAt)
    const shouldShowNote = statusEntry.recommendedAction && !['matched', 'repair-sent'].includes(statusEntry.status)

    return (
      <div className="device-check-stack">
        <span
          className={`badge ${statusMeta.badgeClass} device-check-badge`}
          title={statusEntry.recommendedAction || statusMeta.label}
        >
          {statusMeta.label}
        </span>
        <span className="device-check-meta">{checkedAtLabel ? `Checked ${checkedAtLabel}` : 'Checked just now'}</span>
        {shouldShowNote && (
          <span className="device-check-note" title={statusEntry.recommendedAction}>
            {statusEntry.recommendedAction}
          </span>
        )}
      </div>
    )
  }

  // Check if selected device is connected
  const isDeviceConnected = () => {
    const device = devices.find(d => String(d.id) === String(selectedDevice))
    return isDeviceOnline(device)
  }

  const loadUsers = useCallback(async () => {
    if (!selectedDevice) return

    try {
      setLoading(true)
      setError(null)

      const res = await userAPI.getUsers(selectedDevice, true, 'database')
      setUsers(res.data.data || [])
      setSelectedDeviceComparison(null)
    } catch (e) { 
      setError('Failed to load users: ' + getErrorMessage(e))
      setUsers([])
      setSelectedDeviceComparison(null)
    } finally {
      setLoading(false)
    }
  }, [selectedDevice])

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

  // Multi-device bulk actions
  const [bulkAction, setBulkAction] = useState('')
  const [bulkDevices, setBulkDevices] = useState([])
  const [showBulkModal, setShowBulkModal] = useState(false)
  const [bulkRunning, setBulkRunning] = useState(false)
  const [selectAllLoading, setSelectAllLoading] = useState(false)

  const selectAllPages = async () => {
    try {
      setSelectAllLoading(true)
      const params = {}
      if (searchTerm.trim()) params.search = searchTerm.trim()
      if (statusFilter) params.status = statusFilter
      const res = await userAPI.getAllUsers(params)
      const allIds = (res.data.data || []).map(u => u.userID).filter(Boolean)
      setSelectedUsers(allIds)
    } catch (e) {
      setError('Failed to select all users: ' + getErrorMessage(e))
    } finally {
      setSelectAllLoading(false)
    }
  }

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
        if (res.data?.background && res.data?.processId) {
          // Background process started — close modal and navigate
          setShowBulkModal(false)
          setSelectedUsers([])
          const pid = res.data.processId
          setSuccess(
            `Enrollment started in the background for ${selectedUsers.length} user(s). ` +
            `Check the Processes page for progress and conflict resolution.`
          )
          // Navigate to processes page after a short delay
          setTimeout(() => navigate('/processes'), 1800)
        } else {
          // Fallback: synchronous response
          const results = res.data?.results || []
          const ok = results.filter(r => r.success).length
          const count = results.length || bulkDevices.length
          setSuccess(`Enrolled ${selectedUsers.length} user(s) on ${ok}/${count} device(s)`)
          setShowBulkModal(false)
          setSelectedUsers([])
          if (selectedDevice) loadUsers()
        }
      } else if (bulkAction === 'delete') {
        const res = await userAPI.deleteMulti(bulkDevices, selectedUsers)
        const results = res.data?.results || []
        const ok = results.filter(r => r.success).length
        const count = results.length || bulkDevices.length
        setSuccess(`Deleted ${selectedUsers.length} user(s) from ${ok}/${count} device(s)`)
        setShowBulkModal(false)
        setSelectedUsers([])
        if (selectedDevice) loadUsers()
      } else if (bulkAction === 'deleteAll') {
        const res = await userAPI.deleteFromAll(selectedUsers)
        const results = res.data?.results || []
        const ok = results.length > 0
          ? results.filter((result) => result.success).length
          : selectedUsers.length
        setSuccess(`Deleted ${ok}/${selectedUsers.length} user(s) from all connected devices.`)
        setShowBulkModal(false)
        setSelectedUsers([])
        if (selectedDevice) loadUsers()
      }
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
      if (res.data.background) {
        setSuccess('Sync started in the background. The devices will be updated shortly.')
      } else {
        const results = res.data.results || []
        const successCount = results.filter(r => r.success).length
        setSuccess(`Database synced to ${successCount}/${results.length} devices!`)
        loadUsers()
      }
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

  const describeCheckCard = (cardData) => {
    if (!cardData) {
      return { decimal: '—', hex: '—' }
    }

    const decoded = decodeHexCardData(cardData)
    return {
      decimal: decoded.decimal && decoded.decimal !== 'Error' && decoded.decimal !== 'Invalid' ? decoded.decimal : String(cardData),
      hex: decoded.hex || String(cardData)
    }
  }

  const handleCheckUserOnDevice = async (user) => {
    const deviceId = String(selectedDevice || '').trim()
    if (!deviceId) {
      return
    }

    const userId = String(user?.userID || '').trim()
    if (!userId) {
      return
    }

    const actionKey = `check:${deviceId}:${userId}`
    setUserDeviceActionKey(actionKey)

    try {
      const res = await userAPI.checkUserOnDevice(deviceId, userId)
      const report = res.data?.data || {}
      setCachedUserDeviceStatus(deviceId, userId, createDeviceCheckStatusEntryFromReport(report))
      const databaseCard = describeCheckCard(report.databaseCardData)
      const deviceCard = describeCheckCard(report.deviceCardData)
      const statusMeta = {
        matched: { icon: 'success', title: 'User Matches Device' },
        'card-mismatch': { icon: 'warning', title: 'Card Mismatch Detected' },
        'missing-on-device': { icon: 'warning', title: 'User Missing on Device' },
        'device-only': { icon: 'info', title: 'User Exists Only on Device' },
        'not-assigned': { icon: 'info', title: 'User Not Assigned' },
      }[report.status] || { icon: 'info', title: 'User Device Check' }

      await Swal.fire({
        icon: statusMeta.icon,
        title: statusMeta.title,
        width: 760,
        buttonsStyling: false,
        customClass: {
          popup: 'users-swal-popup',
          confirmButton: 'btn btn-primary'
        },
        html: `
          <div class="users-swal-form">
            <p class="users-swal-note">Checked user <strong>${escapeHtml(report.userId || userId)}</strong> on <strong>${escapeHtml(report.deviceName || `Device ${selectedDevice}`)}</strong>.</p>
            <div class="users-history-grid">
              <div>
                <span>Status</span>
                <strong>${escapeHtml(String(report.status || 'unknown'))}</strong>
              </div>
              <div>
                <span>Expected From DB</span>
                <strong>${report.expectedOnDevice ? 'Yes' : 'No'}</strong>
              </div>
              <div>
                <span>Present On Device</span>
                <strong>${report.presentOnDevice ? 'Yes' : 'No'}</strong>
              </div>
              <div>
                <span>Employee</span>
                <strong>${escapeHtml(report.employeeName || user.name || 'Unknown')}</strong>
              </div>
              <div>
                <span>DB Card</span>
                <strong>${escapeHtml(databaseCard.decimal)}</strong>
              </div>
              <div>
                <span>Device Card</span>
                <strong>${escapeHtml(deviceCard.decimal)}</strong>
              </div>
            </div>
            <div class="card-data-block">
              <span class="card-data-label">Recommended Action</span>
              <p class="users-swal-note">${escapeHtml(report.recommendedAction || 'No recommendation available.')}</p>
            </div>
          </div>
        `
      })
    } catch (error) {
      const errorMessage = getErrorMessage(error)
      setCachedUserDeviceStatus(deviceId, userId, createDeviceCheckStatusEntry('check-failed', errorMessage))
      await Swal.fire({
        icon: 'error',
        title: 'Device check failed',
        text: errorMessage,
        buttonsStyling: false,
        customClass: {
          popup: 'users-swal-popup',
          confirmButton: 'btn btn-primary'
        }
      })
    } finally {
      setUserDeviceActionKey('')
    }
  }

  const handleRepairUserOnDevice = async (user) => {
    const deviceId = String(selectedDevice || '').trim()
    if (!deviceId) {
      return
    }

    const userId = String(user?.userID || '').trim()
    if (!userId) {
      return
    }

    const result = await Swal.fire({
      title: 'Repair User on Selected Device?',
      text: `This will make the selected device follow the database state for user ${userId}.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Repair User',
      cancelButtonText: 'Cancel',
      buttonsStyling: false,
      customClass: {
        popup: 'users-swal-popup',
        confirmButton: 'btn btn-warning',
        cancelButton: 'btn btn-secondary'
      }
    })

    if (!result.isConfirmed) {
      return
    }

    const actionKey = `repair:${deviceId}:${userId}`
    setUserDeviceActionKey(actionKey)

    try {
      const res = await userAPI.repairUser(deviceId, userId)
      const action = res.data?.data?.action || 'repair-user'
      const successMessage = action === 'enroll-user'
        ? `User ${userId} enrolled on the selected device`
        : action === 'update-user-card'
          ? `User ${userId} card aligned on the selected device`
          : action === 'remove-device-user'
            ? `User ${userId} removed from the selected device`
            : `User ${userId} repaired on the selected device`

        try {
          const checkRes = await userAPI.checkUserOnDevice(deviceId, userId)
          setCachedUserDeviceStatus(deviceId, userId, createDeviceCheckStatusEntryFromReport(checkRes.data?.data || {}))
        } catch (checkError) {
          setCachedUserDeviceStatus(
            deviceId,
            userId,
            createDeviceCheckStatusEntry('repair-sent', `Repair completed. ${getErrorMessage(checkError)}`)
          )
        }

      await loadCardAssignments()
      await loadUsers()
      await showSwalToast('success', successMessage)
    } catch (error) {
      await Swal.fire({
        icon: 'error',
        title: 'Repair failed',
        text: getErrorMessage(error),
        buttonsStyling: false,
        customClass: {
          popup: 'users-swal-popup',
          confirmButton: 'btn btn-primary'
        }
      })
    } finally {
      setUserDeviceActionKey('')
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

  const normalizeComparableCardHex = (cardData) => {
    const decoded = decodeCardData(cardData)
    const compactHex = String(decoded.hex || '')
      .replace(/[^0-9A-Fa-f]/g, '')
      .toUpperCase()
      .replace(/^0+/, '')

    return compactHex || '0'
  }

  const getDatabaseCardsForComparison = (user) => {
    if (Array.isArray(user?.cards) && user.cards.length > 0) {
      return user.cards
    }

    if (user?.cardData) {
      return [{ cardData: user.cardData }]
    }

    return []
  }

  const getDeviceCardsForComparison = (user) => {
    if (Array.isArray(user?.cardsList) && user.cardsList.length > 0) {
      return user.cardsList
    }

    if (user?.cardData) {
      return [{ data: user.cardData }]
    }

    return []
  }

  const compareDatabaseAndDeviceUser = (databaseUser, deviceUser) => {
    const databaseCards = getDatabaseCardsForComparison(databaseUser)
    const deviceCards = getDeviceCardsForComparison(deviceUser)

    const databaseCardSet = new Set(
      databaseCards
        .map((card) => normalizeComparableCardHex(card?.cardData || card?.data))
        .filter(Boolean)
    )
    const deviceCardSet = new Set(
      deviceCards
        .map((card) => normalizeComparableCardHex(card?.data || card?.cardData))
        .filter(Boolean)
    )

    const onDevice = Boolean(deviceUser)
    const inDatabase = Boolean(databaseUser)
    const hasDatabaseCards = databaseCardSet.size > 0
    const hasDeviceCards = deviceCardSet.size > 0
    const cardMatch = hasDatabaseCards && hasDeviceCards
      ? [...databaseCardSet].some((cardHex) => deviceCardSet.has(cardHex))
      : !hasDatabaseCards && !hasDeviceCards

    if (inDatabase && onDevice && cardMatch) {
      return {
        status: 'matched',
        label: 'Matched',
        tone: 'success',
        onDevice,
        inDatabase,
        cardMatch: true
      }
    }

    if (inDatabase && onDevice) {
      return {
        status: 'card-mismatch',
        label: 'Card Mismatch',
        tone: 'warning',
        onDevice,
        inDatabase,
        cardMatch: false
      }
    }

    if (inDatabase) {
      return {
        status: 'missing-on-device',
        label: 'Missing on Device',
        tone: 'danger',
        onDevice,
        inDatabase,
        cardMatch: false
      }
    }

    return {
      status: 'device-only',
      label: 'Device Only',
      tone: 'secondary',
      onDevice,
      inDatabase,
      cardMatch: false
    }
  }

  const mergeUsersForSelectedDevice = (databaseUsers = [], deviceUsers = []) => {
    const databaseUsersById = new Map(databaseUsers.map((user) => [String(user.userID || ''), user]))
    const deviceUsersById = new Map(deviceUsers.map((user) => [String(user.userID || ''), user]))
    const allUserIds = new Set([...databaseUsersById.keys(), ...deviceUsersById.keys()].filter(Boolean))

    return [...allUserIds]
      .map((userID) => {
        const databaseUser = databaseUsersById.get(userID) || null
        const deviceUser = deviceUsersById.get(userID) || null
        const comparison = compareDatabaseAndDeviceUser(databaseUser, deviceUser)

        return {
          ...(databaseUser || {}),
          ...(deviceUser ? {
            cardsList: deviceUser.cardsList || [],
            hasCard: deviceUser.hasCard,
            deviceCardData: deviceUser.cardData || null,
            deviceName: deviceUser.name || ''
          } : {}),
          userID,
          employeeId: databaseUser?.employeeId || deviceUser?.employeeId || userID,
          name: databaseUser?.name && databaseUser.name !== 'Unknown'
            ? databaseUser.name
            : deviceUser?.name || databaseUser?.name || 'Unknown',
          source: comparison.status === 'device-only' ? 'device' : (databaseUser?.source || 'database'),
          comparison,
          onSelectedDevice: comparison.onDevice,
          isMissingOnSelectedDevice: comparison.status === 'missing-on-device',
          isDeviceOnly: comparison.status === 'device-only',
        }
      })
      .sort((left, right) => {
        const statusRank = {
          'card-mismatch': 0,
          'missing-on-device': 1,
          'device-only': 2,
          matched: 3,
        }
        const rankDiff = (statusRank[left.comparison?.status] ?? 99) - (statusRank[right.comparison?.status] ?? 99)
        if (rankDiff !== 0) return rankDiff

        return String(left.name || left.userID || '').localeCompare(String(right.name || right.userID || ''))
      })
  }

  const buildSelectedDeviceComparisonSummary = (mergedUsers = []) => mergedUsers.reduce((summary, user) => {
    const status = user?.comparison?.status
    if (status === 'matched') summary.matched += 1
    if (status === 'missing-on-device') summary.missingOnDevice += 1
    if (status === 'device-only') summary.deviceOnly += 1
    if (status === 'card-mismatch') summary.cardMismatch += 1
    return summary
  }, {
    matched: 0,
    missingOnDevice: 0,
    deviceOnly: 0,
    cardMismatch: 0,
  })

  const getDatabaseCards = (user) => {
    if (!user) return []

    if (Array.isArray(user.cards) && user.cards.length > 0) {
      return user.cards
    }

    const cardAssign = getCardAssignment(user.userID)
    if (cardAssign?.cardData) {
      return [{
        id: cardAssign.id || `assignment-${user.userID}`,
        employeeId: cardAssign.employeeId || user.userID,
        employeeName: cardAssign.employeeName || user.name || '',
        cardData: cardAssign.cardData,
        rawCardData: cardAssign.cardData,
        cardDecimal: decodeCardData(cardAssign.cardData).decimal,
        cardType: cardAssign.cardType || 'CSN',
        cardFormat: cardAssign.cardFormat || 0,
        status: cardAssign.status || 'active',
        assignedAt: cardAssign.assignedAt,
        enrolledDevices: cardAssign.enrollments || []
      }]
    }

    if (user.cardData) {
      return [{
        id: `user-card-${user.userID}`,
        employeeId: user.employeeId || user.userID,
        employeeName: user.name || '',
        cardData: user.cardData,
        rawCardData: user.rawCardData || user.cardData,
        cardDecimal: user.cardDecimal || decodeCardData(user.cardData).decimal,
        cardType: user.cardType || 'CSN',
        cardFormat: user.cardFormat || 0,
        status: user.status || 'active',
        assignedAt: user.assignedAt,
        enrolledDevices: user.enrolledDevices || []
      }]
    }

    return []
  }

  const getPrimaryDatabaseCard = (user) => getDatabaseCards(user)[0] || null

  const getCardDisplayValue = (card) => {
    if (!card) return '—'
    if (card.cardDecimal) return card.cardDecimal
    if (card.cardData) return decodeCardData(card.cardData).decimal
    return '—'
  }

  const getRelevantEnrollments = (enrollments = []) => Array.isArray(enrollments)
    ? enrollments.filter((enrollment) => !enrollment?.status || enrollment.status === 'active' || enrollment.status === 'pending')
    : []

  const getUserStatusTone = (user) => {
    if (!user) return 'secondary'
    if ((user.activeCardCount || 0) > 0 && (user.inactiveCardCount || 0) === 0) return 'success'
    if ((user.activeCardCount || 0) > 0 && (user.inactiveCardCount || 0) > 0) return 'warning'
    return 'secondary'
  }

  const getEnrolledDeviceSummary = (enrolledDevices = []) => {
    if (!enrolledDevices.length) return 'No device enrollments'
    if (enrolledDevices.length === 1) {
      return enrolledDevices[0].deviceName || `Device ${enrolledDevices[0].deviceId}`
    }
    return `${enrolledDevices.length} devices`
  }

  const getKnownEmployeeId = (userOrId) => {
    const rawValue = typeof userOrId === 'object'
      ? (userOrId?.employeeId || userOrId?.userID || '')
      : userOrId

    const employeeId = String(rawValue || '').trim()
    if (!employeeId || employeeId.startsWith('unknown-')) {
      return ''
    }

    return employeeId
  }

  const getPrimaryDeviceCard = (user) => Array.isArray(user?.cardsList) && user.cardsList.length > 0
    ? user.cardsList[0]
    : null

  const resolveCardTypeLabel = (card) => {
    const cardType = card?.cardType ?? card?.type

    if (typeof cardType === 'string' && cardType.trim()) {
      return cardType.trim()
    }

    if (cardType === 1) return 'CSN'
    if (cardType === 2) return 'SmartCard'
    if (cardType === 256) return 'Wiegand'
    if (cardType === 512) return 'QR'

    return 'CSN'
  }

  const getCardNumberForAssignment = (card) => {
    if (!card) return ''

    if (card.cardDecimal) {
      return String(card.cardDecimal)
    }

    if (card.cardData) {
      const decoded = decodeCardData(card.cardData)
      return decoded.decimal === 'Error' ? '' : decoded.decimal
    }

    if (card.data) {
      const decoded = decodeCardData(card.data)
      return decoded.decimal === 'Error' ? '' : decoded.decimal
    }

    return ''
  }

  const getPersistedAssignmentId = (card) => {
    const rawId = String(card?.id ?? '').trim()
    return /^\d+$/.test(rawId) ? rawId : ''
  }

  const getActiveEnrollmentCount = (card) => getRelevantEnrollments(card?.enrolledDevices).length

  const getAllUsersLiveCheck = (user) => {
    if (!allUsersComparison.summary) {
      return {
        label: 'Not checked',
        tone: 'secondary',
        title: 'Live reconciliation data is currently unavailable.',
      }
    }

    const userId = String(getKnownEmployeeId(user) || user?.userID || '').trim()
    const issue = allUsersComparison.byUserId[userId] || null
    const activeEnrollments = getRelevantEnrollments(user?.enrolledDevices || [])
    const offlineDeviceIds = new Set(allUsersComparison.offlineDeviceIds)
    const offlineEnrollments = activeEnrollments.filter((enrollment) => offlineDeviceIds.has(String(enrollment?.deviceId ?? '')))
    const missingCount = issue?.missingOnDevice || 0
    const mismatchCount = issue?.cardMismatch || 0

    const titleParts = []
    if (issue?.missingDevices?.length) {
      titleParts.push(`Missing on device: ${issue.missingDevices.join(', ')}`)
    }
    if (issue?.mismatchDevices?.length) {
      titleParts.push(`Card mismatch: ${issue.mismatchDevices.join(', ')}`)
    }
    if (offlineEnrollments.length > 0) {
      titleParts.push(`Offline devices not checked: ${offlineEnrollments.map((enrollment) => enrollment.deviceName || `Device ${enrollment.deviceId}`).join(', ')}`)
    }

    if (missingCount > 0 || mismatchCount > 0) {
      const labelParts = []
      if (missingCount > 0) labelParts.push(`${missingCount} missing`)
      if (mismatchCount > 0) labelParts.push(`${mismatchCount} mismatch`)

      return {
        label: labelParts.join(', '),
        tone: missingCount > 0 ? 'danger' : 'warning',
        title: titleParts.join(' '),
      }
    }

    if (activeEnrollments.length === 0) {
      return {
        label: 'No device assignments',
        tone: 'secondary',
        title: 'This employee has no active database device assignments.',
      }
    }

    if (offlineEnrollments.length > 0) {
      return {
        label: `${offlineEnrollments.length} offline unchecked`,
        tone: 'warning',
        title: titleParts.join(' '),
      }
    }

    return {
      label: 'OK on checked devices',
      tone: 'success',
      title: 'No live drift detected on connected devices.',
    }
  }

  const selectedDeviceComparisonMode = Boolean(selectedDevice) && dataSource === 'database'

  const openEmployeeDirectory = (userOrId) => {
    const employeeId = getKnownEmployeeId(userOrId)
    if (!employeeId) return

    navigate(`/employees?search=${encodeURIComponent(employeeId)}`)
  }

  const openCreateAssignment = (user = null, card = null, options = {}) => {
    const params = new URLSearchParams()
    const employeeId = getKnownEmployeeId(user)
    const employeeName = user && !user.isUnknown ? String(user.name || '').trim() : ''
    const includeCardData = options.includeCardData ?? Boolean(card)
    const normalizedCardData = includeCardData ? getCardNumberForAssignment(card) : ''
    const cardType = card ? resolveCardTypeLabel(card) : 'CSN'

    params.set('tab', 'assignments')
    params.set('openCreate', '1')

    if (employeeId) {
      params.set('employeeId', employeeId)
      params.set('prefillEmployeeId', employeeId)
    }

    if (employeeName) {
      params.set('prefillEmployeeName', employeeName)
    }

    if (normalizedCardData) {
      params.set('prefillCardData', normalizedCardData)
    }

    if (cardType) {
      params.set('prefillCardType', cardType)
    }

    if (options.notes) {
      params.set('prefillNotes', options.notes)
    }

    navigate(`/card-assignments?${params.toString()}`)
  }

  const showSwalToast = (icon, title) => Swal.fire({
    toast: true,
    position: 'top-end',
    timer: 2200,
    timerProgressBar: true,
    showConfirmButton: false,
    icon,
    title,
    customClass: {
      popup: 'users-swal-toast'
    }
  })

  const refreshCardDetailsData = useCallback(async () => {
    await loadCardAssignments()

    if (showAllUsers) {
      await loadAllUsers()
      return
    }

    if (selectedDevice) {
      await loadUsers()
    }
  }, [loadAllUsers, loadCardAssignments, loadUsers, selectedDevice, showAllUsers])

  const closeCardDeviceModal = () => {
    setShowCardDeviceModal(false)
    setCardDeviceAction('enroll')
    setCardDeviceTarget(null)
    setCardDeviceOptions([])
    setCardDeviceSelectedIds([])
    setCardDeviceLoading(false)
    setCardDeviceRunning(false)
  }

  const handleInlineAssignCard = async (user = null, card = null, options = {}) => {
    const defaultEmployeeId = getKnownEmployeeId(user)
    const defaultEmployeeName = user && !user.isUnknown ? String(user.name || '').trim() : ''
    const includeCardData = options.includeCardData ?? Boolean(card)
    const defaultCardNumber = includeCardData ? getCardNumberForAssignment(card) : ''
    const defaultCardType = card ? resolveCardTypeLabel(card) : 'CSN'
    const defaultNotes = options.notes || ''
    const cardTypeOptionsMarkup = CARD_TYPE_OPTIONS
      .map((type) => `<option value="${escapeHtml(type)}" ${type === defaultCardType ? 'selected' : ''}>${escapeHtml(type)}</option>`)
      .join('')

    const result = await Swal.fire({
      title: defaultEmployeeId ? 'Add Card' : 'Assign Card',
      width: 720,
      showCancelButton: true,
      confirmButtonText: defaultEmployeeId ? 'Save Card' : 'Assign Card',
      cancelButtonText: 'Cancel',
      buttonsStyling: false,
      focusConfirm: false,
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading(),
      customClass: {
        popup: 'users-swal-popup',
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-secondary'
      },
      html: `
        <div class="users-swal-form">
          <div class="users-swal-grid">
            <label class="users-swal-field">
              <span>Employee ID *</span>
              <input id="swal-assign-employee-id" class="swal2-input" value="${escapeHtml(defaultEmployeeId)}" placeholder="Employee ID" />
            </label>
            <label class="users-swal-field">
              <span>Employee Name</span>
              <input id="swal-assign-employee-name" class="swal2-input" value="${escapeHtml(defaultEmployeeName)}" placeholder="Employee name" />
            </label>
            <label class="users-swal-field">
              <span>Card Number (Decimal) *</span>
              <input id="swal-assign-card-number" class="swal2-input" inputmode="numeric" value="${escapeHtml(defaultCardNumber)}" placeholder="Enter card number" />
            </label>
            <label class="users-swal-field">
              <span>Card Type</span>
              <select id="swal-assign-card-type" class="swal2-select">${cardTypeOptionsMarkup}</select>
            </label>
          </div>
          <label class="users-swal-field users-swal-field-full">
            <span>Notes</span>
            <textarea id="swal-assign-notes" class="swal2-textarea" placeholder="Optional notes">${escapeHtml(defaultNotes)}</textarea>
          </label>
        </div>
      `,
      didOpen: () => {
        document.getElementById('swal-assign-card-number')?.focus()
      },
      preConfirm: async () => {
        const employeeId = document.getElementById('swal-assign-employee-id')?.value.trim() || ''
        const employeeName = document.getElementById('swal-assign-employee-name')?.value.trim() || ''
        const cardNumber = document.getElementById('swal-assign-card-number')?.value.trim() || ''
        const cardType = document.getElementById('swal-assign-card-type')?.value || 'CSN'
        const notes = document.getElementById('swal-assign-notes')?.value.trim() || ''

        if (!employeeId) {
          Swal.showValidationMessage('Employee ID is required.')
          return false
        }

        if (!cardNumber || !/^\d+$/.test(cardNumber)) {
          Swal.showValidationMessage('Card number must contain decimal digits only.')
          return false
        }

        try {
          await enrollmentAPI.assignCard({
            employeeId,
            employeeName: employeeName || undefined,
            cardType,
            notes: notes || undefined,
            cardNumber,
          })

          return { employeeId, cardNumber }
        } catch (error) {
          Swal.showValidationMessage(getErrorMessage(error))
          return false
        }
      }
    })

    if (result.isConfirmed) {
      await refreshCardDetailsData()
      await showSwalToast('success', defaultEmployeeId ? 'Card saved to assignments' : 'Card assigned successfully')
    }
  }

  const handleInlineReplaceCard = async (card) => {
    const assignmentId = getPersistedAssignmentId(card)

    if (!assignmentId) {
      await Swal.fire({
        icon: 'info',
        title: 'Assignment unavailable',
        text: 'This card must be saved in the database before it can be replaced.',
        buttonsStyling: false,
        customClass: {
          popup: 'users-swal-popup',
          confirmButton: 'btn btn-primary'
        }
      })
      return
    }

    if (card.status !== 'active') {
      await Swal.fire({
        icon: 'info',
        title: 'Card is not active',
        text: 'Only active card assignments can be replaced.',
        buttonsStyling: false,
        customClass: {
          popup: 'users-swal-popup',
          confirmButton: 'btn btn-primary'
        }
      })
      return
    }

    const currentCardNumber = getCardDisplayValue(card)
    const defaultCardType = resolveCardTypeLabel(card)
    const cardTypeOptionsMarkup = CARD_TYPE_OPTIONS
      .map((type) => `<option value="${escapeHtml(type)}" ${type === defaultCardType ? 'selected' : ''}>${escapeHtml(type)}</option>`)
      .join('')

    const result = await Swal.fire({
      title: 'Replace Card',
      width: 720,
      showCancelButton: true,
      confirmButtonText: 'Replace Card',
      cancelButtonText: 'Cancel',
      buttonsStyling: false,
      focusConfirm: false,
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading(),
      customClass: {
        popup: 'users-swal-popup',
        confirmButton: 'btn btn-warning',
        cancelButton: 'btn btn-secondary'
      },
      html: `
        <div class="users-swal-form">
          <div class="users-swal-banner">
            <span>Current Card Number</span>
            <strong>${escapeHtml(currentCardNumber)}</strong>
          </div>
          <div class="users-swal-grid">
            <label class="users-swal-field">
              <span>New Card Number (Decimal) *</span>
              <input id="swal-replace-card-number" class="swal2-input" inputmode="numeric" placeholder="Enter the replacement card number" />
            </label>
            <label class="users-swal-field">
              <span>Card Type</span>
              <select id="swal-replace-card-type" class="swal2-select">${cardTypeOptionsMarkup}</select>
            </label>
          </div>
          <label class="users-swal-field users-swal-field-full">
            <span>Notes</span>
            <textarea id="swal-replace-notes" class="swal2-textarea" placeholder="Reason for replacement"></textarea>
          </label>
        </div>
      `,
      didOpen: () => {
        document.getElementById('swal-replace-card-number')?.focus()
      },
      preConfirm: async () => {
        const cardNumber = document.getElementById('swal-replace-card-number')?.value.trim() || ''
        const cardType = document.getElementById('swal-replace-card-type')?.value || defaultCardType
        const notes = document.getElementById('swal-replace-notes')?.value.trim() || ''

        if (!cardNumber || !/^\d+$/.test(cardNumber)) {
          Swal.showValidationMessage('New card number must contain decimal digits only.')
          return false
        }

        try {
          await enrollmentAPI.replaceCard(assignmentId, {
            cardType,
            notes: notes || undefined,
            cardNumber,
          })

          return { assignmentId, cardNumber }
        } catch (error) {
          Swal.showValidationMessage(getErrorMessage(error))
          return false
        }
      }
    })

    if (result.isConfirmed) {
      await refreshCardDetailsData()
      await showSwalToast('success', 'Card replaced successfully')
    }
  }

  const handleInlineHistory = async (card) => {
    const employeeId = String(card?.employeeId || getKnownEmployeeId(selectedUserForCard) || '').trim()

    if (!employeeId) {
      await Swal.fire({
        icon: 'info',
        title: 'History unavailable',
        text: 'This card does not have a linked employee history to display yet.',
        buttonsStyling: false,
        customClass: {
          popup: 'users-swal-popup',
          confirmButton: 'btn btn-primary'
        }
      })
      return
    }

    Swal.fire({
      title: 'Loading card history…',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading()
      },
      showConfirmButton: false,
      customClass: {
        popup: 'users-swal-popup'
      }
    })

    try {
      const res = await enrollmentAPI.getCardHistory(employeeId)
      const history = res.data?.data || []
      const historyMarkup = history.length > 0
        ? history.map((entry) => `
            <article class="users-history-card">
              <div class="users-history-header">
                <strong>${escapeHtml(entry.cardType || 'Card')}</strong>
                <span class="users-history-status ${escapeHtml(String(entry.status || 'unknown').toLowerCase())}">${escapeHtml(entry.status || 'unknown')}</span>
              </div>
              <div class="users-history-grid">
                <div>
                  <span>Card Number</span>
                  <code>${escapeHtml(decodeHexCardData(entry.cardData).decimal)}</code>
                </div>
                <div>
                  <span>Assigned</span>
                  <strong>${escapeHtml(entry.assignedAt ? new Date(entry.assignedAt).toLocaleString() : '—')}</strong>
                </div>
                <div>
                  <span>Revoked</span>
                  <strong>${escapeHtml(entry.revokedAt ? new Date(entry.revokedAt).toLocaleString() : '—')}</strong>
                </div>
                <div>
                  <span>Notes</span>
                  <strong>${escapeHtml(entry.notes || '—')}</strong>
                </div>
              </div>
            </article>
          `).join('')
        : '<p class="users-swal-empty">No card history found for this employee.</p>'

      Swal.fire({
        title: `Card History — ${escapeHtml(employeeId)}`,
        width: 960,
        confirmButtonText: 'Close',
        buttonsStyling: false,
        customClass: {
          popup: 'users-swal-popup users-swal-popup-wide',
          confirmButton: 'btn btn-secondary'
        },
        html: `<div class="users-history-list">${historyMarkup}</div>`
      })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Failed to load history',
        text: getErrorMessage(error),
        buttonsStyling: false,
        customClass: {
          popup: 'users-swal-popup',
          confirmButton: 'btn btn-primary'
        }
      })
    }
  }

  const handleInlineRevoke = async (card) => {
    const assignmentId = getPersistedAssignmentId(card)

    if (!assignmentId) {
      await Swal.fire({
        icon: 'info',
        title: 'Assignment unavailable',
        text: 'This card must be saved in the database before it can be revoked.',
        buttonsStyling: false,
        customClass: {
          popup: 'users-swal-popup',
          confirmButton: 'btn btn-primary'
        }
      })
      return
    }

    const result = await Swal.fire({
      title: 'Revoke Card?',
      width: 680,
      showCancelButton: true,
      confirmButtonText: 'Revoke Card',
      cancelButtonText: 'Cancel',
      buttonsStyling: false,
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading(),
      customClass: {
        popup: 'users-swal-popup',
        confirmButton: 'btn btn-danger',
        cancelButton: 'btn btn-secondary'
      },
      html: `
        <div class="users-swal-form">
          <p class="users-swal-note">This will revoke card <strong>${escapeHtml(getCardDisplayValue(card))}</strong> and keep you on the current page.</p>
          <label class="users-swal-field users-swal-field-full">
            <span>Reason</span>
            <textarea id="swal-revoke-reason" class="swal2-textarea" placeholder="Optional reason for revocation"></textarea>
          </label>
        </div>
      `,
      preConfirm: async () => {
        const reason = document.getElementById('swal-revoke-reason')?.value.trim() || ''

        try {
          await enrollmentAPI.revokeCard(assignmentId, reason)
          return { assignmentId, reason }
        } catch (error) {
          Swal.showValidationMessage(getErrorMessage(error))
          return false
        }
      }
    })

    if (result.isConfirmed) {
      await refreshCardDetailsData()
      await showSwalToast('success', 'Card revoked successfully')
    }
  }

  const handleInlineDeleteCard = async (card) => {
    const assignmentId = getPersistedAssignmentId(card)

    if (!assignmentId) {
      await Swal.fire({
        icon: 'info',
        title: 'Assignment unavailable',
        text: 'This card must be saved in the database before it can be deleted.',
        buttonsStyling: false,
        customClass: {
          popup: 'users-swal-popup',
          confirmButton: 'btn btn-primary'
        }
      })
      return
    }

    const activeEnrollments = getActiveEnrollmentCount(card)
    if (card.status === 'active' || activeEnrollments > 0) {
      await Swal.fire({
        icon: 'info',
        title: 'Delete unavailable',
        text: 'Only inactive cards with no active device enrollments can be deleted permanently. Revoke and remove the card from devices first.',
        buttonsStyling: false,
        customClass: {
          popup: 'users-swal-popup',
          confirmButton: 'btn btn-primary'
        }
      })
      return
    }

    const result = await Swal.fire({
      title: 'Delete Card Permanently?',
      text: 'This removes the card assignment from the database history. This action cannot be undone.',
      icon: 'warning',
      width: 680,
      showCancelButton: true,
      confirmButtonText: 'Delete Permanently',
      cancelButtonText: 'Cancel',
      buttonsStyling: false,
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading(),
      customClass: {
        popup: 'users-swal-popup',
        confirmButton: 'btn btn-danger',
        cancelButton: 'btn btn-secondary'
      },
      preConfirm: async () => {
        try {
          await enrollmentAPI.deleteCard(assignmentId)
          return { assignmentId }
        } catch (error) {
          Swal.showValidationMessage(getErrorMessage(error))
          return false
        }
      }
    })

    if (result.isConfirmed) {
      await refreshCardDetailsData()
      await showSwalToast('success', 'Card deleted permanently')
    }
  }

  const toggleCardDeviceSelection = (deviceId) => {
    const normalizedId = String(deviceId)
    setCardDeviceSelectedIds((currentIds) => currentIds.includes(normalizedId)
      ? currentIds.filter((id) => id !== normalizedId)
      : [...currentIds, normalizedId])
  }

  const openCardDeviceSelector = async (card, action) => {
    const assignmentId = getPersistedAssignmentId(card)

    if (!assignmentId) {
      await Swal.fire({
        icon: 'info',
        title: 'Assignment unavailable',
        text: 'This card must be saved in the database before it can be pushed to or removed from devices.',
        buttonsStyling: false,
        customClass: {
          popup: 'users-swal-popup',
          confirmButton: 'btn btn-primary'
        }
      })
      return
    }

    if (connectedDevices.length === 0) {
      await Swal.fire({
        icon: 'info',
        title: 'No active devices',
        text: 'Connect at least one active device before updating card enrollment.',
        buttonsStyling: false,
        customClass: {
          popup: 'users-swal-popup',
          confirmButton: 'btn btn-primary'
        }
      })
      return
    }

    setShowCardDeviceModal(true)
    setCardDeviceAction(action)
    setCardDeviceTarget({ ...card, id: assignmentId })
    setCardDeviceOptions([])
    setCardDeviceSelectedIds([])
    setCardDeviceLoading(true)

    try {
      const res = await enrollmentAPI.getCardEnrollments(assignmentId)
      const enrollments = Array.isArray(res.data?.data || res.data) ? (res.data?.data || res.data) : []
      const activeEnrollmentIds = new Set(
        enrollments
          .filter((enrollment) => enrollment?.status === 'active')
          .map((enrollment) => String(enrollment.deviceId))
      )

      const nextOptions = connectedDevices
        .map((device) => ({
          ...device,
          alreadyEnrolled: activeEnrollmentIds.has(String(device.id))
        }))
        .filter((device) => action === 'remove' ? device.alreadyEnrolled : true)

      if (action === 'remove' && nextOptions.length === 0) {
        closeCardDeviceModal()
        await Swal.fire({
          icon: 'info',
          title: 'Nothing to remove',
          text: 'This card is not currently pushed to any active device.',
          buttonsStyling: false,
          customClass: {
            popup: 'users-swal-popup',
            confirmButton: 'btn btn-primary'
          }
        })
        return
      }

      const nextSelections = action === 'remove'
        ? nextOptions.map((device) => String(device.id))
        : nextOptions.filter((device) => !device.alreadyEnrolled).map((device) => String(device.id))

      if (action === 'enroll' && nextSelections.length === 0) {
        closeCardDeviceModal()
        await Swal.fire({
          icon: 'info',
          title: 'Already pushed everywhere',
          text: 'This card is already enrolled on all active devices.',
          buttonsStyling: false,
          customClass: {
            popup: 'users-swal-popup',
            confirmButton: 'btn btn-primary'
          }
        })
        return
      }

      setCardDeviceOptions(nextOptions)
      setCardDeviceSelectedIds(nextSelections)
    } catch (error) {
      closeCardDeviceModal()
      await Swal.fire({
        icon: 'error',
        title: 'Failed to load active devices',
        text: getErrorMessage(error),
        buttonsStyling: false,
        customClass: {
          popup: 'users-swal-popup',
          confirmButton: 'btn btn-primary'
        }
      })
    } finally {
      setCardDeviceLoading(false)
    }
  }

  const handleCardDeviceExecute = async () => {
    if (!cardDeviceTarget || cardDeviceSelectedIds.length === 0) {
      return
    }

    const assignmentId = getPersistedAssignmentId(cardDeviceTarget)

    if (!assignmentId) {
      return
    }

    setCardDeviceRunning(true)

    try {
      if (cardDeviceAction === 'enroll') {
        const normalizedDeviceIds = cardDeviceSelectedIds
          .map((deviceId) => parseInt(deviceId, 10))
          .filter((deviceId) => !Number.isNaN(deviceId))

        if (normalizedDeviceIds.length === 0) {
          throw new Error('No valid device IDs were selected.')
        }

        const res = await enrollmentAPI.enrollOnMultipleDevices(normalizedDeviceIds, assignmentId)
        const enrollmentResult = res.data?.data || {}
        const successful = Array.isArray(enrollmentResult.successful) ? enrollmentResult.successful : []
        const failed = Array.isArray(enrollmentResult.failed) ? enrollmentResult.failed : []
        const successCount = successful.length

        if (successCount === 0) {
          throw new Error(res.data?.message || failed[0]?.error || 'Failed to push this card to the selected devices.')
        }

        closeCardDeviceModal()
        await refreshCardDetailsData()
        await showSwalToast(failed.length > 0 ? 'warning' : 'success', `Card pushed to ${successCount}/${normalizedDeviceIds.length} device(s)`)
        return
      }

      const results = await Promise.allSettled(
        cardDeviceSelectedIds.map((deviceId) => enrollmentAPI.removeFromDevice(deviceId, assignmentId))
      )

      const successCount = results.filter((result) => result.status === 'fulfilled').length

      if (successCount === 0) {
        throw results.find((result) => result.status === 'rejected')?.reason || new Error('Failed to remove the card from selected devices.')
      }

      closeCardDeviceModal()
      await refreshCardDetailsData()
      await showSwalToast(successCount < cardDeviceSelectedIds.length ? 'warning' : 'success', `Card removed from ${successCount}/${cardDeviceSelectedIds.length} device(s)`)
    } catch (error) {
      await Swal.fire({
        icon: 'error',
        title: cardDeviceAction === 'enroll' ? 'Failed to push card' : 'Failed to remove card',
        text: getErrorMessage(error),
        buttonsStyling: false,
        customClass: {
          popup: 'users-swal-popup',
          confirmButton: 'btn btn-primary'
        }
      })
    } finally {
      setCardDeviceRunning(false)
    }
  }

  const handleCopyCardNumber = async (card) => {
    const cardNumber = getCardNumberForAssignment(card)

    if (!cardNumber) {
      await Swal.fire({
        icon: 'info',
        title: 'Card number unavailable',
        text: 'This card does not expose a copyable decimal number yet.',
        buttonsStyling: false,
        customClass: {
          popup: 'users-swal-popup',
          confirmButton: 'btn btn-primary'
        }
      })
      return
    }

    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(cardNumber)
      } else {
        const input = document.createElement('textarea')
        input.value = cardNumber
        input.setAttribute('readonly', '')
        input.style.position = 'absolute'
        input.style.left = '-9999px'
        document.body.appendChild(input)
        input.select()
        const copied = document.execCommand('copy')
        document.body.removeChild(input)

        if (!copied) {
          throw new Error('Copy command was rejected')
        }
      }

      await showSwalToast('success', `Card number ${cardNumber} copied`)
    } catch (copyError) {
      console.error('Failed to copy card number:', copyError)
      await Swal.fire({
        icon: 'error',
        title: 'Copy failed',
        text: 'Failed to copy the card number.',
        buttonsStyling: false,
        customClass: {
          popup: 'users-swal-popup',
          confirmButton: 'btn btn-primary'
        }
      })
    }
  }

  const handleViewCard = (user) => {
    setSelectedUserForCard(user)
    setShowCardModal(true)
  }

  const openAssignmentsForUser = (userOrId) => {
    const employeeId = getKnownEmployeeId(userOrId)

    if (!employeeId && typeof userOrId === 'object') {
      const fallbackCard = getPrimaryDeviceCard(userOrId) || getPrimaryDatabaseCard(userOrId)
      if (fallbackCard) {
        openCreateAssignment(userOrId, fallbackCard, {
          includeCardData: true,
          notes: 'Opened from Users as an unknown card review.'
        })
        return
      }
    }

    if (!employeeId) {
      navigate('/card-assignments')
      return
    }

    navigate(`/card-assignments?employeeId=${encodeURIComponent(employeeId)}`)
  }

  useEffect(() => {
    if (!showCardModal || !selectedUserForCard) {
      return
    }

    const currentUserId = String(selectedUserForCard.userID || '')
    const currentEmployeeId = getKnownEmployeeId(selectedUserForCard)

    const refreshedUser = users.find((user) => {
      const nextEmployeeId = getKnownEmployeeId(user)
      return (currentEmployeeId && nextEmployeeId === currentEmployeeId) || String(user.userID || '') === currentUserId
    })

    if (refreshedUser && refreshedUser !== selectedUserForCard) {
      setSelectedUserForCard(refreshedUser)
    }
  }, [showCardModal, selectedUserForCard, users])

  const filteredUsers = users.filter(u => {
    const searchLower = searchTerm.toLowerCase()
    const deviceStatus = getCachedUserDeviceStatus(selectedDevice, u.userID)

    if (showDriftOnly && !showAllUsers && !isDriftDeviceStatus(deviceStatus?.status)) {
      return false
    }

    if (!searchLower) return true;
    
    if (u.userID?.toLowerCase().includes(searchLower)) return true;
    if (u.name?.toLowerCase().includes(searchLower)) return true;

    // Check device card arrays or pre-fetched cardData
    if (u.cardData && decodeHexCardData(u.cardData).decimal.includes(searchLower)) return true;
    if (u.cardDecimal && String(u.cardDecimal).includes(searchLower)) return true;
    if (u.cardsList && u.cardsList.length > 0 && decodeCardData(u.cardsList[0].data).decimal.includes(searchLower)) return true;
    if (u.cards && u.cards.some(card =>
      String(card.cardDecimal || '').includes(searchLower) ||
      String(card.cardData || '').toLowerCase().includes(searchLower) ||
      String(card.rawCardData || '').toLowerCase().includes(searchLower)
    )) return true;
    
    // Check locally-loaded card assignments
    const cardAssign = getCardAssignment(u.userID);
    if (cardAssign && decodeHexCardData(cardAssign.cardData).decimal.includes(searchLower)) return true;

    return false;
  })

  useEffect(() => {
    const visibleUserIds = new Set(filteredUsers.map((user) => String(user.userID || '')))

    setSelectedUsers((prev) => {
      const next = prev.filter((userId) => visibleUserIds.has(String(userId || '')))
      return next.length === prev.length ? prev : next
    })
  }, [filteredUsers])

  const checkedUserCount = !showAllUsers && selectedDevice
    ? users.reduce((count, user) => count + (getCachedUserDeviceStatus(selectedDevice, user.userID) ? 1 : 0), 0)
    : 0

  const driftedUserCount = !showAllUsers && selectedDevice
    ? users.reduce((count, user) => {
        const statusEntry = getCachedUserDeviceStatus(selectedDevice, user.userID)
        return count + (isDriftDeviceStatus(statusEntry?.status) ? 1 : 0)
      }, 0)
    : 0

  const selectedDeviceEmptyMessage = showDriftOnly
    ? checkedUserCount === 0
      ? 'No users checked yet. Use Check Device first.'
      : searchTerm
        ? 'No drifted users match your search'
        : 'No drifted users found in checked rows'
    : searchTerm
      ? 'No users match your search'
      : 'No users on this device'

  const handleToggleDriftOnly = () => {
    setShowDriftOnly((prev) => !prev)
    setSelectedUsers([])
  }

  const connectedDevices = devices.filter((device) => isDeviceOnline(device))
  const canUseGridView = !!selectedDevice && !showAllUsers
  const selectedDatabaseCards = selectedUserForCard ? getDatabaseCards(selectedUserForCard) : []
  const selectedEnrolledDeviceCount = selectedDatabaseCards.reduce((count, card) => {
    const activeEnrollments = Array.isArray(card.enrolledDevices)
      ? card.enrolledDevices.filter((enrollment) => enrollment?.status === 'active')
      : []
    return count + activeEnrollments.length
  }, 0)
  const selectedDeviceCard = getPrimaryDeviceCard(selectedUserForCard)
  const selectedEmployeeId = getKnownEmployeeId(selectedUserForCard)
  const selectedAssignmentSeedCard = selectedDeviceCard || (!selectedEmployeeId ? selectedDatabaseCards[0] : null)
  const selectedAssignmentActionLabel = selectedDeviceCard
    ? '➕ Save Card'
    : selectedEmployeeId
      ? '➕ Add Card'
      : '➕ Assign Card'

  return (
    <div className="page users-page">
      <div className="page-header">
        <h2>👥 Users & Cards</h2>
        <div className="view-toggle" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          
          
          <div className="divider" style={{ width: '1px', height: '24px', background: '#ccc', margin: '0 8px' }}></div>
          <button 
            className={`btn btn-sm ${viewMode === 'table' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setViewMode('table')}
          >
            📋 Table
          </button>
          <button 
            className={`btn btn-sm ${viewMode === 'grid' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setViewMode('grid')}
            disabled={!canUseGridView}
            title={canUseGridView ? 'Switch to grid view' : 'Grid view is available when a device is selected'}
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
              const nextDeviceId = e.target.value
              setSelectedDevice(nextDeviceId)
              setSelectedUsers([])
              setShowAllUsers(!nextDeviceId)
            }} 
            className="form-control device-select"
          >
            <option value="">-- Select online device --</option>
            {!hasOnlineDevices && (
              <option value="" disabled>No online devices available</option>
            )}
            {hasOnlineDevices && (
              <optgroup label="Online Devices">
                {onlineDevices.map(d => (
                  <option key={d.id} value={d.id}>
                    {formatDeviceOptionLabel(d)}
                  </option>
                ))}
              </optgroup>
            )}
            {offlineDevices.length > 0 && (
              <optgroup label="Registered but Offline">
                {offlineDevices.map(d => (
                  <option key={d.id} value={d.id} disabled>
                    {formatDeviceOptionLabel(d)}
                  </option>
                ))}
              </optgroup>
            )}
          </select>
          
          {/* Data Source Toggle */}
          <div className="source-toggle">
            <label>Data Source:</label>
            <select value="database" className="form-control" disabled>
              <option value="database">💾 Database (Centralized)</option>
            </select>
          </div>
          
          <div className="sync-buttons">
            <button 
              onClick={handleSyncAll} 
              className="btn btn-primary"
              disabled={syncing || connectedDevices.length === 0}
              title="Push database users to all connected devices"
            >
              {syncing ? '⏳' : '🔁'} Sync All Devices
            </button>
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
              {syncing ? '⏳' : '📤'} Push to Device
            </button>
          </div>
        </div>
        {!hasOnlineDevices && <p className="hint" style={{ marginTop: 10 }}>No online devices available. Registered offline devices are shown in the selector for reference.</p>}
        {!hasOnlineDevices && (
          <div className="offline-actions">
            <button className="btn btn-secondary btn-sm" onClick={() => navigate('/devices')}>🖥️ Manage Devices</button>
            <button className="btn btn-secondary btn-sm" onClick={() => navigate('/health')}>🏥 Check Health</button>
          </div>
        )}
        
        {/* Info Banner */}
        <div className="info-banner">
          <strong>💾 Database is the source of truth.</strong> 
          {selectedDevice
            ? ' Showing database users assigned to the selected device.'
            : ' Showing users from centralized database.'}
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
            <h3>📋 Database Users ({totalUsers})</h3>
            <div className="card-actions">
              <input
                type="search"
                placeholder="🔍 Search employee, name, or card..."
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
              <button onClick={() => openCreateAssignment()} className="btn btn-success btn-sm">
                ➕ Assign Card
              </button>
              <button onClick={() => navigate('/card-assignments')} className="btn btn-primary btn-sm">
                💳 Manage Assignments
              </button>
              <button onClick={() => navigate('/employees')} className="btn btn-secondary btn-sm">
                👤 Employees
              </button>
              <button onClick={loadAllUsers} className="btn btn-secondary btn-sm" disabled={loading}>🔄 Refresh</button>
            </div>
          </div>
          <p className="users-overview-note">
            Users are grouped by employee from the centralized database. Missing names are shown as Unknown, and <strong>Cards</strong> opens every assignment stored for that employee.
          </p>

          {loading ? (
            <div className="loading-state"><div className="spinner"></div><p>Loading users...</p></div>
          ) : users.length === 0 ? (
            <div className="empty-state"><p>👤 No users found.</p></div>
          ) : (
            <>
              {selectedUsers.length > 0 && (
                <div className="batch-actions">
                  <span>
                    {selectedUsers.length} user{selectedUsers.length !== 1 ? 's' : ''} selected
                    {selectedUsers.length < totalUsers && ` (${users.length < totalUsers ? 'this page' : 'all'})`}
                    {selectedUsers.length === totalUsers && totalUsers > 0 && ' (all)'}
                  </span>
                  <button onClick={() => openBulkAction('enroll')} className="btn btn-primary btn-sm">
                    📟 Enroll on Devices
                  </button>
                  <button onClick={() => setSelectedUsers([])} className="btn btn-secondary btn-sm">
                    ✖ Clear
                  </button>
                </div>
              )}
              <table className="users-table">
                <thead>
                  <tr>
                    <th>
                      <input
                        type="checkbox"
                        checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                        onChange={toggleSelectAll}
                        title="Select all visible users"
                      />
                    </th>
                    <th>Employee ID</th>
                    <th>User ID</th>
                    <th>Code</th>
                    <th>Name</th>
                    <th>Cards</th>
                    <th>Status</th>
                    <th>Enrolled Devices</th>
                    <th>Last Updated</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                    {users.map(u => {
                      const primaryDatabaseCard = getPrimaryDatabaseCard(u)
                      const employeeId = getKnownEmployeeId(u)
                      const canOpenEmployee = Boolean(employeeId)
                      const canCreateAssignment = Boolean(employeeId || primaryDatabaseCard)
                      const assignmentButtonLabel = !employeeId && primaryDatabaseCard ? '➕ Assign Card' : '➕ Add Card'
                      const relevantEnrollments = getRelevantEnrollments(u.enrolledDevices || [])
                      const enrolledDeviceTitle = relevantEnrollments
                        .map((device) => device.deviceName || `Device ${device.deviceId}`)
                        .join(', ')

                      return (
                      <tr key={u.userID + (primaryDatabaseCard?.id || '')} className={selectedUsers.includes(u.userID) ? 'selected-row' : ''}>
                        <td data-label="Select">
                          <input
                            type="checkbox"
                            checked={selectedUsers.includes(u.userID)}
                            onChange={() => toggleUserSelection(u.userID)}
                          />
                        </td>
                        <td data-label="Employee ID"><code>{u.userID}</code></td>
                        <td data-label="User ID"><code>{u.userId ?? '—'}</code></td>
                        <td data-label="Code">{u.code || '—'}</td>
                        <td data-label="Name">
                          <div className="user-name-cell">
                            <span>{u.name || 'Unknown'}</span>
                            {u.isUnknown && <span className="badge badge-warning unknown-name-badge">Unknown</span>}
                          </div>
                        </td>
                        <td data-label="Cards">
                          <div className="user-card-summary">
                            <div className="card-summary-header">
                              <span className="badge badge-secondary">{u.cardCount || 0} card{u.cardCount === 1 ? '' : 's'}</span>
                              {(u.activeCardCount || 0) > 0 && (u.activeCardCount || 0) !== (u.cardCount || 0) && (
                                <span className="badge badge-warning">{u.activeCardCount} active</span>
                              )}
                            </div>
                            {primaryDatabaseCard ? (
                              <div className="card-summary-number">
                                <span>Primary</span>
                                <code>{getCardDisplayValue(primaryDatabaseCard)}</code>
                              </div>
                            ) : (
                              <span className="card-summary-empty">No card data</span>
                            )}
                          </div>
                        </td>
                        <td data-label="Status">
                          <span className={`badge badge-${getUserStatusTone(u)}`}>
                            {u.statusSummaryLabel || u.status || 'Unknown'}
                          </span>
                        </td>
                        <td data-label="Enrolled Devices" title={enrolledDeviceTitle || 'No active device assignments'}>
                          {getEnrolledDeviceSummary(relevantEnrollments)}
                        </td>
                        <td data-label="Last Updated">{u.assignedAt ? new Date(u.assignedAt).toLocaleString() : '—'}</td>
                        <td data-label="Actions" className="action-buttons table-action-buttons">
                          <button
                            className="btn btn-sm btn-info"
                            onClick={() => handleViewCard(u)}
                            disabled={(u.cardCount || 0) === 0}
                            title={(u.cardCount || 0) > 0 ? 'Review all stored cards for this employee' : 'No stored card data'}
                          >
                            🎫 Cards{u.cardCount > 1 ? ` (${u.cardCount})` : ''}
                          </button>
                          <button
                            className="btn btn-sm btn-secondary"
                            onClick={() => openAssignmentsForUser(u)}
                            title="Open card assignments for this employee"
                          >
                            💳 Assignments
                          </button>
                          {canCreateAssignment && (
                            <button
                              className="btn btn-sm btn-primary"
                              onClick={() => openCreateAssignment(u, !employeeId ? primaryDatabaseCard : null, {
                                includeCardData: !employeeId && Boolean(primaryDatabaseCard),
                                notes: !employeeId ? 'Opened from Users as an unknown card review.' : ''
                              })}
                              title={!employeeId && primaryDatabaseCard ? 'Assign this unowned card to an employee' : 'Create another card assignment for this employee'}
                            >
                              {assignmentButtonLabel}
                            </button>
                          )}
                          {canOpenEmployee && (
                            <button
                              className="btn btn-sm btn-secondary"
                              onClick={() => openEmployeeDirectory(u)}
                              title="Open this employee in the employee directory"
                            >
                              👤 Employee
                            </button>
                          )}
                        </td>
                      </tr>
                    )})}
                  </tbody>
                </table>
              <div className="batch-actions" style={{ justifyContent: 'center', marginTop: 8 }}>
                {pageSize !== 'all' && totalPages > 1 && (
                  <>
                    <button className="btn btn-sm btn-secondary" disabled={page === 1} onClick={() => setPage(p => p - 1)}>‹ Prev</button>
                    <span>Page {page} / {totalPages} ({totalUsers} total)</span>
                    <button className="btn btn-sm btn-secondary" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>Next ›</button>
                    <span style={{ borderLeft: '1px solid #ddd', margin: '0 4px' }} />
                  </>
                )}
                <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.85rem', color: '#555' }}>
                  Rows per page:
                  <select
                    value={pageSize}
                    onChange={e => { setPageSize(e.target.value === 'all' ? 'all' : Number(e.target.value)); setPage(1) }}
                    style={{ padding: '2px 6px', borderRadius: 4, border: '1px solid #ccc', fontSize: '0.85rem' }}
                  >
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                    <option value="all">All</option>
                  </select>
                </label>
                {pageSize === 'all' && <span style={{ fontSize: '0.82rem', color: '#888' }}>Showing all {totalUsers} users</span>}
              </div>
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
              <h3>📋 Database Users for Selected Device ({filteredUsers.length})</h3>
              <div className="card-actions">
                <input 
                  type="search"
                  placeholder="🔍 Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
                <button
                  onClick={handleToggleDriftOnly}
                  className={`btn btn-sm users-drift-toggle ${showDriftOnly ? 'active' : ''}`}
                  title="Show only checked users with device drift"
                >
                  ⚠ Drift Only{driftedUserCount > 0 ? ` (${driftedUserCount})` : ''}
                </button>
                <span className="users-filter-hint">
                  {checkedUserCount > 0 ? `${checkedUserCount} checked` : 'Filters checked rows only'}
                </span>
                <button onClick={loadUsers} className="btn btn-secondary btn-sm" disabled={loading}>
                  🔄
                </button>
                <button onClick={() => openCreateAssignment()} className="btn btn-success btn-sm">
                  ➕ Assign Card
                </button>
                <button onClick={() => navigate('/card-assignments')} className="btn btn-secondary btn-sm">
                  💳 Assignments
                </button>
                <button onClick={() => navigate('/employees')} className="btn btn-secondary btn-sm">
                  👤 Employees
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
                <p>👤 {selectedDeviceEmptyMessage}</p>
              </div>
            ) : viewMode === 'table' ? (
              <div className="users-table-wrapper">
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
                      <th>Device Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map(u => {
                      const databaseCards = getDatabaseCards(u)
                      const primaryDatabaseCard = databaseCards[0] || null
                      const primaryDeviceCard = getPrimaryDeviceCard(u)
                      const employeeId = getKnownEmployeeId(u)
                      const canOpenEmployee = Boolean(employeeId)
                      const canCreateAssignment = Boolean(primaryDeviceCard || employeeId)
                      const checkActionKey = `check:${selectedDevice}:${u.userID}`
                      const repairActionKey = `repair:${selectedDevice}:${u.userID}`
                      // Check if user has card from device data or from database
                      const hasDeviceCard = u.hasCard || (u.cardsList && u.cardsList.length > 0)
                      const hasCard = hasDeviceCard || primaryDatabaseCard
                      
                      // Get decoded card number for tooltip
                      let cardTooltip = 'No card'
                      if (hasDeviceCard && u.cardsList && u.cardsList.length > 0) {
                        const decoded = decodeCardData(u.cardsList[0].data)
                        cardTooltip = `Card: ${decoded.decimal}`
                      } else if (primaryDatabaseCard) {
                        cardTooltip = `Card: ${getCardDisplayValue(primaryDatabaseCard)}`
                        if (databaseCards.length > 1) {
                          cardTooltip += ` (${databaseCards.length} cards in database)`
                        }
                      }
                      
                      return (
                        <tr key={u.userID} className={selectedUsers.includes(u.userID) ? 'selected-row' : ''}>
                          <td data-label="Select">
                            <input 
                              type="checkbox"
                              checked={selectedUsers.includes(u.userID)}
                              onChange={() => toggleUserSelection(u.userID)}
                            />
                          </td>
                          <td data-label="User ID">
                            <code>{u.userID}</code>
                          </td>
                          <td data-label="Name">{u.name || 'N/A'}</td>
                          <td data-label="Card">
                            {hasDeviceCard ? (
                              <span className="badge badge-success" title={cardTooltip}>
                                🎫 {u.cardsList && u.cardsList.length > 0 ? decodeCardData(u.cardsList[0].data).decimal : 'Card'}
                              </span>
                            ) : primaryDatabaseCard ? (
                              <span className="badge badge-warning" title={cardTooltip}>
                                🎫 {getCardDisplayValue(primaryDatabaseCard)}{databaseCards.length > 1 ? ` +${databaseCards.length - 1}` : ''}
                              </span>
                            ) : (
                              <span className="badge badge-secondary">No Card</span>
                            )}
                          </td>
                          <td data-label="Device Status" className="device-check-cell">
                            {renderUserDeviceStatus(u)}
                          </td>
                          <td data-label="Actions" className="action-buttons">
                            {hasCard && (
                              <button 
                                className="btn btn-sm btn-info"
                                onClick={() => handleViewCard(u)}
                                title="View Card"
                              >
                                🎫 Card
                              </button>
                            )}
                            <button
                              className="btn btn-sm btn-secondary"
                              onClick={() => openAssignmentsForUser(u)}
                              title="Open card assignments"
                            >
                              💳 Assignments
                            </button>
                            <button
                              className="btn btn-sm btn-secondary"
                              onClick={() => handleCheckUserOnDevice(u)}
                              disabled={userDeviceActionKey === checkActionKey || userDeviceActionKey === repairActionKey}
                              title="Check this user against the selected device"
                            >
                              {userDeviceActionKey === checkActionKey ? 'Checking…' : '🔎 Check Device'}
                            </button>
                            <button
                              className="btn btn-sm btn-warning"
                              onClick={() => handleRepairUserOnDevice(u)}
                              disabled={userDeviceActionKey === repairActionKey || userDeviceActionKey === checkActionKey}
                              title="Repair this user on the selected device"
                            >
                              {userDeviceActionKey === repairActionKey ? 'Repairing…' : '🛠 Repair'}
                            </button>
                            {canCreateAssignment && (
                              <button
                                className="btn btn-sm btn-primary"
                                onClick={() => openCreateAssignment(u, primaryDeviceCard, {
                                  includeCardData: Boolean(primaryDeviceCard),
                                  notes: primaryDeviceCard ? 'Prefilled from a live device card on the Users page.' : ''
                                })}
                                title={primaryDeviceCard ? 'Create a database assignment from this live device card' : 'Create a new assignment for this employee'}
                              >
                                {primaryDeviceCard ? '➕ Save Card' : '➕ Add Card'}
                              </button>
                            )}
                            {canOpenEmployee && (
                              <button
                                className="btn btn-sm btn-secondary"
                                onClick={() => openEmployeeDirectory(u)}
                                title="Open this employee in the employee directory"
                              >
                                👤 Employee
                              </button>
                            )}
                            <button 
                              className="btn btn-sm btn-danger"
                              onClick={() => handleDelete(u.userID)}
                              title="Delete from selected device"
                            >
                              🗑️ Delete
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="users-grid">
                {filteredUsers.map(u => {
                  const databaseCards = getDatabaseCards(u)
                  const primaryDatabaseCard = databaseCards[0] || null
                  const primaryDeviceCard = getPrimaryDeviceCard(u)
                  const employeeId = getKnownEmployeeId(u)
                  const hasDeviceCard = u.hasCard || (u.cardsList && u.cardsList.length > 0)
                  const hasCard = hasDeviceCard || primaryDatabaseCard
                  const canCreateAssignment = Boolean(primaryDeviceCard || employeeId)
                  const checkActionKey = `check:${selectedDevice}:${u.userID}`
                  const repairActionKey = `repair:${selectedDevice}:${u.userID}`
                  const visibleCard = hasDeviceCard && u.cardsList && u.cardsList.length > 0
                    ? decodeCardData(u.cardsList[0].data)
                    : primaryDatabaseCard
                      ? { decimal: `${getCardDisplayValue(primaryDatabaseCard)}${databaseCards.length > 1 ? ` +${databaseCards.length - 1}` : ''}` }
                      : null
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
                        {visibleCard && (
                          <div className="user-card-badge" title={`Card: ${visibleCard.decimal}`}>
                            🎫 {visibleCard.decimal}
                          </div>
                        )}
                        {renderUserDeviceStatus(u)}
                      </div>
                      <div className="user-card-actions">
                        {hasCard && (
                          <button
                            className="btn btn-sm btn-info"
                            onClick={(e) => { e.stopPropagation(); handleViewCard(u) }}
                            title="View Card"
                          >
                            🎫 Card
                          </button>
                        )}
                        <button
                          className="btn btn-sm btn-secondary"
                          onClick={(e) => { e.stopPropagation(); openAssignmentsForUser(u) }}
                          title="Open card assignments"
                        >
                          💳 Assign
                        </button>
                        <button
                          className="btn btn-sm btn-secondary"
                          onClick={(e) => { e.stopPropagation(); handleCheckUserOnDevice(u) }}
                          disabled={userDeviceActionKey === checkActionKey || userDeviceActionKey === repairActionKey}
                          title="Check this user against the selected device"
                        >
                          {userDeviceActionKey === checkActionKey ? 'Checking…' : '🔎 Check'}
                        </button>
                        <button
                          className="btn btn-sm btn-warning"
                          onClick={(e) => { e.stopPropagation(); handleRepairUserOnDevice(u) }}
                          disabled={userDeviceActionKey === repairActionKey || userDeviceActionKey === checkActionKey}
                          title="Repair this user on the selected device"
                        >
                          {userDeviceActionKey === repairActionKey ? 'Repairing…' : '🛠 Repair'}
                        </button>
                        {canCreateAssignment && (
                          <button
                            className="btn btn-sm btn-primary"
                            onClick={(e) => {
                              e.stopPropagation()
                              openCreateAssignment(u, primaryDeviceCard, {
                                includeCardData: Boolean(primaryDeviceCard),
                                notes: primaryDeviceCard ? 'Prefilled from a live device card on the Users page.' : ''
                              })
                            }}
                            title={primaryDeviceCard ? 'Create a database assignment from this live device card' : 'Create a new assignment for this employee'}
                          >
                            {primaryDeviceCard ? '➕ Save' : '➕ Add'}
                          </button>
                        )}
                        {employeeId && (
                          <button
                            className="btn btn-sm btn-secondary"
                            onClick={(e) => { e.stopPropagation(); openEmployeeDirectory(u) }}
                            title="Open this employee in the employee directory"
                          >
                            👤 Emp
                          </button>
                        )}
                        <button 
                          className="btn btn-sm btn-danger user-delete"
                          onClick={(e) => { e.stopPropagation(); handleDelete(u.userID) }}
                          title="Delete from selected device"
                        >
                          🗑️ Delete
                        </button>
                      </div>
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
          <div className="modal-content card-details-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header card-details-header">
              <div className="card-details-header-main">
                <span className="card-details-kicker">Users</span>
                <h3>🎫 Card Details</h3>
                <p>Review live device cards and stored assignments for this user in one place.</p>
              </div>
              <button className="btn-close" onClick={() => setShowCardModal(false)}>×</button>
            </div>
            <div className="modal-body card-details-body">
              <div className="card-details-summary">
                <div className="card-details-identity">
                  <span className="card-details-label">User</span>
                  <strong>{selectedUserForCard.name || 'Unknown'}</strong>
                  <div className="card-details-meta-row">
                    <span className="card-details-id">ID {selectedUserForCard.userID}</span>
                    <span className={`card-details-state ${selectedEmployeeId ? 'is-linked' : 'is-unmatched'}`}>
                      {selectedEmployeeId ? 'Employee linked' : 'Needs assignment review'}
                    </span>
                  </div>
                </div>
                <div className="card-details-stats" aria-label="Card counts summary">
                  <div className="card-details-stat">
                    <span>On Selected Device</span>
                    <strong>{selectedUserForCard.cardsList?.length || 0}</strong>
                  </div>
                  <div className="card-details-stat">
                    <span>Enrolled Devices</span>
                    <strong>{selectedEnrolledDeviceCount}</strong>
                  </div>
                </div>
              </div>
              
              {/* Show cards from device */}
              {selectedUserForCard.cardsList && selectedUserForCard.cardsList.length > 0 && (
                <section className="device-cards card-detail-section">
                  <div className="card-section-header">
                    <div>
                      <h4>📱 Cards on Device</h4>
                      <p>Live card data reported directly from the selected device.</p>
                    </div>
                    <span className="card-section-count">{selectedUserForCard.cardsList.length}</span>
                  </div>
                  <div className="card-detail-list">
                  {selectedUserForCard.cardsList.map((card, idx) => {
                    const decoded = decodeCardData(card.data)
                    return (
                      <article key={idx} className="card-item device-card-item">
                        <div className="card-item-header">
                          <div>
                            <span className="card-item-label">Live Device Card</span>
                            <strong>Card {idx + 1}</strong>
                          </div>
                          <span className="badge badge-secondary">{resolveCardTypeLabel(card)}</span>
                        </div>
                        <div className="card-spec-grid">
                          <div>
                            <span>Type</span>
                            <strong>{resolveCardTypeLabel(card)}</strong>
                          </div>
                          <div>
                            <span>Size</span>
                            <strong>{card.size ? `${card.size} bytes` : '—'}</strong>
                          </div>
                        </div>
                        <div className="card-number-display">
                          <span className="card-number-label">Card Number (Decimal)</span>
                          <code className="card-number">{decoded.decimal}</code>
                        </div>
                        <div className="card-item-actions">
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => {
                              handleInlineAssignCard(selectedUserForCard, card, {
                                includeCardData: true,
                                notes: 'Prefilled from a live device card on the Users page.'
                              })
                            }}
                          >
                            ➕ Save to Assignments
                          </button>
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => handleCopyCardNumber(card)}
                          >
                            📋 Copy Number
                          </button>
                        </div>
                      </article>
                    )
                  })}
                  </div>
                </section>
              )}
              
              {/* Show cards from database */}
              {selectedDatabaseCards.length > 0 && (
                <section className="db-cards card-detail-section">
                  <div className="card-section-header">
                    <div>
                      <h4>💾 Database Cards</h4>
                      <p>Assignments already stored in the database for this user.</p>
                    </div>
                    <span className="card-section-count">{selectedDatabaseCards.length}</span>
                  </div>
                  <div className="assignment-card-list card-detail-list">
                    {selectedDatabaseCards.map((card, index) => (
                      <article key={card.id || index} className="assignment-card-item">
                        <div className="assignment-card-header">
                          <div>
                            <span className="card-item-label">Stored Assignment</span>
                            <strong>Card {index + 1}</strong>
                          </div>
                          <span className={`badge badge-${card.status === 'active' ? 'success' : 'secondary'}`}>
                            {card.status || 'unknown'}
                          </span>
                        </div>
                        <div className="card-meta-grid">
                          <div>
                            <span>Card Type</span>
                            <strong>{card.cardType || '—'}</strong>
                          </div>
                          <div>
                            <span>Assigned</span>
                            <strong>{card.assignedAt ? new Date(card.assignedAt).toLocaleString() : '—'}</strong>
                          </div>
                          <div>
                            <span>Card No.</span>
                            <code className="card-number">{getCardDisplayValue(card)}</code>
                          </div>
                          <div>
                            <span>Devices</span>
                            <strong>{getActiveEnrollmentCount(card)}</strong>
                          </div>
                        </div>
                        {card.cardData && (
                          <div className="card-data-block">
                            <span className="card-data-label">Normalized Hex</span>
                            <code className="card-data-display">{card.cardData}</code>
                          </div>
                        )}
                        {card.rawCardData && card.rawCardData !== card.cardData && (
                          <div className="card-data-block">
                            <span className="card-data-label">Stored Value</span>
                            <code className="card-data-display">{card.rawCardData}</code>
                          </div>
                        )}
                        <div className="card-item-actions">
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => handleCopyCardNumber(card)}
                          >
                            📋 Copy Number
                          </button>
                          {selectedEmployeeId ? (
                            <>
                              <button
                                className="btn btn-secondary btn-sm"
                                onClick={() => openCardDeviceSelector(card, 'enroll')}
                              >
                                📤 Push to Devices
                              </button>
                              <button
                                className="btn btn-secondary btn-sm"
                                onClick={() => openCardDeviceSelector(card, 'remove')}
                              >
                                🗑️ Remove from Devices
                              </button>
                              {card.status === 'active' && (
                                <button
                                  className="btn btn-warning btn-sm"
                                  onClick={() => handleInlineReplaceCard(card)}
                                >
                                  🔄 Replace
                                </button>
                              )}
                              <button
                                className="btn btn-secondary btn-sm"
                                onClick={() => handleInlineHistory(card)}
                              >
                                📜 History
                              </button>
                              {card.status !== 'revoked' && (
                                <button
                                  className="btn btn-danger btn-sm"
                                  onClick={() => handleInlineRevoke(card)}
                                >
                                  Revoke
                                </button>
                              )}
                              {card.status !== 'active' && getActiveEnrollmentCount(card) === 0 && (
                                <button
                                  className="btn btn-danger btn-sm"
                                  onClick={() => handleInlineDeleteCard(card)}
                                >
                                  Delete
                                </button>
                              )}
                            </>
                          ) : (
                            <button
                              className="btn btn-primary btn-sm"
                              onClick={() => {
                                handleInlineAssignCard(selectedUserForCard, card, {
                                  includeCardData: true,
                                  notes: 'Opened from Users as an unknown card review.'
                                })
                              }}
                            >
                              ➕ Assign This Card
                            </button>
                          )}
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              )}
              
              {/* No cards found */}
              {(!selectedUserForCard.cardsList || selectedUserForCard.cardsList.length === 0) && 
               selectedDatabaseCards.length === 0 && (
                <p className="no-cards card-details-empty">No card data available for this user.</p>
              )}
            </div>
            <div className="card-details-footer">
              <button className="btn btn-secondary" onClick={() => setShowCardModal(false)}>
                Close
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  handleInlineAssignCard(selectedUserForCard, selectedAssignmentSeedCard, {
                    includeCardData: Boolean(selectedAssignmentSeedCard),
                    notes: selectedDeviceCard
                      ? 'Prefilled from a live device card on the Users page.'
                      : !selectedEmployeeId && selectedAssignmentSeedCard
                        ? 'Opened from Users as an unknown card review.'
                        : ''
                  })
                }}
              >
                {selectedAssignmentActionLabel}
              </button>
            </div>
          </div>
        </div>
      )}
      {showCardDeviceModal && cardDeviceTarget && (
        <div className="modal-overlay card-device-overlay" onClick={closeCardDeviceModal}>
          <div className="modal-content card-device-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h3>{cardDeviceAction === 'enroll' ? '📤 Push Card to Devices' : '🗑️ Remove Card from Devices'}</h3>
                <p className="card-device-subtitle">Card {getCardDisplayValue(cardDeviceTarget)} • {resolveCardTypeLabel(cardDeviceTarget)}</p>
              </div>
              <button className="btn-close" onClick={closeCardDeviceModal}>×</button>
            </div>
            <div className="modal-body card-device-body">
              <p className="card-device-hint">
                {cardDeviceAction === 'enroll'
                  ? 'Choose which active devices should receive this card. Devices already holding it are shown but disabled.'
                  : 'Choose which active devices should remove this card assignment.'}
              </p>
              {cardDeviceLoading ? (
                <p className="card-device-empty">Loading active devices…</p>
              ) : cardDeviceOptions.length === 0 ? (
                <p className="card-device-empty">No active devices are available for this action.</p>
              ) : (
                <div className="device-checklist card-device-list">
                  {cardDeviceOptions.map((device) => {
                    const deviceId = String(device.id)
                    const isChecked = cardDeviceSelectedIds.includes(deviceId)
                    const isDisabled = cardDeviceAction === 'enroll' && device.alreadyEnrolled

                    return (
                      <label
                        key={deviceId}
                        className={`device-check-item card-device-item ${isDisabled ? 'is-disabled' : ''}`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          disabled={isDisabled || cardDeviceRunning}
                          onChange={() => toggleCardDeviceSelection(deviceId)}
                        />
                        <span className="dot online" />
                        <span className="card-device-copy">
                          <strong>{device.name || device.ip}</strong>
                          <span>{device.ip}:{device.port || 51211}</span>
                        </span>
                        {device.alreadyEnrolled && (
                          <span className="card-device-status">Already on device</span>
                        )}
                      </label>
                    )
                  })}
                </div>
              )}
            </div>
            <div className="modal-footer card-device-footer">
              <button className="btn btn-secondary" onClick={closeCardDeviceModal} disabled={cardDeviceRunning}>
                Cancel
              </button>
              <button
                className={`btn ${cardDeviceAction === 'enroll' ? 'btn-primary' : 'btn-danger'}`}
                onClick={handleCardDeviceExecute}
                disabled={cardDeviceLoading || cardDeviceRunning || cardDeviceSelectedIds.length === 0}
              >
                {cardDeviceRunning
                  ? 'Running…'
                  : cardDeviceAction === 'enroll'
                    ? `Push to ${cardDeviceSelectedIds.length} device(s)`
                    : `Remove from ${cardDeviceSelectedIds.length} device(s)`}
              </button>
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
                  {connectedDevices.length === 0 ? (
                    <p style={{ color: '#94a3b8', textAlign: 'center', padding: 12 }}>No online devices available.</p>
                  ) : connectedDevices.map(d => (
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


