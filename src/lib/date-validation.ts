/**
 * Date validation utilities for MM/DD/YYYY format
 * Handles format validation, date validity, and edge cases like leap years
 */

// Regex pattern for MM/DD/YYYY format
// Month: 01-12, Day: 01-31, Year: 4 digits
export const DATE_REGEX = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;

/**
 * Validates both format and actual date validity
 * Handles leap years and month-specific day counts
 * Uses UTC to ensure consistent validation across timezones
 *
 * @param dateString - Date string in MM/DD/YYYY format
 * @returns true if the date is valid, false otherwise
 */
export function isValidDate(dateString: string): boolean {
  // Check format first
  if (!DATE_REGEX.test(dateString)) {
    return false;
  }

  // Parse and validate actual date using UTC to avoid timezone issues
  const [month, day, year] = dateString.split("/").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));

  // Verify the date components match (catches invalid dates like 02/30)
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

/**
 * Validates date is in reasonable range for birth dates (1900 to current year)
 * Uses UTC to ensure consistent validation across timezones
 *
 * @param dateString - Date string in MM/DD/YYYY format
 * @param minYear - Minimum valid year (default: 1900)
 * @param maxYear - Maximum valid year (default: current UTC year)
 * @returns true if the date is valid and within range, false otherwise
 */
export function isValidBirthDate(
  dateString: string,
  minYear = 1900,
  maxYear = new Date().getUTCFullYear()
): boolean {
  if (!isValidDate(dateString)) {
    return false;
  }

  const [, , year] = dateString.split("/").map(Number);
  return year >= minYear && year <= maxYear;
}

/**
 * Validates child's birth date is not in the future and within reasonable range
 * Uses UTC to ensure consistent validation across timezones
 *
 * @param dateString - Date string in MM/DD/YYYY format
 * @returns true if the date is valid and not in future, false otherwise
 */
export function isValidChildBirthDate(dateString: string): boolean {
  if (!isValidDate(dateString)) {
    return false;
  }

  const [month, day, year] = dateString.split("/").map(Number);

  // Use UTC timestamps for timezone-independent comparison
  const birthTimestamp = Date.UTC(year, month - 1, day);
  const today = new Date();
  const todayTimestamp = Date.UTC(
    today.getUTCFullYear(),
    today.getUTCMonth(),
    today.getUTCDate()
  );

  // Check date is not in future and is after 1900
  return birthTimestamp <= todayTimestamp && year >= 1900;
}
