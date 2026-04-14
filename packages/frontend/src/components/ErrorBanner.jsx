/**
 * Shared ErrorBanner component — maps raw gRPC/API errors to user-friendly messages.
 * Usage: <ErrorBanner error={errorString} onDismiss={() => setError(null)} />
 */

const GRPC_ERROR_MAP = {
  UNAVAILABLE: 'Device gateway is offline. Check that the Suprema gateway service is running.',
  NOT_FOUND: 'Device is not connected. Please connect to the device first.',
  DEADLINE_EXCEEDED: 'Connection timed out. The device may be offline or unreachable.',
  PERMISSION_DENIED: 'Permission denied. Check your credentials.',
  UNAUTHENTICATED: 'Authentication failed. Please log in again.',
  INTERNAL: 'An internal error occurred on the device gateway.',
  CANCELLED: 'The operation was cancelled.',
  RESOURCE_EXHAUSTED: 'Too many requests. Please wait and try again.',
}

export function friendlyErrorMessage(raw) {
  if (!raw) return null
  const str = typeof raw === 'string' ? raw : raw.message || String(raw)
  for (const [code, friendly] of Object.entries(GRPC_ERROR_MAP)) {
    if (str.includes(code)) return friendly
  }
  // Strip timestamps and "Resolution note:" noise
  return str
    .replace(/\s*\(\d{4}-\d{2}-\d{2}T[\d:.]+Z\)/g, '')
    .replace(/\s*Resolution note:\s*$/i, '')
    .trim()
}

export default function ErrorBanner({ error, onDismiss }) {
  if (!error) return null
  const message = friendlyErrorMessage(error)
  return (
    <div className="alert alert-danger">
      <span>⚠️ {message}</span>
      {onDismiss && <button type="button" className="btn-close" onClick={onDismiss}>✕</button>}
    </div>
  )
}
