import { IMAGE_LIMIT, VIDEO_LIMIT, validateMedia } from "./validation";

it("accepts supported photo and video formats", () => {
  expect(validateMedia({ type: "image/heic", size: IMAGE_LIMIT })).toEqual({ valid: true, mediaType: "photo" });
  expect(validateMedia({ type: "video/quicktime", size: VIDEO_LIMIT })).toEqual({ valid: true, mediaType: "video" });
});

it("rejects oversized and unsupported files", () => {
  expect(validateMedia({ type: "image/jpeg", size: IMAGE_LIMIT + 1 })).toMatchObject({ valid: false });
  expect(validateMedia({ type: "video/mp4", size: VIDEO_LIMIT + 1 })).toMatchObject({ valid: false });
  expect(validateMedia({ type: "application/pdf", size: 1 })).toMatchObject({ valid: false });
});
