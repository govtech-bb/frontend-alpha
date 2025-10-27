import { useMemo } from "react";
import type { FormStep } from "../common/types";
import type { PartialBirthRegistrationFormData } from "./types";

/**
 * Custom hook to calculate the step sequence for birth registration
 *
 * This hook implements the business logic for the three possible form flows:
 * - Path A: Married parents (8 steps)
 * - Path B: Unmarried without father (8 steps)
 * - Path C: Unmarried with father (9 steps)
 *
 * The hook is "smart" about business rules and returns the appropriate
 * step array based on the current form state. The generic useFormNavigation
 * hook then handles the navigation mechanics.
 *
 * @param formData - Current partial form data to determine the correct path
 * @returns Array of FormStep objects representing the current path
 *
 * @example
 * const steps = useRegisterBirthSteps(formData);
 * const navigation = useFormNavigation(steps);
 */
export function useRegisterBirthSteps(
  formData: PartialBirthRegistrationFormData
): FormStep[] {
  return useMemo<FormStep[]>(() => {
    const { marriageStatus, includeFatherDetails } = formData;

    // Path A: Married parents
    if (marriageStatus === "yes") {
      return [
        { id: "marriage-status", title: "Marriage status" },
        { id: "father-details", title: "Father's details" },
        { id: "mother-details", title: "Mother's details" },
        { id: "child-details", title: "Child's details" },
        { id: "certificates", title: "Certificates" },
        { id: "contact-info", title: "Contact information" },
        { id: "check-answers", title: "Check your answers" },
        { id: "confirmation", title: "Confirmation" },
      ];
    }

    // Path B: Unmarried without father details
    if (marriageStatus === "no" && includeFatherDetails === "no") {
      return [
        { id: "marriage-status", title: "Marriage status" },
        { id: "include-father", title: "Include father's details" },
        { id: "mother-details", title: "Mother's details" },
        { id: "child-details", title: "Child's details" },
        { id: "certificates", title: "Certificates" },
        { id: "contact-info", title: "Contact information" },
        { id: "check-answers", title: "Check your answers" },
        { id: "confirmation", title: "Confirmation" },
      ];
    }

    // Path C: Unmarried with father details
    if (marriageStatus === "no" && includeFatherDetails === "yes") {
      return [
        { id: "marriage-status", title: "Marriage status" },
        { id: "include-father", title: "Include father's details" },
        { id: "father-details", title: "Father's details" },
        { id: "mother-details", title: "Mother's details" },
        { id: "child-details", title: "Child's details" },
        { id: "certificates", title: "Certificates" },
        { id: "contact-info", title: "Contact information" },
        { id: "check-answers", title: "Check your answers" },
        { id: "confirmation", title: "Confirmation" },
      ];
    }

    // Intermediate state: Unmarried but include-father not yet answered
    // This allows navigation from marriage-status to include-father
    if (marriageStatus === "no") {
      return [
        { id: "marriage-status", title: "Marriage status" },
        { id: "include-father", title: "Include father's details" },
      ];
    }

    // Initial state: Only show marriage-status until user makes a choice
    return [{ id: "marriage-status", title: "Marriage status" }];
  }, [formData.marriageStatus, formData.includeFatherDetails]);
}
