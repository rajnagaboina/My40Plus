export const albums = ["Celebration", "Life Journey", "Family & Friends"] as const;
export type Album = typeof albums[number];
export type MediaStatus = "pending" | "approved" | "rejected";
export type GalleryItem = { id: string; name: string; mediaType: "photo" | "video"; mimeType: string; size: number; album: Album; contributor: string; caption: string; status: MediaStatus; createdAt: string };
