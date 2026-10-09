import { rsvpSchema } from "./schema";

const valid = { fullName: "A Guest", email: "guest@example.com", phone: "", guestCount: 1, dietaryPreferences: "", message: "" };

describe.each(["attending", "maybe", "not-attending"] as const)("%s RSVP", attendance => {
  it("accepts a valid response", () => {
    expect(rsvpSchema.safeParse({ ...valid, attendance }).success).toBe(true);
  });
});

it("rejects malformed contact information", () => {
  const result = rsvpSchema.safeParse({ ...valid, fullName: "A", email: "wrong", attendance: "attending" });
  expect(result.success).toBe(false);
});

it("rejects multiple guests for a declined invitation", () => {
  const result = rsvpSchema.safeParse({ ...valid, attendance: "not-attending", guestCount: 3 });
  expect(result.success).toBe(false);
});
