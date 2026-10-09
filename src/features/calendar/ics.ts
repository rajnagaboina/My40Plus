import type { ScheduleEvent } from "./events";

const escapeText = (value: string) => value.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
const utcDate = (value: string) => new Date(value).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

export function createIcs(events: ScheduleEvent[]): string {
  const stamp = utcDate("2026-07-31T00:00:00Z");
  const entries = events.map(event => [
    "BEGIN:VEVENT",
    `UID:${event.id}@my40plus.local`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${utcDate(event.start)}`,
    `DTEND:${utcDate(event.end)}`,
    `SUMMARY:${escapeText(event.title)}`,
    `DESCRIPTION:${escapeText(event.description)}${event.provisional ? "\\nSchedule is provisional." : ""}`,
    `LOCATION:${escapeText(event.location)}`,
    "END:VEVENT"
  ].join("\r\n")).join("\r\n");
  return ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//My40Plus//Celebration//EN", "CALSCALE:GREGORIAN", entries, "END:VCALENDAR"].join("\r\n");
}
