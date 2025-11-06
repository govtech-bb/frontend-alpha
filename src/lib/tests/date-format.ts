import { describe, expect, it } from "vitest";
import {
  convertFromInputFormat,
  convertToInputFormat,
  convertToISO8601,
  normalizeMonthInput,
  parseISO8601,
  parseTextMonth,
} from "../date-format";

describe("convertToInputFormat", () => {
  describe("valid conversions", () => {
    it("should convert YYYY-MM-DD to YYYY-MM-DD", () => {
      expect(convertToInputFormat("1986-07-30")).toBe("1986-07-30");
    });

    it("should convert single digit month and day with zero padding", () => {
      expect(convertToInputFormat("2024-01-05")).toBe("2024-01-05");
    });

    it("should convert end of year date", () => {
      expect(convertToInputFormat("2024-12-31")).toBe("2024-12-31");
    });

    it("should convert beginning of year date", () => {
      expect(convertToInputFormat("2024-01-01")).toBe("2024-01-01");
    });

    it("should convert leap day", () => {
      expect(convertToInputFormat("2024-02-29")).toBe("2024-02-29");
    });

    it("should convert dates from different centuries", () => {
      expect(convertToInputFormat("1990-03-15")).toBe("1990-03-15");
      expect(convertToInputFormat("2025-10-22")).toBe("2025-10-22");
    });
  });

  describe("edge cases and invalid inputs", () => {
    it("should return empty string for empty input", () => {
      expect(convertToInputFormat("")).toBe("");
    });

    it("should return empty string for whitespace only", () => {
      expect(convertToInputFormat("   ")).toBe("");
    });

    it("should return empty string for invalid format", () => {
      expect(convertToInputFormat("invalid")).toBe("");
    });

    it("should return empty string for wrong separator", () => {
      expect(convertToInputFormat("07-30-1986")).toBe("");
    });

    it("should accept and validate YYYY-MM-DD format", () => {
      expect(convertToInputFormat("1986-07-30")).toBe("1986-07-30");
    });

    it("should return empty string for single digit month without zero padding", () => {
      expect(convertToInputFormat("1986-7-30")).toBe("");
    });

    it("should return empty string for single digit day without zero padding", () => {
      expect(convertToInputFormat("1986-07-3")).toBe("");
    });

    it("should return empty string for wrong number of year digits", () => {
      expect(convertToInputFormat("07/30/86")).toBe("");
    });
  });
});

describe("convertFromInputFormat", () => {
  describe("valid conversions", () => {
    it("should convert YYYY-MM-DD to YYYY-MM-DD", () => {
      expect(convertFromInputFormat("1986-07-30")).toBe("1986-07-30");
    });

    it("should convert single digit month and day with zero padding", () => {
      expect(convertFromInputFormat("2024-01-05")).toBe("2024-01-05");
    });

    it("should convert end of year date", () => {
      expect(convertFromInputFormat("2024-12-31")).toBe("2024-12-31");
    });

    it("should convert beginning of year date", () => {
      expect(convertFromInputFormat("2024-01-01")).toBe("2024-01-01");
    });

    it("should convert leap day", () => {
      expect(convertFromInputFormat("2024-02-29")).toBe("2024-02-29");
    });

    it("should convert dates from different centuries", () => {
      expect(convertFromInputFormat("1990-03-15")).toBe("1990-03-15");
      expect(convertFromInputFormat("2025-10-22")).toBe("2025-10-22");
    });
  });

  describe("edge cases and invalid inputs", () => {
    it("should return empty string for empty input", () => {
      expect(convertFromInputFormat("")).toBe("");
    });

    it("should return empty string for whitespace only", () => {
      expect(convertFromInputFormat("   ")).toBe("");
    });

    it("should return empty string for invalid format", () => {
      expect(convertFromInputFormat("invalid")).toBe("");
    });

    it("should return empty string for wrong separator", () => {
      expect(convertFromInputFormat("1986/07/30")).toBe("");
    });

    it("should accept and validate YYYY-MM-DD format", () => {
      expect(convertFromInputFormat("1986-07-30")).toBe("1986-07-30");
    });

    it("should return empty string for single digit month without zero padding", () => {
      expect(convertFromInputFormat("1986-7-30")).toBe("");
    });

    it("should return empty string for single digit day without zero padding", () => {
      expect(convertFromInputFormat("1986-07-3")).toBe("");
    });

    it("should return empty string for wrong number of year digits", () => {
      expect(convertFromInputFormat("86-07-30")).toBe("");
    });
  });
});

describe("round-trip conversions", () => {
  it("should maintain data integrity when converting back and forth", () => {
    const original = "1986-07-30";
    const toInput = convertToInputFormat(original);
    const backToOriginal = convertFromInputFormat(toInput);
    expect(backToOriginal).toBe(original);
  });

  it("should maintain data integrity in reverse direction", () => {
    const original = "1986-07-30";
    const fromInput = convertFromInputFormat(original);
    const backToOriginal = convertToInputFormat(fromInput);
    expect(backToOriginal).toBe(original);
  });

  it("should handle multiple round trips", () => {
    let date = "2024-12-25";
    for (let i = 0; i < 10; i++) {
      const input = convertToInputFormat(date);
      date = convertFromInputFormat(input);
    }
    expect(date).toBe("2024-12-25");
  });
});

describe("semantic date validation", () => {
  describe("invalid dates should be rejected", () => {
    it("should reject February 30th", () => {
      expect(convertToISO8601("2024-02-30")).toBe("");
      // parseISO8601 only parses format, does not validate
      expect(parseISO8601("2024-02-30")).toEqual({
        day: "30",
        month: "02",
        year: "2024",
      });
    });

    it("should reject February 31st", () => {
      expect(convertToISO8601("2024-02-31")).toBe("");
    });

    it("should reject April 31st (April has 30 days)", () => {
      expect(convertToISO8601("2024-04-31")).toBe("");
    });

    it("should reject month 13", () => {
      expect(convertToISO8601("2024-13-01")).toBe("");
    });

    it("should reject month 00", () => {
      expect(convertToISO8601("2024-00-15")).toBe("");
    });

    it("should reject day 00", () => {
      expect(convertToISO8601("2024-01-00")).toBe("");
    });

    it("should reject impossible dates like 99/99/9999", () => {
      expect(convertToISO8601("9999-99-99")).toBe("");
    });

    it("should reject February 29 in non-leap years", () => {
      expect(convertToISO8601("2023-02-29")).toBe("");
    });
  });

  describe("valid dates should be accepted", () => {
    it("should accept February 29 in leap years", () => {
      expect(convertToISO8601("2024-02-29")).toBe("2024-02-29");
    });

    it("should accept day 31 in months with 31 days", () => {
      expect(convertToISO8601("2024-01-31")).toBe("2024-01-31");
      expect(convertToISO8601("2024-03-31")).toBe("2024-03-31");
    });
  });
});

describe("parseTextMonth", () => {
  describe("short month names (unambiguous)", () => {
    it("should convert Jan to 01", () => {
      expect(parseTextMonth("Jan")).toBe("01");
    });

    it("should convert Feb to 02", () => {
      expect(parseTextMonth("Feb")).toBe("02");
    });

    it("should convert Mar to 03", () => {
      expect(parseTextMonth("Mar")).toBe("03");
    });

    it("should convert Apr to 04", () => {
      expect(parseTextMonth("Apr")).toBe("04");
    });

    it("should convert Jun to 06", () => {
      expect(parseTextMonth("Jun")).toBe("06");
    });

    it("should convert Jul to 07", () => {
      expect(parseTextMonth("Jul")).toBe("07");
    });

    it("should convert Aug to 08", () => {
      expect(parseTextMonth("Aug")).toBe("08");
    });

    it("should convert Sep to 09", () => {
      expect(parseTextMonth("Sep")).toBe("09");
    });

    it("should convert Oct to 10", () => {
      expect(parseTextMonth("Oct")).toBe("10");
    });

    it("should convert Nov to 11", () => {
      expect(parseTextMonth("Nov")).toBe("11");
    });

    it("should convert Dec to 12", () => {
      expect(parseTextMonth("Dec")).toBe("12");
    });
  });

  describe("full month names", () => {
    it("should convert January to 01", () => {
      expect(parseTextMonth("January")).toBe("01");
    });

    it("should convert February to 02", () => {
      expect(parseTextMonth("February")).toBe("02");
    });

    it("should convert December to 12", () => {
      expect(parseTextMonth("December")).toBe("12");
    });

    it("should convert September to 09", () => {
      expect(parseTextMonth("September")).toBe("09");
    });
  });

  describe("case insensitivity", () => {
    it("should handle lowercase", () => {
      expect(parseTextMonth("jan")).toBe("01");
      expect(parseTextMonth("december")).toBe("12");
    });

    it("should handle lowercase july", () => {
      expect(parseTextMonth("july")).toBe("07");
    });

    it("should handle uppercase", () => {
      expect(parseTextMonth("JAN")).toBe("01");
      expect(parseTextMonth("DECEMBER")).toBe("12");
    });

    it("should handle mixed case", () => {
      expect(parseTextMonth("JaN")).toBe("01");
      expect(parseTextMonth("DeCeMbEr")).toBe("12");
    });
  });

  describe("numeric input (passthrough)", () => {
    it("should convert single digit to zero-padded", () => {
      expect(parseTextMonth("1")).toBe("01");
      expect(parseTextMonth("7")).toBe("07");
    });

    it("should pass through two-digit months", () => {
      expect(parseTextMonth("12")).toBe("12");
      expect(parseTextMonth("01")).toBe("01");
    });

    it("should return empty for invalid numeric months", () => {
      expect(parseTextMonth("13")).toBe("");
      expect(parseTextMonth("00")).toBe("");
      expect(parseTextMonth("99")).toBe("");
    });
  });

  describe("ambiguous input", () => {
    it("should return empty for 'Ju' (June or July)", () => {
      expect(parseTextMonth("Ju")).toBe("");
    });

    it("should return empty for 'Ma' (March or May)", () => {
      expect(parseTextMonth("Ma")).toBe("");
    });

    it("should return empty for 'M' (multiple matches)", () => {
      expect(parseTextMonth("M")).toBe("");
    });

    it("should return empty for 'J' (Jan, Jun, Jul)", () => {
      expect(parseTextMonth("J")).toBe("");
    });
  });

  describe("edge cases and invalid inputs", () => {
    it("should return empty for empty string", () => {
      expect(parseTextMonth("")).toBe("");
    });

    it("should return empty for whitespace", () => {
      expect(parseTextMonth("   ")).toBe("");
    });

    it("should return empty for invalid month names", () => {
      expect(parseTextMonth("Foo")).toBe("");
      expect(parseTextMonth("Bar")).toBe("");
      expect(parseTextMonth("xyz")).toBe("");
    });

    it("should return empty for partial unrecognizable input", () => {
      expect(parseTextMonth("Janx")).toBe("");
      expect(parseTextMonth("Decz")).toBe("");
    });
  });

  describe("partial but unambiguous matches", () => {
    it("should convert 'Janu' to 01 (only January starts with Janu)", () => {
      expect(parseTextMonth("Janu")).toBe("01");
    });

    it("should convert 'Febr' to 02 (only February starts with Febr)", () => {
      expect(parseTextMonth("Febr")).toBe("02");
    });

    it("should convert 'Ap' to 04 (only April starts with Ap)", () => {
      expect(parseTextMonth("Ap")).toBe("04");
    });

    it("should convert 'May' to 05 (May is unambiguous)", () => {
      expect(parseTextMonth("May")).toBe("05");
    });
  });
});

describe("normalizeMonthInput", () => {
  describe("text month conversion", () => {
    it("should convert short month name to numeric format", () => {
      expect(normalizeMonthInput("2024-Jan-15")).toBe("2024-01-15");
    });

    it("should convert full month name to numeric format", () => {
      expect(normalizeMonthInput("2024-December-25")).toBe("2024-12-25");
    });

    it("should handle case insensitive month names", () => {
      expect(normalizeMonthInput("2024-jan-15")).toBe("2024-01-15");
      expect(normalizeMonthInput("2024-DECEMBER-25")).toBe("2024-12-25");
    });

    it("should convert lowercase july to numeric format", () => {
      expect(normalizeMonthInput("1977-july-30")).toBe("1977-07-30");
    });
  });

  describe("numeric month passthrough", () => {
    it("should pad single digit numeric months", () => {
      expect(normalizeMonthInput("2024-7-15")).toBe("2024-07-15");
    });

    it("should preserve two-digit numeric months", () => {
      expect(normalizeMonthInput("2024-12-25")).toBe("2024-12-25");
    });
  });

  describe("ambiguous input preservation", () => {
    it("should preserve ambiguous month input unchanged", () => {
      expect(normalizeMonthInput("2024-Ju-15")).toBe("2024-Ju-15");
    });

    it("should preserve invalid month input unchanged", () => {
      expect(normalizeMonthInput("2024-Foo-15")).toBe("2024-Foo-15");
    });
  });

  describe("edge cases", () => {
    it("should handle empty input", () => {
      expect(normalizeMonthInput("")).toBe("");
    });

    it("should handle partial dates", () => {
      expect(normalizeMonthInput("0000-Jan-00")).toBe("0000-01-00");
    });

    it("should normalize day and year padding", () => {
      expect(normalizeMonthInput("2024-Jan-5")).toBe("2024-01-05");
    });
  });

  describe("backward compatibility", () => {
    it("should handle already normalized dates", () => {
      expect(normalizeMonthInput("2024-01-15")).toBe("2024-01-15");
      expect(normalizeMonthInput("2024-12-25")).toBe("2024-12-25");
    });
  });
});
