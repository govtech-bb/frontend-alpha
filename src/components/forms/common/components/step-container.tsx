import { Button, ErrorSummary } from "@govtech-bb/react";
import type { ValidationError } from "../error-summary";
import { useErrorSummary } from "../hooks/use-error-summary";
import { useStepFocus } from "../hooks/use-step-focus";

export type StepContainerProps = {
  /** Step title displayed as h1 */
  title: string;
  /** Parent form title for accessibility announcement */
  formTitle: string;
  /** Validation errors from useStepValidation */
  errors: ValidationError[];
  /** Handler for Back button (omit to hide Back button) */
  onBack?: () => void;
  /** Handler for form submission */
  onSubmit: (e: React.FormEvent) => void;
  /** Form field content */
  children: React.ReactNode;
  /** Custom text for submit button (default: "Continue") */
  submitButtonText?: string;
  /** Disable submit button */
  isSubmitting?: boolean;
};

/**
 * Standard container for multi-step form steps
 * Provides consistent layout, error summary, and navigation buttons
 *
 * @example
 * ```typescript
 * export function MyStep({ value, onChange, onNext, onBack }: MyStepProps) {
 *   const { errors, fieldErrors, handleChange, handleSubmit } = useStepValidation({
 *     schema: myStepValidation,
 *     value,
 *     onChange,
 *     onNext,
 *     fieldPrefix: "my-step-",
 *   });
 *
 *   return (
 *     <StepContainer
 *       title="My Step Title"
 *       formTitle="My Form"
 *       errors={errors}
 *       onBack={onBack}
 *       onSubmit={handleSubmit}
 *     >
 *       <Input
 *         id="my-step-field"
 *         label="Field Label"
 *         value={value.field || ""}
 *         onChange={(e) => handleChange("field", e.target.value)}
 *         error={fieldErrors.field}
 *       />
 *     </StepContainer>
 *   );
 * }
 * ```
 */
export function StepContainer({
  title,
  formTitle,
  errors,
  onBack,
  onSubmit,
  children,
  submitButtonText = "Continue",
  isSubmitting = false,
}: StepContainerProps) {
  const titleRef = useStepFocus(title, formTitle);
  const { errorItems, handleErrorClick } = useErrorSummary(errors);

  return (
    <form
      className="container space-y-8 pt-8 pb-8 lg:grid lg:grid-cols-3 lg:pb-16"
      noValidate
      onSubmit={onSubmit}
    >
      <div className="col-span-2 flex flex-col gap-6 lg:gap-8">
        <div className="flex flex-col gap-4">
          <div className="pt-2 lg:pt-0">
            <h1
              className="mb-4 font-bold text-[56px] leading-[1.15] lg:mb-2"
              ref={titleRef}
              tabIndex={-1}
            >
              {title}
            </h1>

            {errorItems.length > 0 && (
              <ErrorSummary
                errors={errorItems}
                onErrorClick={handleErrorClick}
                title="There is a problem"
              />
            )}
          </div>

          {children}
        </div>

        <div className="flex gap-4">
          {onBack && (
            <Button
              disabled={isSubmitting}
              onClick={onBack}
              type="button"
              variant="secondary"
            >
              Back
            </Button>
          )}
          <Button disabled={isSubmitting} type="submit">
            {submitButtonText}
          </Button>
        </div>
      </div>
    </form>
  );
}
