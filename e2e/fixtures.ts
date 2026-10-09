import { test as base, expect, type Page } from "@playwright/test";

export const test = base.extend<{ page: Page }>({
  page: async ({ page }, use) => {
    const originalGoto = page.goto.bind(page);
    page.goto = async (url, options) => {
      const response = await originalGoto(url, options);
      await page.waitForLoadState("networkidle");
      return response;
    };
    await use(page);
  }
});

export { expect };
