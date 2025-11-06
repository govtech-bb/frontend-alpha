import { describe, expect, it } from "vitest";
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
