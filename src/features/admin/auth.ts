export type AdminSession = { role: "admin"; displayName: string; issuedAt: string };
const SESSION_KEY = "my40plus:admin-session";

export function readAdminSession(storage: Pick<Storage, "getItem"> = window.sessionStorage): AdminSession | null {
  try { const raw = storage.getItem(SESSION_KEY); if (!raw) return null; const value = JSON.parse(raw) as AdminSession; return value.role === "admin" ? value : null; } catch { return null; }
}
export function createLocalAdminSession(storage: Pick<Storage, "setItem"> = window.sessionStorage): AdminSession { const session: AdminSession = { role: "admin", displayName: "Local Organizer", issuedAt: new Date().toISOString() }; storage.setItem(SESSION_KEY, JSON.stringify(session)); return session; }
export function clearAdminSession(storage: Pick<Storage, "removeItem"> = window.sessionStorage) { storage.removeItem(SESSION_KEY); }
