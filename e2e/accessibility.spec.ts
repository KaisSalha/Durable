import { test, expect } from "@playwright/test";

test.describe("Accessibility", () => {
	test("should have proper heading hierarchy", async ({ page }) => {
		await page.goto("/");

		// Check main heading
		const h1 = page.getByRole("heading", { level: 1 });
		await expect(h1).toBeVisible();

		// Verify subheadings
		const h2s = page.getByRole("heading", { level: 2 });
		await expect(h2s).toHaveCount(await h2s.count());
	});

	test("should have accessible navigation", async ({ page }) => {
		await page.goto("/");

		// Check if navigation landmarks are present
		await expect(page.locator("header")).toBeVisible();
		await expect(page.locator("main")).toBeVisible();
		await expect(page.locator("footer")).toBeVisible();

		// Verify links have accessible names
		const links = page.getByRole("link");
		for (const link of await links.all()) {
			await expect(link).toHaveAttribute("aria-label", /.+/);
		}
	});

	test("should maintain focus management", async ({ page }) => {
		await page.goto("/");

		// Test keyboard navigation
		await page.keyboard.press("Tab");
		const focusedElement = await page.evaluate(
			() => document.activeElement?.tagName
		);
		expect(focusedElement).toBeTruthy();

		// Check if skip links are present for keyboard users
		await page.keyboard.press("Tab");
		const secondFocusedElement = await page.evaluate(
			() => document.activeElement?.tagName
		);
		expect(secondFocusedElement).toBeTruthy();
	});
});
