import { describe, expect, it } from "vitest";
import type { Pharmacy, PharmacyHourWindow } from "@/types/pharmacy";
import {
  buildDirectionsHref,
  closingMinutes,
  filterByOpenNow,
  filterByParish,
  filterByType,
  formatMinutesAsTime,
  formatPhoneHref,
  getBarbadosTime,
  nextOpening,
  openStatus,
  sortPharmacies,
} from "./open-pharmacy";

function makePharmacy(
  overrides: Partial<Pharmacy> & { id: string }
): Pharmacy {
  return {
    id: overrides.id,
    name: overrides.name ?? `Pharmacy ${overrides.id}`,
    type: overrides.type ?? "private-sbs",
    address: overrides.address ?? "",
    parish: overrides.parish ?? "St. Michael",
    phone: overrides.phone ?? "",
    hours: overrides.hours ?? [],
    hoursText: overrides.hoursText ?? "",
    notes: overrides.notes ?? "",
    routes: overrides.routes ?? "",
    lat: overrides.lat,
    lng: overrides.lng,
  };
}

const MON_FRI_8_TO_5: PharmacyHourWindow = {
  days: [1, 2, 3, 4, 5],
  open: 8 * 60,
  close: 17 * 60,
};

describe("openStatus", () => {
  it("returns null when hours array is empty (unconfirmed)", () => {
    const p = makePharmacy({ id: "unc", hours: [] });
    expect(openStatus(p, 1, 600)).toBeNull();
  });

  it("returns true within a weekday window", () => {
    const p = makePharmacy({ id: "p", hours: [MON_FRI_8_TO_5] });
    expect(openStatus(p, 1, 10 * 60)).toBe(true);
  });

  it("returns false before opening", () => {
    const p = makePharmacy({ id: "p", hours: [MON_FRI_8_TO_5] });
    expect(openStatus(p, 1, 7 * 60 + 59)).toBe(false);
  });

  it("treats close as exclusive — false at exactly close time", () => {
    const p = makePharmacy({ id: "p", hours: [MON_FRI_8_TO_5] });
    expect(openStatus(p, 1, 17 * 60)).toBe(false);
    expect(openStatus(p, 1, 17 * 60 - 1)).toBe(true);
  });

  it("treats open as inclusive — true at exactly open time", () => {
    const p = makePharmacy({ id: "p", hours: [MON_FRI_8_TO_5] });
    expect(openStatus(p, 1, 8 * 60)).toBe(true);
  });

  it("returns false on a day not in the window", () => {
    const p = makePharmacy({ id: "p", hours: [MON_FRI_8_TO_5] });
    expect(openStatus(p, 6, 10 * 60)).toBe(false);
    expect(openStatus(p, 0, 10 * 60)).toBe(false);
  });

  it("combines multiple windows (Mon–Sat morning + Sun afternoon)", () => {
    const p = makePharmacy({
      id: "p",
      hours: [
        { days: [1, 2, 3, 4, 5, 6], open: 8 * 60, close: 20 * 60 },
        { days: [0], open: 9 * 60, close: 14 * 60 },
      ],
    });
    expect(openStatus(p, 0, 10 * 60)).toBe(true);
    expect(openStatus(p, 0, 14 * 60 + 1)).toBe(false);
    expect(openStatus(p, 6, 8 * 60)).toBe(true);
  });
});

describe("closingMinutes", () => {
  it("returns the active window's close time when open", () => {
    const p = makePharmacy({ id: "p", hours: [MON_FRI_8_TO_5] });
    expect(closingMinutes(p, 1, 10 * 60)).toBe(17 * 60);
  });

  it("returns null when closed", () => {
    const p = makePharmacy({ id: "p", hours: [MON_FRI_8_TO_5] });
    expect(closingMinutes(p, 6, 10 * 60)).toBeNull();
  });

  it("returns null when unconfirmed", () => {
    const p = makePharmacy({ id: "unc", hours: [] });
    expect(closingMinutes(p, 1, 10 * 60)).toBeNull();
  });
});

describe("nextOpening", () => {
  it("returns null when hours are empty", () => {
    const p = makePharmacy({ id: "unc", hours: [] });
    expect(nextOpening(p, 1, 10 * 60)).toBeNull();
  });

  it("returns today's later opening when one exists", () => {
    const p = makePharmacy({
      id: "p",
      hours: [
        { days: [1], open: 9 * 60, close: 12 * 60 },
        { days: [1], open: 14 * 60, close: 18 * 60 },
      ],
    });
    const result = nextOpening(p, 1, 13 * 60);
    expect(result).toEqual({ daysAhead: 0, weekday: 1, openMinutes: 14 * 60 });
  });

  it("rolls to the next scheduled day", () => {
    const p = makePharmacy({ id: "p", hours: [MON_FRI_8_TO_5] });
    const result = nextOpening(p, 5, 18 * 60); // Friday evening
    expect(result).toEqual({ daysAhead: 3, weekday: 1, openMinutes: 8 * 60 });
  });

  it("ignores windows already passed today", () => {
    const p = makePharmacy({ id: "p", hours: [MON_FRI_8_TO_5] });
    const result = nextOpening(p, 1, 18 * 60); // Monday after close
    expect(result).toEqual({ daysAhead: 1, weekday: 2, openMinutes: 8 * 60 });
  });
});

describe("formatMinutesAsTime", () => {
  it("formats midnight as 12:00 am", () => {
    expect(formatMinutesAsTime(0)).toBe("12:00 am");
  });

  it("formats noon as 12:00 pm", () => {
    expect(formatMinutesAsTime(12 * 60)).toBe("12:00 pm");
  });

  it("pads single-digit minutes", () => {
    expect(formatMinutesAsTime(8 * 60 + 5)).toBe("8:05 am");
  });

  it("formats 8:15 am, 4:30 pm, 10:00 pm correctly", () => {
    expect(formatMinutesAsTime(8 * 60 + 15)).toBe("8:15 am");
    expect(formatMinutesAsTime(16 * 60 + 30)).toBe("4:30 pm");
    expect(formatMinutesAsTime(22 * 60)).toBe("10:00 pm");
  });
});

describe("getBarbadosTime", () => {
  it("yields the same wall-clock from different browser timezones", () => {
    // Same UTC instant — should yield identical Barbados local fields
    // regardless of where the browser thinks it is.
    const instant = new Date("2026-05-22T18:00:00Z"); // 14:00 (2 pm) AST
    const result = getBarbadosTime(instant);
    expect(result.day).toBe(5);
    expect(result.minutes).toBe(14 * 60);
  });

  it("rolls back to the previous day before 04:00 UTC", () => {
    const instant = new Date("2026-05-22T02:00:00Z"); // 22:00 (10 pm) Wed AST
    const result = getBarbadosTime(instant);
    expect(result.day).toBe(4); // Thursday's date in UTC is the 22nd, day 5; minus 4h = Wed 22:00
    // 22 May 2026 is a Friday in UTC. 2 am UTC - 4h = 10 pm previous day = Thursday.
    expect(result.minutes).toBe(22 * 60);
  });
});

describe("filterByType / filterByParish / filterByOpenNow", () => {
  const pharmacies = [
    makePharmacy({
      id: "1",
      type: "government",
      parish: "St. Michael",
      hours: [MON_FRI_8_TO_5],
    }),
    makePharmacy({
      id: "2",
      type: "private-sbs",
      parish: "Christ Church",
      hours: [],
    }),
    makePharmacy({
      id: "3",
      type: "unconfirmed",
      parish: "St. Michael",
      hours: [],
    }),
  ];

  it("filterByType('all') returns all pharmacies", () => {
    expect(filterByType(pharmacies, "all")).toHaveLength(3);
  });

  it("filterByType narrows to one type", () => {
    expect(filterByType(pharmacies, "government").map((p) => p.id)).toEqual([
      "1",
    ]);
  });

  it("filterByParish('all') returns all pharmacies", () => {
    expect(filterByParish(pharmacies, "all")).toHaveLength(3);
  });

  it("filterByParish narrows to one parish", () => {
    expect(filterByParish(pharmacies, "St. Michael").map((p) => p.id)).toEqual([
      "1",
      "3",
    ]);
  });

  it("filterByOpenNow only keeps pharmacies open right now", () => {
    expect(
      filterByOpenNow(pharmacies, 1, 10 * 60).map((p) => p.id)
    ).toEqual(["1"]);
  });

  it("filterByOpenNow excludes unconfirmed pharmacies (status=null)", () => {
    const list = [
      makePharmacy({ id: "open", hours: [MON_FRI_8_TO_5] }),
      makePharmacy({ id: "unconfirmed", hours: [] }),
    ];
    expect(filterByOpenNow(list, 1, 10 * 60).map((p) => p.id)).toEqual([
      "open",
    ]);
  });
});

describe("sortPharmacies", () => {
  it("puts open-now pharmacies first", () => {
    const open = makePharmacy({
      id: "open",
      type: "private-sbs",
      hours: [MON_FRI_8_TO_5],
    });
    const closed = makePharmacy({
      id: "closed",
      type: "government",
      hours: [],
    });
    const sorted = sortPharmacies([closed, open], 1, 10 * 60);
    expect(sorted.map((p) => p.id)).toEqual(["open", "closed"]);
  });

  it("within each open/closed group, sorts gov → private → unconfirmed → name", () => {
    const a = makePharmacy({ id: "a-priv", name: "Alpha", type: "private-sbs" });
    const b = makePharmacy({ id: "b-gov", name: "Bravo", type: "government" });
    const c = makePharmacy({ id: "c-unc", name: "Charlie", type: "unconfirmed" });
    const d = makePharmacy({ id: "d-priv", name: "Delta", type: "private-sbs" });
    const sorted = sortPharmacies([a, b, c, d], 6, 10 * 60); // Saturday — all closed
    expect(sorted.map((p) => p.id)).toEqual(["b-gov", "a-priv", "d-priv", "c-unc"]);
  });

  it("does not mutate the input array", () => {
    const list = [
      makePharmacy({ id: "1", name: "Zed" }),
      makePharmacy({ id: "2", name: "Alpha" }),
    ];
    const before = list.map((p) => p.id);
    sortPharmacies(list, 1, 10 * 60);
    expect(list.map((p) => p.id)).toEqual(before);
  });
});

describe("formatPhoneHref / buildDirectionsHref", () => {
  it("formatPhoneHref strips non-digits and prefixes +1", () => {
    expect(formatPhoneHref("(246) 535-4300")).toBe("tel:+12465354300");
  });

  it("buildDirectionsHref encodes the query", () => {
    const p = makePharmacy({
      id: "p",
      name: "Test & Co",
      address: "1 Main St",
    });
    const href = buildDirectionsHref(p);
    expect(href).toContain("Test%20%26%20Co");
    expect(href).toContain("Barbados");
  });
});
