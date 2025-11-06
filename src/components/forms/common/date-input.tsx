"use client";

import { combineToISO8601, parseISO8601 } from "@/lib/date-format";

export type DateFieldErrors = {
  day?: string;
  month?: string;
  year?: string;
};

export type DateInputProps = {
  id: string;
  label: string;
  hint?: string;
  value: string; // YYYY-MM-DD format or empty string
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string; // Deprecated: use errors instead
  errors?: DateFieldErrors;
};

/**
 * GOV.UK-style date input component with separate day, month, year fields
 *
 * Features:
 * - Three separate text inputs for day, month, year
 * - Converts to/from YYYY-MM-DD format
 * - GOV.UK Design System compliant
 * - Accessible with proper ARIA attributes
 * - Error state styling
 *
 * @example
 * <DateInput
 *   id="child-dateOfBirth"
 *   label="Date of birth"
 *   hint="For example, 27 3 2007"
 *   value={dateOfBirth}
 *   onChange={(value) => setDateOfBirth(value)}
 *   error={errors.dateOfBirth}
 * />
 */
// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: Will refactor in future iteration
export function DateInput({
  id,
  label,
  hint = "For example, 27 3 2007 or 27 Mar 2007",
  value,
  onChange,
  onBlur,
  error, // Deprecated - backwards compatibility
  errors,
}: DateInputProps) {
  // Derive values directly from props (fully controlled component)
  const { day, month, year } = parseISO8601(value);

  // Filter display values - show empty for placeholders, strip leading zeros for real input
  // "" → "" (empty from parse error)
  // "00" → "" (empty placeholder)
  // "01" → "1" (user typed 1)
  // "12" → "12" (user typed 12)
  // "0000" → "" (empty placeholder)
  // "0001" → "1" (user typed 1)
  const filterDisplayValue = (fieldValue: string, emptyValue: string) =>
    !fieldValue || fieldValue === emptyValue ? "" : String(Number(fieldValue));

  const displayDay = filterDisplayValue(day, "00");
  // For month: display text as-is, only strip zeros for numeric months
  const displayMonth = /^\d+$/.test(month)
    ? filterDisplayValue(month, "00")
    : month;
  const displayYear = filterDisplayValue(year, "0000");

  // Sanitize input to allow only digits and update parent
  const handleFieldChange =
    (field: "day" | "month" | "year") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let sanitized: string;

      if (field === "month") {
        // Month field: allow letters and digits
        sanitized = e.target.value.replace(/[^a-zA-Z0-9]/g, "");
      } else {
        // Day and year fields: digits only
        sanitized = e.target.value.replace(/\D/g, "");
      }

      const updates = { day, month, year, [field]: sanitized };
      onChange(combineToISO8601(updates.year, updates.month, updates.day));
    };

  // Support both old error prop (string) and new errors prop (object)
  const fieldErrors = errors || {};
  const hasAnyError =
    Boolean(error) || Boolean(errors?.day || errors?.month || errors?.year);

  const hasErrorDay = Boolean(error || fieldErrors.day);
  const hasErrorMonth = Boolean(error || fieldErrors.month);
  const hasErrorYear = Boolean(error || fieldErrors.year);

  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;

  // Collect all error messages
  const errorMessages: string[] = [];
  if (error) {
    errorMessages.push(error); // Backward compatibility
  }
  if (fieldErrors.day) errorMessages.push(fieldErrors.day);
  if (fieldErrors.month) errorMessages.push(fieldErrors.month);
  if (fieldErrors.year) errorMessages.push(fieldErrors.year);

  // Build describedby attribute
  const describedby = [hint ? hintId : null, hasAnyError ? errorId : null]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="govuk-form-group">
      <fieldset
        aria-describedby={describedby || undefined}
        className="govuk-fieldset"
      >
        <legend className="block text-h4 text-neutral-black">{label}</legend>

        {hint && (
          <div className="mt-1 text-body text-neutral-black" id={hintId}>
            {hint}
          </div>
        )}

        {hasAnyError && (
          <div
            aria-live="assertive"
            className="mt-1 text-body text-red-dark"
            id={errorId}
            role="alert"
          >
            {errorMessages.map((msg, idx) => (
              <p className="mb-1" key={idx}>
                <span className="govuk-visually-hidden">Error:</span> {msg}
              </p>
            ))}
          </div>
        )}

        <div className="flex flex-wrap items-end gap-4">
          <div className="flex flex-col">
            <label
              className="mb-1 font-medium text-neutral-black text-sm"
              htmlFor={`${id}-day`}
            >
              Day
            </label>
            <div
              className={`relative inline-flex w-16 items-center rounded-sm border-2 bg-neutral-white transition-all focus-within:ring-4 focus-within:ring-teal-100 hover:shadow-[inset_4px_4px_0px_0px_rgba(0,0,0,0.1)] has-[:focus-visible]:shadow-none ${
                hasErrorDay
                  ? "border-red-dark focus-within:border-red-dark"
                  : "border-neutral-black"
              }`}
            >
              <input
                aria-invalid={hasErrorDay ? "true" : undefined}
                autoComplete="bday-day"
                className="w-full min-w-0 rounded-sm px-4 py-4 text-center outline-none"
                id={`${id}-day`}
                inputMode="numeric"
                maxLength={2}
                name={`${id}-day`}
                onBlur={onBlur}
                onChange={handleFieldChange("day")}
                pattern="[0-9]*"
                type="text"
                value={displayDay}
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label
              className="mb-1 font-medium text-neutral-black text-sm"
              htmlFor={`${id}-month`}
            >
              Month
            </label>
            <div
              className={`relative inline-flex w-16 items-center rounded-sm border-2 bg-neutral-white transition-all focus-within:ring-4 focus-within:ring-teal-100 hover:shadow-[inset_4px_4px_0px_0px_rgba(0,0,0,0.1)] has-[:focus-visible]:shadow-none ${
                hasErrorMonth
                  ? "border-red-dark focus-within:border-red-dark"
                  : "border-neutral-black"
              }`}
            >
              <input
                aria-invalid={hasErrorMonth ? "true" : undefined}
                autoComplete="bday-month"
                className="w-full min-w-0 rounded-sm px-4 py-4 text-center outline-none"
                id={`${id}-month`}
                maxLength={9}
                name={`${id}-month`}
                onBlur={onBlur}
                onChange={handleFieldChange("month")}
                pattern="[a-zA-Z0-9]*"
                type="text"
                value={displayMonth}
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label
              className="mb-1 font-medium text-neutral-black text-sm"
              htmlFor={`${id}-year`}
            >
              Year
            </label>
            <div
              className={`relative inline-flex w-24 items-center rounded-sm border-2 bg-neutral-white transition-all focus-within:ring-4 focus-within:ring-teal-100 hover:shadow-[inset_4px_4px_0px_0px_rgba(0,0,0,0.1)] has-[:focus-visible]:shadow-none ${
                hasErrorYear
                  ? "border-red-dark focus-within:border-red-dark"
                  : "border-neutral-black"
              }`}
            >
              <input
                aria-invalid={hasErrorYear ? "true" : undefined}
                autoComplete="bday-year"
                className="w-full min-w-0 rounded-sm px-4 py-4 text-center outline-none"
                id={`${id}-year`}
                inputMode="numeric"
                maxLength={4}
                name={`${id}-year`}
                onBlur={onBlur}
                onChange={handleFieldChange("year")}
                pattern="[0-9]*"
                type="text"
                value={displayYear}
              />
            </div>
          </div>
        </div>
      </fieldset>
    </div>
  );
}
