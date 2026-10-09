import { expect, test } from "./fixtures";

test("guest can open the invitation", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /celebrating lakshmi's 40th/i })).toBeVisible();
  await expect(page.getByText("Sunday, November 15, 2026")).toBeVisible();
});

test("guest can submit an attending RSVP", async ({ page }) => {
  await page.goto("/rsvp");
  await page.getByLabel("Full name").fill("Playwright Guest");
  await page.getByLabel("Email").fill("guest@example.com");
  await page.getByRole("button", { name: /send my rsvp/i }).click();
  await expect(page.getByRole("status")).toContainText("Thank you, Playwright Guest!");
});

test("assistant refuses an unsupported question", async ({ page }) => {
  await page.goto("/assistant");
  await page.getByLabel("Ask about the event").fill("What is the dinner menu?");
  await page.getByRole("button", { name: "Send question" }).click();
  await expect(page.getByText("I could not find that information in the event details.")).toBeVisible();
});
