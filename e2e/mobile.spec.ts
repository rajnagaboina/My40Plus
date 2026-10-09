import { expect, test } from "./fixtures";

test("mobile guest can navigate primary features", async ({ page, isMobile }) => {
  test.skip(!isMobile, "Bottom navigation is rendered only at mobile viewports");
  await page.goto("/");
  const navigation = page.getByRole("navigation", { name: "Mobile navigation" });
  await expect(navigation).toBeVisible();
  await navigation.getByRole("link", { name: "Journey" }).click();
  await expect(page.getByRole("heading", { name: /Lakshmi's life journey/i })).toBeVisible();
});

test("calendar downloads an ICS file", async ({ page }) => {
  await page.goto("/calendar");
  const download = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download ICS" }).click();
  expect((await download).suggestedFilename()).toBe("lakshmi-40th-celebration.ics");
});
