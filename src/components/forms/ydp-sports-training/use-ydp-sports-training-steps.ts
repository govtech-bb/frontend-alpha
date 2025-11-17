/**
 * Business logic hook for YDP Community Sports Training Programme form steps
 *
 * GENERATED FILE - DO NOT EDIT MANUALLY
 * Generated from form-spec.ts
 *
 * This form has conditional paths based on user answers.
 * Steps are filtered based on conditions defined in form-spec.ts.
 */

import { useMemo } from "react";
import type { FormStep, PartialYdpCommunitySportsTrainingData } from "./types";

/**
 * Calculate the steps for the YDP Community Sports Training Programme form.
 *
 * Steps are filtered based on conditional logic from form-spec.ts.
 * Some steps may be hidden depending on user's answers.
 *
 * @param formData - Current form data
 * @returns Array of form steps that should be shown
 */
export function useYdpCommunitySportsTrainingSteps(
  formData: PartialYdpCommunitySportsTrainingData
): FormStep[] {
  return useMemo<FormStep[]>(() => {
    const allSteps: FormStep[] = [
      {
        id: "personal-details",
        title: "Tell us about yourself",
      },
      {
        id: "sport-interest",
        title: "What sport discipline are you interested in?",
      },
      {
        id: "experience-details",
        title: "Tell us about your experience",
      },
      {
        id: "employment-status",
        title: "What is your employment status?",
      },
      {
        id: "organisations",
        title: "Do you belong to any organisations?",
      },
      {
        id: "contact-details",
        title: "Your contact details",
      },
      {
        id: "emergency-contact",
        title: "Emergency contact",
      },
      {
        id: "check-answers",
        title: "Check your answers",
      },
      {
        id: "confirmation",
        title: "Application submitted",
      }
    ];

    // Filter steps based on conditions
    return allSteps.filter((step) => {
      if (step.id === "experience-details") {
        return formData.hasExperience === 'yes';
      }
      return true; // No condition = always shown
    });
  }, [formData.hasExperience]);
}
