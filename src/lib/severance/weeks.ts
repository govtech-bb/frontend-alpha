export type Ceiling = { weekly: number; monthly: number };

export const INSURABLE_CEILINGS: Record<number, Ceiling> = {
  2026: { weekly: 1238, monthly: 5360 },
  2025: { weekly: 1219, monthly: 5280 },
  2024: { weekly: 1201, monthly: 5200 },
  2023: { weekly: 1182, monthly: 5120 },
  2022: { weekly: 1126, monthly: 4880 },
  2021: { weekly: 1128, monthly: 4880 },
  2020: { weekly: 1128, monthly: 4880 },
  2019: { weekly: 1112, monthly: 4820 },
  2018: { weekly: 1073, monthly: 4650 },
  2017: { weekly: 1073, monthly: 4650 },
  2016: { weekly: 1060, monthly: 4360 },
  2015: { weekly: 1060, monthly: 4360 },
};

export function ceilingFor(year: number): Ceiling | null {
  return INSURABLE_CEILINGS[year] ?? null;
}

export function completeYears(startIso: string, endIso: string): number {
  const s = new Date(startIso);
  const e = new Date(endIso);
  if (Number.isNaN(s.getTime()) || Number.isNaN(e.getTime()) || e <= s)
    return 0;
  let years = e.getFullYear() - s.getFullYear();
  const anniversary = new Date(e.getFullYear(), s.getMonth(), s.getDate());
  if (e < anniversary) years--;
  return Math.max(years, 0);
}

export function avgWeeklyFromSimple(
  amount: number,
  period: "weekly" | "monthly",
  endYear: number | null,
): number {
  if (!Number.isFinite(amount) || amount <= 0) return 0;
  const weekly = period === "monthly" ? (amount * 12) / 52 : amount;
  const ceiling = endYear ? ceilingFor(endYear) : null;
  return ceiling && weekly > ceiling.weekly ? ceiling.weekly : weekly;
}

export function tieredWeeks(yearsOfService: number): number {
  const counted = Math.min(yearsOfService, 33);
  let weeks = 0;
  for (let i = 1; i <= counted; i++) {
    weeks += i <= 10 ? 2.5 : i <= 20 ? 3.0 : 3.5;
  }
  return weeks;
}

