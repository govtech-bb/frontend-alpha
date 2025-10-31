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
