/**
 * Bank holidays and days of interest
 * --------------------------------------------------------------
 * Route:    /bank-holidays
 * File:     src/app/bank-holidays/page.tsx
 *
 * What this page does:
 *   - Lists Barbados statutory bank holidays (Public Holidays Act, Cap. 352)
 *     for any year, with substitution rules applied.
 *   - Lists "days of interest" (cultural/observance dates that are not
 *     bank holidays).
 *   - Surfaces the next upcoming bank holiday in a hero card.
 *   - Lets the user switch between years via prev/next arrows.
 *   - Two tabbed views: bank holidays and days of interest.
 *
 * Implementation notes for reviewers:
 *   1. This is a client component because of tab + year-switcher state.
 *      The selected year is held in `?year=YYYY` so links/back-button work.
 *   2. Site chrome (official banner, header, alpha banner, footer) is
 *      assumed to live in `src/app/layout.tsx`. This file only renders
 *      the page body inside the existing layout.
 *   3. Holiday and observance data is computed at build time from pure
 *      functions in this file. If you'd rather keep them as static
 *      fixtures under `src/content/`, the `getBankHolidaysForYear` and
 *      `getDaysOfInterestForYear` functions can be lifted into
 *      `src/lib/holidays.ts` unchanged.
 *   4. Tailwind class names below assume GovBB design tokens are wired
 *      into the Tailwind config (e.g. `bg-blue-90`, `text-yellow-50`).
 *      If those tokens aren't aliased yet, swap to the closest stock
 *      Tailwind colours or add the aliases to `tailwind.config.ts`.
 *   5. New entry points must also be registered in `content-directory.ts`
 *      per the repo README. Add this page under the appropriate category.
 */

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

import { StageBanner } from "@/components/stage-banner";

// ---------------------------------------------------------------
// Types
// ---------------------------------------------------------------

type Holiday = {
  date: Date;
  name: string;
  note?: string;
  /** True when this row is a "Monday/Tuesday in lieu" substitution. */
  substitute?: boolean;
};

type DayOfInterest = {
  date: Date;
  name: string;
  note?: string;
};

type TabId = "holidays" | "doi";

// ---------------------------------------------------------------
// Date helpers (pure)
// ---------------------------------------------------------------

/** Anonymous Gregorian algorithm — works for any year ≥ 1583. */
function easterSunday(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const L = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * L) / 451);
  const month = Math.floor((h + L - 7 * m + 114) / 31);
  const day = ((h + L - 7 * m + 114) % 31) + 1;
  return new Date(Date.UTC(year, month - 1, day));
}

function addDays(date: Date, days: number): Date {
  const next = new Date(date.getTime());
  next.setUTCDate(next.getUTCDate() + days);
  return next;
}

/** Returns the date of the Nth occurrence of `weekday` in the given month. */
function nthWeekdayOfMonth(
  year: number,
  monthIndex: number,
  weekday: number,
  n: number
): Date {
  const firstOfMonth = new Date(Date.UTC(year, monthIndex, 1));
  const offset = (weekday - firstOfMonth.getUTCDay() + 7) % 7;
  return new Date(Date.UTC(year, monthIndex, 1 + offset + (n - 1) * 7));
}

function startOfDay(d: Date): Date {
  return new Date(
    Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate())
  );
}

function daysBetween(a: Date, b: Date): number {
  return Math.round((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
}

// ---------------------------------------------------------------
// Formatting
// ---------------------------------------------------------------

const MONTHS_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const MONTHS_LONG = [
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
];
const DAYS_LONG = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const fmtMonthShort = (d: Date) => MONTHS_SHORT[d.getUTCMonth()].toUpperCase();
const fmtDayNum = (d: Date) => d.getUTCDate();
const fmtDayOfWeek = (d: Date) => DAYS_LONG[d.getUTCDay()];
const fmtDateShort = (d: Date) =>
  `${d.getUTCDate()} ${MONTHS_SHORT[d.getUTCMonth()]}`;
const fmtFullDate = (d: Date) =>
  `${DAYS_LONG[d.getUTCDay()]}, ${d.getUTCDate()} ${MONTHS_LONG[d.getUTCMonth()]} ${d.getUTCFullYear()}`;

// ---------------------------------------------------------------
// Holiday data
// ---------------------------------------------------------------

/**
 * Returns the 12 statutory bank holidays for a given year, plus any
 * substitution days required by the Public Holidays Act, Cap. 352.
 *
 * Substitution rules:
 *   - If New Year's Day, Errol Barrow Day, National Heroes' Day, May Day,
 *     Independence Day, or Boxing Day falls on a Sunday → the following
 *     Monday is a public holiday in lieu.
 *   - If Emancipation Day (1 August) falls on a Sunday or Monday → the
 *     following Tuesday is a public holiday in lieu.
 *   - If Christmas Day falls on a Sunday → the following Tuesday is a
 *     public holiday in lieu.
 *
 * Note: Government-declared one-off public holidays (e.g. the 13 February
 * 2026 declaration) are NOT included here. Those should be added via the
 * CMS / data layer rather than this generator.
 */
function getBankHolidaysForYear(year: number): Holiday[] {
  const easter = easterSunday(year);

  const fixed: Holiday[] = [
    { date: new Date(Date.UTC(year, 0, 1)), name: "New Year's Day" },
    {
      date: new Date(Date.UTC(year, 0, 21)),
      name: "Errol Barrow Day",
      note: "Honouring the first Prime Minister of Barbados",
    },
    { date: addDays(easter, -2), name: "Good Friday" },
    { date: addDays(easter, 1), name: "Easter Monday" },
    {
      date: new Date(Date.UTC(year, 3, 28)),
      name: "National Heroes' Day",
      note: "Honouring Barbados's ten official National Heroes",
    },
    {
      date: new Date(Date.UTC(year, 4, 1)),
      name: "May Day",
      note: "International Workers' Day",
    },
    {
      date: addDays(easter, 50),
      name: "Whit Monday",
      note: "7th Monday after Easter",
    },
    {
      date: new Date(Date.UTC(year, 7, 1)),
      name: "Emancipation Day",
      note: "Marking the abolition of slavery in 1834",
    },
    {
      date: nthWeekdayOfMonth(year, 7, 1, 1),
      name: "Kadooment Day",
      note: "Climax of the Crop Over Festival",
    },
    {
      date: new Date(Date.UTC(year, 10, 30)),
      name: "Independence Day",
      note: "National Day",
    },
    { date: new Date(Date.UTC(year, 11, 25)), name: "Christmas Day" },
    { date: new Date(Date.UTC(year, 11, 26)), name: "Boxing Day" },
  ];

  const mondayInLieuNames = new Set([
    "New Year's Day",
    "Errol Barrow Day",
    "National Heroes' Day",
    "May Day",
    "Independence Day",
    "Boxing Day",
  ]);

  const substitutes: Holiday[] = [];
  for (const h of fixed) {
    const dow = h.date.getUTCDay();

    if (mondayInLieuNames.has(h.name) && dow === 0) {
      substitutes.push({
        date: addDays(h.date, 1),
        name: `Public Holiday in lieu of ${h.name}`,
        substitute: true,
      });
    }

    if (h.name === "Emancipation Day" && (dow === 0 || dow === 1)) {
      substitutes.push({
        date: addDays(h.date, dow === 0 ? 2 : 1),
        name: "Public Holiday in lieu of Emancipation Day",
        substitute: true,
      });
    }

    if (h.name === "Christmas Day" && dow === 0) {
      substitutes.push({
        date: addDays(h.date, 2),
        name: "Public Holiday in lieu of Christmas Day",
        substitute: true,
      });
    }
  }

  return [...fixed, ...substitutes].sort(
    (a, b) => a.date.getTime() - b.date.getTime()
  );
}

/**
 * Returns "days of interest" — observances Barbadians recognise but which
 * are NOT bank holidays. Banks, schools, and government offices remain open.
 */
function getDaysOfInterestForYear(year: number): DayOfInterest[] {
  return [
    { date: new Date(Date.UTC(year, 1, 14)), name: "Valentine's Day" },
    { date: new Date(Date.UTC(year, 2, 8)), name: "International Women's Day" },
    {
      date: new Date(Date.UTC(year, 2, 21)),
      name: "World Down Syndrome Day",
      note: "Observed worldwide on the 21st day of the 3rd month",
    },
    { date: new Date(Date.UTC(year, 3, 22)), name: "Earth Day" },
    {
      date: nthWeekdayOfMonth(year, 4, 0, 2),
      name: "Mother's Day",
      note: "Second Sunday in May",
    },
    { date: new Date(Date.UTC(year, 5, 5)), name: "World Environment Day" },
    {
      date: nthWeekdayOfMonth(year, 5, 0, 3),
      name: "Father's Day",
      note: "Third Sunday in June",
    },
    {
      date: new Date(Date.UTC(year, 6, 6)),
      name: "CARICOM Day",
      note: "Marking the signing of the Treaty of Chaguaramas",
    },
    {
      date: new Date(Date.UTC(year, 6, 1)),
      name: "Crop Over Festival begins",
      note: "Cultural festival running through to Kadooment Day",
    },
    {
      date: new Date(Date.UTC(year, 8, 8)),
      name: "International Literacy Day",
    },
    { date: new Date(Date.UTC(year, 9, 10)), name: "World Mental Health Day" },
    {
      date: new Date(Date.UTC(year, 10, 25)),
      name: "International Day for the Elimination of Violence Against Women",
    },
    { date: new Date(Date.UTC(year, 11, 1)), name: "World AIDS Day" },
    {
      date: new Date(Date.UTC(year, 11, 3)),
      name: "International Day of Persons with Disabilities",
    },
    { date: new Date(Date.UTC(year, 11, 10)), name: "Human Rights Day" },
    {
      date: new Date(Date.UTC(year, 11, 31)),
      name: "Old Year's Night",
      note: "Also known as New Year's Eve",
    },
  ];
}

// ---------------------------------------------------------------
// Constants
// ---------------------------------------------------------------

const MIN_YEAR = 2020;
const MAX_YEAR = 2050;
const LAST_UPDATED = "5 May 2026";

// ---------------------------------------------------------------
// Page
// ---------------------------------------------------------------

export default function BankHolidaysPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const today = useMemo(() => startOfDay(new Date()), []);
  const currentRealYear = today.getUTCFullYear();

  const yearParam = searchParams.get("year");
  const parsedYear = yearParam ? Number.parseInt(yearParam, 10) : Number.NaN;
  const selectedYear =
    Number.isFinite(parsedYear) &&
    parsedYear >= MIN_YEAR &&
    parsedYear <= MAX_YEAR
      ? parsedYear
      : currentRealYear;

  const [activeTab, setActiveTab] = useState<TabId>("holidays");

  const holidays = useMemo(
    () => getBankHolidaysForYear(selectedYear),
    [selectedYear]
  );
  const daysOfInterest = useMemo(
    () => getDaysOfInterestForYear(selectedYear),
    [selectedYear]
  );

  const isCurrentYear = selectedYear === currentRealYear;
  const upcoming = isCurrentYear ? holidays.filter((h) => h.date >= today) : [];
  const past = isCurrentYear ? holidays.filter((h) => h.date < today) : [];
  const nextHoliday = upcoming[0];
  const substitutes = holidays.filter((h) => h.substitute);

  const setYear = useCallback(
    (newYear: number) => {
      const params = new URLSearchParams(searchParams.toString());
      if (newYear === currentRealYear) {
        params.delete("year");
      } else {
        params.set("year", String(newYear));
      }
      const qs = params.toString();
      router.replace(qs ? `?${qs}` : "?", { scroll: false });
    },
    [router, searchParams, currentRealYear]
  );

  return (
    <>
      <div className="bg-blue-10">
        <div className="container">
          <StageBanner stage="alpha" />
        </div>
      </div>
      <main className="mx-auto max-w-[880px] px-6 pt-6 pb-16">
        <BackLink />

        <h1 className="font-extrabold text-4xl text-blue-100 leading-tight tracking-tight">
          Bank holidays and days of interest
        </h1>
        <p className="mt-2 mb-8 text-mid-grey-00 text-sm">
          Last updated on {LAST_UPDATED}
        </p>

        <Tabs
          activeTab={activeTab}
          doiCount={daysOfInterest.length}
          holidayCount={holidays.length}
          onTabChange={setActiveTab}
        >
          {activeTab === "holidays" && (
            <BankHolidaysPanel
              currentRealYear={currentRealYear}
              holidays={holidays}
              isCurrentYear={isCurrentYear}
              nextHoliday={nextHoliday}
              onYearChange={setYear}
              past={past}
              substitutes={substitutes}
              today={today}
              upcoming={upcoming}
              year={selectedYear}
            />
          )}

          {activeTab === "doi" && (
            <DaysOfInterestPanel
              currentRealYear={currentRealYear}
              daysOfInterest={daysOfInterest}
              onYearChange={setYear}
              year={selectedYear}
            />
          )}
        </Tabs>

        <AboutSection />
      </main>
    </>
  );
}

// ---------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------

function BackLink() {
  return (
    <a
      className="mb-6 inline-flex items-center gap-1 font-semibold text-base text-blue-100 hover:underline"
      href="/"
    >
      <svg
        aria-hidden="true"
        className="h-3.5 w-3.5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.5"
        viewBox="0 0 24 24"
      >
        <polyline points="15 18 9 12 15 6" />
      </svg>
      Back
    </a>
  );
}

type TabsProps = {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  holidayCount: number;
  doiCount: number;
  children: React.ReactNode;
};

function Tabs({
  activeTab,
  onTabChange,
  holidayCount,
  doiCount,
  children,
}: TabsProps) {
  const tabs: { id: TabId; label: string; count: number }[] = [
    { id: "holidays", label: "Bank holidays", count: holidayCount },
    { id: "doi", label: "Days of interest", count: doiCount },
  ];

  const handleKeyDown = (e: React.KeyboardEvent, currentIndex: number) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const direction = e.key === "ArrowRight" ? 1 : -1;
      const nextIndex = (currentIndex + direction + tabs.length) % tabs.length;
      onTabChange(tabs[nextIndex].id);
      // Move focus to the newly-activated tab
      const nextEl = document.getElementById(`tab-${tabs[nextIndex].id}`);
      nextEl?.focus();
    }
  };

  return (
    <div>
      <ul
        aria-label="Choose what to view"
        className="relative z-10 flex gap-1 px-2"
        role="tablist"
      >
        {tabs.map((tab, i) => {
          const isSelected = tab.id === activeTab;
          return (
            <li key={tab.id}>
              <button
                aria-controls={`panel-${tab.id}`}
                aria-selected={isSelected}
                className={[
                  "relative -mb-px rounded-t-[10px] border border-b-0 px-5 pt-3.5 pb-3 font-semibold text-base leading-tight transition-colors",
                  isSelected
                    ? "border-grey-00 border-t-[3px] border-t-yellow-500 bg-white text-blue-100 shadow-[0_1px_0_0_white]"
                    : "border-grey-00 bg-grey-00 text-mid-grey-00 hover:bg-[#f5f7fa] hover:text-mid-grey-00",
                ].join(" ")}
                id={`tab-${tab.id}`}
                onClick={() => onTabChange(tab.id)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                role="tab"
                tabIndex={isSelected ? 0 : -1}
                type="button"
              >
                {tab.label}
                <span
                  className={[
                    "ml-1.5 font-medium text-sm",
                    isSelected ? "text-mid-grey-00" : "text-mid-grey-00",
                  ].join(" ")}
                >
                  {tab.count}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      <div
        aria-labelledby={`tab-${activeTab}`}
        className="relative z-0 rounded-b-lg rounded-tr-lg border border-grey-00 bg-white p-8"
        id={`panel-${activeTab}`}
        role="tabpanel"
      >
        {children}
      </div>
    </div>
  );
}

type YearSwitcherProps = {
  year: number;
  onYearChange: (year: number) => void;
};

function YearSwitcher({ year, onYearChange }: YearSwitcherProps) {
  const canGoPrev = year > MIN_YEAR;
  const canGoNext = year < MAX_YEAR;

  return (
    <div
      aria-label="Choose a year"
      className="mb-6 flex items-center justify-between gap-4 border-grey-00 border-b pb-6"
      role="group"
    >
      <button
        aria-label={`Previous year, ${year - 1}`}
        className="inline-flex items-center gap-2 rounded border border-grey-00 bg-white px-3.5 py-2 font-semibold text-blue-100 text-sm transition-colors hover:border-blue-100 hover:bg-blue-10 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white"
        disabled={!canGoPrev}
        onClick={() => onYearChange(year - 1)}
        type="button"
      >
        <svg
          aria-hidden="true"
          className="h-3.5 w-3.5"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
        <span className="text-left leading-none">
          <span className="block font-medium text-[11px] text-mid-grey-00 uppercase tracking-wider">
            Previous
          </span>
          <span className="block font-bold text-blue-100 text-sm">
            {year - 1}
          </span>
        </span>
      </button>

      <span
        aria-live="polite"
        className="font-extrabold text-2xl text-blue-100 tracking-tight"
      >
        {year}
      </span>

      <button
        aria-label={`Next year, ${year + 1}`}
        className="inline-flex items-center gap-2 rounded border border-grey-00 bg-white px-3.5 py-2 font-semibold text-blue-100 text-sm transition-colors hover:border-blue-100 hover:bg-blue-10 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white"
        disabled={!canGoNext}
        onClick={() => onYearChange(year + 1)}
        type="button"
      >
        <span className="text-right leading-none">
          <span className="block font-medium text-[11px] text-mid-grey-00 uppercase tracking-wider">
            Next
          </span>
          <span className="block font-bold text-blue-100 text-sm">
            {year + 1}
          </span>
        </span>
        <svg
          aria-hidden="true"
          className="h-3.5 w-3.5"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
  );
}

type BankHolidaysPanelProps = {
  year: number;
  currentRealYear: number;
  isCurrentYear: boolean;
  holidays: Holiday[];
  upcoming: Holiday[];
  past: Holiday[];
  nextHoliday: Holiday | undefined;
  today: Date;
  substitutes: Holiday[];
  onYearChange: (year: number) => void;
};

function BankHolidaysPanel({
  year,
  currentRealYear,
  isCurrentYear,
  holidays,
  upcoming,
  past,
  nextHoliday,
  today,
  substitutes,
  onYearChange,
}: BankHolidaysPanelProps) {
  return (
    <>
      {/* Hero: next bank holiday (only meaningful for the current year) */}
      {isCurrentYear && nextHoliday && (
        <NextHolidayHero holiday={nextHoliday} today={today} />
      )}
      {isCurrentYear && !nextHoliday && (
        <YearOverviewHero
          count={holidays.length}
          variant="exhausted"
          year={year}
        />
      )}
      {!isCurrentYear && (
        <YearOverviewHero
          count={holidays.length}
          variant={year < currentRealYear ? "past" : "future"}
          year={year}
        />
      )}

      <YearSwitcher onYearChange={onYearChange} year={year} />

      {isCurrentYear ? (
        <>
          <HolidaySection
            chip={`${upcoming.length} remaining`}
            heading="Upcoming holidays"
            highlightFirst
            holidays={upcoming}
          />
          {past.length > 0 && (
            <HolidaySection
              chip={`${past.length} so far`}
              heading="Past holidays"
              holidays={past}
              muted
            />
          )}
        </>
      ) : (
        <HolidaySection
          chip={`${holidays.length} ${
            year < currentRealYear ? "observed" : "scheduled"
          }`}
          heading="All bank holidays"
          holidays={holidays}
        />
      )}

      <SubstitutionNotice substituteCount={substitutes.length} year={year} />
    </>
  );
}

function NextHolidayHero({
  holiday,
  today,
}: {
  holiday: Holiday;
  today: Date;
}) {
  const days = daysBetween(today, holiday.date);
  const countdownLabel =
    days === 0 ? "Today" : days === 1 ? "Tomorrow" : `${days} days away`;

  return (
    <section
      aria-label="Next bank holiday"
      className="relative mb-8 overflow-hidden rounded-lg bg-blue-100 px-8 pt-7 pb-8 text-white"
    >
      {/* Decorative circles */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 -right-10 h-56 w-56 rounded-full bg-blue-40/55"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-16 -bottom-10 h-36 w-36 rounded-full bg-blue-40/55"
      />

      <div className="relative">
        <span className="mb-6 inline-flex items-center gap-1.5 rounded bg-yellow-100 px-3.5 py-1.5 font-extrabold text-blue-100 text-xs uppercase tracking-widest">
          <svg
            aria-hidden="true"
            className="h-3.5 w-3.5"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="9" />
            <polyline points="12 7 12 12 15 14" />
          </svg>
          Next bank holiday
        </span>
        <h2 className="mb-2.5 font-extrabold text-4xl leading-tight tracking-tight">
          {holiday.name}
        </h2>
        <p className="mb-6 font-bold text-xl text-yellow-00 tracking-tight">
          {fmtFullDate(holiday.date)}
        </p>
        <p className="font-medium text-[15px] text-white/70">
          {days === 0 || days === 1 ? (
            <strong className="font-bold text-base text-yellow-00">
              {countdownLabel}
            </strong>
          ) : (
            <>
              <strong className="font-bold text-base text-yellow-00">
                {days}
              </strong>{" "}
              days away
            </>
          )}
        </p>
      </div>
    </section>
  );
}

function YearOverviewHero({
  year,
  variant,
  count,
}: {
  year: number;
  variant: "past" | "future" | "exhausted";
  count: number;
}) {
  const labels: Record<typeof variant, { pill: string; heading: string }> = {
    past: {
      pill: "Past year",
      heading: `${count} bank holidays were observed in ${year}`,
    },
    future: {
      pill: "Future year",
      heading: `${count} bank holidays will be observed in ${year}`,
    },
    exhausted: {
      pill: `No more holidays in ${year}`,
      heading: `All ${year} bank holidays have passed`,
    },
  };
  const { pill, heading } = labels[variant];

  return (
    <section
      aria-label="Year overview"
      className="mb-8 rounded-lg border border-grey-00 bg-[#f5f7fa] px-8 py-6"
    >
      <span className="mb-3 inline-block rounded bg-grey-00 px-3 py-1 font-bold text-mid-grey-00 text-xs uppercase tracking-wider">
        {pill}
      </span>
      <h2 className="font-extrabold text-2xl text-blue-100 leading-tight tracking-tight">
        {heading}
      </h2>
    </section>
  );
}

function HolidaySection({
  heading,
  chip,
  holidays,
  highlightFirst,
  muted,
}: {
  heading: string;
  chip: string;
  holidays: Holiday[];
  highlightFirst?: boolean;
  muted?: boolean;
}) {
  if (holidays.length === 0) return null;

  return (
    <section className="mt-10 first:mt-0">
      <div className="mb-4 flex items-center gap-3">
        <h2 className="font-extrabold text-2xl text-blue-100 tracking-tight">
          {heading}
        </h2>
        <span className="inline-flex items-center rounded-full bg-grey-00 px-3 py-1 font-medium text-mid-grey-00 text-xs">
          {chip}
        </span>
      </div>

      <div className="border-grey-00 border-t">
        {/* Column header */}
        <div
          aria-hidden="true"
          className="hidden border-grey-00 border-b-2 px-4 pt-2 pb-2.5 font-bold text-mid-grey-00 text-xs uppercase tracking-wider md:grid md:grid-cols-[72px_1fr_130px] md:gap-6"
        >
          <span>Date</span>
          <span>Holiday</span>
          <span className="text-right">Day</span>
        </div>

        <ul>
          {holidays.map((h, i) => (
            <HolidayRow
              holiday={h}
              isNext={Boolean(highlightFirst && i === 0)}
              key={`${h.date.toISOString()}-${h.name}`}
              muted={muted}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}

function HolidayRow({
  holiday,
  isNext,
  muted,
}: {
  holiday: Holiday;
  isNext?: boolean;
  muted?: boolean;
}) {
  return (
    <li
      className={[
        "grid grid-cols-[64px_1fr] items-center gap-3.5 border-grey-00 border-b px-2 py-4 md:grid-cols-[72px_1fr_130px] md:gap-6 md:px-4 md:py-4.5",
        isNext
          ? "-mt-px mb-2 rounded-lg border border-yellow-100 bg-yellow-10 md:px-4"
          : "",
      ].join(" ")}
    >
      <div
        aria-hidden="true"
        className={[
          "rounded text-center font-extrabold leading-none",
          muted ? "bg-grey-00 text-mid-grey-00" : "bg-yellow-100 text-blue-100",
        ].join(" ")}
      >
        <span className="block px-1 pt-2 pb-1 text-[11px] uppercase tracking-wider">
          {fmtMonthShort(holiday.date)}
        </span>
        <span className="block px-1 pb-2.5 text-2xl tracking-tight">
          {fmtDayNum(holiday.date)}
        </span>
      </div>
      <div>
        <span
          className={[
            "block font-bold text-base leading-snug",
            muted ? "text-mid-grey-00" : "text-blue-100",
          ].join(" ")}
        >
          {holiday.name}
        </span>
        {holiday.note && (
          <span className="mt-0.5 block text-mid-grey-00 text-sm leading-snug">
            {holiday.note}
          </span>
        )}
      </div>
      <div
        className={[
          "col-span-2 mt-[-8px] pl-[78px] font-medium text-[13px] md:col-span-1 md:mt-0 md:pl-0 md:text-right md:text-[15px]",
          muted ? "text-mid-grey-00" : "text-mid-grey-00",
        ].join(" ")}
      >
        {fmtDayOfWeek(holiday.date)}
      </div>
    </li>
  );
}

function SubstitutionNotice({
  year,
  substituteCount,
}: {
  year: number;
  substituteCount: number;
}) {
  const subText =
    substituteCount === 0
      ? `No substitute days apply for ${year}.`
      : `${substituteCount} substitute day${substituteCount > 1 ? "s" : ""} appl${
          substituteCount === 1 ? "ies" : "y"
        } for ${year}.`;

  return (
    <div className="mt-10 rounded-r border-blue-100 border-l-4 bg-blue-10 px-5 py-4 text-[15px] text-mid-grey-00">
      <strong className="mb-1 block text-base text-blue-100">
        When a bank holiday falls on a weekend
      </strong>
      Most holidays falling on a Sunday are observed on the following Monday.{" "}
      <span className="text-mid-grey-00">{subText}</span>
      <details className="mt-1.5">
        <summary className="cursor-pointer font-semibold text-blue-100">
          Read the full rules
        </summary>
        <p className="mt-2.5 text-sm">
          If New Year&apos;s Day, Errol Barrow Day, National Heroes&apos; Day,
          May Day, Independence Day or Boxing Day falls on a Sunday, the
          following Monday is observed as a public holiday in lieu.
        </p>
        <p className="mt-2 text-sm">
          If Emancipation Day (1 August) falls on a Sunday or Monday, the
          following Tuesday is also a public holiday. The same applies to
          Christmas Day.
        </p>
      </details>
    </div>
  );
}

type DaysOfInterestPanelProps = {
  year: number;
  currentRealYear: number;
  daysOfInterest: DayOfInterest[];
  onYearChange: (year: number) => void;
};

function DaysOfInterestPanel({
  year,
  daysOfInterest,
  onYearChange,
}: DaysOfInterestPanelProps) {
  return (
    <>
      <YearSwitcher onYearChange={onYearChange} year={year} />

      <p className="mb-6 max-w-[640px] text-mid-grey-00">
        These dates are observed across Barbados but are not bank holidays.
        Banks, schools and government offices remain open.
      </p>

      <ul className="border-grey-00 border-t">
        {daysOfInterest.map((d) => (
          <li
            className="grid grid-cols-[80px_1fr] items-baseline gap-3 border-grey-00 border-b px-2 py-3.5 md:grid-cols-[110px_1fr] md:gap-5 md:px-4"
            key={`${d.date.toISOString()}-${d.name}`}
          >
            <span className="whitespace-nowrap font-semibold text-blue-100 text-sm">
              {fmtDateShort(d.date)}
            </span>
            <span className="font-medium text-blue-100">
              {d.name}
              {d.note && (
                <span className="mt-0.5 block font-normal text-mid-grey-00 text-sm">
                  {d.note}
                </span>
              )}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}

function AboutSection() {
  return (
    <section
      aria-labelledby="about-heading"
      className="mt-16 border-grey-00 border-t-2 pt-8"
    >
      <h2
        className="mb-3 font-extrabold text-blue-100 text-xl"
        id="about-heading"
      >
        About this list
      </h2>
      <p className="mb-3 max-w-[640px] text-[15px] text-mid-grey-00">
        Bank holidays in Barbados are set out in the Public Holidays Act, Cap.
        352. The Government may also declare additional one-off public holidays
        from time to time.
      </p>
      <p className="mb-3 max-w-[640px] text-[15px] text-mid-grey-00">
        Days of interest are widely observed across Barbados but are not legally
        recognised public holidays. Banks, schools and government offices remain
        open.
      </p>
      <p className="max-w-[640px] text-[15px] text-mid-grey-00">
        This page is updated when new dates are gazetted.
      </p>
    </section>
  );
}
