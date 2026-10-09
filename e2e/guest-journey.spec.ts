import { expect, test } from "./fixtures";

test("guest can decline with a maybe RSVP and see the right confirmation", async ({ page }) => {
  await page.goto("/rsvp");
  await page.getByLabel("Full name").fill("Maybe Guest");
  await page.getByLabel("Email").fill("maybe@example.com");
  await page.getByLabel("Maybe").check();
  await page.getByRole("button", { name: /send my rsvp/i }).click();
  await expect(page.getByRole("status")).toContainText("We saved your response");
});

test("guest can decline attendance and guest count locks to one", async ({ page }) => {
  await page.goto("/rsvp");
  await page.getByLabel("Unable to attend").check();
  await expect(page.getByLabel("Number of guests")).toBeDisabled();
  await page.getByLabel("Full name").fill("Regretful Guest");
  await page.getByLabel("Email").fill("regret@example.com");
  await page.getByRole("button", { name: /send my rsvp/i }).click();
  await expect(page.getByRole("status")).toContainText("We will miss you");
});

test("guest can post a birthday wish and react to it", async ({ page }) => {
  await page.goto("/wishes");
  await page.getByLabel("Your name").fill("Well Wisher");
  await page.getByRole("textbox", { name: "Birthday wish" }).fill("Happy 40th Lakshmi, wishing you joy!");
  await page.getByRole("button", { name: "Post wish" }).click();
  const posted = page.getByText("Well Wisher");
  await expect(posted).toBeVisible();
  const reactButton = page.getByRole("button", { name: "React to Well Wisher's wish" });
  const before = await reactButton.textContent();
  await reactButton.click();
  await expect(reactButton).not.toHaveText(before ?? "");
});

test("guest can submit a memory to the gallery for moderation", async ({ page }) => {
  await page.goto("/gallery");
  await page.setInputFiles("#gallery-file", { name: "memory.png", mimeType: "image/png", buffer: Buffer.from([137, 80, 78, 71]) });
  await page.getByLabel("Contributor name").fill("Photo Fan");
  await page.getByRole("button", { name: "Submit memory" }).click();
  await expect(page.getByText("Your memory is queued for host approval.")).toBeVisible();
  await expect(page.getByText("memory.png").first()).toBeVisible();
});

test("guest can browse the family tree", async ({ page }) => {
  await page.goto("/family");
  await expect(page.getByRole("heading", { name: "Family tree" })).toBeVisible();
});

test("guest can view live event mode", async ({ page }) => {
  await page.goto("/live");
  await expect(page.getByRole("heading", { name: "Live celebration" })).toBeVisible();
});

test("guest can switch the interface to Telugu", async ({ page, isMobile }) => {
  test.skip(isMobile, "Language switcher is rendered in the desktop navigation only");
  await page.goto("/");
  await page.getByRole("button", { name: "Switch language" }).click();
  await expect(page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "హోమ్" })).toBeVisible();
});

test("guest completes the personalized invitation to check-in journey", async ({ page }) => {
  await page.goto("/admin/invitations");
  await page.getByRole("button", { name: /enter local preview/i }).click();
  await page.getByLabel("Guest name").fill("Journey Guest");
  await page.getByRole("button", { name: "Create invitation" }).click();
  const previewLink = page.getByRole("link", { name: "Open preview" });
  const inviteHref = await previewLink.getAttribute("href");
  expect(inviteHref).toBeTruthy();

  await page.goto(inviteHref!);
  await expect(page.getByRole("heading", { name: "Dear Journey Guest" })).toBeVisible();

  await page.getByRole("link", { name: /rsvp for this invitation/i }).click();
  await page.getByLabel("Full name").fill("Journey Guest");
  await page.getByLabel("Email").fill("journey@example.com");
  await page.getByRole("button", { name: /send my rsvp/i }).click();
  await expect(page.getByRole("status")).toContainText("Thank you, Journey Guest!");

  const checkInHref = inviteHref!.replace("/invite/", "/check-in/");
  await page.goto(checkInHref);
  await expect(page.getByRole("heading", { name: "Welcome, Journey Guest" })).toBeVisible();
  await page.getByRole("button", { name: "Check in now" }).click();
  await expect(page.getByRole("status")).toContainText("Welcome, Journey Guest!");

  await page.goto("/admin/check-in");
  await expect(page.getByText("Journey Guest")).toBeVisible();
});
