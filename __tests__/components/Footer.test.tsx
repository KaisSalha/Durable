import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "@/components/footer";

describe("Footer", () => {
	it("renders all social links", () => {
		render(<Footer />);

		const socialLinks = [
			{ label: "github", href: "https://github.com/kaissalha" },
			{ label: "twitter", href: "https://twitter.com/kaissalha" },
			{ label: "linkedin", href: "https://linkedin.com/in/kaissalha" },
			{ label: "email", href: "mailto:kaiss.salha@gmail.com" },
		];

		socialLinks.forEach(({ label, href }) => {
			const link = screen.getByText(new RegExp(label, "i")).closest("a");
			expect(link?.getAttribute("href")).toBe(href);
		});
	});
});
