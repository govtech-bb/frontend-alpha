import { Typography } from "@/components/ui/typography";

export interface FormProgressIndicatorProps {
  /** Current step number (1-indexed) */
  currentStep: number;
  /** Total number of steps */
  totalSteps: number;
}

/**
 * Progress indicator showing "Step X of Y"
 *
 * Provides visual feedback about form completion progress.
 * Uses 1-indexed numbering for user-friendly display.
 *
 * @example
 * <FormProgressIndicator
 *   currentStep={3}
 *   totalSteps={8}
 * />
 * // Displays: "Step 3 of 8"
 */
export function FormProgressIndicator({
  currentStep,
  totalSteps,
}: FormProgressIndicatorProps) {
  return (
    <div className="mb-6">
      <Typography className="text-gray-600" variant="paragraph">
        Step {currentStep} of {totalSteps}
      </Typography>
    </div>
  );
}
