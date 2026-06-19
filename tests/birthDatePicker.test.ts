import { describe, expect, it } from "vitest";

import { formatBirthDate, getBirthDateBounds } from "../src/engine/birthDatePicker";

describe("birth date picker helpers", () => {
  it("formats an ISO birth date for display", () => {
    expect(formatBirthDate("2025-12-04")).toBe("Dec 4, 2025");
  });

  it("limits selection to today and the preceding 24 months", () => {
    expect(getBirthDateBounds(new Date("2026-06-18T12:00:00Z"))).toEqual({
      minDate: "2024-06-18",
      maxDate: "2026-06-18"
    });
  });
});
