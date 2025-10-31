import { describe, expect, it } from "vitest";
import { formatDateForDisplay } from "../date-display";

describe("formatDateForDisplay", () => {
  describe("valid dates", () => {
    it("should format a valid date to spelled-out format", () => {
      expect(formatDateForDisplay("07/30/2011")).toBe("Jul 30, 2011");
    });

    it("should format January dates correctly", () => {
      expect(formatDateForDisplay("01/15/2020")).toBe("Jan 15, 2020");
    });

    it("should format February dates correctly", () => {
      expect(formatDateForDisplay("02/28/2019")).toBe("Feb 28, 2019");
    });

    it("should format March dates correctly", () => {
      expect(formatDateForDisplay("03/10/2018")).toBe("Mar 10, 2018");
    });

    it("should format April dates correctly", () => {
      expect(formatDateForDisplay("04/05/2017")).toBe("Apr 5, 2017");
    });

    it("should format May dates correctly", () => {
      expect(formatDateForDisplay("05/25/2016")).toBe("May 25, 2016");
    });

    it("should format June dates correctly", () => {
      expect(formatDateForDisplay("06/30/2015")).toBe("Jun 30, 2015");
    });

    it("should format July dates correctly", () => {
      expect(formatDateForDisplay("07/04/2014")).toBe("Jul 4, 2014");
    });

    it("should format August dates correctly", () => {
      expect(formatDateForDisplay("08/15/2013")).toBe("Aug 15, 2013");
    });

    it("should format September dates correctly", () => {
      expect(formatDateForDisplay("09/11/2012")).toBe("Sep 11, 2012");
    });

    it("should format October dates correctly", () => {
      expect(formatDateForDisplay("10/31/2011")).toBe("Oct 31, 2011");
    });

    it("should format November dates correctly", () => {
      expect(formatDateForDisplay("11/20/2010")).toBe("Nov 20, 2010");
    });

    it("should format December dates correctly", () => {
      expect(formatDateForDisplay("12/25/2009")).toBe("Dec 25, 2009");
    });
  });

  describe("edge cases", () => {
    it("should handle leap year dates", () => {
      expect(formatDateForDisplay("02/29/2020")).toBe("Feb 29, 2020");
    });

    it("should handle first day of year", () => {
      expect(formatDateForDisplay("01/01/2000")).toBe("Jan 1, 2000");
    });

    it("should handle last day of year", () => {
      expect(formatDateForDisplay("12/31/1999")).toBe("Dec 31, 1999");
    });

    it("should handle dates with single-digit days", () => {
      expect(formatDateForDisplay("03/05/2010")).toBe("Mar 5, 2010");
    });

    it("should handle dates with single-digit months", () => {
      expect(formatDateForDisplay("01/15/2010")).toBe("Jan 15, 2010");
    });

    it("should handle very old dates", () => {
      expect(formatDateForDisplay("05/15/1950")).toBe("May 15, 1950");
    });

    it("should handle very recent dates", () => {
      expect(formatDateForDisplay("08/10/2024")).toBe("Aug 10, 2024");
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

    it("should return empty string for invalid format (YYYY-MM-DD)", () => {
      expect(formatDateForDisplay("2011-07-30")).toBe("");
    });

    it("should return empty string for invalid format (DD/MM/YYYY)", () => {
      // This is tricky - we can't easily distinguish DD/MM/YYYY from MM/DD/YYYY
      // So we test an obviously invalid MM/DD/YYYY like 30/15/2011
      expect(formatDateForDisplay("30/15/2011")).toBe("");
    });

    it("should return empty string for invalid month (13)", () => {
      expect(formatDateForDisplay("13/01/2011")).toBe("");
    });

    it("should return empty string for invalid month (00)", () => {
      expect(formatDateForDisplay("00/15/2011")).toBe("");
    });

    it("should return empty string for invalid day (32)", () => {
      expect(formatDateForDisplay("01/32/2011")).toBe("");
    });

    it("should return empty string for invalid day (00)", () => {
      expect(formatDateForDisplay("01/00/2011")).toBe("");
    });

    it("should return empty string for text input", () => {
      expect(formatDateForDisplay("not a date")).toBe("");
    });

    it("should return empty string for partial date", () => {
      expect(formatDateForDisplay("07/30")).toBe("");
    });

    it("should return empty string for invalid February 30", () => {
      expect(formatDateForDisplay("02/30/2011")).toBe("");
    });

    it("should return empty string for invalid February 31", () => {
      expect(formatDateForDisplay("02/31/2011")).toBe("");
    });

    it("should return empty string for invalid leap year date", () => {
      // 2019 is not a leap year
      expect(formatDateForDisplay("02/29/2019")).toBe("");
    });

    it("should return empty string for April 31 (April has 30 days)", () => {
      expect(formatDateForDisplay("04/31/2011")).toBe("");
    });

    it("should return empty string for June 31 (June has 30 days)", () => {
      expect(formatDateForDisplay("06/31/2011")).toBe("");
    });

    it("should return empty string for September 31 (September has 30 days)", () => {
      expect(formatDateForDisplay("09/31/2011")).toBe("");
    });

    it("should return empty string for November 31 (November has 30 days)", () => {
      expect(formatDateForDisplay("11/31/2011")).toBe("");
    });
  });
});
