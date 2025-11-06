"use client";

import { useEffect, useRef } from "react";

export type ValidationError = {
  field: string;
  message: string;
};

type ErrorSummaryProps = {
  errors: ValidationError[];
  title?: string;
};

/**
 * GOV.UK-style error summary component
 * Displays a list of validation errors with anchor links to fields
 * Automatically focuses when shown for accessibility
 */
export function ErrorSummary({
  errors,
  title = "There is a problem",
}: ErrorSummaryProps) {
  const summaryRef = useRef<HTMLDivElement>(null);
  const prevErrorCountRef = useRef(0);

  // Focus the error summary when it appears (accessibility)
  // Only focus when errors FIRST APPEAR (0 → N), not when errors change
  useEffect(() => {
    const hadNoErrors = prevErrorCountRef.current === 0;
    const nowHasErrors = errors.length > 0;

    // Only focus when transitioning from no errors to having errors
    if (hadNoErrors && nowHasErrors && summaryRef.current) {
      summaryRef.current.focus();
    }

    // Update the ref for next render
    prevErrorCountRef.current = errors.length;
  }, [errors.length]);

  if (errors.length === 0) {
    return null;
  }

  const handleErrorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    fieldId: string
  ) => {
    e.preventDefault();
    const element = document.getElementById(fieldId);
    if (element) {
      element.focus();
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div
      aria-labelledby="error-summary-title"
      className="mb-6 border-4 border-red-600 p-4"
      ref={summaryRef}
      role="alert"
      tabIndex={-1}
    >
      <h2
        className="mb-2 font-bold text-red-600 text-xl"
        id="error-summary-title"
      >
        {title}
      </h2>
      <ul className="list-disc space-y-1 pl-5">
        {errors.map((error, index) => (
          <li key={`${error.field}-${index}`}>
            <a
              className="text-red-600 underline hover:text-red-800"
              href={`#${error.field}`}
              onClick={(e) => handleErrorClick(e, error.field)}
            >
              {error.message}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
