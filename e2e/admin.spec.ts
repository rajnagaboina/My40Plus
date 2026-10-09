import { expect, test } from "./fixtures";

test("organizer can enter the local admin preview", async ({ page }) => {
  await page.goto("/admin");
  await expect(page.getByRole("heading", { name: "Organizer portal" })).toBeVisible();
  await page.getByRole("button", { name: /enter local preview/i }).click();
  await expect(page.getByRole("heading", { name: "Organizer overview" })).toBeVisible();
  await page.getByRole("link", { name: "RSVPs" }).click();
  await expect(page.getByRole("heading", { name: "RSVP dashboard" })).toBeVisible();
});

test("organizer can create a personalized invitation", async ({ page }) => {
  await page.goto("/admin/invitations");
  await page.getByRole("button", { name: /enter local preview/i }).click();
  await page.getByLabel("Guest name").fill("Special Guest");
  await page.getByRole("button", { name: "Create invitation" }).click();
  await expect(page.getByText("Invitation for")).toBeVisible();
  await expect(page.locator("strong", { hasText: "Special Guest" })).toBeVisible();
});
