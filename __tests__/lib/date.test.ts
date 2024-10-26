import { describe, it, expect } from "vitest";
import { formatDate } from "@/lib/date";

describe("formatDate", () => {
  it("formats date correctly", () => {
    const date = "2024-03-24";
    expect(formatDate(date)).toBe("March 24, 2024");
  });
});
