import { getCountdown } from "./countdown";

describe("getCountdown", () => {
  it("calculates the remaining units", () => {
    expect(getCountdown("2026-11-15T18:00:00-08:00", new Date("2026-11-14T16:57:56-08:00"))).toEqual({
      days: 1, hours: 1, minutes: 2, seconds: 4, complete: false
    });
  });

  it("never returns negative time after the event starts", () => {
    expect(getCountdown("2026-11-15T18:00:00-08:00", new Date("2026-11-16T00:00:00-08:00"))).toEqual({
      days: 0, hours: 0, minutes: 0, seconds: 0, complete: true
    });
  });
});
