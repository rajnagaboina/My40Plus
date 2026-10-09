export type GuestInvitation = { token: string; name: string; createdAt: string; checkedInAt?: string };
const STORAGE_KEY = "my40plus:guest-invitations";

export function readInvitations(storage: Pick<Storage, "getItem"> = window.localStorage): GuestInvitation[] {
  try { const value = storage.getItem(STORAGE_KEY); return value ? JSON.parse(value) as GuestInvitation[] : []; } catch { return []; }
}

export function createInvitation(name: string, storage: Pick<Storage, "getItem" | "setItem"> = window.localStorage): GuestInvitation {
  const guest = { token: crypto.randomUUID(), name: name.trim(), createdAt: new Date().toISOString() };
  storage.setItem(STORAGE_KEY, JSON.stringify([...readInvitations(storage), guest])); return guest;
}

export function findInvitation(token: string, storage: Pick<Storage, "getItem"> = window.localStorage): GuestInvitation | undefined {
  return readInvitations(storage).find(item => item.token === token);
}

export function checkInGuest(token: string, storage: Pick<Storage, "getItem" | "setItem"> = window.localStorage): GuestInvitation | undefined {
  let checkedIn: GuestInvitation | undefined;
  const next = readInvitations(storage).map(item => item.token === token ? (checkedIn = item.checkedInAt ? item : { ...item, checkedInAt: new Date().toISOString() }) : item);
  storage.setItem(STORAGE_KEY, JSON.stringify(next)); return checkedIn;
}
