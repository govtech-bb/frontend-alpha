import { useCallback, useMemo, useState } from "react";
import type { PartialBirthRegistrationFormData, StepName } from "./types";

/**
 * Custom hook to manage multi-step form navigation with conditional branching
 *
 * This hook implements the business logic for the three possible form flows:
 * - Path A: Married parents (marriage_status = 'yes')
 * - Path B: Unmarried without father (marriage_status = 'no', include_father = 'no')
 * - Path C: Unmarried with father (marriage_status = 'no', include_father = 'yes')
 *
 * @param formData - Current partial form data to determine the correct path
 * @returns Navigation state and controls
 */
export function useFormNavigation(formData: PartialBirthRegistrationFormData) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  /**
   * Calculate the step sequence based on current form state
   * Uses memoization to avoid recalculating on every render
   */
  const steps = useMemo<StepName[]>(() => {
    const { marriageStatus, includeFatherDetails } = formData;

    // Path A: Married parents
    if (marriageStatus === "yes") {
      return [
        "marriage-status",
        "father-details",
        "mother-details",
        "child-details",
        "certificates",
        "contact-info",
        "check-answers",
        "confirmation",
      ];
    }

    // Path B: Unmarried without father details
    if (marriageStatus === "no" && includeFatherDetails === "no") {
      return [
        "marriage-status",
        "include-father",
        "mother-details",
        "child-details",
        "certificates",
        "contact-info",
        "check-answers",
        "confirmation",
      ];
    }

    // Path C: Unmarried with father details
    if (marriageStatus === "no" && includeFatherDetails === "yes") {
      return [
        "marriage-status",
        "include-father",
        "father-details",
        "mother-details",
        "child-details",
        "certificates",
        "contact-info",
        "check-answers",
        "confirmation",
      ];
    }

    // Default: Only show marriage-status until user makes a choice
    return ["marriage-status"];
  }, [formData.marriageStatus, formData.includeFatherDetails, formData]);

  // Current step name based on index
  const currentStep = steps[currentStepIndex];

  // Total number of steps in current path
  const totalSteps = steps.length;

  /**
   * Navigate to the next step
   * Prevents going beyond the last step
   */
  const goNext = useCallback(() => {
    setCurrentStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
  }, [steps.length]);

  /**
   * Navigate to the previous step
   * Prevents going before the first step
   */
  const goBack = useCallback(() => {
    setCurrentStepIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  /**
   * Jump to a specific step by name
   * Only navigates if the step exists in the current path
   *
   * @param stepName - The name of the step to navigate to
   */
  const goToStep = useCallback(
    (stepName: StepName) => {
      const index = steps.indexOf(stepName);
      if (index !== -1) {
        setCurrentStepIndex(index);
      }
    },
    [steps]
  );

  return {
    currentStep,
    currentStepIndex,
    totalSteps,
    steps,
    goNext,
    goBack,
    goToStep,
  };
}
