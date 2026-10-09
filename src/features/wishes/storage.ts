import type { NewWish, Wish } from "./types";

const STORAGE_KEY = "my40plus:wishes";

export const sampleWishes: Wish[] = [
  { id: "welcome-wish", author: "Family & Friends", message: "Happy 40th, Lakshmi! May this new chapter be filled with joy, laughter, and beautiful adventures.", reactions: 40, createdAt: "2026-07-31T00:00:00.000Z" }
];

export function readWishes(storage: Pick<Storage, "getItem"> = window.localStorage): Wish[] {
  try {
    const raw = storage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) as Wish[] : sampleWishes;
  } catch { return sampleWishes; }
}

export function addWish(input: NewWish, storage: Pick<Storage, "getItem" | "setItem"> = window.localStorage): Wish[] {
  const next = [{ ...input, id: crypto.randomUUID(), reactions: 0, createdAt: new Date().toISOString() }, ...readWishes(storage)];
  storage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}

export function reactToWish(id: string, storage: Pick<Storage, "getItem" | "setItem"> = window.localStorage): Wish[] {
  const next = readWishes(storage).map(wish => wish.id === id ? { ...wish, reactions: wish.reactions + 1 } : wish);
  storage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}
