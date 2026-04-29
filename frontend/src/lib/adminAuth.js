const ADMIN_USERNAME = import.meta.env.VITE_ADMIN_USERNAME || '';
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || '';
const ADMIN_SESSION_KEY = 'admin-session-active';

export function hasAdminCredentials() {
  return Boolean(ADMIN_USERNAME && ADMIN_PASSWORD);
}

export function authenticateAdmin(username, password) {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

export function isAdminSessionActive() {
  return localStorage.getItem(ADMIN_SESSION_KEY) === 'true';
}

export function setAdminSessionActive(isActive) {
  if (isActive) {
    localStorage.setItem(ADMIN_SESSION_KEY, 'true');
    return;
  }

  localStorage.removeItem(ADMIN_SESSION_KEY);
}
