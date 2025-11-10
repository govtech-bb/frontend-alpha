/**
 * Business logic hook for Death Certificate Application form steps
 *
 * This form has a simple linear flow - all users follow the same path
 * regardless of their answers. No conditional logic needed.
 */

import { useMemo } from "react";
import type { FormStep, PartialDeathCertificateData } from "./types";

/**
 * Calculate the steps for the death certificate application form.
 *
 * @param _formData - Form data (unused - kept for consistency with other forms)
 * @returns Array of form steps in order
 */
export function useDeathCertificateSteps(
  _formData: PartialDeathCertificateData
): FormStep[] {
  return useMemo<FormStep[]>(
    () => [
      {
        id: "applicant-details",
        title: "Applicant's Details",
      },
      {
        id: "relationship-request",
        title: "Relationship and Request Details",
      },
      {
        id: "death-details",
        title: "Death Certificate Details",
      },
      {
        id: "check-answers",
        title: "Check Your Answers",
      },
      {
        id: "confirmation",
        title: "Application Complete",
      },
    ],
    [] // No dependencies - steps never change
  );
}
