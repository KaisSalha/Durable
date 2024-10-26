import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeToggle } from "@/components/theme-toggle";

const mockSetTheme = vi.fn();

vi.mock("next-themes", () => ({
	useTheme: () => ({
		theme: "light",
		setTheme: mockSetTheme,
	}),
}));

describe("ThemeToggle", () => {
	beforeEach(() => {
		mockSetTheme.mockClear();
	});

	it("renders theme toggle button", () => {
		render(<ThemeToggle />);
		const button = screen.getByRole("button", { name: /toggle theme/i });
		expect(button).toBeTruthy();
	});

	it("toggles theme when clicked", () => {
		render(<ThemeToggle />);
		const button = screen.getByRole("button", { name: /toggle theme/i });
		fireEvent.click(button);
		expect(mockSetTheme).toHaveBeenCalledWith("dark");
	});
});
