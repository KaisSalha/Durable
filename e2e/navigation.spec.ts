import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("should navigate between pages", async ({ page }) => {
    // Start from the home page
    await page.goto("/");
    await expect(page).toHaveTitle(/Modern Web Development Blog/);

    // Check if the logo is visible
    const logo = page.getByRole("link", { name: /gem/i });
    await expect(logo).toBeVisible();

    // Navigate to a blog post
    const firstPost = await page
      .getByRole("link")
      .filter({ hasText: /Advanced Caching Strategies/ })
      .first();
    await firstPost.click();

    // Verify we're on the blog post page
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Advanced Caching Strategies"
    );

    // Go back to home
    await logo.click();
    await expect(page).toHaveTitle(/Modern Web Development Blog/);
  });

  test("should handle 404 pages gracefully", async ({ page }) => {
    await page.goto("/non-existent-page");
    await expect(page.getByText("404")).toBeVisible();
    await expect(page.getByText("Page Not Found")).toBeVisible();
  });
});

test.describe("Theme Toggle", () => {
  test("should toggle between light and dark themes", async ({ page }) => {
    await page.goto("/");

    // Get the theme toggle button
    const themeToggle = page.getByRole("button", { name: /toggle theme/i });

    // Check initial theme
    await expect(page.locator("html")).toHaveAttribute("class", /dark/);

    // Toggle to dark theme
    await themeToggle.click();
    await expect(page.locator("html")).toHaveAttribute("class", /light/);

    // Toggle back to light theme
    await themeToggle.click();
    await expect(page.locator("html")).toHaveAttribute("class", /dark/);
  });
});
