import { afterEach, describe, expect, it, vi } from "vitest";
import {
  isValidBirthDate,
  isValidChildBirthDate,
  isValidDate,
} from "../date-validation";

describe("isValidDate", () => {
  it("should accept valid MM/DD/YYYY dates", () => {
    expect(isValidDate("01/01/2024")).toBe(true);
    expect(isValidDate("12/31/2024")).toBe(true);
    expect(isValidDate("07/30/1986")).toBe(true);
    expect(isValidDate("03/15/1990")).toBe(true);
    expect(isValidDate("05/20/1988")).toBe(true);
  });

  it("should reject invalid format", () => {
    expect(isValidDate("2024-01-01")).toBe(false); // ISO format
    expect(isValidDate("01-01-2024")).toBe(false); // Dashes
    expect(isValidDate("1/1/2024")).toBe(false); // Single digits
    expect(isValidDate("13/01/2024")).toBe(false); // Invalid month
    expect(isValidDate("00/01/2024")).toBe(false); // Invalid month
    expect(isValidDate("30 July 1986")).toBe(false); // Text format
  });

  it("should reject invalid dates", () => {
    expect(isValidDate("02/30/2024")).toBe(false); // Feb doesn't have 30 days
    expect(isValidDate("02/31/2024")).toBe(false); // Feb doesn't have 31 days
    expect(isValidDate("04/31/2024")).toBe(false); // April doesn't have 31 days
    expect(isValidDate("06/31/2024")).toBe(false); // June doesn't have 31 days
    expect(isValidDate("09/31/2024")).toBe(false); // September doesn't have 31 days
    expect(isValidDate("11/31/2024")).toBe(false); // November doesn't have 31 days
    expect(isValidDate("01/00/2024")).toBe(false); // Invalid day
    expect(isValidDate("01/32/2024")).toBe(false); // Day too high
  });

  it("should handle leap years correctly", () => {
    expect(isValidDate("02/29/2024")).toBe(true); // 2024 is leap year
    expect(isValidDate("02/29/2023")).toBe(false); // 2023 is not leap year
    expect(isValidDate("02/29/2000")).toBe(true); // 2000 is leap year
    expect(isValidDate("02/29/1900")).toBe(false); // 1900 is not leap year
  });
});

describe("isValidBirthDate", () => {
  it("should reject dates before 1900", () => {
    expect(isValidBirthDate("01/01/1899")).toBe(false);
    expect(isValidBirthDate("12/31/1899")).toBe(false);
  });

  it("should accept dates from 1900 onwards", () => {
    expect(isValidBirthDate("01/01/1900")).toBe(true);
    expect(isValidBirthDate("07/30/1986")).toBe(true);
  });

  it("should reject future dates", () => {
    const nextYear = new Date().getFullYear() + 1;
    expect(isValidBirthDate(`01/01/${nextYear}`)).toBe(false);
  });

  it("should accept current year dates", () => {
    const currentYear = new Date().getFullYear();
    expect(isValidBirthDate(`01/01/${currentYear}`)).toBe(true);
  });

  it("should reject invalid formats", () => {
    expect(isValidBirthDate("30/07/1986")).toBe(false); // DD/MM/YYYY
    expect(isValidBirthDate("1986-07-30")).toBe(false); // ISO format
  });
});

describe("isValidChildBirthDate", () => {
  it("should reject future dates", () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const month = String(tomorrow.getMonth() + 1).padStart(2, "0");
    const day = String(tomorrow.getDate()).padStart(2, "0");
    const year = tomorrow.getFullYear();
    expect(isValidChildBirthDate(`${month}/${day}/${year}`)).toBe(false);
  });

  it("should accept today's date", () => {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const year = today.getFullYear();
    expect(isValidChildBirthDate(`${month}/${day}/${year}`)).toBe(true);
  });

  it("should accept past dates", () => {
    expect(isValidChildBirthDate("01/01/2024")).toBe(true);
    expect(isValidChildBirthDate("10/22/2023")).toBe(true);
  });

  it("should reject dates before 1900", () => {
    expect(isValidChildBirthDate("01/01/1899")).toBe(false);
  });

  it("should reject invalid formats", () => {
    expect(isValidChildBirthDate("22/10/2023")).toBe(false); // DD/MM/YYYY
    expect(isValidChildBirthDate("2023-10-22")).toBe(false); // ISO format
  });
});

describe("Timezone consistency tests", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  describe("isValidBirthDate", () => {
    it("should use UTC year for maxYear default to avoid New Year timezone issues", () => {
      // Mock current time to be December 31, 2024 at 11:00 PM UTC
      // At this time, some timezones are already in 2025
      vi.useFakeTimers();
      vi.setSystemTime(new Date("2024-12-31T23:00:00.000Z"));

      // Should accept dates in 2024 (the current UTC year)
      expect(isValidBirthDate("01/01/2024")).toBe(true);
      expect(isValidBirthDate("12/31/2024")).toBe(true);

      // Should reject dates in 2025 (future in UTC)
      expect(isValidBirthDate("01/01/2025")).toBe(false);
    });

    it("should consistently validate across timezone boundaries on New Year", () => {
      // Mock current time to be January 1, 2025 at 1:00 AM UTC
      // Some timezones are still in 2024
      vi.useFakeTimers();
      vi.setSystemTime(new Date("2025-01-01T01:00:00.000Z"));

      // Should accept dates in 2025 (the current UTC year)
      expect(isValidBirthDate("01/01/2025")).toBe(true);

      // Should reject dates in 2026 (future in UTC)
      expect(isValidBirthDate("01/01/2026")).toBe(false);
    });
  });

  describe("isValidChildBirthDate", () => {
    it("should correctly validate dates around the current UTC day", () => {
      // Mock current time to be October 26, 2025 at 10:00 AM UTC
      vi.useFakeTimers();
      vi.setSystemTime(new Date("2025-10-26T10:00:00.000Z"));

      // Today in UTC should be valid
      expect(isValidChildBirthDate("10/26/2025")).toBe(true);

      // Yesterday in UTC should be valid
      expect(isValidChildBirthDate("10/25/2025")).toBe(true);

      // Tomorrow in UTC should be invalid
      expect(isValidChildBirthDate("10/27/2025")).toBe(false);
    });

    it("should validate consistently at midnight UTC", () => {
      // Mock current time to be midnight UTC
      vi.useFakeTimers();
      vi.setSystemTime(new Date("2025-06-15T00:00:00.000Z"));

      // Today should be valid
      expect(isValidChildBirthDate("06/15/2025")).toBe(true);

      // Yesterday should be valid
      expect(isValidChildBirthDate("06/14/2025")).toBe(true);

      // Tomorrow should be invalid
      expect(isValidChildBirthDate("06/16/2025")).toBe(false);
    });

    it("should validate consistently just before midnight UTC", () => {
      // Mock current time to be 11:59 PM UTC
      vi.useFakeTimers();
      vi.setSystemTime(new Date("2025-06-15T23:59:59.999Z"));

      // Today should be valid
      expect(isValidChildBirthDate("06/15/2025")).toBe(true);

      // Yesterday should be valid
      expect(isValidChildBirthDate("06/14/2025")).toBe(true);

      // Tomorrow should be invalid
      expect(isValidChildBirthDate("06/16/2025")).toBe(false);
    });

    it("should handle date boundaries consistently in UTC", () => {
      // Test at the end of a month
      vi.useFakeTimers();
      vi.setSystemTime(new Date("2025-01-31T23:59:59.999Z"));

      expect(isValidChildBirthDate("01/31/2025")).toBe(true);
      expect(isValidChildBirthDate("01/30/2025")).toBe(true);
      expect(isValidChildBirthDate("02/01/2025")).toBe(false);
    });
  });
});
