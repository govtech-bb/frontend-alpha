import { normalizeMonthInput } from "./date-format";

/**
 * Formats a date from MM/DD/YYYY to spelled-out format like "Jul 30, 2011"
 * Now supports text month input like "Sep/11/2001" or "September/11/2001"
 *
 * @param mmddyyyy - Date string in MM/DD/YYYY format (or with text month) or undefined
 * @returns Formatted date string like "Jul 30, 2011" or empty string if invalid
 *
 * @example
 * formatDateForDisplay("07/30/2011") // Returns "Jul 30, 2011"
 * formatDateForDisplay("Sep/11/2001") // Returns "Sep 11, 2001"
 * formatDateForDisplay("September/11/2001") // Returns "Sep 11, 2001"
 * formatDateForDisplay("invalid") // Returns ""
 * formatDateForDisplay(undefined) // Returns ""
 */
export function formatDateForDisplay(mmddyyyy: string | undefined): string {
  // Return empty string for empty or whitespace-only input
  if (!mmddyyyy || mmddyyyy.trim() === "") {
    return "";
  }

  // Normalize text months to numeric format first
  const normalized = normalizeMonthInput(mmddyyyy);

  // Validate format: MM/DD/YYYY
  const match = normalized.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!match) {
    return "";
  }

  const [, month, day, year] = match;

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
