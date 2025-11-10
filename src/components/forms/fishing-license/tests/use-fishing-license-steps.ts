import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { PartialFishingLicenseFormData } from "../types";
import { useFishingLicenseSteps } from "../use-fishing-license-steps";

describe("useFishingLicenseSteps", () => {
  it("should return only license-type step initially", () => {
    const formData: PartialFishingLicenseFormData = {};
    const { result } = renderHook(() => useFishingLicenseSteps(formData));

    expect(result.current).toHaveLength(1);
    expect(result.current[0].id).toBe("license-type");
  });

  it("should return 5 steps when license type is river", () => {
    const formData: PartialFishingLicenseFormData = {
      licenseType: "river",
    };
    const { result } = renderHook(() => useFishingLicenseSteps(formData));

    expect(result.current).toHaveLength(5);
    expect(result.current.map((s) => s.id)).toEqual([
      "license-type",
      "river-details",
      "additional-questions",
      "check-answers",
      "confirmation",
    ]);
  });

  it("should return 5 steps when license type is sea", () => {
    const formData: PartialFishingLicenseFormData = {
      licenseType: "sea",
    };
    const { result } = renderHook(() => useFishingLicenseSteps(formData));

    expect(result.current).toHaveLength(5);
    expect(result.current.map((s) => s.id)).toEqual([
      "license-type",
      "sea-details",
      "additional-questions",
      "check-answers",
      "confirmation",
    ]);
  });

  it("should not include sea-details in river path", () => {
    const formData: PartialFishingLicenseFormData = {
      licenseType: "river",
    };
    const { result } = renderHook(() => useFishingLicenseSteps(formData));

    const stepIds = result.current.map((s) => s.id);
    expect(stepIds).not.toContain("sea-details");
  });

  it("should not include river-details in sea path", () => {
    const formData: PartialFishingLicenseFormData = {
      licenseType: "sea",
    };
    const { result } = renderHook(() => useFishingLicenseSteps(formData));

    const stepIds = result.current.map((s) => s.id);
    expect(stepIds).not.toContain("river-details");
  });

  it("should recalculate steps when license type changes from river to sea", () => {
    const { result, rerender } = renderHook(
      (props: PartialFishingLicenseFormData) => useFishingLicenseSteps(props),
      { initialProps: { licenseType: "river" } }
    );

    expect(result.current.map((s) => s.id)).toContain("river-details");
    expect(result.current.map((s) => s.id)).not.toContain("sea-details");

    rerender({ licenseType: "sea" });

    expect(result.current.map((s) => s.id)).not.toContain("river-details");
    expect(result.current.map((s) => s.id)).toContain("sea-details");
  });

  it("should recalculate steps when license type changes from sea to river", () => {
    const { result, rerender } = renderHook(
      (props: PartialFishingLicenseFormData) => useFishingLicenseSteps(props),
      { initialProps: { licenseType: "sea" } }
    );

    expect(result.current.map((s) => s.id)).toContain("sea-details");

    rerender({ licenseType: "river" });

    expect(result.current.map((s) => s.id)).toContain("river-details");
  });

  it("should use memoization to avoid unnecessary recalculations", () => {
    const { result, rerender } = renderHook(
      (props: PartialFishingLicenseFormData) => useFishingLicenseSteps(props),
      { initialProps: { licenseType: "river", fullName: "John" } }
    );

    const firstResult = result.current;

    // Change unrelated field
    rerender({ licenseType: "river", fullName: "Jane" });

    // Should return the same array reference (memoized)
    expect(result.current).toBe(firstResult);
  });

  it("should include all expected step titles", () => {
    const formData: PartialFishingLicenseFormData = {
      licenseType: "river",
    };
    const { result } = renderHook(() => useFishingLicenseSteps(formData));

    const titles = result.current.map((s) => s.title);
    expect(titles).toContain("License type");
    expect(titles).toContain("River fishing details");
    expect(titles).toContain("Your details");
    expect(titles).toContain("Check your answers");
    expect(titles).toContain("Confirmation");
  });
});
