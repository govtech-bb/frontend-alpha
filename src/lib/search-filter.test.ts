import { describe, expect, it } from "vitest";

import { filterByQuery } from "./search-filter";

const items = [
  { name: "Ministry of Finance", shortDescription: "Manages public funds" },
  { name: "Ministry of Health", shortDescription: "Public health services" },
  { name: "Customs Department" },
  { name: "Treasury", shortDescription: "Government revenue collection" },
];

describe("filterByQuery", () => {
  it("returns all items for empty query", () => {
    expect(filterByQuery(items, "")).toEqual(items);
  });

  it("returns all items for whitespace-only query", () => {
    expect(filterByQuery(items, "   ")).toEqual(items);
  });

  it("matches case-insensitively by name", () => {
    const result = filterByQuery(items, "FINANCE");
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Ministry of Finance");
  });

  it("matches case-insensitively by shortDescription", () => {
    const result = filterByQuery(items, "REVENUE");
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Treasury");
  });

  it("matches partial substrings", () => {
    const result = filterByQuery(items, "minist");
    expect(result).toHaveLength(2);
  });

  it("trims surrounding whitespace from query", () => {
    const result = filterByQuery(items, "  finance  ");
    expect(result).toHaveLength(1);
  });

  it("returns empty array when nothing matches", () => {
    expect(filterByQuery(items, "zzz")).toEqual([]);
  });

  it("handles items without shortDescription", () => {
    const result = filterByQuery(items, "customs");
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Customs Department");
  });

  it("does not match shortDescription on undefined", () => {
    const result = filterByQuery(items, "xyz");
    expect(result).toEqual([]);
  });
});
