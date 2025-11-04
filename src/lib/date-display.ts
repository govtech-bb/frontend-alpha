/**
 * Formats a date from MM/DD/YYYY to spelled-out format like "Jul 30, 2011"
 *
 * Uses UTC to ensure calendar dates display consistently without timezone shifts.
 * Birth dates are calendar dates (day-month-year), not timestamps, so they should
 * display as the exact date entered regardless of viewer's timezone.
 *
 * @param mmddyyyy - Date string in MM/DD/YYYY format or undefined
 * @returns Formatted date string like "Jul 30, 2011" or empty string if invalid
 *
 * @example
 * formatDateForDisplay("07/30/2011") // Returns "Jul 30, 2011"
 * formatDateForDisplay("invalid") // Returns ""
 * formatDateForDisplay(undefined) // Returns ""
 */
export function formatDateForDisplay(mmddyyyy: string | undefined): string {
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

  // Create the date object in UTC (month is 0-indexed)
  // Using UTC ensures consistent validation across all timezones
  const date = new Date(Date.UTC(yearNum, monthNum - 1, dayNum));

  // Verify the date is valid by checking if the UTC components match
  // This catches invalid dates like Feb 30, April 31, etc.
  if (
    date.getUTCFullYear() !== yearNum ||
    date.getUTCMonth() !== monthNum - 1 ||
    date.getUTCDate() !== dayNum
  ) {
    return "";
  }

  // Format the date using toLocaleDateString with en-US locale and UTC timezone
  // Using UTC ensures calendar dates don't shift (e.g., "07/30/2011" always shows as "Jul 30, 2011")
  // This is correct for birth dates which are calendar dates, not timestamps
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}
