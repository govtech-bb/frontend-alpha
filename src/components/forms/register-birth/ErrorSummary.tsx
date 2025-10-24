import { useEffect, useRef } from "react";
import { Typography } from "@/components/ui/typography";
import type { FormError } from "./types";

type ErrorSummaryProps = {
  errors: FormError[];
};

/**
 * Error Summary component following GOV.UK Design System pattern
 *
 * Displays all form validation errors in a summary box at the top of the page.
 * When errors appear, focus automatically moves to this component to alert users.
 * Each error is a clickable link that jumps to the field with the error.
 *
 * WCAG 2.1 compliance:
 * - role="alert" for screen reader announcements
 * - Receives focus when errors appear
 * - Jump links with focus management
 *
 * @param errors - Array of validation errors with field names and messages
 */
export function ErrorSummary({ errors }: ErrorSummaryProps) {
  const summaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (errors.length > 0 && summaryRef.current) {
      // Move focus to error summary when errors appear
      summaryRef.current.focus();
    }
  }, [errors]);

  if (errors.length === 0) {
    return null;
  }

  return (
    <div
      aria-labelledby="error-summary-title"
      className="mb-6 border-4 border-red-600 bg-red-50 p-4 focus:outline-none focus:ring-2 focus:ring-red-600"
      ref={summaryRef}
      role="alert"
      tabIndex={-1}
    >
      <Typography
        className="mb-2 font-bold text-red-900"
        id="error-summary-title"
        variant="h2"
      >
        There is a problem
      </Typography>

      <ul className="list-disc space-y-1 pl-5">
        {errors.map((error) => (
          <li key={error.field}>
            <a
              className="font-normal text-base text-red-600 underline hover:text-red-700"
              href={`#${error.field}`}
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById(error.field);
                if (element) {
                  element.focus();
                  element.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  });
                }
              }}
            >
              {error.message}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
