import { normalizeMonthInput } from "./date-format";

/**
 * Formats a date from ISO 8601 (YYYY-MM-DD) to spelled-out format like "Jul 30, 2011"
 * Now supports text month input like "2001-Sep-11" or "2001-September-11"
 *
 * @param iso8601 - Date string in YYYY-MM-DD format (or with text month) or undefined
 * @returns Formatted date string like "Jul 30, 2011" or empty string if invalid
 *
 * @example
 * formatDateForDisplay("2011-07-30") // Returns "Jul 30, 2011"
 * formatDateForDisplay("2001-Sep-11") // Returns "Sep 11, 2001"
 * formatDateForDisplay("2001-September-11") // Returns "Sep 11, 2001"
 * formatDateForDisplay("invalid") // Returns ""
 * formatDateForDisplay(undefined) // Returns ""
 */
export function formatDateForDisplay(iso8601: string | undefined): string {
  // Return empty string for empty or whitespace-only input
  if (!iso8601 || iso8601.trim() === "") {
    return "";
  }

  // Normalize text months to numeric format first
  const normalized = normalizeMonthInput(iso8601);

  // Validate format: YYYY-MM-DD
  const match = normalized.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) {
    return "";
  }

  const [, year, month, day] = match;

  // Create a Date object (month is 0-indexed in JavaScript Date)
  const monthNum = Number.parseInt(month, 10);
  const dayNum = Number.parseInt(day, 10);
  const yearNum = Number.parseInt(year, 10);

  // Validate month is 1-12
  if (monthNum < 1 || monthNum > 12) {
    return "";
  }

  // Validate day is 1-31
  if (dayNum < 1 || dayNum > 31) {
    return "";
  }

  // Create the date object (month is 0-indexed)
  const date = new Date(yearNum, monthNum - 1, dayNum);

  // Verify the date is valid by checking if the components match
  // This catches invalid dates like Feb 30, April 31, etc.
  if (
    date.getFullYear() !== yearNum ||
    date.getMonth() !== monthNum - 1 ||
    date.getDate() !== dayNum
  ) {
    return "";
  }

  // Format the date using toLocaleDateString with en-US locale
  // This ensures consistent formatting as "Jul 30, 2011"
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
