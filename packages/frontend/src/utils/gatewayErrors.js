export const GATEWAY_OFFLINE_MESSAGE = 'Device gateway is offline. Check that the Suprema gateway service is running.'

export const DEVICE_OFFLINE_MESSAGE = 'Device is not connected. Please connect to the device first.'

export function isGatewayUnavailableMessage(value) {
  const message = String(value || '').toLowerCase()
  return /gateway not connected|no connection established|14 unavailable|econnrefused\s+127\.0\.0\.1:4000/.test(message)
}

export function isDeviceUnavailableMessage(value) {
  const message = String(value || '').toLowerCase()
  return /device is not connected|not connected to the gateway/.test(message)
}