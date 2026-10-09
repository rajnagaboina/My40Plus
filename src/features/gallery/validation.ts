const imageTypes = new Set(["image/jpeg", "image/png", "image/heic"]);
const videoTypes = new Set(["video/mp4", "video/quicktime"]);
export const IMAGE_LIMIT = 15 * 1024 * 1024;
export const VIDEO_LIMIT = 100 * 1024 * 1024;

export function validateMedia(file: Pick<File, "type" | "size">): { valid: true; mediaType: "photo" | "video" } | { valid: false; error: string } {
  if (imageTypes.has(file.type)) return file.size <= IMAGE_LIMIT ? { valid: true, mediaType: "photo" } : { valid: false, error: "Photos must be 15 MB or smaller." };
  if (videoTypes.has(file.type)) return file.size <= VIDEO_LIMIT ? { valid: true, mediaType: "video" } : { valid: false, error: "Videos must be 100 MB or smaller." };
  return { valid: false, error: "Choose a JPG, PNG, HEIC, MP4, or MOV file." };
}
