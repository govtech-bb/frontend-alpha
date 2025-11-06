import { describe, expect, it } from "vitest";
import {
  isValidBirthDate,
  isValidChildBirthDate,
  isValidDate,
  validateDateFields,
} from "../date-validation";

describe("isValidDate", () => {
  it("should accept valid YYYY-MM-DD dates", () => {
    expect(isValidDate("2024-01-01")).toBe(true);
    expect(isValidDate("2024-12-31")).toBe(true);
    expect(isValidDate("1986-07-30")).toBe(true);
    expect(isValidDate("1990-03-15")).toBe(true);
    expect(isValidDate("1988-05-20")).toBe(true);
  });

  it("should reject invalid format", () => {
    expect(isValidDate("2024-01-01")).toBe(false); // ISO format
    expect(isValidDate("01-01-2024")).toBe(false); // Dashes
    expect(isValidDate("2024-13-01")).toBe(false); // Invalid month
    expect(isValidDate("2024-00-01")).toBe(false); // Invalid month
    expect(isValidDate("30 July 1986")).toBe(false); // Text format with spaces
  });

  it("should accept single digit months and days (auto-normalized)", () => {
    expect(isValidDate("1/1/2024")).toBe(true); // Normalized to 01/01/2024
    expect(isValidDate("7/30/1986")).toBe(true); // Normalized to 07/30/1986
    expect(isValidDate("12/5/2024")).toBe(true); // Normalized to 12/05/2024
  });

  it("should accept text month names (auto-normalized)", () => {
    expect(isValidDate("1977-july-30")).toBe(true); // Normalized to 07/30/1977
    expect(isValidDate("2024-January-15")).toBe(true); // Normalized to 01/15/2024
    expect(isValidDate("2024-Dec-25")).toBe(true); // Normalized to 12/25/2024
  });

  it("should reject invalid dates", () => {
    expect(isValidDate("2024-02-30")).toBe(false); // Feb doesn't have 30 days
    expect(isValidDate("2024-02-31")).toBe(false); // Feb doesn't have 31 days
    expect(isValidDate("2024-04-31")).toBe(false); // April doesn't have 31 days
    expect(isValidDate("2024-06-31")).toBe(false); // June doesn't have 31 days
    expect(isValidDate("2024-09-31")).toBe(false); // September doesn't have 31 days
    expect(isValidDate("2024-11-31")).toBe(false); // November doesn't have 31 days
    expect(isValidDate("2024-01-00")).toBe(false); // Invalid day
    expect(isValidDate("2024-01-32")).toBe(false); // Day too high
  });

  it("should handle leap years correctly", () => {
    expect(isValidDate("2024-02-29")).toBe(true); // 2024 is leap year
    expect(isValidDate("2023-02-29")).toBe(false); // 2023 is not leap year
    expect(isValidDate("2000-02-29")).toBe(true); // 2000 is leap year
    expect(isValidDate("1900-02-29")).toBe(false); // 1900 is not leap year
  });
});

describe("isValidBirthDate", () => {
  it("should reject dates before 1900", () => {
    expect(isValidBirthDate("1899-01-01")).toBe(false);
    expect(isValidBirthDate("1899-12-31")).toBe(false);
  });

  it("should accept dates from 1900 onwards", () => {
    expect(isValidBirthDate("1900-01-01")).toBe(true);
    expect(isValidBirthDate("1986-07-30")).toBe(true);
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
    expect(isValidBirthDate("1986-30-07")).toBe(false); // DD/MM/YYYY
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
    expect(isValidChildBirthDate("2024-01-01")).toBe(true);
    expect(isValidChildBirthDate("2023-10-22")).toBe(true);
  });

  it("should reject dates before 1900", () => {
    expect(isValidChildBirthDate("1899-01-01")).toBe(false);
  });

  it("should reject invalid formats", () => {
    expect(isValidChildBirthDate("2023-22-10")).toBe(false); // DD/MM/YYYY
    expect(isValidChildBirthDate("2023-10-22")).toBe(false); // ISO format
  });
});

describe("validateDateFields", () => {
  describe("missing field detection", () => {
    it("should return error for missing day", () => {
      const result = validateDateFields("2024-01-00");
      expect(result).toEqual({ day: "Enter a day" });
    });

    it("should return error for missing month", () => {
      const result = validateDateFields("2024-00-15");
      expect(result).toEqual({ month: "Enter a month" });
    });

    it("should return error for missing year", () => {
      const result = validateDateFields("0000-01-15");
      expect(result).toEqual({ year: "Enter a year" });
    });

    it("should return errors for all missing fields", () => {
      const result = validateDateFields("0000-00-00");
      expect(result).toEqual({
        day: "Enter a day",
        month: "Enter a month",
        year: "Enter a year",
      });
    });

    it("should return error for empty string", () => {
      const result = validateDateFields("");
      expect(result).toEqual({
        day: "Enter a day",
        month: "Enter a month",
        year: "Enter a year",
      });
    });
  });

  describe("invalid day detection", () => {
    it("should return error for day too high", () => {
      const result = validateDateFields("2024-01-32");
      expect(result).toEqual({ day: "Day must be between 1 and 31" });
    });

    it("should return error for day zero", () => {
      const result = validateDateFields("2024-01-00");
      expect(result).toEqual({ day: "Enter a day" });
    });

    it("should return error for invalid day in specific month (Feb 30)", () => {
      const result = validateDateFields("2024-02-30");
      expect(result).toEqual({ day: "Enter a valid day for this month" });
    });

    it("should return error for invalid day in specific month (April 31)", () => {
      const result = validateDateFields("2024-04-31");
      expect(result).toEqual({ day: "Enter a valid day for this month" });
    });
  });

  describe("invalid month detection", () => {
    it("should return error for month too high", () => {
      const result = validateDateFields("2024-13-15");
      expect(result).toEqual({ month: "Month must be between 1 and 12" });
    });

    it("should return error for month zero", () => {
      const result = validateDateFields("2024-00-15");
      expect(result).toEqual({ month: "Enter a month" });
    });

    it("should return error for invalid text month", () => {
      const result = validateDateFields("2024-Xyz-15");
      expect(result).toEqual({ month: "Enter a valid month" });
    });

    it("should return error for partial text month", () => {
      const result = validateDateFields("2024-Ju-15");
      expect(result).toEqual({ month: "Enter a valid month" });
    });
  });

  describe("invalid year detection", () => {
    it("should return error for incomplete year (3 digits)", () => {
      const result = validateDateFields("01/15/202");
      expect(result).toEqual({ year: "Year must be 4 digits" });
    });

    it("should return error for incomplete year (2 digits)", () => {
      const result = validateDateFields("01/15/24");
      expect(result).toEqual({ year: "Year must be 4 digits" });
    });

    it("should return error for incomplete year (1 digit)", () => {
      const result = validateDateFields("01/15/2");
      expect(result).toEqual({ year: "Year must be 4 digits" });
    });

    it("should return error for year before 1900", () => {
      const result = validateDateFields("1899-01-15");
      expect(result).toEqual({ year: "Year must be 1900 or later" });
    });
  });

  describe("future date detection", () => {
    it("should return error for future date", () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const month = String(tomorrow.getMonth() + 1).padStart(2, "0");
      const day = String(tomorrow.getDate()).padStart(2, "0");
      const year = tomorrow.getFullYear();

      const result = validateDateFields(`${month}/${day}/${year}`);
      expect(result).toEqual({ year: "Date cannot be in the future" });
    });

    it("should not return error for today's date", () => {
      const today = new Date();
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const day = String(today.getDate()).padStart(2, "0");
      const year = today.getFullYear();

      const result = validateDateFields(`${month}/${day}/${year}`);
      expect(result).toBeNull();
    });
  });

  describe("valid dates", () => {
    it("should return null for valid numeric date", () => {
      const result = validateDateFields("1986-07-30");
      expect(result).toBeNull();
    });

    it("should return null for valid text month date", () => {
      const result = validateDateFields("1986-July-30");
      expect(result).toBeNull();
    });

    it("should return null for valid abbreviated text month", () => {
      const result = validateDateFields("2024-Jan-15");
      expect(result).toBeNull();
    });

    it("should return null for valid date with case-insensitive month", () => {
      const result = validateDateFields("2024-MARCH-15");
      expect(result).toBeNull();
    });
  });

  describe("leap year handling", () => {
    it("should allow Feb 29 in leap year", () => {
      const result = validateDateFields("2024-02-29");
      expect(result).toBeNull();
    });

    it("should reject Feb 29 in non-leap year", () => {
      const result = validateDateFields("2023-02-29");
      expect(result).toEqual({ day: "Enter a valid day for this month" });
    });

    it("should allow Feb 29 in year 2000 (leap year)", () => {
      const result = validateDateFields("2000-02-29");
      expect(result).toBeNull();
    });

    it("should reject Feb 29 in year 1900 (not a leap year)", () => {
      const result = validateDateFields("1900-02-29");
      expect(result).toEqual({ day: "Enter a valid day for this month" });
    });
  });

  describe("multiple errors", () => {
    it("should return only first error found (missing day takes priority)", () => {
      const result = validateDateFields("2024-00-00");
      expect(result).toEqual({
        day: "Enter a day",
        month: "Enter a month",
      });
    });

    it("should return day error when day and year invalid", () => {
      const result = validateDateFields("01/32/24");
      expect(result).toEqual({
        day: "Day must be between 1 and 31",
        year: "Year must be 4 digits",
      });
    });
  });
});
