/**
 * Date validation utilities for MM/DD/YYYY format
 * Handles format validation, date validity, and edge cases like leap years
 */

import { normalizeMonthInput, parseMMDDYYYY } from "./date-format";

export type DateFieldErrors = {
  day?: string;
  month?: string;
  year?: string;
};

// Regex pattern for MM/DD/YYYY format
// Month: 01-12, Day: 01-31, Year: 4 digits
export const DATE_REGEX = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;

/**
 * Validates both format and actual date validity
 * Handles leap years and month-specific day counts
 * Normalizes text month names to numeric format before validation
 *
 * @param dateString - Date string in MM/DD/YYYY format (or with text month)
 * @returns true if the date is valid, false otherwise
 */
export function isValidDate(dateString: string): boolean {
  // Normalize text months to numeric format first
  const normalized = normalizeMonthInput(dateString);

  // Check format first
  if (!DATE_REGEX.test(normalized)) {
    return false;
  }

  // Parse and validate actual date
  const [month, day, year] = normalized.split("/").map(Number);
  const date = new Date(year, month - 1, day);

  // Verify the date components match (catches invalid dates like 02/30)
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

/**
 * Validates date is in reasonable range for birth dates (1900 to current year)
 *
 * @param dateString - Date string in MM/DD/YYYY format
 * @param minYear - Minimum valid year (default: 1900)
 * @param maxYear - Maximum valid year (default: current year)
 * @returns true if the date is valid and within range, false otherwise
 */
export function isValidBirthDate(
  dateString: string,
  minYear = 1900,
  maxYear = new Date().getFullYear()
): boolean {
  if (!isValidDate(dateString)) {
    return false;
  }

  const [, , year] = dateString.split("/").map(Number);
  return year >= minYear && year <= maxYear;
}

/**
 * Validates child's birth date is not in the future and within reasonable range
 *
 * @param dateString - Date string in MM/DD/YYYY format
 * @returns true if the date is valid and not in future, false otherwise
 */
export function isValidChildBirthDate(dateString: string): boolean {
  if (!isValidDate(dateString)) {
    return false;
  }

  const [month, day, year] = dateString.split("/").map(Number);
  const birthDate = new Date(year, month - 1, day);
  const today = new Date();

  // Set time to start of day for accurate comparison
  today.setHours(0, 0, 0, 0);
  birthDate.setHours(0, 0, 0, 0);

  // Check date is not in future and is after 1900
  return birthDate <= today && year >= 1900;
}

/**
 * Validates individual date fields and returns specific error messages
 * Returns null if all fields are valid, otherwise returns an object with field-specific errors
 *
 * @param dateString - Date string in MM/DD/YYYY format or with text month
 * @returns DateFieldErrors object with specific errors, or null if valid
 */
// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: Will refactor in future iteration
export function validateDateFields(dateString: string): DateFieldErrors | null {
  const { day, month, year } = parseMMDDYYYY(dateString);
  const errors: DateFieldErrors = {};

  // Check for missing fields first
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

  // Validate year format (must be 4 digits) - check this FIRST before range
  if (year.length !== 4) {
    errors.year = "Year must be 4 digits";
  } else {
    // Only check year range if format is correct
    const yearNum = Number(year);
    if (yearNum < 1900) {
      errors.year = "Year must be 1900 or later";
    }
  }

  // Try to normalize the month to check if it's valid
  let monthNum: number;

  // First check if it's a numeric month that's out of range
  if (/^\d+$/.test(month)) {
    monthNum = Number(month);
    if (monthNum > 12) {
      errors.month = "Month must be between 1 and 12";
    } else if (monthNum < 1) {
      errors.month = "Enter a valid month";
    }
  } else {
    // It's a text month, try to normalize it
    try {
      const normalized = normalizeMonthInput(`${month}/01/2000`);
      const [normalizedMonth] = normalized.split("/");
      monthNum = Number(normalizedMonth);

      // Check if month is in valid range
      if (monthNum < 1 || monthNum > 12 || Number.isNaN(monthNum)) {
        errors.month = "Enter a valid month";
      }
    } catch {
      errors.month = "Enter a valid month";
      monthNum = 0; // Invalid month
    }
  }

  // Validate day range
  const dayNum = Number(day);
  if (dayNum < 1 || dayNum > 31 || Number.isNaN(dayNum)) {
    errors.day = "Day must be between 1 and 31";
  }

  // If we have errors in year or month validation, return early
  if (errors.year || errors.month || errors.day) {
    return errors;
  }

  // Now validate the complete date to check if it's valid for the specific month
  const normalized = normalizeMonthInput(dateString);
  if (!isValidDate(normalized)) {
    // The date is invalid for this month (e.g., Feb 30)
    errors.day = "Enter a valid day for this month";
  }

  // Check if date is in the future (only if no errors so far)
  if (Object.keys(errors).length === 0) {
    const yearNum = Number(year);
    const birthDate = new Date(yearNum, monthNum - 1, dayNum);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    birthDate.setHours(0, 0, 0, 0);

    if (birthDate > today) {
      errors.year = "Date cannot be in the future";
    }
  }

  // Return null if no errors, otherwise return the errors object
  return Object.keys(errors).length > 0 ? errors : null;
}
