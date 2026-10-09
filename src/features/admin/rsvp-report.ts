import type { StoredRsvp } from "@/features/rsvp/schema";

const csvCell = (value: unknown) => `"${String(value ?? "").replace(/"/g, '""')}"`;
export function createRsvpCsv(items: StoredRsvp[]): string {
  const columns: Array<[string, keyof StoredRsvp]> = [["Full Name", "fullName"], ["Email", "email"], ["Phone", "phone"], ["Attendance", "attendance"], ["Guest Count", "guestCount"], ["Dietary Preferences", "dietaryPreferences"], ["Message", "message"], ["Submitted At", "submittedAt"]];
  return [columns.map(([label]) => csvCell(label)).join(","), ...items.map(item => columns.map(([, key]) => csvCell(item[key])).join(","))].join("\r\n");
}
export function summarizeRsvps(items: StoredRsvp[]) { return { responses: items.length, attending: items.filter(item => item.attendance === "attending").reduce((sum, item) => sum + item.guestCount, 0), maybe: items.filter(item => item.attendance === "maybe").length, declined: items.filter(item => item.attendance === "not-attending").length }; }
