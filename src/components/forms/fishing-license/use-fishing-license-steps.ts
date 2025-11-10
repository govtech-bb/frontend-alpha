/**
 * Business logic hook for calculating which steps to display
 * based on the current form state
 *
 * This hook contains ALL business logic for step calculation.
 * Navigation mechanics are handled separately by useFormNavigation.
 */

import { useMemo } from "react";
import type { FormStep } from "@/types/forms";
import type { PartialFishingLicenseFormData } from "./types";

/**
 * Calculate which steps should be shown based on form data
 *
 * @param formData - Current form values (possibly incomplete)
 * @returns Array of steps that should be displayed in navigation
 */
export function useFishingLicenseSteps(
  formData: PartialFishingLicenseFormData
): FormStep[] {
  const { licenseType } = formData;

  return useMemo<FormStep[]>(() => {
    // Path A: River fishing license
    if (licenseType === "river") {
      return [
        { id: "license-type", title: "License type" },
        { id: "river-details", title: "River fishing details" },
        { id: "additional-questions", title: "Your details" },
        { id: "check-answers", title: "Check your answers" },
        { id: "confirmation", title: "Confirmation" },
      ];
    }

    // Path B: Sea fishing license
    if (licenseType === "sea") {
      return [
        { id: "license-type", title: "License type" },
        { id: "sea-details", title: "Sea fishing details" },
        { id: "additional-questions", title: "Your details" },
        { id: "check-answers", title: "Check your answers" },
        { id: "confirmation", title: "Confirmation" },
      ];
    }

    // Initial state: User hasn't selected license type yet
    // Only show the first step
    return [{ id: "license-type", title: "License type" }];
  }, [licenseType]);
}
