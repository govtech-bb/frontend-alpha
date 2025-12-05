/**
 * Date utilities for ISO 8601 (YYYY-MM-DD) date handling
 * Consolidates parsing, validation, and display formatting
 */

import { isAfter } from "date-fns";

export type DateFieldErrors = {
  day?: string;
  month?: string;
  year?: string;
};

/**
 * Month name mapping for text month input
 */
const MONTH_NAMES: Record<string, number> = {
  january: 1,
  february: 2,
  march: 3,
  april: 4,
  may: 5,
  june: 6,
  july: 7,
  august: 8,
  september: 9,
  october: 10,
  november: 11,
  december: 12,
};

/**
 * Parses a month string (numeric or text) to a month number (1-12)
 * Supports non-ambiguous prefix matching for month names
 * Returns NaN if the month cannot be parsed or is ambiguous
 *
 * @param month - Month string (e.g., "01", "1", "jan", "Jul", "de")
 * @returns Month number 1-12, or NaN if invalid/ambiguous
 *
 * @example
 * parseMonthToNumber("1") // 1
 * parseMonthToNumber("jan") // 1 (unambiguous: only january)
 * parseMonthToNumber("ju") // NaN (ambiguous: june or july)
 * parseMonthToNumber("jul") // 7 (unambiguous: only july)
 * parseMonthToNumber("a") // NaN (ambiguous: april or august)
 * parseMonthToNumber("ap") // 4 (unambiguous: only april)
 */
function parseMonthToNumber(month: string): number {
  if (!month || month.trim() === "") {
    return Number.NaN;
  }

  const trimmed = month.trim();

  // If it's already numeric, validate range and return
  if (/^\d+$/.test(trimmed)) {
    const monthNum = Number(trimmed);
    return monthNum >= 1 && monthNum <= 12 ? monthNum : Number.NaN;
  }

  // Find all months that start with the input (case-insensitive)
  const lowerInput = trimmed.toLowerCase();
  const matches = Object.entries(MONTH_NAMES).filter(([monthName]) =>
    monthName.startsWith(lowerInput)
  );

  // Return NaN if ambiguous (multiple matches) or no match
  if (matches.length !== 1) {
    return Number.NaN;
  }

  // Return the numeric value of the single unambiguous match
  return matches[0][1];
}

/**
 * Parses an ISO 8601 date string into individual day, month, year components
 * Does NOT validate - parsing is format-only
 *
 * @param dateString - Date string in format "YYYY-MM-DD" or "YYYY-<month>-DD"
 * @returns Object with day, month, year as strings, or empty strings if format invalid
 *
 * @example
 * parseDate("1986-07-30") // { day: "30", month: "07", year: "1986" }
 * parseDate("") // { day: "", month: "", year: "" }
 */
export function parseDate(dateString: string): {
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
 * Pads with zeros to allow partial dates during input
 * Note: Partial dates like "2024-00-00" are invalid ISO 8601, but needed for UI state.
 * Use validateFields() to ensure complete dates before submission.
 *
 * @param year - Year as string (4 digits, or empty)
 * @param month - Month as string (numeric 1-12, or empty)
 * @param day - Day as string (1-31, or empty)
 * @returns Date string in format "YYYY-MM-DD", empty string if all fields empty
 *
 * @example
 * combineDate("1986", "7", "30") // "1986-07-30"
 * combineDate("2024", "", "") // "2024-00-00" (partial, for UI state)
 * combineDate("", "", "") // ""
 */
export function combineDate(year: string, month: string, day: string): string {
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
 * Supports both numeric months (01-12) and text months (Jan, January, etc.)
 *
 * @param dateString - Date string in YYYY-MM-DD or YYYY-<month>-DD format
 * @returns true if the date is valid, false otherwise
 */
function isValidDateSemantically(dateString: string): boolean {
  if (!dateString || dateString.trim() === "") {
    return false;
  }

  // Parse components (handles both numeric and text formats)
  const { year, month, day } = parseDate(dateString);

  if (!(year && month && day)) {
    return false;
  }

  const yearNum = Number(year);
  const monthNum = parseMonthToNumber(month);
  const dayNum = Number(day);

  // Check if parsing succeeded and values are in valid ranges
  if (
    Number.isNaN(yearNum) ||
    Number.isNaN(monthNum) ||
    Number.isNaN(dayNum) ||
    monthNum < 1 ||
    monthNum > 12 ||
    dayNum < 1 ||
    dayNum > 31
  ) {
    return false;
  }

  // Use JavaScript Date to validate (it handles leap years correctly)
  // Use UTC to avoid timezone-related off-by-one errors
  const date = new Date(Date.UTC(yearNum, monthNum - 1, dayNum));

  // Check if the created date matches the input (catches Feb 30, April 31, etc.)
  return (
    date.getUTCFullYear() === yearNum &&
    date.getUTCMonth() === monthNum - 1 &&
    date.getUTCDate() === dayNum
  );
}

/**
 * Validates individual date fields and returns specific error messages
 * Returns null if all fields are valid
 *
 * @param dateString - Date string in YYYY-MM-DD format
 * @returns DateFieldErrors object with specific errors, or null if valid
 */
export function validateFields(dateString: string): DateFieldErrors | null {
  const { year, month, day } = parseDate(dateString);
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

  // Validate month range (handles both numeric and text months)
  const monthNum = parseMonthToNumber(month);
  if (Number.isNaN(monthNum)) {
    // Check if it was a numeric month out of range for better error message
    if (/^\d+$/.test(month)) {
      const num = Number(month);
      if (num > 12 || num < 1) {
        errors.month = "Month must be between 1 and 12";
      } else {
        errors.month = "Enter a valid month";
      }
    } else {
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
  const paddedDate = combineDate(year, month, day);
  if (!isValidDateSemantically(paddedDate)) {
    errors.day = "Enter a valid day for this month";
  }

  // Check if date is in the future
  if (Object.keys(errors).length === 0) {
    const futureYearNum = Number(year);
    const futureMonthNum = parseMonthToNumber(month);
    const futureDayNum = Number(day);
    // Use UTC dates to avoid timezone-related off-by-one errors
    const birthDate = new Date(
      Date.UTC(futureYearNum, futureMonthNum - 1, futureDayNum)
    );
    const today = new Date(
      Date.UTC(
        new Date().getUTCFullYear(),
        new Date().getUTCMonth(),
        new Date().getUTCDate()
      )
    );

    if (isAfter(birthDate, today)) {
      errors.day = "Date cannot be in the future";
      errors.month = "Date cannot be in the future";
      errors.year = "Date cannot be in the future";
    }
  }

  return Object.keys(errors).length > 0 ? errors : null;
}

/**
 * Validates date is in reasonable range for birth dates (1900 to today)
 * Validates down to the day level - birth date cannot be in the future
 * Supports both numeric and text month formats
 *
 * @param dateString - Date string in YYYY-MM-DD or YYYY-<month>-DD format
 * @param minYear - Minimum valid year (default: 1900)
 * @returns true if the date is valid, within range, and not in future, false otherwise
 */
export function isValidBirthDate(dateString: string, minYear = 1900): boolean {
  if (!dateString || dateString.trim() === "") {
    return false;
  }

  if (!isValidDateSemantically(dateString)) {
    return false;
  }

  const { year, month, day } = parseDate(dateString);
  const yearNum = Number(year);
  const monthNum = parseMonthToNumber(month);
  const dayNum = Number(day);

  // Check minimum year
  if (yearNum < minYear) {
    return false;
  }

  // Check date is not in the future (day-level precision)
  // Use UTC dates to avoid timezone-related off-by-one errors
  const birthDate = new Date(Date.UTC(yearNum, monthNum - 1, dayNum));
  const today = new Date(
    Date.UTC(
      new Date().getUTCFullYear(),
      new Date().getUTCMonth(),
      new Date().getUTCDate()
    )
  );

  return !isAfter(birthDate, today);
}

/**
 * Calculates age in years from a birth date to today
 * Handles edge cases like future dates and invalid dates
 *
 * @param dateString - Date string in YYYY-MM-DD or YYYY-<month>-DD format
 * @returns Age in years, or 0 if date is invalid or in the future
 *
 * @example
 * calculateAge("1990-03-15") // Age as of today
 * calculateAge("") // 0
 * calculateAge("invalid") // 0
 */
export function calculateAge(dateString: string): number {
  if (!dateString || dateString.trim() === "") {
    return 0;
  }

  // Validate the date is semantically correct
  if (!isValidDateSemantically(dateString)) {
    return 0;
  }

  const { year, month, day } = parseDate(dateString);
  const yearNum = Number(year);
  const monthNum = parseMonthToNumber(month);
  const dayNum = Number(day);

  // Ensure parsing succeeded
  if (Number.isNaN(yearNum) || Number.isNaN(monthNum) || Number.isNaN(dayNum)) {
    return 0;
  }

  // Create birth date using UTC to avoid timezone issues
  const birthDate = new Date(Date.UTC(yearNum, monthNum - 1, dayNum));
  const today = new Date(
    Date.UTC(
      new Date().getUTCFullYear(),
      new Date().getUTCMonth(),
      new Date().getUTCDate()
    )
  );

  // Return 0 if birth date is in the future
  if (isAfter(birthDate, today)) {
    return 0;
  }

  // Calculate age
  let age = today.getUTCFullYear() - birthDate.getUTCFullYear();
  const monthDiff = today.getUTCMonth() - birthDate.getUTCMonth();
  const dayDiff = today.getUTCDate() - birthDate.getUTCDate();

  // Adjust age if birthday hasn't occurred yet this year
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  return age;
}

/**
 * Formats a date from ISO 8601 (YYYY-MM-DD or YYYY-<month>-DD) to spelled-out format like "Jul 30, 2011"
 * Supports both numeric months (01-12) and text months (jan, July, etc.)
 *
 * @param iso8601 - Date string in YYYY-MM-DD or YYYY-<month>-DD format or undefined
 * @returns Formatted date string like "Jul 30, 2011" or empty string if invalid
 *
 * @example
 * formatForDisplay("2011-07-30") // "Jul 30, 2011"
 * formatForDisplay("2011-jul-30") // "Jul 30, 2011"
 * formatForDisplay("") // ""
 */
export function formatForDisplay(iso8601: string | undefined): string {
  if (!iso8601 || iso8601.trim() === "") {
    return "";
  }

  // Validate the date is semantically correct (handles both numeric and text months)
  if (!isValidDateSemantically(iso8601)) {
    return "";
  }

  // Parse components (handles both numeric and text formats)
  const { year, month, day } = parseDate(iso8601);

  const yearNum = Number(year);
  const monthNum = parseMonthToNumber(month);
  const dayNum = Number(day);

  // Ensure parsing succeeded
  if (Number.isNaN(yearNum) || Number.isNaN(monthNum) || Number.isNaN(dayNum)) {
    return "";
  }

  // Create a Date object (month is 0-indexed in JavaScript)
  const date = new Date(yearNum, monthNum - 1, dayNum);

  // Format the date using toLocaleDateString
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
