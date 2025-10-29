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

  // Focus the error summary when it appears (accessibility)
  useEffect(() => {
    if (errors.length > 0 && summaryRef.current) {
      summaryRef.current.focus();
    }
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
        {errors.map((error) => (
          <a
            className="text-red-600 underline hover:text-red-800"
            href={`#${error.field}`}
            key={error.field}
            onClick={(e) => handleErrorClick(e, error.field)}
          >
            <li>{error.message}</li>
          </a>
        ))}
      </ul>
    </div>
  );
}
