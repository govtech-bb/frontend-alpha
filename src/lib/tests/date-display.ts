import { describe, expect, it } from "vitest";
import { formatDateForDisplay } from "../date-display";

describe("formatDateForDisplay", () => {
  describe("text month input", () => {
    it("should handle text month abbreviations like 'Sep'", () => {
      expect(formatDateForDisplay("2001-Sep-11")).toBe("Sep 11, 2001");
    });

    it("should handle full month names like 'September'", () => {
      expect(formatDateForDisplay("2001-September-11")).toBe("Sep 11, 2001");
    });

    it("should handle mixed case month names", () => {
      expect(formatDateForDisplay("2020-jan-15")).toBe("Jan 15, 2020");
      expect(formatDateForDisplay("2018-MARCH-10")).toBe("Mar 10, 2018");
    });

    it("should handle all month abbreviations", () => {
      expect(formatDateForDisplay("2020-Jan-1")).toBe("Jan 1, 2020");
      expect(formatDateForDisplay("2020-Feb-1")).toBe("Feb 1, 2020");
      expect(formatDateForDisplay("2020-Mar-1")).toBe("Mar 1, 2020");
      expect(formatDateForDisplay("2020-Apr-1")).toBe("Apr 1, 2020");
      expect(formatDateForDisplay("2020-May-1")).toBe("May 1, 2020");
      expect(formatDateForDisplay("2020-Jun-1")).toBe("Jun 1, 2020");
      expect(formatDateForDisplay("2020-Jul-1")).toBe("Jul 1, 2020");
      expect(formatDateForDisplay("2020-Aug-1")).toBe("Aug 1, 2020");
      expect(formatDateForDisplay("2020-Sep-1")).toBe("Sep 1, 2020");
      expect(formatDateForDisplay("2020-Oct-1")).toBe("Oct 1, 2020");
      expect(formatDateForDisplay("2020-Nov-1")).toBe("Nov 1, 2020");
      expect(formatDateForDisplay("2020-Dec-1")).toBe("Dec 1, 2020");
    });
  });

  describe("valid dates", () => {
    it("should format a valid date to spelled-out format", () => {
      expect(formatDateForDisplay("2011-07-30")).toBe("Jul 30, 2011");
    });

    it("should format January dates correctly", () => {
      expect(formatDateForDisplay("2020-01-15")).toBe("Jan 15, 2020");
    });

    it("should format February dates correctly", () => {
      expect(formatDateForDisplay("2019-02-28")).toBe("Feb 28, 2019");
    });

    it("should format March dates correctly", () => {
      expect(formatDateForDisplay("2018-03-10")).toBe("Mar 10, 2018");
    });

    it("should format April dates correctly", () => {
      expect(formatDateForDisplay("2017-04-05")).toBe("Apr 5, 2017");
    });

    it("should format May dates correctly", () => {
      expect(formatDateForDisplay("2016-05-25")).toBe("May 25, 2016");
    });

    it("should format June dates correctly", () => {
      expect(formatDateForDisplay("2015-06-30")).toBe("Jun 30, 2015");
    });

    it("should format July dates correctly", () => {
      expect(formatDateForDisplay("2014-07-04")).toBe("Jul 4, 2014");
    });

    it("should format August dates correctly", () => {
      expect(formatDateForDisplay("2013-08-15")).toBe("Aug 15, 2013");
    });

    it("should format September dates correctly", () => {
      expect(formatDateForDisplay("2012-09-11")).toBe("Sep 11, 2012");
    });

    it("should format October dates correctly", () => {
      expect(formatDateForDisplay("2011-10-31")).toBe("Oct 31, 2011");
    });

    it("should format November dates correctly", () => {
      expect(formatDateForDisplay("2010-11-20")).toBe("Nov 20, 2010");
    });

    it("should format December dates correctly", () => {
      expect(formatDateForDisplay("2009-12-25")).toBe("Dec 25, 2009");
    });
  });

  describe("edge cases", () => {
    it("should handle leap year dates", () => {
      expect(formatDateForDisplay("2020-02-29")).toBe("Feb 29, 2020");
    });

    it("should handle first day of year", () => {
      expect(formatDateForDisplay("2000-01-01")).toBe("Jan 1, 2000");
    });

    it("should handle last day of year", () => {
      expect(formatDateForDisplay("1999-12-31")).toBe("Dec 31, 1999");
    });

    it("should handle dates with single-digit days", () => {
      expect(formatDateForDisplay("2010-03-05")).toBe("Mar 5, 2010");
    });

    it("should handle dates with single-digit months", () => {
      expect(formatDateForDisplay("2010-01-15")).toBe("Jan 15, 2010");
    });

    it("should handle very old dates", () => {
      expect(formatDateForDisplay("1950-05-15")).toBe("May 15, 1950");
    });

    it("should handle very recent dates", () => {
      expect(formatDateForDisplay("2024-08-10")).toBe("Aug 10, 2024");
    });
  });

  describe("invalid inputs", () => {
    it("should return empty string for empty input", () => {
      expect(formatDateForDisplay("")).toBe("");
    });

    it("should return empty string for whitespace only", () => {
      expect(formatDateForDisplay("   ")).toBe("");
    });

    it("should return empty string for invalid format (no slashes)", () => {
      expect(formatDateForDisplay("07302011")).toBe("");
    });

    it("should return empty string for invalid format (wrong separator)", () => {
      expect(formatDateForDisplay("07-30-2011")).toBe("");
    });

    it("should accept and format valid YYYY-MM-DD", () => {
      expect(formatDateForDisplay("2011-07-30")).toBe("Jul 30, 2011");
    });

    it("should return empty string for invalid format (DD/MM/YYYY)", () => {
      // This is tricky - we can't easily distinguish DD/MM/YYYY from YYYY-MM-DD
      // So we test an obviously invalid YYYY-MM-DD like 30/15/2011
      expect(formatDateForDisplay("2011-30-15")).toBe("");
    });

    it("should return empty string for invalid month (13)", () => {
      expect(formatDateForDisplay("2011-13-01")).toBe("");
    });

    it("should return empty string for invalid month (00)", () => {
      expect(formatDateForDisplay("2011-00-15")).toBe("");
    });

    it("should return empty string for invalid day (32)", () => {
      expect(formatDateForDisplay("2011-01-32")).toBe("");
    });

    it("should return empty string for invalid day (00)", () => {
      expect(formatDateForDisplay("2011-01-00")).toBe("");
    });

    it("should return empty string for text input", () => {
      expect(formatDateForDisplay("not a date")).toBe("");
    });

    it("should return empty string for partial date", () => {
      expect(formatDateForDisplay("07/30")).toBe("");
    });

    it("should return empty string for invalid February 30", () => {
      expect(formatDateForDisplay("2011-02-30")).toBe("");
    });

    it("should return empty string for invalid February 31", () => {
      expect(formatDateForDisplay("2011-02-31")).toBe("");
    });

    it("should return empty string for invalid leap year date", () => {
      // 2019 is not a leap year
      expect(formatDateForDisplay("2019-02-29")).toBe("");
    });

    it("should return empty string for April 31 (April has 30 days)", () => {
      expect(formatDateForDisplay("2011-04-31")).toBe("");
    });

    it("should return empty string for June 31 (June has 30 days)", () => {
      expect(formatDateForDisplay("2011-06-31")).toBe("");
    });

    it("should return empty string for September 31 (September has 30 days)", () => {
      expect(formatDateForDisplay("2011-09-31")).toBe("");
    });

    it("should return empty string for November 31 (November has 30 days)", () => {
      expect(formatDateForDisplay("2011-11-31")).toBe("");
    });
  });
});
