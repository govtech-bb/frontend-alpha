/**
 * Tests for Death Certificate Application form step calculation hook
 */

import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useDeathCertificateSteps } from "../use-death-certificate-steps";

describe("useDeathCertificateSteps", () => {
  it("should return all 5 steps in correct order", () => {
    const { result } = renderHook(() => useDeathCertificateSteps({}));

    expect(result.current).toHaveLength(5);
    expect(result.current[0]).toEqual({
      id: "applicant-details",
      title: "Applicant's Details",
    });
    expect(result.current[1]).toEqual({
      id: "relationship-request",
      title: "Relationship and Request Details",
    });
    expect(result.current[2]).toEqual({
      id: "death-details",
      title: "Death Certificate Details",
    });
    expect(result.current[3]).toEqual({
      id: "check-answers",
      title: "Check Your Answers",
    });
    expect(result.current[4]).toEqual({
      id: "confirmation",
      title: "Application Complete",
    });
  });

  it("should return same steps regardless of form data (linear flow)", () => {
    const { result: result1 } = renderHook(() => useDeathCertificateSteps({}));
    const { result: result2 } = renderHook(() =>
      useDeathCertificateSteps({
        applicantName: "John Smith",
        relationshipToDeceased: "Son",
      })
    );
    const { result: result3 } = renderHook(() =>
      useDeathCertificateSteps({
        applicantName: "John Smith",
        applicantAddress: "123 Main St",
        applicantNationalRegistrationNo: "ABC123",
        relationshipToDeceased: "Son",
        reasonForRequest: "Legal purposes",
        numberOfCertificates: 2,
        causeOfDeath: "Natural causes",
        deceasedSurname: "Doe",
        deceasedChristianNames: "Jane",
        dateOfDeath: "2024-01-15",
        deceasedNationalRegistrationNo: "XYZ789",
        placeOfDeath: "QEH",
      })
    );

    expect(result1.current).toEqual(result2.current);
    expect(result2.current).toEqual(result3.current);
  });

  it("should memoize results (same reference when dependencies don't change)", () => {
    const { result, rerender } = renderHook(() => useDeathCertificateSteps({}));

    const firstResult = result.current;
    rerender();
    const secondResult = result.current;

    expect(firstResult).toBe(secondResult); // Same reference
  });
});
