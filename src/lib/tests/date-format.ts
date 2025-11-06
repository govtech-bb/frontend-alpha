import { describe, expect, it } from "vitest";
import {
  convertFromInputFormat,
  convertToInputFormat,
  convertToISO8601,
  normalizeMonthInput,
  parseMMDDYYYY,
  parseTextMonth,
} from "../date-format";

describe("convertToInputFormat", () => {
  describe("valid conversions", () => {
    it("should convert MM/DD/YYYY to YYYY-MM-DD", () => {
      expect(convertToInputFormat("07/30/1986")).toBe("1986-07-30");
    });

    it("should convert single digit month and day with zero padding", () => {
      expect(convertToInputFormat("01/05/2024")).toBe("2024-01-05");
    });

    it("should convert end of year date", () => {
      expect(convertToInputFormat("12/31/2024")).toBe("2024-12-31");
    });

    it("should convert beginning of year date", () => {
      expect(convertToInputFormat("01/01/2024")).toBe("2024-01-01");
    });

    it("should convert leap day", () => {
      expect(convertToInputFormat("02/29/2024")).toBe("2024-02-29");
    });

    it("should convert dates from different centuries", () => {
      expect(convertToInputFormat("03/15/1990")).toBe("1990-03-15");
      expect(convertToInputFormat("10/22/2025")).toBe("2025-10-22");
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

    it("should return empty string for YYYY-MM-DD format (wrong direction)", () => {
      expect(convertToInputFormat("1986-07-30")).toBe("");
    });

    it("should return empty string for single digit month without zero padding", () => {
      expect(convertToInputFormat("7/30/1986")).toBe("");
    });

    it("should return empty string for single digit day without zero padding", () => {
      expect(convertToInputFormat("07/3/1986")).toBe("");
    });

    it("should return empty string for wrong number of year digits", () => {
      expect(convertToInputFormat("07/30/86")).toBe("");
    });
  });
});

describe("convertFromInputFormat", () => {
  describe("valid conversions", () => {
    it("should convert YYYY-MM-DD to MM/DD/YYYY", () => {
      expect(convertFromInputFormat("1986-07-30")).toBe("07/30/1986");
    });

    it("should convert single digit month and day with zero padding", () => {
      expect(convertFromInputFormat("2024-01-05")).toBe("01/05/2024");
    });

    it("should convert end of year date", () => {
      expect(convertFromInputFormat("2024-12-31")).toBe("12/31/2024");
    });

    it("should convert beginning of year date", () => {
      expect(convertFromInputFormat("2024-01-01")).toBe("01/01/2024");
    });

    it("should convert leap day", () => {
      expect(convertFromInputFormat("2024-02-29")).toBe("02/29/2024");
    });

    it("should convert dates from different centuries", () => {
      expect(convertFromInputFormat("1990-03-15")).toBe("03/15/1990");
      expect(convertFromInputFormat("2025-10-22")).toBe("10/22/2025");
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

    it("should return empty string for MM/DD/YYYY format (wrong direction)", () => {
      expect(convertFromInputFormat("07/30/1986")).toBe("");
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
    const original = "07/30/1986";
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
    let date = "12/25/2024";
    for (let i = 0; i < 10; i++) {
      const input = convertToInputFormat(date);
      date = convertFromInputFormat(input);
    }
    expect(date).toBe("12/25/2024");
  });
});

describe("semantic date validation", () => {
  describe("invalid dates should be rejected", () => {
    it("should reject February 30th", () => {
      expect(convertToISO8601("02/30/2024")).toBe("");
      // parseMMDDYYYY only parses format, does not validate
      expect(parseMMDDYYYY("02/30/2024")).toEqual({
        day: "30",
        month: "02",
        year: "2024",
      });
    });

    it("should reject February 31st", () => {
      expect(convertToISO8601("02/31/2024")).toBe("");
    });

    it("should reject April 31st (April has 30 days)", () => {
      expect(convertToISO8601("04/31/2024")).toBe("");
    });

    it("should reject month 13", () => {
      expect(convertToISO8601("13/01/2024")).toBe("");
    });

    it("should reject month 00", () => {
      expect(convertToISO8601("00/15/2024")).toBe("");
    });

    it("should reject day 00", () => {
      expect(convertToISO8601("01/00/2024")).toBe("");
    });

    it("should reject impossible dates like 99/99/9999", () => {
      expect(convertToISO8601("99/99/9999")).toBe("");
    });

    it("should reject February 29 in non-leap years", () => {
      expect(convertToISO8601("02/29/2023")).toBe("");
    });
  });

  describe("valid dates should be accepted", () => {
    it("should accept February 29 in leap years", () => {
      expect(convertToISO8601("02/29/2024")).toBe("2024-02-29");
    });

    it("should accept day 31 in months with 31 days", () => {
      expect(convertToISO8601("01/31/2024")).toBe("2024-01-31");
      expect(convertToISO8601("03/31/2024")).toBe("2024-03-31");
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
      expect(normalizeMonthInput("Jan/15/2024")).toBe("01/15/2024");
    });

    it("should convert full month name to numeric format", () => {
      expect(normalizeMonthInput("December/25/2024")).toBe("12/25/2024");
    });

    it("should handle case insensitive month names", () => {
      expect(normalizeMonthInput("jan/15/2024")).toBe("01/15/2024");
      expect(normalizeMonthInput("DECEMBER/25/2024")).toBe("12/25/2024");
    });
  });

  describe("numeric month passthrough", () => {
    it("should pad single digit numeric months", () => {
      expect(normalizeMonthInput("7/15/2024")).toBe("07/15/2024");
    });

    it("should preserve two-digit numeric months", () => {
      expect(normalizeMonthInput("12/25/2024")).toBe("12/25/2024");
    });
  });

  describe("ambiguous input preservation", () => {
    it("should preserve ambiguous month input unchanged", () => {
      expect(normalizeMonthInput("Ju/15/2024")).toBe("Ju/15/2024");
    });

    it("should preserve invalid month input unchanged", () => {
      expect(normalizeMonthInput("Foo/15/2024")).toBe("Foo/15/2024");
    });
  });

  describe("edge cases", () => {
    it("should handle empty input", () => {
      expect(normalizeMonthInput("")).toBe("");
    });

    it("should handle partial dates", () => {
      expect(normalizeMonthInput("Jan/00/0000")).toBe("01/00/0000");
    });

    it("should normalize day and year padding", () => {
      expect(normalizeMonthInput("Jan/5/2024")).toBe("01/05/2024");
    });
  });

  describe("backward compatibility", () => {
    it("should handle already normalized dates", () => {
      expect(normalizeMonthInput("01/15/2024")).toBe("01/15/2024");
      expect(normalizeMonthInput("12/25/2024")).toBe("12/25/2024");
    });
  });
});
