import { describe, expect, it } from "vitest";
import type { JusticeOfThePeace } from "@/types/justice-of-the-peace";
import {
  filterByParish,
  formatDistance,
  haversineKm,
  listParishes,
  sortByDistance,
} from "./justice-of-the-peace";

function makeJp(
  overrides: Partial<JusticeOfThePeace> & { id: number }
): JusticeOfThePeace {
  return {
    id: overrides.id,
    name: overrides.name ?? `JP ${overrides.id}`,
    parish: overrides.parish ?? "St. Michael",
    area: overrides.area ?? "",
    community: overrides.community ?? "",
    business: overrides.business ?? "",
    lat: overrides.lat ?? 13.1,
    lng: overrides.lng ?? -59.6,
  };
}

describe("haversineKm", () => {
  it("returns 0 for the same point", () => {
    expect(haversineKm({ lat: 13.1, lng: -59.6 }, { lat: 13.1, lng: -59.6 })).toBe(
      0
    );
  });

  it("matches Bridgetown → Speightstown distance (~25 km)", () => {
    // Bridgetown ~ (13.0975, -59.6167); Speightstown ~ (13.2479, -59.6429)
    const km = haversineKm(
      { lat: 13.0975, lng: -59.6167 },
      { lat: 13.2479, lng: -59.6429 }
    );
    expect(km).toBeGreaterThan(16);
    expect(km).toBeLessThan(18);
  });

  it("is symmetric", () => {
    const a = { lat: 13.08, lng: -59.54 };
    const b = { lat: 13.24, lng: -59.57 };
    expect(haversineKm(a, b)).toBeCloseTo(haversineKm(b, a), 9);
  });
});

describe("filterByParish", () => {
  const jps = [
    makeJp({ id: 1, parish: "St. Michael" }),
    makeJp({ id: 2, parish: "Christ Church" }),
    makeJp({ id: 3, parish: "St. Michael" }),
  ];

  it("returns the full list when parish is empty", () => {
    expect(filterByParish(jps, "")).toHaveLength(3);
  });

  it("returns only matching JPs", () => {
    const result = filterByParish(jps, "St. Michael");
    expect(result).toHaveLength(2);
    expect(result.map((j) => j.id)).toEqual([1, 3]);
  });

  it("returns empty when no JP matches", () => {
    expect(filterByParish(jps, "St. Lucy")).toEqual([]);
  });
});

describe("sortByDistance", () => {
  it("orders JPs nearest-first relative to origin", () => {
    const origin = { lat: 13.1, lng: -59.6 };
    const far = makeJp({ id: 1, lat: 13.25, lng: -59.5 });
    const near = makeJp({ id: 2, lat: 13.101, lng: -59.601 });
    const mid = makeJp({ id: 3, lat: 13.15, lng: -59.55 });
    const sorted = sortByDistance([far, near, mid], origin);
    expect(sorted.map((j) => j.id)).toEqual([near.id, mid.id, far.id]);
  });

  it("does not mutate the input array", () => {
    const jps = [
      makeJp({ id: 1, lat: 13.25, lng: -59.5 }),
      makeJp({ id: 2, lat: 13.1, lng: -59.6 }),
    ];
    const original = jps.map((j) => j.id);
    sortByDistance(jps, { lat: 13.1, lng: -59.6 });
    expect(jps.map((j) => j.id)).toEqual(original);
  });
});

describe("formatDistance", () => {
  it("uses metres under 1 km", () => {
    expect(formatDistance(0.42)).toBe("420 m");
  });

  it("uses one-decimal km from 1 km up", () => {
    expect(formatDistance(1.23)).toBe("1.2 km");
    expect(formatDistance(15.07)).toBe("15.1 km");
  });
});

describe("listParishes", () => {
  it("returns sorted, deduplicated parish names", () => {
    const jps = [
      makeJp({ id: 1, parish: "St. Michael" }),
      makeJp({ id: 2, parish: "Christ Church" }),
      makeJp({ id: 3, parish: "St. Michael" }),
      makeJp({ id: 4, parish: "St. Andrew" }),
    ];
    expect(listParishes(jps)).toEqual([
      "Christ Church",
      "St. Andrew",
      "St. Michael",
    ]);
  });
});
