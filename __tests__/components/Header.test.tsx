import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Header } from "@/components/header";

vi.mock("next-themes", () => ({
  useTheme: () => ({
    theme: "light",
    setTheme: vi.fn(),
  }),
}));

describe("Header", () => {
  it("renders the logo link", () => {
    render(<Header />);
    const logoLink = screen.getByRole("link", { name: /gem/i });
    expect(logoLink).toBeTruthy();
    expect(logoLink.getAttribute("href")).toBe("/");
  });

  it("renders the theme toggle button", () => {
    render(<Header />);
    const themeButton = screen.getByRole("button", { name: /toggle theme/i });
    expect(themeButton).toBeTruthy();
  });
});
