import { schedule } from "./events";
import { createIcs } from "./ics";

it("creates a valid calendar envelope with every activity", () => {
  const ics = createIcs(schedule);
  expect(ics).toMatch(/^BEGIN:VCALENDAR/);
  expect(ics).toMatch(/END:VCALENDAR$/);
  expect(ics.match(/BEGIN:VEVENT/g)).toHaveLength(schedule.length);
});

it("converts the placeholder Pacific start time to UTC", () => {
  expect(createIcs([schedule[0]])).toContain("DTSTART:20261116T020000Z");
});

it("marks provisional details in the downloaded calendar", () => {
  expect(createIcs([schedule[0]])).toContain("Schedule is provisional");
});
