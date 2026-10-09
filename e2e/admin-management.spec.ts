import { expect, test } from "./fixtures";

test("organizer can save a content draft", async ({ page }) => {
  await page.goto("/admin/content");
  await page.getByRole("button", { name: /enter local preview/i }).click();
  await page.getByRole("button", { name: "Timeline" }).click();
  await page.getByPlaceholder("Milestones, stories, and media notes…").fill("1986 - Born in Hyderabad");
  await page.getByRole("button", { name: "Save local draft" }).click();
  await expect(page.getByRole("status")).toHaveText("Saved");
});

test("organizer can save an AI knowledge draft", async ({ page }) => {
  await page.goto("/admin/knowledge");
  await page.getByRole("button", { name: /enter local preview/i }).click();
  await page.getByPlaceholder(/Is parking available/).fill("Q: What is the dress code?\nA: Elegant purple attire.");
  await page.getByRole("button", { name: "Save knowledge draft" }).click();
  await expect(page.getByText("Saved")).toBeVisible();
});

test("organizer can approve a pending gallery upload", async ({ page }) => {
  await page.goto("/gallery");
  await page.setInputFiles("#gallery-file", { name: "review-me.png", mimeType: "image/png", buffer: Buffer.from([137, 80, 78, 71]) });
  await page.getByLabel("Contributor name").fill("Moderation Tester");
  await page.getByRole("button", { name: "Submit memory" }).click();
  await expect(page.getByText("Your memory is queued for host approval.")).toBeVisible();

  await page.goto("/admin/moderation");
  await page.getByRole("button", { name: /enter local preview/i }).click();
  await expect(page.getByText("Moderation Tester")).toBeVisible();
  await page.getByRole("button", { name: "Approve" }).first().click();
  await expect(page.getByText("Moderation Tester")).not.toBeVisible();
});

test("organizer sees engagement analytics after guest activity", async ({ page }) => {
  await page.goto("/wishes");
  await page.getByLabel("Your name").fill("Analytics Guest");
  await page.getByRole("textbox", { name: "Birthday wish" }).fill("So excited to celebrate with you!");
  await page.getByRole("button", { name: "Post wish" }).click();

  await page.goto("/admin/analytics");
  await page.getByRole("button", { name: /enter local preview/i }).click();
  const wishesCount = page.getByText("Wishes", { exact: true }).locator("xpath=following-sibling::p");
  await expect(wishesCount).toHaveText("1");
});

test("organizer can export the RSVP list as CSV", async ({ page }) => {
  await page.goto("/rsvp");
  await page.getByLabel("Full name").fill("Export Guest");
  await page.getByLabel("Email").fill("export@example.com");
  await page.getByRole("button", { name: /send my rsvp/i }).click();
  await expect(page.getByRole("status")).toBeVisible();

  await page.goto("/admin/rsvps");
  await page.getByRole("button", { name: /enter local preview/i }).click();
  await expect(page.getByText("Export Guest")).toBeVisible();
  const download = page.waitForEvent("download");
  await page.getByRole("button", { name: "Export CSV" }).click();
  expect((await download).suggestedFilename()).toBe("my40plus-rsvps.csv");
});
