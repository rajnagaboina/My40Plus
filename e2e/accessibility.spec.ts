import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "./fixtures";

const guestPages = ["/", "/rsvp", "/timeline", "/calendar", "/assistant", "/wishes", "/gallery", "/family", "/live"];

for (const path of guestPages) {
  test(`${path || "home"} has no detectable accessibility violations`, async ({ page }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
    expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
  });
}

test("organizer portal has no detectable accessibility violations", async ({ page }) => {
  await page.goto("/admin");
  await page.getByRole("button", { name: /enter local preview/i }).click();
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
  expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
});
