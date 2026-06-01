const STATUS_ORDER = {
  healthy: 0,
  degraded: 1,
  unhealthy: 2,
}

function normalizeStatus(value) {
  const status = String(value || '').toLowerCase()
  if (status === 'healthy' || status === 'degraded' || status === 'unhealthy') {
    return status
  }
  return 'unhealthy'
}

function pickWorseStatus(left, right) {
  return STATUS_ORDER[left] >= STATUS_ORDER[right] ? left : right
}

function normalizeGateway(value) {
  const gateway = String(value || '').trim().toLowerCase()
  if (!gateway) return 'unknown'
  return gateway
}

function formatLabel(value) {
  if (!value) return 'Unknown'
  return value.charAt(0).toUpperCase() + value.slice(1)
}

export function deriveHealthSummary(health) {
  if (!health) {
    return {
      status: 'unhealthy',
      label: 'Unhealthy',
      connectionLabel: 'Disconnected',
      color: 'danger',
      databaseConnected: false,
      gateway: 'unknown',
      gatewayLabel: 'Unknown',
      isGatewayConnected: false,
      devices: {
        total: 0,
        connected: 0,
        offline: 0,
      },
    }
  }

  const backendStatus = normalizeStatus(health.status)
  const databaseConnected = Boolean(health.database?.connected)
  const gateway = normalizeGateway(health.gateway)
  const totalDevices = Number(health.devices?.total) || 0
  const connectedDevices = Number(health.devices?.connected) || 0
  const offlineDevices = Math.max(totalDevices - connectedDevices, 0)

  let derivedStatus = databaseConnected ? 'healthy' : 'unhealthy'

  if (databaseConnected && gateway !== 'unknown' && gateway !== 'connected') {
    derivedStatus = 'degraded'
  }

  if (databaseConnected && totalDevices > 0 && connectedDevices === 0) {
    derivedStatus = 'degraded'
  }

  const status = pickWorseStatus(backendStatus, derivedStatus)

  return {
    status,
    label: formatLabel(status),
    connectionLabel: status === 'healthy' ? 'Connected' : status === 'degraded' ? 'Degraded' : 'Disconnected',
    color: status === 'healthy' ? 'success' : status === 'degraded' ? 'warning' : 'danger',
    databaseConnected,
    gateway,
    gatewayLabel: formatLabel(gateway),
    isGatewayConnected: gateway === 'connected',
    devices: {
      total: totalDevices,
      connected: connectedDevices,
      offline: offlineDevices,
    },
  }
}