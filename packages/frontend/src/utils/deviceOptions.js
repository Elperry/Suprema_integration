export function isDeviceOnline(device) {
  return String(device?.status || '').toLowerCase() === 'connected'
}

export function getDeviceDisplayName(device) {
  return device?.name || device?.deviceName || `Device ${device?.id ?? ''}`.trim()
}

function compareDevices(left, right) {
  const leftName = getDeviceDisplayName(left)
  const rightName = getDeviceDisplayName(right)
  const nameComparison = leftName.localeCompare(rightName)
  if (nameComparison !== 0) return nameComparison
  return String(left?.ip || '').localeCompare(String(right?.ip || ''))
}

export function getDeviceSelectGroups(devices = []) {
  const sortedDevices = [...devices].sort(compareDevices)
  const onlineDevices = sortedDevices.filter(isDeviceOnline)
  const offlineDevices = sortedDevices.filter((device) => !isDeviceOnline(device))

  return {
    onlineDevices,
    offlineDevices,
    hasOnlineDevices: onlineDevices.length > 0,
    hasOfflineDevices: offlineDevices.length > 0,
  }
}

export function formatDeviceOptionLabel(device, { includePort = false } = {}) {
  const name = getDeviceDisplayName(device)
  const endpoint = device?.ip
    ? `${device.ip}${includePort && device?.port ? `:${device.port}` : ''}`
    : ''
  const statusLabel = isDeviceOnline(device) ? 'Online' : 'Offline'

  return `${isDeviceOnline(device) ? '🟢' : '🔴'} ${name}${endpoint ? ` (${endpoint})` : ''} — ${statusLabel}`
}