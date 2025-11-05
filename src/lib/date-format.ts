/**
 * Date format conversion utilities
 *
 * Converts between MM/DD/YYYY format (used for storage and validation)
 * and YYYY-MM-DD format (required by HTML5 date inputs)
 */

/**
 * Converts a date string from MM/DD/YYYY format to YYYY-MM-DD format
 * for use with HTML5 date input elements
 *
 * @param mmddyyyy - Date string in MM/DD/YYYY format (e.g., "07/30/1986")
 * @returns Date string in YYYY-MM-DD format (e.g., "1986-07-30"), or empty string if invalid
 *
 * @example
 * convertToInputFormat("07/30/1986") // "1986-07-30"
 * convertToInputFormat("12/25/2024") // "2024-12-25"
 * convertToInputFormat("") // ""
 * convertToInputFormat("invalid") // ""
 * convertToInputFormat("02/30/2024") // "" (invalid date)
 */
export function convertToInputFormat(mmddyyyy: string): string {
  if (!mmddyyyy || mmddyyyy.trim() === "") {
    return "";
  }

  // Match MM/DD/YYYY format
  const match = mmddyyyy.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!match) {
    return "";
  }

  const [, month, day, year] = match;

  // Validate the date is semantically correct
  if (!isValidDate(month, day, year)) {
    return "";
  }

  return `${year}-${month}-${day}`;
}

/**
 * Converts a date string from YYYY-MM-DD format to MM/DD/YYYY format
 * for storage and validation
 *
 * @param yyyymmdd - Date string in YYYY-MM-DD format (e.g., "1986-07-30")
 * @returns Date string in MM/DD/YYYY format (e.g., "07/30/1986"), or empty string if invalid
 *
 * @example
 * convertFromInputFormat("1986-07-30") // "07/30/1986"
 * convertFromInputFormat("2024-12-25") // "12/25/2024"
 * convertFromInputFormat("") // ""
 * convertFromInputFormat("invalid") // ""
 */
export function convertFromInputFormat(yyyymmdd: string): string {
  if (!yyyymmdd || yyyymmdd.trim() === "") {
    return "";
  }

  // Match YYYY-MM-DD format
  const match = yyyymmdd.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) {
    return "";
  }

  const [, year, month, day] = match;
  return `${month}/${day}/${year}`;
}

/**
 * Validates that a date is semantically correct (not just format)
 *
 * @param month - Month string (01-12)
 * @param day - Day string (01-31)
 * @param year - Year string (4 digits)
 * @returns true if the date is valid, false otherwise
 */
function isValidDate(month: string, day: string, year: string): boolean {
  const monthInt = Number.parseInt(month, 10);
  const dayInt = Number.parseInt(day, 10);
  const yearInt = Number.parseInt(year, 10);

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
 * Parses a date string in MM/DD/YYYY format into individual day, month, year components
 * Validates semantic correctness of the date (skips validation for partial dates with zeros)
 *
 * @param mmddyyyy - Date string in MM/DD/YYYY format (e.g., "07/30/1986")
 * @returns Object with day, month, year as strings, or empty strings if invalid
 *
 * @example
 * parseMMDDYYYY("07/30/1986") // { day: "30", month: "07", year: "1986" }
 * parseMMDDYYYY("") // { day: "", month: "", year: "" }
 * parseMMDDYYYY("02/30/2024") // { day: "", month: "", year: "" } (invalid date)
 * parseMMDDYYYY("00/01/0000") // { day: "01", month: "00", year: "0000" } (partial date)
 */
export function parseMMDDYYYY(mmddyyyy: string): {
  day: string;
  month: string;
  year: string;
} {
  if (!mmddyyyy || mmddyyyy.trim() === "") {
    return { day: "", month: "", year: "" };
  }

  // Match MM/DD/YYYY format
  const match = mmddyyyy.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!match) {
    return { day: "", month: "", year: "" };
  }

  const [, month, day, year] = match;

  // Skip validation for partial dates (those with 00 or 0000 components)
  // Also skip validation for years with leading zeros (e.g., "0001", "0012")
  // as these are intermediate typing states, not real dates
  const isPartialDate =
    month === "00" || day === "00" || year === "0000" || year.startsWith("0");

  // Only validate complete dates
  if (!(isPartialDate || isValidDate(month, day, year))) {
    return { day: "", month: "", year: "" };
  }

  return { day, month, year };
}

/**
 * Combines individual day, month, year components into MM/DD/YYYY format
 * Pads with zeros to allow partial dates (supports typing workflow)
 *
 * @param day - Day as string (can be 1 or 2 digits, or empty)
 * @param month - Month as string (can be 1 or 2 digits, or empty)
 * @param year - Year as string (4 digits, or empty)
 * @returns Date string in MM/DD/YYYY format, empty string if all fields empty
 *
 * @example
 * combineToMMDDYYYY("30", "7", "1986") // "07/30/1986"
 * combineToMMDDYYYY("5", "", "") // "00/05/0000" (partial date)
 * combineToMMDDYYYY("", "", "") // ""
 */
export function combineToMMDDYYYY(
  day: string,
  month: string,
  year: string
): string {
  // Return empty only if ALL components are empty
  if (!(day || month || year)) {
    return "";
  }

  // Pad with zeros to support partial dates
  const paddedDay = (day || "00").padStart(2, "0");
  const paddedMonth = (month || "00").padStart(2, "0");
  const paddedYear = (year || "0000").padStart(4, "0");

  return `${paddedMonth}/${paddedDay}/${paddedYear}`;
}

/**
 * Converts a date string from MM/DD/YYYY format to ISO 8601 format (YYYY-MM-DD)
 * for backend API submission
 *
 * @param mmddyyyy - Date string in MM/DD/YYYY format (e.g., "07/30/1986")
 * @returns Date string in ISO 8601 format (e.g., "1986-07-30"), or empty string if invalid
 *
 * @example
 * convertToISO8601("07/30/1986") // "1986-07-30"
 * convertToISO8601("12/25/2024") // "2024-12-25"
 * convertToISO8601("") // ""
 * convertToISO8601("02/30/2024") // "" (invalid date)
 */
export function convertToISO8601(mmddyyyy: string): string {
  if (!mmddyyyy || mmddyyyy.trim() === "") {
    return "";
  }

  // Match MM/DD/YYYY format
  const match = mmddyyyy.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!match) {
    return "";
  }

  const [, month, day, year] = match;

  // Validate the date is semantically correct
  if (!isValidDate(month, day, year)) {
    return "";
  }

  return `${year}-${month}-${day}`;
}

/**
 * Converts a date string from ISO 8601 format (YYYY-MM-DD) to MM/DD/YYYY format
 * for internal storage and display
 *
 * @param iso - Date string in ISO 8601 format (e.g., "1986-07-30")
 * @returns Date string in MM/DD/YYYY format (e.g., "07/30/1986"), or empty string if invalid
 *
 * @example
 * convertFromISO8601("1986-07-30") // "07/30/1986"
 * convertFromISO8601("2024-12-25") // "12/25/2024"
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
  if (!isValidDate(month, day, year)) {
    return "";
  }

  return `${month}/${day}/${year}`;
}
