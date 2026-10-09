import { milestones } from "./data";

it("keeps milestones in chronological order with unique years", () => {
  const years = milestones.map(item => item.year);
  expect(years).toEqual([...years].sort((a, b) => a - b));
  expect(new Set(years).size).toBe(years.length);
});

it("includes the birth and 40th celebration milestones", () => {
  expect(milestones.at(0)?.year).toBe(1986);
  expect(milestones.at(-1)?.year).toBe(2026);
});
