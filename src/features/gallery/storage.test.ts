import { addGalleryItem } from "./storage";

it("queues guest media for moderation", () => {
  const values = new Map<string, string>();
  const storage = { getItem: (key: string) => values.get(key) ?? null, setItem: (key: string, value: string) => values.set(key, value) };
  const [item] = addGalleryItem({ name: "memory.jpg", mimeType: "image/jpeg", mediaType: "photo", size: 20, album: "Family & Friends", contributor: "Guest", caption: "A memory" }, storage);
  expect(item.status).toBe("pending");
});
