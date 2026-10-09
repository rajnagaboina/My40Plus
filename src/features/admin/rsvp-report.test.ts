import type { StoredRsvp } from "@/features/rsvp/schema";
import { createRsvpCsv, summarizeRsvps } from "./rsvp-report";
const item: StoredRsvp = { id: "1", fullName: "Guest, One", email: "one@example.com", phone: "", attendance: "attending", guestCount: 2, dietaryPreferences: "No \"nuts\"", message: "Hello", submittedAt: "2026-07-31T00:00:00Z" };
it("summarizes responses and attending headcount", () => expect(summarizeRsvps([item, { ...item, id: "2", attendance: "maybe", guestCount: 1 }])).toEqual({ responses: 2, attending: 2, maybe: 1, declined: 0 }));
it("escapes commas and quotes in CSV exports", () => { const csv = createRsvpCsv([item]); expect(csv).toContain('"Guest, One"'); expect(csv).toContain('"No ""nuts"""'); });
