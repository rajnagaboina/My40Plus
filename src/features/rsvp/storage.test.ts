import { readRsvps, saveRsvp } from "./storage";

function memoryStorage() {
  const values = new Map<string, string>();
  return {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => values.set(key, value)
  };
}

it("persists RSVP submissions without replacing earlier guests", () => {
  const storage = memoryStorage();
  const base = { email: "guest@example.com", phone: "", attendance: "attending" as const, guestCount: 1, dietaryPreferences: "", message: "" };
  saveRsvp({ ...base, fullName: "First Guest" }, storage);
  saveRsvp({ ...base, fullName: "Second Guest", email: "second@example.com" }, storage);
  expect(readRsvps(storage).map(item => item.fullName)).toEqual(["First Guest", "Second Guest"]);
});

it("treats corrupted local data as an empty collection", () => {
  expect(readRsvps({ getItem: () => "not-json" })).toEqual([]);
});
