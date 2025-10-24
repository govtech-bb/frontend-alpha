import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { PartialBirthRegistrationFormData } from "./types";
import { useFormNavigation } from "./useFormNavigation";

describe("useFormNavigation", () => {
  describe("Path A: Married parents", () => {
    it("should return correct step sequence for married parents", () => {
      const formData: PartialBirthRegistrationFormData = {
        marriageStatus: "yes",
      };

      const { result } = renderHook(() => useFormNavigation(formData));

      expect(result.current.steps).toEqual([
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

    it("should start at marriage-status step", () => {
      const formData: PartialBirthRegistrationFormData = {
        marriageStatus: "yes",
      };

      const { result } = renderHook(() => useFormNavigation(formData));

      expect(result.current.currentStep).toBe("marriage-status");
      expect(result.current.currentStepIndex).toBe(0);
    });

    it("should navigate to next step", () => {
      const formData: PartialBirthRegistrationFormData = {
        marriageStatus: "yes",
      };

      const { result } = renderHook(() => useFormNavigation(formData));

      act(() => {
        result.current.goNext();
      });

      expect(result.current.currentStep).toBe("father-details");
      expect(result.current.currentStepIndex).toBe(1);
    });

    it("should navigate back to previous step", () => {
      const formData: PartialBirthRegistrationFormData = {
        marriageStatus: "yes",
      };

      const { result } = renderHook(() => useFormNavigation(formData));

      act(() => {
        result.current.goNext();
        result.current.goNext();
      });

      expect(result.current.currentStep).toBe("mother-details");

      act(() => {
        result.current.goBack();
      });

      expect(result.current.currentStep).toBe("father-details");
    });

    it("should not go beyond last step", () => {
      const formData: PartialBirthRegistrationFormData = {
        marriageStatus: "yes",
      };

      const { result } = renderHook(() => useFormNavigation(formData));

      // Navigate to last step
      for (let i = 0; i < 10; i++) {
        act(() => {
          result.current.goNext();
        });
      }

      expect(result.current.currentStep).toBe("confirmation");
      expect(result.current.currentStepIndex).toBe(7);
    });

    it("should not go before first step", () => {
      const formData: PartialBirthRegistrationFormData = {
        marriageStatus: "yes",
      };

      const { result } = renderHook(() => useFormNavigation(formData));

      act(() => {
        result.current.goBack();
        result.current.goBack();
      });

      expect(result.current.currentStep).toBe("marriage-status");
      expect(result.current.currentStepIndex).toBe(0);
    });

    it("should jump to specific step", () => {
      const formData: PartialBirthRegistrationFormData = {
        marriageStatus: "yes",
      };

      const { result } = renderHook(() => useFormNavigation(formData));

      act(() => {
        result.current.goToStep("certificates");
      });

      expect(result.current.currentStep).toBe("certificates");
      expect(result.current.currentStepIndex).toBe(4);
    });

    it("should return correct total steps", () => {
      const formData: PartialBirthRegistrationFormData = {
        marriageStatus: "yes",
      };

      const { result } = renderHook(() => useFormNavigation(formData));

      expect(result.current.totalSteps).toBe(8);
    });
  });

  describe("Path B: Unmarried without father", () => {
    it("should return correct step sequence for unmarried without father", () => {
      const formData: PartialBirthRegistrationFormData = {
        marriageStatus: "no",
        includeFatherDetails: "no",
      };

      const { result } = renderHook(() => useFormNavigation(formData));

      expect(result.current.steps).toEqual([
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

    it("should skip father-details step", () => {
      const formData: PartialBirthRegistrationFormData = {
        marriageStatus: "no",
        includeFatherDetails: "no",
      };

      const { result } = renderHook(() => useFormNavigation(formData));

      expect(result.current.steps).not.toContain("father-details");
    });

    it("should return correct total steps", () => {
      const formData: PartialBirthRegistrationFormData = {
        marriageStatus: "no",
        includeFatherDetails: "no",
      };

      const { result } = renderHook(() => useFormNavigation(formData));

      expect(result.current.totalSteps).toBe(8);
    });
  });

  describe("Path C: Unmarried with father", () => {
    it("should return correct step sequence for unmarried with father", () => {
      const formData: PartialBirthRegistrationFormData = {
        marriageStatus: "no",
        includeFatherDetails: "yes",
      };

      const { result } = renderHook(() => useFormNavigation(formData));

      expect(result.current.steps).toEqual([
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

    it("should include father-details step", () => {
      const formData: PartialBirthRegistrationFormData = {
        marriageStatus: "no",
        includeFatherDetails: "yes",
      };

      const { result } = renderHook(() => useFormNavigation(formData));

      expect(result.current.steps).toContain("father-details");
    });

    it("should return correct total steps", () => {
      const formData: PartialBirthRegistrationFormData = {
        marriageStatus: "no",
        includeFatherDetails: "yes",
      };

      const { result } = renderHook(() => useFormNavigation(formData));

      expect(result.current.totalSteps).toBe(9);
    });
  });

  describe("Incomplete form state", () => {
    it("should return default step sequence when form is empty", () => {
      const formData: PartialBirthRegistrationFormData = {};

      const { result } = renderHook(() => useFormNavigation(formData));

      expect(result.current.steps).toEqual(["marriage-status"]);
      expect(result.current.currentStep).toBe("marriage-status");
    });

    it("should return limited sequence when only marriage status is set", () => {
      const formData: PartialBirthRegistrationFormData = {
        marriageStatus: "no",
      };

      const { result } = renderHook(() => useFormNavigation(formData));

      // Should show marriage-status and include-father until user answers
      expect(result.current.steps).toContain("marriage-status");
    });
  });

  describe("Step navigation edge cases", () => {
    it("should not navigate to invalid step name", () => {
      const formData: PartialBirthRegistrationFormData = {
        marriageStatus: "yes",
      };

      const { result } = renderHook(() => useFormNavigation(formData));

      const initialStep = result.current.currentStep;

      act(() => {
        result.current.goToStep("invalid-step" as any);
      });

      // Should remain at current step if target step doesn't exist
      expect(result.current.currentStep).toBe(initialStep);
    });

    it("should update steps when form data changes", () => {
      const { result, rerender } = renderHook(
        ({ formData }) => useFormNavigation(formData),
        {
          initialProps: {
            formData: {
              marriageStatus: "yes",
            } as PartialBirthRegistrationFormData,
          },
        }
      );

      expect(result.current.steps).toEqual([
        "marriage-status",
        "father-details",
        "mother-details",
        "child-details",
        "certificates",
        "contact-info",
        "check-answers",
        "confirmation",
      ]);

      // Change to unmarried without father
      rerender({
        formData: {
          marriageStatus: "no",
          includeFatherDetails: "no",
        } as PartialBirthRegistrationFormData,
      });

      expect(result.current.steps).toEqual([
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
  });
});
