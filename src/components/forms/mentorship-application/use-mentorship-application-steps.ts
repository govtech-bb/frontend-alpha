/**
 * Business logic hook for Mentorship Application form steps
 *
 * GENERATED FILE - DO NOT EDIT MANUALLY
 * Generated from form-spec.ts
 *
 * This form has a simple linear flow - all users follow the same path
 * regardless of their answers. No conditional logic needed.
 */

import { useMemo } from "react";
import type { FormStep, PartialMentorshipApplicationData } from "./types";

/**
 * Calculate the steps for the Mentorship Application form.
 *
 * @param _formData - Form data (unused - kept for consistency with other forms)
 * @returns Array of form steps in order
 */
export function useMentorshipApplicationSteps(
  _formData: PartialMentorshipApplicationData
): FormStep[] {
  return useMemo<FormStep[]>(
    () => [
      {
        id: "your-details",
        title: "Tell us about yourself",
      },
      {
        id: "contact-details",
        title: "Your contact details",
      },
      {
        id: "about-mentorship",
        title: "Tell us about being a mentor",
      },
      {
        id: "preferences",
        title: "Preferences",
      },
      {
        id: "experience",
        title: "Experience",
      },
      {
        id: "references",
        title: "References",
      },
      {
        id: "check-answers",
        title: "Check your answers",
      },
      {
        id: "confirmation",
        title: "Application submitted",
      },
    ],
    [] // No dependencies - steps never change
  );
}
