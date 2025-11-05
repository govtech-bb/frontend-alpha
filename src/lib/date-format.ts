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
 * Parses a date string in MM/DD/YYYY format into individual day, month, year components
 *
 * @param mmddyyyy - Date string in MM/DD/YYYY format (e.g., "07/30/1986")
 * @returns Object with day, month, year as strings, or empty strings if invalid
 *
 * @example
 * parseMMDDYYYY("07/30/1986") // { day: "30", month: "07", year: "1986" }
 * parseMMDDYYYY("") // { day: "", month: "", year: "" }
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
  return { day, month, year };
}

/**
 * Combines individual day, month, year components into MM/DD/YYYY format
 *
 * @param day - Day as string (can be 1 or 2 digits)
 * @param month - Month as string (can be 1 or 2 digits)
 * @param year - Year as string (4 digits)
 * @returns Date string in MM/DD/YYYY format, or empty string if any component is missing
 *
 * @example
 * combineToMMDDYYYY("30", "7", "1986") // "07/30/1986"
 * combineToMMDDYYYY("5", "12", "2024") // "12/05/2024"
 * combineToMMDDYYYY("", "7", "1986") // ""
 */
export function combineToMMDDYYYY(
  day: string,
  month: string,
  year: string
): string {
  // Return empty if any component is missing
  if (!(day && month && year)) {
    return "";
  }

  // Pad day and month to 2 digits
  const paddedDay = day.padStart(2, "0");
  const paddedMonth = month.padStart(2, "0");

  return `${paddedMonth}/${paddedDay}/${year}`;
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
  return `${month}/${day}/${year}`;
}
