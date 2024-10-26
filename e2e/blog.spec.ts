import { test, expect } from "@playwright/test";

test.describe("Blog Features", () => {
	test("should display blog posts on home page", async ({ page }) => {
		await page.goto("/");

		// Check for featured post section
		await expect(page.getByText("FEATURED POST")).toBeVisible();

		// Check for all posts section
		await expect(page.getByText("ALL POSTS")).toBeVisible();

		// Verify multiple blog post cards are present
		const blogCards = page.locator("article").or(page.locator(".card"));
		await expect(blogCards).toHaveCount(await blogCards.count());
	});

	test("should show full blog post content", async ({ page }) => {
		await page.goto("/");

		// Click on the first blog post
		const firstPost = await page
			.getByRole("link")
			.filter({ hasText: /Caching in Next.js 14/ })
			.first();
		const postTitle = await firstPost.textContent();
		await firstPost.click();

		// Verify blog post content
		await expect(page.getByRole("article")).toBeVisible();
		await expect(page.getByRole("heading", { level: 1 })).toHaveText(
			"Caching in Next.js 14"
		);

		// Check for reading time and date
		await expect(page.getByText(/min read/)).toBeVisible();
		await expect(page.getByText(/202[0-9]/)).toBeVisible();
	});

	test("should show related posts", async ({ page }) => {
		// Go to a specific blog post
		await page.goto("/blog/caching-in-nextjs");

		// Verify related posts section exists
		await expect(page.getByText("MORE POSTS")).toBeVisible();

		// Check if related posts are clickable
		const relatedPosts = page
			.locator("a")
			.filter({ has: page.locator("h3") });
		await expect(relatedPosts).toHaveCount(await relatedPosts.count());

		// Click a related post and verify navigation
		const firstRelatedPost = relatedPosts.first();
		const relatedPostTitle = await firstRelatedPost.textContent();
		await firstRelatedPost.click();
		await expect(page.getByRole("heading", { level: 1 })).toContainText(
			relatedPostTitle || ""
		);
	});
});
