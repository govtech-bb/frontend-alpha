import { describe, expect, it } from "vitest";
import { convertFromInputFormat, convertToInputFormat } from "./date-format";

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
