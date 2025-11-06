import { describe, expect, it } from "vitest";
import {
  isValidBirthDate,
  isValidChildBirthDate,
  isValidDate,
  validateDateFields,
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
    expect(isValidDate("13/01/2024")).toBe(false); // Invalid month
    expect(isValidDate("00/01/2024")).toBe(false); // Invalid month
    expect(isValidDate("30 July 1986")).toBe(false); // Text format with spaces
  });

  it("should accept single digit months and days (auto-normalized)", () => {
    expect(isValidDate("1/1/2024")).toBe(true); // Normalized to 01/01/2024
    expect(isValidDate("7/30/1986")).toBe(true); // Normalized to 07/30/1986
    expect(isValidDate("12/5/2024")).toBe(true); // Normalized to 12/05/2024
  });

  it("should accept text month names (auto-normalized)", () => {
    expect(isValidDate("july/30/1977")).toBe(true); // Normalized to 07/30/1977
    expect(isValidDate("January/15/2024")).toBe(true); // Normalized to 01/15/2024
    expect(isValidDate("Dec/25/2024")).toBe(true); // Normalized to 12/25/2024
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

describe("validateDateFields", () => {
  describe("missing field detection", () => {
    it("should return error for missing day", () => {
      const result = validateDateFields("01/00/2024");
      expect(result).toEqual({ day: "Enter a day" });
    });

    it("should return error for missing month", () => {
      const result = validateDateFields("00/15/2024");
      expect(result).toEqual({ month: "Enter a month" });
    });

    it("should return error for missing year", () => {
      const result = validateDateFields("01/15/0000");
      expect(result).toEqual({ year: "Enter a year" });
    });

    it("should return errors for all missing fields", () => {
      const result = validateDateFields("00/00/0000");
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
      const result = validateDateFields("01/32/2024");
      expect(result).toEqual({ day: "Day must be between 1 and 31" });
    });

    it("should return error for day zero", () => {
      const result = validateDateFields("01/00/2024");
      expect(result).toEqual({ day: "Enter a day" });
    });

    it("should return error for invalid day in specific month (Feb 30)", () => {
      const result = validateDateFields("02/30/2024");
      expect(result).toEqual({ day: "Enter a valid day for this month" });
    });

    it("should return error for invalid day in specific month (April 31)", () => {
      const result = validateDateFields("04/31/2024");
      expect(result).toEqual({ day: "Enter a valid day for this month" });
    });
  });

  describe("invalid month detection", () => {
    it("should return error for month too high", () => {
      const result = validateDateFields("13/15/2024");
      expect(result).toEqual({ month: "Month must be between 1 and 12" });
    });

    it("should return error for month zero", () => {
      const result = validateDateFields("00/15/2024");
      expect(result).toEqual({ month: "Enter a month" });
    });

    it("should return error for invalid text month", () => {
      const result = validateDateFields("Xyz/15/2024");
      expect(result).toEqual({ month: "Enter a valid month" });
    });

    it("should return error for partial text month", () => {
      const result = validateDateFields("Ju/15/2024");
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
      const result = validateDateFields("01/15/1899");
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
      const result = validateDateFields("07/30/1986");
      expect(result).toBeNull();
    });

    it("should return null for valid text month date", () => {
      const result = validateDateFields("July/30/1986");
      expect(result).toBeNull();
    });

    it("should return null for valid abbreviated text month", () => {
      const result = validateDateFields("Jan/15/2024");
      expect(result).toBeNull();
    });

    it("should return null for valid date with case-insensitive month", () => {
      const result = validateDateFields("MARCH/15/2024");
      expect(result).toBeNull();
    });
  });

  describe("leap year handling", () => {
    it("should allow Feb 29 in leap year", () => {
      const result = validateDateFields("02/29/2024");
      expect(result).toBeNull();
    });

    it("should reject Feb 29 in non-leap year", () => {
      const result = validateDateFields("02/29/2023");
      expect(result).toEqual({ day: "Enter a valid day for this month" });
    });

    it("should allow Feb 29 in year 2000 (leap year)", () => {
      const result = validateDateFields("02/29/2000");
      expect(result).toBeNull();
    });

    it("should reject Feb 29 in year 1900 (not a leap year)", () => {
      const result = validateDateFields("02/29/1900");
      expect(result).toEqual({ day: "Enter a valid day for this month" });
    });
  });

  describe("multiple errors", () => {
    it("should return only first error found (missing day takes priority)", () => {
      const result = validateDateFields("00/00/2024");
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
