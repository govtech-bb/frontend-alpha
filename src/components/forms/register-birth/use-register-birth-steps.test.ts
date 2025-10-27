import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { PartialBirthRegistrationFormData } from "./types";
import { useRegisterBirthSteps } from "./use-register-birth-steps";

describe("useRegisterBirthSteps", () => {
  describe("Path A: Married parents", () => {
    it("should return 8 steps when parents are married", () => {
      const formData: PartialBirthRegistrationFormData = {
        marriageStatus: "yes",
      };

      const { result } = renderHook(() => useRegisterBirthSteps(formData));

      expect(result.current).toHaveLength(8);
      expect(result.current.map((s) => s.id)).toEqual([
        "marriage-status",
        "father-details",
        "mother-details",
        "child-details",
        "certificates",
        "contact-info",
        "check-answers",
        "confirmation",
      ]);
    });

    it("should not include 'include-father' step in married path", () => {
      const formData: PartialBirthRegistrationFormData = {
        marriageStatus: "yes",
      };

      const { result } = renderHook(() => useRegisterBirthSteps(formData));

      const stepIds = result.current.map((s) => s.id);
      expect(stepIds).not.toContain("include-father");
    });
  });

  describe("Path B: Unmarried without father details", () => {
    it("should return 8 steps when unmarried without father", () => {
      const formData: PartialBirthRegistrationFormData = {
        marriageStatus: "no",
        includeFatherDetails: "no",
      };

      const { result } = renderHook(() => useRegisterBirthSteps(formData));

      expect(result.current).toHaveLength(8);
      expect(result.current.map((s) => s.id)).toEqual([
        "marriage-status",
        "include-father",
        "mother-details",
        "child-details",
        "certificates",
        "contact-info",
        "check-answers",
        "confirmation",
      ]);
    });

    it("should not include 'father-details' step when father excluded", () => {
      const formData: PartialBirthRegistrationFormData = {
        marriageStatus: "no",
        includeFatherDetails: "no",
      };

      const { result } = renderHook(() => useRegisterBirthSteps(formData));

      const stepIds = result.current.map((s) => s.id);
      expect(stepIds).not.toContain("father-details");
    });
  });

  describe("Path C: Unmarried with father details", () => {
    it("should return 9 steps when unmarried with father", () => {
      const formData: PartialBirthRegistrationFormData = {
        marriageStatus: "no",
        includeFatherDetails: "yes",
      };

      const { result } = renderHook(() => useRegisterBirthSteps(formData));

      expect(result.current).toHaveLength(9);
      expect(result.current.map((s) => s.id)).toEqual([
        "marriage-status",
        "include-father",
        "father-details",
        "mother-details",
        "child-details",
        "certificates",
        "contact-info",
        "check-answers",
        "confirmation",
      ]);
    });

    it("should include both 'include-father' and 'father-details' steps", () => {
      const formData: PartialBirthRegistrationFormData = {
        marriageStatus: "no",
        includeFatherDetails: "yes",
      };

      const { result } = renderHook(() => useRegisterBirthSteps(formData));

      const stepIds = result.current.map((s) => s.id);
      expect(stepIds).toContain("include-father");
      expect(stepIds).toContain("father-details");
    });
  });

  describe("Intermediate states", () => {
    it("should return 2 steps when unmarried but include-father not answered", () => {
      const formData: PartialBirthRegistrationFormData = {
        marriageStatus: "no",
        includeFatherDetails: "",
      };

      const { result } = renderHook(() => useRegisterBirthSteps(formData));

      expect(result.current).toHaveLength(2);
      expect(result.current.map((s) => s.id)).toEqual([
        "marriage-status",
        "include-father",
      ]);
    });

    it("should return 1 step when marriage status not answered", () => {
      const formData: PartialBirthRegistrationFormData = {
        marriageStatus: "",
      };

      const { result } = renderHook(() => useRegisterBirthSteps(formData));

      expect(result.current).toHaveLength(1);
      expect(result.current.map((s) => s.id)).toEqual(["marriage-status"]);
    });

    it("should return 1 step for empty form data", () => {
      const formData: PartialBirthRegistrationFormData = {};

      const { result } = renderHook(() => useRegisterBirthSteps(formData));

      expect(result.current).toHaveLength(1);
      expect(result.current.map((s) => s.id)).toEqual(["marriage-status"]);
    });
  });

  describe("FormStep structure", () => {
    it("should return FormStep objects with id and title", () => {
      const formData: PartialBirthRegistrationFormData = {
        marriageStatus: "yes",
      };

      const { result } = renderHook(() => useRegisterBirthSteps(formData));

      for (const step of result.current) {
        expect(step).toHaveProperty("id");
        expect(step).toHaveProperty("title");
        expect(typeof step.id).toBe("string");
        expect(typeof step.title).toBe("string");
        expect(step.id.length).toBeGreaterThan(0);
        expect(step.title.length).toBeGreaterThan(0);
      }
    });
  });

  describe("Memoization", () => {
    it("should recalculate when marriageStatus changes", () => {
      const { result, rerender } = renderHook(
        (props) => useRegisterBirthSteps(props),
        {
          initialProps: {
            marriageStatus: "",
          } as PartialBirthRegistrationFormData,
        }
      );

      expect(result.current).toHaveLength(1);

      rerender({ marriageStatus: "yes" } as PartialBirthRegistrationFormData);

      expect(result.current).toHaveLength(8);
    });

    it("should recalculate when includeFatherDetails changes", () => {
      const { result, rerender } = renderHook(
        (props) => useRegisterBirthSteps(props),
        {
          initialProps: {
            marriageStatus: "no",
            includeFatherDetails: "",
          } as PartialBirthRegistrationFormData,
        }
      );

      expect(result.current).toHaveLength(2);

      rerender({
        marriageStatus: "no",
        includeFatherDetails: "yes",
      } as PartialBirthRegistrationFormData);

      expect(result.current).toHaveLength(9);
    });
  });
});
