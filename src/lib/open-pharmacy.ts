import type { Pharmacy, PharmacyType } from "@/types/pharmacy";

export const BARBADOS_PARISHES = [
  "Christ Church",
  "St. Andrew",
  "St. George",
  "St. James",
  "St. John",
  "St. Joseph",
  "St. Lucy",
  "St. Michael",
  "St. Peter",
  "St. Philip",
  "St. Thomas",
] as const;

export const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

export const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

const TYPE_SORT_ORDER: Record<PharmacyType, number> = {
  government: 0,
  "private-sbs": 1,
  unconfirmed: 2,
};

/**
 * Swatch colour for each pharmacy type. Shared by the map markers, the type
 * filter pills, and the results legend so the colour coding stays in sync.
 */
export const TYPE_COLOURS: Record<PharmacyType, string> = {
  government: "#00267f",
  "private-sbs": "#e8a833",
  unconfirmed: "#c8cdd3",
};

/** Short legend labels for each pharmacy type. */
export const TYPE_LEGEND_LABELS: Record<PharmacyType, string> = {
  government: "Government · Free",
  "private-sbs": "Private SBS · Dispensing fee",
  unconfirmed: "SBS unconfirmed",
};

const BARBADOS_UTC_OFFSET_HOURS = -4;
const MINUTES_PER_HOUR = 60;
const HOURS_PER_DAY = 24;
const DAYS_IN_WEEK = 7;
const MS_PER_MINUTE = 60_000;
const MS_PER_HOUR = MINUTES_PER_HOUR * MS_PER_MINUTE;

export interface BarbadosTime {
  day: number;
  minutes: number;
  date: Date;
}

// Returns wall-clock time in Barbados (UTC-4, no DST), independent of the
// browser timezone — so a visitor abroad still sees correct open/closed status.
// Shifts the Date such that its UTC fields read as Barbados local fields.
export function getBarbadosTime(now: Date = new Date()): BarbadosTime {
  const date = new Date(
    now.getTime() + BARBADOS_UTC_OFFSET_HOURS * MS_PER_HOUR
  );
  return {
    day: date.getUTCDay(),
    minutes: date.getUTCHours() * MINUTES_PER_HOUR + date.getUTCMinutes(),
    date,
  };
}

// Returns true if currently open, false if closed, null if the schedule is
// unknown (empty hours array).
export function openStatus(
  pharmacy: Pharmacy,
  day: number,
  minutes: number
): boolean | null {
  if (pharmacy.hours.length === 0) return null;
  return pharmacy.hours.some(
    (slot) =>
      slot.days.includes(day) && minutes >= slot.open && minutes < slot.close
  );
}

// Minutes-past-midnight at which the currently-active window closes, or null if
// the pharmacy is not open now.
export function closingMinutes(
  pharmacy: Pharmacy,
  day: number,
  minutes: number
): number | null {
  const active = pharmacy.hours.find(
    (slot) =>
      slot.days.includes(day) && minutes >= slot.open && minutes < slot.close
  );
  return active ? active.close : null;
}

export interface NextOpening {
  daysAhead: number;
  weekday: number;
  openMinutes: number;
}

// Finds the next opening window starting from `day, minutes`. Returns null if
// the pharmacy never reopens within the next 7 days (or has no scheduled hours).
export function nextOpening(
  pharmacy: Pharmacy,
  day: number,
  minutes: number
): NextOpening | null {
  if (pharmacy.hours.length === 0) return null;
  for (let offset = 0; offset < DAYS_IN_WEEK; offset += 1) {
    const checkDay = (day + offset) % DAYS_IN_WEEK;
    const slots = pharmacy.hours
      .filter((slot) => slot.days.includes(checkDay))
      .sort((a, b) => a.open - b.open);
    for (const slot of slots) {
      if (offset === 0 && slot.open <= minutes) continue;
      return { daysAhead: offset, weekday: checkDay, openMinutes: slot.open };
    }
  }
  return null;
}

export function formatMinutesAsTime(totalMinutes: number): string {
  const h24 = Math.floor(totalMinutes / MINUTES_PER_HOUR) % HOURS_PER_DAY;
  const mn = totalMinutes % MINUTES_PER_HOUR;
  const ampm = h24 >= 12 ? "pm" : "am";
  const h12 = h24 % 12 || 12;
  return `${h12}:${String(mn).padStart(2, "0")} ${ampm}`;
}

// `date` here is the shifted Date returned by getBarbadosTime, so its UTC
// fields read as Barbados local fields.
export function formatBarbadosTime(date: Date): string {
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  const h12 = hours % 12 || 12;
  return `${h12}:${String(minutes).padStart(2, "0")} ${ampm} AST`;
}

export function formatBarbadosDate(date: Date): string {
  return `${DAY_NAMES[date.getUTCDay()]} ${ordinal(date.getUTCDate())} ${MONTH_NAMES[date.getUTCMonth()]}`;
}

function ordinal(n: number): string {
  const suffixes = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
}

export function filterByType(
  pharmacies: Pharmacy[],
  type: PharmacyType | "all"
): Pharmacy[] {
  if (type === "all") return pharmacies;
  return pharmacies.filter((p) => p.type === type);
}

export function filterByParish(
  pharmacies: Pharmacy[],
  parish: string
): Pharmacy[] {
  if (parish === "all") return pharmacies;
  return pharmacies.filter((p) => p.parish === parish);
}

export function filterByOpenNow(
  pharmacies: Pharmacy[],
  day: number,
  minutes: number
): Pharmacy[] {
  return pharmacies.filter((p) => openStatus(p, day, minutes) === true);
}

// Sort: open-now first, then by type (gov → private-sbs → unconfirmed), then
// alphabetically by name. Does not mutate the input.
export function sortPharmacies(
  pharmacies: Pharmacy[],
  day: number,
  minutes: number
): Pharmacy[] {
  return [...pharmacies].sort((a, b) => {
    const aOpen = openStatus(a, day, minutes) === true;
    const bOpen = openStatus(b, day, minutes) === true;
    if (aOpen !== bOpen) return aOpen ? -1 : 1;
    const typeDiff = TYPE_SORT_ORDER[a.type] - TYPE_SORT_ORDER[b.type];
    if (typeDiff !== 0) return typeDiff;
    return a.name.localeCompare(b.name);
  });
}

export function formatPhoneHref(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return `tel:+1${digits}`;
}

export function buildDirectionsHref(pharmacy: Pharmacy): string {
  const q = encodeURIComponent(
    `${pharmacy.name}, ${pharmacy.address}, Barbados`
  );
  return `https://maps.google.com/maps?q=${q}`;
}
