/**
 * Formats a date from MM/DD/YYYY to spelled-out format like "Jul 30, 2011"
 *
 * @param mmddyyyy - Date string in MM/DD/YYYY format
 * @returns Formatted date string like "Jul 30, 2011" or empty string if invalid
 *
 * @example
 * formatDateForDisplay("07/30/2011") // Returns "Jul 30, 2011"
 * formatDateForDisplay("invalid") // Returns ""
 */
export function formatDateForDisplay(mmddyyyy: string): string {
  // Return empty string for empty or whitespace-only input
  if (!mmddyyyy || mmddyyyy.trim() === "") {
    return "";
  }

  // Validate format: MM/DD/YYYY
  const match = mmddyyyy.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
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
