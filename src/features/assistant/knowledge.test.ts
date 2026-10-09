import { answerEventQuestion, fallbackAnswer } from "./knowledge";

describe("grounded event assistant", () => {
  it("answers known event questions", () => {
    expect(answerEventQuestion("When is the birthday celebration?")).toContain("November 15, 2026");
    expect(answerEventQuestion("Where is the venue?")).toContain("Las Vegas");
    expect(answerEventQuestion("How do I RSVP?")).toContain("main navigation");
  });

  it("labels unconfirmed information", () => {
    expect(answerEventQuestion("What time does it start?")).toContain("placeholder");
    expect(answerEventQuestion("Where can I park?")).toContain("not been provided");
  });

  it("uses the required fallback without inventing an answer", () => {
    expect(answerEventQuestion("What is the dinner menu?")).toBe(fallbackAnswer);
  });
});
