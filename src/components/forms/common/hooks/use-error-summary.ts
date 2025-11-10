import type { ErrorItem } from "@govtech-bb/react";
import { useMemo } from "react";
import type { ValidationError } from "../error-summary";

/**
 * Hook to convert ValidationError[] to ErrorItem[] for GOV.BB ErrorSummary component
 * Eliminates the boilerplate mapping and error click handling needed in every step
 *
 * @param errors - Array of ValidationError from useStepValidation
 * @returns Object containing errorItems array and handleErrorClick function
 *
 * @example
 * ```typescript
 * const { errors } = useStepValidation({ ... });
 * const { errorItems, handleErrorClick } = useErrorSummary(errors);
 *
 * {errorItems.length > 0 && (
 *   <ErrorSummary
 *     errors={errorItems}
 *     onErrorClick={handleErrorClick}
 *     title="There is a problem"
 *   />
 * )}
 * ```
 */
export function useErrorSummary(errors: ValidationError[]) {
  // Map ValidationError[] to ErrorItem[] for @govtech-bb/react ErrorSummary
  const errorItems: ErrorItem[] = useMemo(
    () =>
      errors.map((error) => ({
        text: error.message,
        target: error.field,
      })),
    [errors]
  );

  // Handle error link clicks - focus and scroll to the field
  const handleErrorClick = (
    error: ErrorItem,
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    event.preventDefault();
    const element = document.getElementById(error.target);
    if (element) {
      element.focus();
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return {
    errorItems,
    handleErrorClick,
  };
}
