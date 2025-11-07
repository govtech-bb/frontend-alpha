import { describe, expect, it } from "vitest";
import {
  combine,
  formatForDisplay,
  isValidBirthDate,
  isValidChildBirthDate,
  parse,
  validateFields,
} from "../dates";

describe("parse", () => {
  describe("valid formats", () => {
    it("should parse YYYY-MM-DD format", () => {
      expect(parse("1986-07-30")).toEqual({
        day: "30",
        month: "07",
        year: "1986",
      });
    });

    it("should parse dates with leading zeros", () => {
      expect(parse("2024-01-05")).toEqual({
        day: "05",
        month: "01",
        year: "2024",
      });
    });

    it("should parse end of year dates", () => {
      expect(parse("2024-12-31")).toEqual({
        day: "31",
        month: "12",
        year: "2024",
      });
    });
  });

  describe("edge cases", () => {
    it("should return empty strings for empty input", () => {
      expect(parse("")).toEqual({ day: "", month: "", year: "" });
    });

    it("should return empty strings for whitespace only", () => {
      expect(parse("   ")).toEqual({ day: "", month: "", year: "" });
    });

    it("should return empty strings for invalid format", () => {
      expect(parse("invalid")).toEqual({ day: "", month: "", year: "" });
    });

    it("should return empty strings for wrong separator", () => {
      expect(parse("07/30/1986")).toEqual({ day: "", month: "", year: "" });
    });
  });
});

describe("combine", () => {
  describe("valid combinations", () => {
    it("should combine year, month, day into ISO 8601 format", () => {
      expect(combine("1986", "7", "30")).toBe("1986-07-30");
    });

    it("should pad single digit month and day", () => {
      expect(combine("2024", "1", "5")).toBe("2024-01-05");
    });

    it("should handle already padded values", () => {
      expect(combine("2024", "12", "25")).toBe("2024-12-25");
    });

    it("should pad year if less than 4 digits", () => {
      expect(combine("24", "01", "15")).toBe("0024-01-15");
    });
  });

  describe("partial dates", () => {
    it("should return empty string if all components empty", () => {
      expect(combine("", "", "")).toBe("");
    });

    it("should pad empty year with zeros", () => {
      expect(combine("", "01", "15")).toBe("0000-01-15");
    });

    it("should pad empty month with zeros", () => {
      expect(combine("2024", "", "15")).toBe("2024-00-15");
    });

    it("should pad empty day with zeros", () => {
      expect(combine("2024", "01", "")).toBe("2024-01-00");
    });
  });

  describe("round-trip with parse", () => {
    it("should maintain data integrity when parsing and combining", () => {
      const original = "1986-07-30";
      const { day, month, year } = parse(original);
      const combined = combine(year, month, day);
      expect(combined).toBe(original);
    });
  });

  describe("text month handling", () => {
    it("should not pad single letter months", () => {
      expect(combine("2024", "J", "15")).toBe("2024-J-15");
    });

    it("should not pad two letter months", () => {
      expect(combine("2024", "Ja", "15")).toBe("2024-Ja-15");
    });

    it("should not pad abbreviated month names", () => {
      expect(combine("2024", "Jan", "15")).toBe("2024-Jan-15");
      expect(combine("2024", "Feb", "20")).toBe("2024-Feb-20");
      expect(combine("2024", "Dec", "25")).toBe("2024-Dec-25");
    });

    it("should not pad full month names", () => {
      expect(combine("2024", "January", "15")).toBe("2024-January-15");
      expect(combine("2024", "February", "20")).toBe("2024-February-20");
      expect(combine("2024", "December", "25")).toBe("2024-December-25");
    });

    it("should still pad numeric months", () => {
      expect(combine("2024", "1", "15")).toBe("2024-01-15");
      expect(combine("2024", "9", "5")).toBe("2024-09-05");
      expect(combine("2024", "12", "25")).toBe("2024-12-25");
    });

    it("should handle mixed case month names", () => {
      expect(combine("2024", "JANUARY", "15")).toBe("2024-JANUARY-15");
      expect(combine("2024", "january", "15")).toBe("2024-january-15");
    });
  });
});

describe("validateFields", () => {
  describe("missing fields", () => {
    it("should return error for missing day", () => {
      const result = validateFields("2024-01-00");
      expect(result).toEqual({ day: "Enter a day" });
    });

    it("should return error for missing month", () => {
      const result = validateFields("2024-00-15");
      expect(result).toEqual({ month: "Enter a month" });
    });

    it("should return error for missing year", () => {
      const result = validateFields("0000-01-15");
      expect(result).toEqual({ year: "Enter a year" });
    });

    it("should return errors for all missing fields", () => {
      const result = validateFields("0000-00-00");
      expect(result).toEqual({
        day: "Enter a day",
        month: "Enter a month",
        year: "Enter a year",
      });
    });

    it("should return errors for empty string", () => {
      const result = validateFields("");
      expect(result).toEqual({
        day: "Enter a day",
        month: "Enter a month",
        year: "Enter a year",
      });
    });
  });

  describe("invalid day", () => {
    it("should return error for day too high", () => {
      const result = validateFields("2024-01-32");
      expect(result).toEqual({ day: "Day must be between 1 and 31" });
    });

    it("should return error for day zero", () => {
      const result = validateFields("2024-01-00");
      expect(result).toEqual({ day: "Enter a day" });
    });

    it("should return error for February 30", () => {
      const result = validateFields("2024-02-30");
      expect(result).toEqual({ day: "Enter a valid day for this month" });
    });

    it("should return error for April 31", () => {
      const result = validateFields("2024-04-31");
      expect(result).toEqual({ day: "Enter a valid day for this month" });
    });
  });

  describe("invalid month", () => {
    it("should return error for month too high", () => {
      const result = validateFields("2024-13-15");
      expect(result).toEqual({ month: "Month must be between 1 and 12" });
    });

    it("should return error for month zero", () => {
      const result = validateFields("2024-00-15");
      expect(result).toEqual({ month: "Enter a month" });
    });
  });

  describe("invalid year", () => {
    it("should return error for incomplete year (3 digits)", () => {
      const result = validateFields("202-01-15");
      expect(result).toEqual({ year: "Year must be 4 digits" });
    });

    it("should return error for year before 1900", () => {
      const result = validateFields("1899-01-15");
      expect(result).toEqual({ year: "Year must be 1900 or later" });
    });
  });

  describe("future dates", () => {
    it("should return error for future date", () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const month = String(tomorrow.getMonth() + 1).padStart(2, "0");
      const day = String(tomorrow.getDate()).padStart(2, "0");
      const year = tomorrow.getFullYear();

      const result = validateFields(`${year}-${month}-${day}`);
      expect(result).toEqual({ year: "Date cannot be in the future" });
    });

    it("should allow today's date", () => {
      const today = new Date();
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const day = String(today.getDate()).padStart(2, "0");
      const year = today.getFullYear();

      const result = validateFields(`${year}-${month}-${day}`);
      expect(result).toBeNull();
    });
  });

  describe("leap years", () => {
    it("should allow February 29 in leap year", () => {
      const result = validateFields("2024-02-29");
      expect(result).toBeNull();
    });

    it("should reject February 29 in non-leap year", () => {
      const result = validateFields("2023-02-29");
      expect(result).toEqual({ day: "Enter a valid day for this month" });
    });

    it("should allow February 29 in year 2000", () => {
      const result = validateFields("2000-02-29");
      expect(result).toBeNull();
    });

    it("should reject February 29 in year 1900", () => {
      const result = validateFields("1900-02-29");
      expect(result).toEqual({ day: "Enter a valid day for this month" });
    });
  });

  describe("valid dates", () => {
    it("should return null for valid date", () => {
      const result = validateFields("1986-07-30");
      expect(result).toBeNull();
    });

    it("should return null for valid leap day", () => {
      const result = validateFields("2024-02-29");
      expect(result).toBeNull();
    });

    it("should return null for end of month dates", () => {
      expect(validateFields("2024-01-31")).toBeNull();
      expect(validateFields("2024-03-31")).toBeNull();
    });
  });

  describe("text month validation", () => {
    it("should accept unambiguous abbreviated month names", () => {
      expect(validateFields("2011-jul-1")).toBeNull();
      expect(validateFields("2011-jan-1")).toBeNull();
      expect(validateFields("2011-dec-25")).toBeNull();
      expect(validateFields("2011-ap-15")).toBeNull(); // april (unambiguous)
      expect(validateFields("2011-au-20")).toBeNull(); // august (unambiguous)
      expect(validateFields("2011-mar-5")).toBeNull(); // march (unambiguous)
    });

    it("should accept full month names (case-insensitive)", () => {
      expect(validateFields("2011-july-1")).toBeNull();
      expect(validateFields("2011-January-1")).toBeNull();
      expect(validateFields("2011-DECEMBER-25")).toBeNull();
    });

    it("should accept minimal unambiguous prefixes", () => {
      expect(validateFields("2011-jan-1")).toBeNull(); // january
      expect(validateFields("2011-feb-1")).toBeNull(); // february
      expect(validateFields("2011-mar-1")).toBeNull(); // march
      expect(validateFields("2011-ap-1")).toBeNull(); // april
      expect(validateFields("2011-may-1")).toBeNull(); // may
      expect(validateFields("2011-jun-1")).toBeNull(); // june
      expect(validateFields("2011-jul-1")).toBeNull(); // july
      expect(validateFields("2011-au-1")).toBeNull(); // august
      expect(validateFields("2011-s-1")).toBeNull(); // september (unambiguous)
      expect(validateFields("2011-o-1")).toBeNull(); // october (unambiguous)
      expect(validateFields("2011-n-1")).toBeNull(); // november (unambiguous)
      expect(validateFields("2011-d-1")).toBeNull(); // december (unambiguous)
    });

    it("should reject ambiguous month prefixes", () => {
      // "j" matches january, june, july
      expect(validateFields("2011-j-1")?.month).toBe("Enter a valid month");
      // "ju" matches june, july
      expect(validateFields("2011-ju-1")?.month).toBe("Enter a valid month");
      // "a" matches april, august
      expect(validateFields("2011-a-1")?.month).toBe("Enter a valid month");
    });

    it("should reject invalid month names", () => {
      const result = validateFields("2011-xyz-1");
      expect(result?.month).toBe("Enter a valid month");
    });

    it("should validate day ranges with text months", () => {
      // February 30 should fail
      const result = validateFields("2011-feb-30");
      expect(result?.day).toBe("Enter a valid day for this month");
    });

    it("should validate leap years with text months", () => {
      // 2024 is a leap year
      expect(validateFields("2024-feb-29")).toBeNull();
      // 2011 is not a leap year
      const result = validateFields("2011-feb-29");
      expect(result?.day).toBe("Enter a valid day for this month");
    });

    it("should check future dates with text months", () => {
      // Create a date far in the future
      const futureYear = new Date().getFullYear() + 10;
      const result = validateFields(`${futureYear}-jul-1`);
      expect(result?.year).toBe("Date cannot be in the future");
    });

    it("should handle edge case months that need more characters", () => {
      // June and July both start with "ju"
      expect(validateFields("2011-june-1")).toBeNull();
      expect(validateFields("2011-july-1")).toBeNull();
      // April and August both start with "a"
      expect(validateFields("2011-april-1")).toBeNull();
      expect(validateFields("2011-august-1")).toBeNull();
    });
  });
});

describe("isValidBirthDate", () => {
  it("should reject dates before 1900", () => {
    expect(isValidBirthDate("1899-01-01")).toBe(false);
  });

  it("should accept dates from 1900 onwards", () => {
    expect(isValidBirthDate("1900-01-01")).toBe(true);
    expect(isValidBirthDate("1986-07-30")).toBe(true);
  });

  it("should reject future dates", () => {
    const nextYear = new Date().getFullYear() + 1;
    expect(isValidBirthDate(`${nextYear}-01-01`)).toBe(false);
  });

  it("should accept current year dates", () => {
    const currentYear = new Date().getFullYear();
    expect(isValidBirthDate(`${currentYear}-01-01`)).toBe(true);
  });

  it("should reject invalid dates (Feb 30)", () => {
    expect(isValidBirthDate("1986-02-30")).toBe(false);
  });

  it("should reject empty strings", () => {
    expect(isValidBirthDate("")).toBe(false);
  });

  it("should accept custom year range", () => {
    expect(isValidBirthDate("1950-01-01", 1950, 2000)).toBe(true);
    expect(isValidBirthDate("1940-01-01", 1950, 2000)).toBe(false);
  });
});

describe("isValidChildBirthDate", () => {
  it("should reject future dates", () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const month = String(tomorrow.getMonth() + 1).padStart(2, "0");
    const day = String(tomorrow.getDate()).padStart(2, "0");
    const year = tomorrow.getFullYear();
    expect(isValidChildBirthDate(`${year}-${month}-${day}`)).toBe(false);
  });

  it("should accept today's date", () => {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const year = today.getFullYear();
    expect(isValidChildBirthDate(`${year}-${month}-${day}`)).toBe(true);
  });

  it("should accept past dates", () => {
    expect(isValidChildBirthDate("2024-01-01")).toBe(true);
    expect(isValidChildBirthDate("2023-10-22")).toBe(true);
  });

  it("should reject dates before 1900", () => {
    expect(isValidChildBirthDate("1899-01-01")).toBe(false);
  });

  it("should reject invalid dates", () => {
    expect(isValidChildBirthDate("2023-02-29")).toBe(false);
  });

  it("should reject empty strings", () => {
    expect(isValidChildBirthDate("")).toBe(false);
  });
});

describe("formatForDisplay", () => {
  describe("valid dates", () => {
    it("should format YYYY-MM-DD to spelled-out format", () => {
      expect(formatForDisplay("2011-07-30")).toBe("Jul 30, 2011");
    });

    it("should format all months correctly", () => {
      expect(formatForDisplay("2020-01-15")).toBe("Jan 15, 2020");
      expect(formatForDisplay("2020-02-15")).toBe("Feb 15, 2020");
      expect(formatForDisplay("2020-03-15")).toBe("Mar 15, 2020");
      expect(formatForDisplay("2020-04-15")).toBe("Apr 15, 2020");
      expect(formatForDisplay("2020-05-15")).toBe("May 15, 2020");
      expect(formatForDisplay("2020-06-15")).toBe("Jun 15, 2020");
      expect(formatForDisplay("2020-07-15")).toBe("Jul 15, 2020");
      expect(formatForDisplay("2020-08-15")).toBe("Aug 15, 2020");
      expect(formatForDisplay("2020-09-15")).toBe("Sep 15, 2020");
      expect(formatForDisplay("2020-10-15")).toBe("Oct 15, 2020");
      expect(formatForDisplay("2020-11-15")).toBe("Nov 15, 2020");
      expect(formatForDisplay("2020-12-15")).toBe("Dec 15, 2020");
    });

    it("should format edge case dates", () => {
      expect(formatForDisplay("2020-02-29")).toBe("Feb 29, 2020");
      expect(formatForDisplay("2000-01-01")).toBe("Jan 1, 2000");
      expect(formatForDisplay("1999-12-31")).toBe("Dec 31, 1999");
    });

    it("should format dates with single digit day", () => {
      expect(formatForDisplay("2010-03-05")).toBe("Mar 5, 2010");
    });
  });

  describe("invalid inputs", () => {
    it("should return empty string for empty input", () => {
      expect(formatForDisplay("")).toBe("");
    });

    it("should return empty string for whitespace only", () => {
      expect(formatForDisplay("   ")).toBe("");
    });

    it("should return empty string for undefined", () => {
      expect(formatForDisplay(undefined)).toBe("");
    });

    it("should return empty string for invalid format", () => {
      expect(formatForDisplay("invalid")).toBe("");
      expect(formatForDisplay("07-30-2011")).toBe("");
      expect(formatForDisplay("07/30/2011")).toBe("");
    });

    it("should return empty string for invalid dates", () => {
      expect(formatForDisplay("2011-02-30")).toBe("");
      expect(formatForDisplay("2019-02-29")).toBe(""); // Non-leap year
      expect(formatForDisplay("2011-13-01")).toBe("");
      expect(formatForDisplay("2011-01-32")).toBe("");
    });
  });
});
