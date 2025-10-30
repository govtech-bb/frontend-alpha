import { useCallback, useState } from "react";
import type { FormStep } from "@/types/forms";

/**
 * Generic hook for managing navigation through a multi-step form
 *
 * This hook is "dumb" about business logic - it only manages:
 * - Current step tracking
 * - Linear navigation (next/back)
 * - Direct navigation (goToStep)
 *
 * Form-specific logic (conditional steps, branching) should be handled
 * by a separate hook that generates the steps array.
 *
 * Features:
 * - Linear navigation with next/back
 * - Direct navigation to specific steps
 * - Boundary checking (can't go before first or after last)
 * - Works with FormStep objects for rich metadata
 *
 * @param steps - Array of form steps to navigate through
 * @returns Navigation state and controls
 *
 * @example
 * const steps = useRegisterBirthSteps(formData); // Form-specific logic
 * const { currentStep, goNext, goBack } = useFormNavigation(steps);
 */
export function useFormNavigation(steps: FormStep[]) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Current step based on index
  const currentStep = steps[currentStepIndex];

  // Total number of steps
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
   * Jump to a specific step by ID
   * Enables non-linear navigation (e.g., from a review page)
   *
   * Only navigates if the step exists in the current path.
   * This allows forms to support "Edit" links on review pages.
   *
   * @param stepId - The ID of the step to navigate to
   */
  const goToStep = useCallback(
    (stepId: string) => {
      const index = steps.findIndex((step) => step.id === stepId);
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
