/**
 * The gate PC API token.
 *
 * Every /api call needs it. It is kept in localStorage (sent as a Bearer
 * header by axios) and in a same-site cookie (sent automatically by
 * EventSource and file downloads, which cannot set headers).
 */
const STORAGE_KEY = 'auth_token';
const COOKIE = 'gate_api_token';

export function getApiToken() {
  try {
    return localStorage.getItem(STORAGE_KEY) || '';
  } catch {
    return '';
  }
}

export function setApiToken(token) {
  const value = String(token || '').trim();
  try {
    if (value) localStorage.setItem(STORAGE_KEY, value);
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    // storage unavailable: the cookie still carries it for this session
  }
  document.cookie = value
    ? `${COOKIE}=${encodeURIComponent(value)}; Path=/; SameSite=Strict`
    : `${COOKIE}=; Path=/; Max-Age=0; SameSite=Strict`;
}

/** Asks the operator once; true when a token was entered. */
export function askForApiToken() {
  const entered = window.prompt('This gate PC needs its API token (see /etc/suprema/backend.env, API_TOKEN):');
  if (!entered) return false;
  setApiToken(entered);
  return true;
}

// Keep the cookie in step with storage on every page load.
if (getApiToken()) setApiToken(getApiToken());
