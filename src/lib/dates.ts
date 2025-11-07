/**
 * Date utilities for ISO 8601 (YYYY-MM-DD) date handling
 * Consolidates parsing, validation, and display formatting
 */

import { isAfter, startOfDay } from "date-fns";

export type DateFieldErrors = {
  day?: string;
  month?: string;
  year?: string;
};

/**
 * Parses an ISO 8601 date string into individual day, month, year components
 * Does NOT validate - parsing is format-only
 *
 * @param dateString - Date string in format "YYYY-MM-DD" or "YYYY-<month>-DD"
 * @returns Object with day, month, year as strings, or empty strings if format invalid
 *
 * @example
 * parse("1986-07-30") // { day: "30", month: "07", year: "1986" }
 * parse("") // { day: "", month: "", year: "" }
 */
export function parse(dateString: string): {
  day: string;
  month: string;
  year: string;
} {
  if (!dateString || dateString.trim() === "") {
    return { day: "", month: "", year: "" };
  }

  const parts = dateString.split("-");
  if (parts.length !== 3) {
    return { day: "", month: "", year: "" };
  }

  const [year, month, day] = parts;
  return { day, month, year };
}

/**
 * Combines individual day, month, year components into ISO 8601 format
 * Pads with zeros to allow partial dates
 *
 * @param year - Year as string (4 digits, or empty)
 * @param month - Month as string (numeric 1-12, or empty)
 * @param day - Day as string (1-31, or empty)
 * @returns Date string in format "YYYY-MM-DD", empty string if all fields empty
 *
 * @example
 * combine("1986", "7", "30") // "1986-07-30"
 * combine("", "", "") // ""
 */
export function combine(year: string, month: string, day: string): string {
  // Return empty only if ALL components are empty
  if (!(day || month || year)) {
    return "";
  }

  const paddedDay = (day || "00").padStart(2, "0");
  const paddedYear = (year || "0000").padStart(4, "0");
  // Only pad numeric months (or empty), leave text months as-is
  const paddedMonth =
    !month || /^\d+$/.test(month) ? (month || "00").padStart(2, "0") : month;

  return `${paddedYear}-${paddedMonth}-${paddedDay}`;
}

/**
 * Validates a date is semantically correct (day/month/year are valid for the date)
 * Handles leap years automatically
 *
 * @param dateString - Date string in YYYY-MM-DD format
 * @returns true if the date is valid, false otherwise
 */
function isValidDateSemantically(dateString: string): boolean {
  if (!dateString || dateString.trim() === "") {
    return false;
  }

  const match = dateString.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) {
    return false;
  }

  const [, year, month, day] = match;

  const yearNum = Number(year);
  const monthNum = Number(month);
  const dayNum = Number(day);

  // Check basic ranges
  if (monthNum < 1 || monthNum > 12 || dayNum < 1 || dayNum > 31) {
    return false;
  }

  // Use JavaScript Date to validate (it handles leap years correctly)
  const date = new Date(yearNum, monthNum - 1, dayNum);

  // Check if the created date matches the input (catches Feb 30, April 31, etc.)
  return (
    date.getFullYear() === yearNum &&
    date.getMonth() === monthNum - 1 &&
    date.getDate() === dayNum
  );
}

/**
 * Validates individual date fields and returns specific error messages
 * Returns null if all fields are valid
 *
 * @param dateString - Date string in YYYY-MM-DD format
 * @returns DateFieldErrors object with specific errors, or null if valid
 */
// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: Complex validation logic with multiple error checks
export function validateFields(dateString: string): DateFieldErrors | null {
  const { year, month, day } = parse(dateString);
  const errors: DateFieldErrors = {};

  // Check for missing fields
  if (!day || day === "00") {
    errors.day = "Enter a day";
  }
  if (!month || month === "00") {
    errors.month = "Enter a month";
  }
  if (!year || year === "0000") {
    errors.year = "Enter a year";
  }

  // If any field is missing, return early
  if (errors.day || errors.month || errors.year) {
    return errors;
  }

  // Validate year format (must be 4 digits)
  if (year.length !== 4) {
    errors.year = "Year must be 4 digits";
  } else {
    const yearNum = Number(year);
    if (yearNum < 1900) {
      errors.year = "Year must be 1900 or later";
    }
  }

  // Validate month range
  if (/^\d+$/.test(month)) {
    const monthNum = Number(month);
    if (monthNum > 12) {
      errors.month = "Month must be between 1 and 12";
    } else if (monthNum < 1) {
      errors.month = "Enter a valid month";
    }
  }

  // Validate day range
  const dayNum = Number(day);
  if (dayNum < 1 || dayNum > 31 || Number.isNaN(dayNum)) {
    errors.day = "Day must be between 1 and 31";
  }

  // If we have errors already, return early
  if (Object.keys(errors).length > 0) {
    return errors;
  }

  // Validate the complete date is semantically valid
  const paddedDate = combine(year, month, day);
  if (!isValidDateSemantically(paddedDate)) {
    errors.day = "Enter a valid day for this month";
  }

  // Check if date is in the future
  if (Object.keys(errors).length === 0) {
    const futureYearNum = Number(year);
    const futureMonthNum = Number(month);
    const futureDayNum = Number(day);
    const birthDate = startOfDay(
      new Date(futureYearNum, futureMonthNum - 1, futureDayNum)
    );
    const today = startOfDay(new Date());

    if (isAfter(birthDate, today)) {
      errors.year = "Date cannot be in the future";
    }
  }

  return Object.keys(errors).length > 0 ? errors : null;
}

/**
 * Validates date is in reasonable range for birth dates (1900 to current year)
 *
 * @param dateString - Date string in YYYY-MM-DD format
 * @param minYear - Minimum valid year (default: 1900)
 * @param maxYear - Maximum valid year (default: current year)
 * @returns true if the date is valid and within range, false otherwise
 */
export function isValidBirthDate(
  dateString: string,
  minYear = 1900,
  maxYear = new Date().getFullYear()
): boolean {
  if (!dateString || dateString.trim() === "") {
    return false;
  }

  if (!isValidDateSemantically(dateString)) {
    return false;
  }

  const [year] = dateString.split("-").map(Number);
  return year >= minYear && year <= maxYear;
}

/**
 * Validates child's birth date is not in the future and within reasonable range
 *
 * @param dateString - Date string in YYYY-MM-DD format
 * @returns true if the date is valid and not in future, false otherwise
 */
export function isValidChildBirthDate(dateString: string): boolean {
  if (!dateString || dateString.trim() === "") {
    return false;
  }

  if (!isValidDateSemantically(dateString)) {
    return false;
  }

  const [year, month, day] = dateString.split("-").map(Number);
  const birthDate = startOfDay(new Date(year, month - 1, day));
  const today = startOfDay(new Date());

  return !isAfter(birthDate, today) && year >= 1900;
}

/**
 * Formats a date from ISO 8601 (YYYY-MM-DD) to spelled-out format like "Jul 30, 2011"
 *
 * @param iso8601 - Date string in YYYY-MM-DD format or undefined
 * @returns Formatted date string like "Jul 30, 2011" or empty string if invalid
 *
 * @example
 * formatForDisplay("2011-07-30") // "Jul 30, 2011"
 * formatForDisplay("") // ""
 */
export function formatForDisplay(iso8601: string | undefined): string {
  if (!iso8601 || iso8601.trim() === "") {
    return "";
  }

  // Validate format: YYYY-MM-DD
  const match = iso8601.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) {
    return "";
  }

  const [, year, month, day] = match;

  // Validate the date is semantically correct
  if (!isValidDateSemantically(iso8601)) {
    return "";
  }

  const yearNum = Number(year);
  const monthNum = Number(month);
  const dayNum = Number(day);

  // Create a Date object (month is 0-indexed in JavaScript)
  const date = new Date(yearNum, monthNum - 1, dayNum);

  // Format the date using toLocaleDateString
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
