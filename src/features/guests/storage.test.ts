import { checkInGuest, createInvitation, findInvitation } from "./storage";

function memoryStorage() { const values = new Map<string, string>(); return { getItem: (key: string) => values.get(key) ?? null, setItem: (key: string, value: string) => values.set(key, value) }; }

it("creates a unique invitation that can be tracked by token", () => {
  const storage = memoryStorage();
  const first = createInvitation("First Guest", storage); const second = createInvitation("Second Guest", storage);
  expect(first.token).not.toBe(second.token);
  expect(findInvitation(first.token, storage)?.name).toBe("First Guest");
});

it("records a guest check-in only once", () => {
  const storage = memoryStorage(); const guest = createInvitation("Guest", storage);
  const first = checkInGuest(guest.token, storage); const second = checkInGuest(guest.token, storage);
  expect(first?.checkedInAt).toBeTruthy(); expect(second?.checkedInAt).toBe(first?.checkedInAt);
});

it("does not check in an unknown token", () => expect(checkInGuest("unknown", memoryStorage())).toBeUndefined());
