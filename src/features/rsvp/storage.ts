import type { RsvpInput, StoredRsvp } from "./schema";

const STORAGE_KEY = "my40plus:rsvps";

export function saveRsvp(input: RsvpInput, storage: Pick<Storage, "getItem" | "setItem"> = window.localStorage): StoredRsvp {
  const existing = readRsvps(storage);
  const saved = { ...input, id: crypto.randomUUID(), submittedAt: new Date().toISOString() };
  storage.setItem(STORAGE_KEY, JSON.stringify([...existing, saved]));
  return saved;
}

export function readRsvps(storage: Pick<Storage, "getItem"> = window.localStorage): StoredRsvp[] {
  try {
    const value = storage.getItem(STORAGE_KEY);
    return value ? JSON.parse(value) as StoredRsvp[] : [];
  } catch {
    return [];
  }
}
