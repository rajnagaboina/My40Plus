import type { GalleryItem } from "./types";

const STORAGE_KEY = "my40plus:gallery";
export const sampleGallery: GalleryItem[] = [
  { id: "gallery-placeholder", name: "celebration-placeholder.jpg", mediaType: "photo", mimeType: "image/jpeg", size: 0, album: "Celebration", contributor: "My40+", caption: "Celebration memories will appear here after host approval.", status: "approved", createdAt: "2026-07-31T00:00:00.000Z" }
];

export function readGallery(storage: Pick<Storage, "getItem"> = window.localStorage): GalleryItem[] {
  try { const raw = storage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw) as GalleryItem[] : sampleGallery; } catch { return sampleGallery; }
}

export function addGalleryItem(item: Omit<GalleryItem, "id" | "createdAt" | "status">, storage: Pick<Storage, "getItem" | "setItem"> = window.localStorage): GalleryItem[] {
  const next: GalleryItem[] = [{ ...item, id: crypto.randomUUID(), createdAt: new Date().toISOString(), status: "pending" }, ...readGallery(storage)];
  storage.setItem(STORAGE_KEY, JSON.stringify(next)); return next;
}
export function moderateGalleryItem(id: string, status: "approved" | "rejected", storage: Pick<Storage, "getItem" | "setItem"> = window.localStorage): GalleryItem[] { const next = readGallery(storage).map(item => item.id === id ? { ...item, status } : item); storage.setItem(STORAGE_KEY, JSON.stringify(next)); return next; }
