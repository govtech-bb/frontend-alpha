/**
 * Date format conversion utilities
 *
 * Internal format: ISO 8601 (YYYY-MM-DD) for storage, validation, and APIs
 * User-facing format: Three separate fields (day, month, year) where month can be text or numeric
 */

/**
 * Month name to number mapping for text month input
 */
const MONTH_NAMES: Record<string, string> = {
  january: "01",
  february: "02",
  march: "03",
  april: "04",
  may: "05",
  june: "06",
  july: "07",
  august: "08",
  september: "09",
  october: "10",
  november: "11",
  december: "12",
};

/**
 * Validates that a date is semantically correct (not just format)
 *
 * @param year - Year string (4 digits)
 * @param month - Month string (01-12)
 * @param day - Day string (01-31)
 * @returns true if the date is valid, false otherwise
 */
function isValidDate(year: string, month: string, day: string): boolean {
  const yearInt = Number.parseInt(year, 10);
  const monthInt = Number.parseInt(month, 10);
  const dayInt = Number.parseInt(day, 10);

  // Check basic ranges
  if (monthInt < 1 || monthInt > 12 || dayInt < 1 || dayInt > 31) {
    return false;
  }

  // Use JavaScript Date to validate the date is real
  const date = new Date(yearInt, monthInt - 1, dayInt);

  // Check if the created date matches the input
  // This catches cases like Feb 30, which would roll over to March
  return (
    date.getFullYear() === yearInt &&
    date.getMonth() === monthInt - 1 &&
    date.getDate() === dayInt
  );
}

/**
 * Converts text month input to numeric format (01-12)
 * Handles both full month names and abbreviations, case insensitive
 * Returns empty string for ambiguous or invalid input
 *
 * @param input - Month as text ("Jan", "January", "7") or number ("7", "12")
 * @returns Two-digit month string (01-12) or empty string if ambiguous/invalid
 *
 * @example
 * parseTextMonth("Jan") // "01"
 * parseTextMonth("january") // "01"
 * parseTextMonth("DECEMBER") // "12"
 * parseTextMonth("7") // "07"
 * parseTextMonth("Ju") // "" (ambiguous: June or July)
 * parseTextMonth("Foo") // "" (invalid)
 */
export function parseTextMonth(input: string): string {
  if (!input || input.trim() === "") {
    return "";
  }

  const trimmed = input.trim().toLowerCase();

  // Check if input is numeric
  if (/^\d+$/.test(trimmed)) {
    const monthNum = Number.parseInt(trimmed, 10);
    // Validate range 1-12
    if (monthNum < 1 || monthNum > 12) {
      return "";
    }
    // Pad single digit to 2 digits
    return monthNum.toString().padStart(2, "0");
  }

  // Find all months that start with the input
  const matches = Object.entries(MONTH_NAMES).filter(([monthName]) =>
    monthName.startsWith(trimmed)
  );

  // Return empty if ambiguous (multiple matches) or no match
  if (matches.length !== 1) {
    return "";
  }

  // Return the numeric value of the single match
  return matches[0][1];
}

/**
 * Normalizes a date string by converting text month to numeric format
 * Preserves ambiguous or invalid month input unchanged (for validation to catch)
 *
 * @param dateString - Date in format "YYYY-<month>-DD" where month can be text or numeric
 * @returns Date in format "YYYY-MM-DD" with numeric month, or original if conversion fails
 *
 * @example
 * normalizeMonthInput("2024-Jan-15") // "2024-01-15"
 * normalizeMonthInput("2024-7-15") // "2024-07-15"
 * normalizeMonthInput("2024-Ju-15") // "2024-Ju-15" (ambiguous, preserved)
 * normalizeMonthInput("2024-01-15") // "2024-01-15" (already normalized)
 */
export function normalizeMonthInput(dateString: string): string {
  if (!dateString || dateString.trim() === "") {
    return "";
  }

  // Parse the date string (handles both text and numeric months)
  const parts = dateString.split("-");
  if (parts.length !== 3) {
    return dateString; // Invalid format, return as-is
  }

  const [year, month, day] = parts;

  // Try to convert month to numeric
  const numericMonth = parseTextMonth(month);

  // If conversion failed (ambiguous or invalid), return original
  if (!numericMonth) {
    return dateString;
  }

  // Pad day and year
  const paddedDay = day.padStart(2, "0");
  const paddedYear = year.padStart(4, "0");

  return `${paddedYear}-${numericMonth}-${paddedDay}`;
}

/**
 * Parses an ISO 8601 date string into individual day, month, year components
 * Supports both numeric (YYYY-MM-DD) and text month formats (YYYY-Jan-DD)
 * Does NOT validate - validation should happen on form submission, not during typing
 *
 * @param iso8601 - Date string in format "YYYY-<month>-DD" where month can be text or numeric
 * @returns Object with day, month, year as strings, or empty strings if format invalid
 *
 * @example
 * parseISO8601("1986-07-30") // { day: "30", month: "07", year: "1986" }
 * parseISO8601("1986-Jan-30") // { day: "30", month: "Jan", year: "1986" }
 * parseISO8601("") // { day: "", month: "", year: "" }
 * parseISO8601("2024-02-30") // { day: "30", month: "02", year: "2024" } (no validation)
 * parseISO8601("0000-00-01") // { day: "01", month: "00", year: "0000" } (partial date)
 */
export function parseISO8601(iso8601: string): {
  day: string;
  month: string;
  year: string;
} {
  if (!iso8601 || iso8601.trim() === "") {
    return { day: "", month: "", year: "" };
  }

  // Match YYYY-<month>-DD format where month can be text or numeric
  // Split by "-" to handle both text and numeric months
  const parts = iso8601.split("-");
  if (parts.length !== 3) {
    return { day: "", month: "", year: "" };
  }

  const [year, month, day] = parts;

  // No validation - just return the parsed values
  // Validation happens on form submission, not during typing
  return { day, month, year };
}

/**
 * Combines individual day, month, year components into ISO 8601 date string format
 * Supports both numeric and text month input
 * Pads with zeros to allow partial dates (supports typing workflow)
 *
 * @param year - Year as string (4 digits, or empty)
 * @param month - Month as string (numeric "1"/"12" or text "Jan"/"December")
 * @param day - Day as string (can be 1 or 2 digits, or empty)
 * @returns Date string in format "YYYY-<month>-DD", empty string if all fields empty
 *
 * @example
 * combineToISO8601("1986", "7", "30") // "1986-07-30"
 * combineToISO8601("1986", "Jan", "30") // "1986-Jan-30"
 * combineToISO8601("", "", "5") // "0000-00-05" (partial date)
 * combineToISO8601("", "", "") // ""
 */
export function combineToISO8601(
  year: string,
  month: string,
  day: string
): string {
  // Return empty only if ALL components are empty
  if (!(day || month || year)) {
    return "";
  }

  // Pad day and year with zeros to support partial dates
  const paddedDay = (day || "00").padStart(2, "0");
  const paddedYear = (year || "0000").padStart(4, "0");

  // For month: only pad if it's numeric, otherwise pass through text as-is
  let paddedMonth: string;
  if (!month) {
    paddedMonth = "00";
  } else if (/^\d+$/.test(month)) {
    // Numeric month - pad to 2 digits
    paddedMonth = month.padStart(2, "0");
  } else {
    // Text month - pass through as-is
    paddedMonth = month;
  }

  return `${paddedYear}-${paddedMonth}-${paddedDay}`;
}

/**
 * Converts an ISO 8601 date string to a format suitable for backend API submission
 * This is essentially a validation and normalization pass
 *
 * @param iso8601 - Date string in YYYY-MM-DD format (e.g., "1986-07-30")
 * @returns Normalized date string in ISO 8601 format (e.g., "1986-07-30"), or empty string if invalid
 *
 * @example
 * convertToISO8601("1986-07-30") // "1986-07-30"
 * convertToISO8601("2024-12-25") // "2024-12-25"
 * convertToISO8601("") // ""
 * convertToISO8601("2024-02-30") // "" (invalid date)
 */
export function convertToISO8601(iso8601: string): string {
  if (!iso8601 || iso8601.trim() === "") {
    return "";
  }

  // Match YYYY-MM-DD format
  const match = iso8601.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) {
    return "";
  }

  const [, year, month, day] = match;

  // Validate the date is semantically correct
  if (!isValidDate(year, month, day)) {
    return "";
  }

  return `${year}-${month}-${day}`;
}

/**
 * Converts an ISO 8601 date string to another ISO 8601 date string
 * This function exists for API compatibility but is essentially a validation pass
 *
 * @param iso - Date string in ISO 8601 format (e.g., "1986-07-30")
 * @returns Date string in ISO 8601 format (e.g., "1986-07-30"), or empty string if invalid
 *
 * @example
 * convertFromISO8601("1986-07-30") // "1986-07-30"
 * convertFromISO8601("2024-12-25") // "2024-12-25"
 * convertFromISO8601("") // ""
 * convertFromISO8601("2024-02-30") // "" (invalid date)
 */
export function convertFromISO8601(iso: string): string {
  if (!iso || iso.trim() === "") {
    return "";
  }

  // Match YYYY-MM-DD format
  const match = iso.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) {
    return "";
  }

  const [, year, month, day] = match;

  // Validate the date is semantically correct
  if (!isValidDate(year, month, day)) {
    return "";
  }

  return `${year}-${month}-${day}`;
}

/**
 * Converts an ISO 8601 date string to a format suitable for HTML5 date input elements
 * Since HTML5 date inputs expect YYYY-MM-DD, this is essentially a validation pass
 *
 * @param iso8601 - Date string in YYYY-MM-DD format (e.g., "1986-07-30")
 * @returns Date string in YYYY-MM-DD format (e.g., "1986-07-30"), or empty string if invalid
 *
 * @example
 * convertToInputFormat("1986-07-30") // "1986-07-30"
 * convertToInputFormat("2024-12-25") // "2024-12-25"
 * convertToInputFormat("") // ""
 * convertToInputFormat("invalid") // ""
 * convertToInputFormat("2024-02-30") // "" (invalid date)
 */
export const convertToInputFormat = convertToISO8601;

/**
 * Converts a date string from YYYY-MM-DD format to ISO 8601 format
 * This is an alias for convertFromISO8601 for consistency
 *
 * @param yyyymmdd - Date string in YYYY-MM-DD format (e.g., "1986-07-30")
 * @returns Date string in YYYY-MM-DD format (e.g., "1986-07-30"), or empty string if invalid
 *
 * @example
 * convertFromInputFormat("1986-07-30") // "1986-07-30"
 * convertFromInputFormat("2024-12-25") // "2024-12-25"
 * convertFromInputFormat("") // ""
 * convertFromInputFormat("invalid") // ""
 */
export const convertFromInputFormat = convertFromISO8601;
