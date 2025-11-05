"use client";

import { combineToMMDDYYYY, parseMMDDYYYY } from "@/lib/date-format";

export type DateInputProps = {
  id: string;
  label: string;
  hint?: string;
  value: string; // MM/DD/YYYY format or empty string
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
};

/**
 * GOV.UK-style date input component with separate day, month, year fields
 *
 * Features:
 * - Three separate text inputs for day, month, year
 * - Converts to/from MM/DD/YYYY format
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
// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: Date input component requires multiple conditional checks for display filtering and validation
export function DateInput({
  id,
  label,
  hint = "For example, 27 3 2007",
  value,
  onChange,
  onBlur,
  error,
}: DateInputProps) {
  // Derive values directly from props (fully controlled component)
  const { day, month, year } = parseMMDDYYYY(value);

  // Filter display values - show empty for placeholders, strip leading zeros for real input
  // "" → "" (empty from parse error)
  // "00" → "" (empty placeholder)
  // "01" → "1" (user typed 1)
  // "12" → "12" (user typed 12)
  // "0000" → "" (empty placeholder)
  // "0001" → "1" (user typed 1)
  const displayDay = !day || day === "00" ? "" : String(Number(day));
  const displayMonth = !month || month === "00" ? "" : String(Number(month));
  const displayYear = !year || year === "0000" ? "" : String(Number(year));

  // Sanitize input to allow only digits and update parent
  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDay = e.target.value.replace(/\D/g, ""); // Allow only digits
    onChange(combineToMMDDYYYY(newDay, month, year));
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMonth = e.target.value.replace(/\D/g, ""); // Allow only digits
    onChange(combineToMMDDYYYY(day, newMonth, year));
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newYear = e.target.value.replace(/\D/g, ""); // Allow only digits
    onChange(combineToMMDDYYYY(day, month, newYear));
  };

  const hasError = Boolean(error);
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;

  // Build describedby attribute
  const describedby = [hint ? hintId : null, hasError ? errorId : null]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="govuk-form-group">
      <fieldset
        aria-describedby={describedby || undefined}
        className="govuk-fieldset"
      >
        <legend className="govuk-label govuk-label--m">{label}</legend>

        {hint && (
          <div className="govuk-hint mb-2 text-gray-600 text-sm" id={hintId}>
            {hint}
          </div>
        )}

        {hasError && (
          <p
            aria-live="assertive"
            className="govuk-error-message mb-2 text-red-600"
            id={errorId}
          >
            <span className="govuk-visually-hidden">Error:</span> {error}
          </p>
        )}

        <div className="govuk-date-input flex items-center gap-4">
          <div className="govuk-date-input__item">
            <label
              className="govuk-label govuk-date-input__label mb-1 block font-medium text-sm"
              htmlFor={`${id}-day`}
            >
              Day
            </label>
            <input
              aria-invalid={hasError ? "true" : undefined}
              className={`govuk-input govuk-date-input__input govuk-input--width-2 w-[5ch] border-2 px-2 py-1 ${
                hasError
                  ? "govuk-input--error border-red-600"
                  : "border-gray-400"
              }`}
              id={`${id}-day`}
              inputMode="numeric"
              maxLength={2}
              name={`${id}-day`}
              onBlur={onBlur}
              onChange={handleDayChange}
              pattern="[0-9]*"
              type="text"
              value={displayDay}
            />
          </div>

          <div className="govuk-date-input__item">
            <label
              className="govuk-label govuk-date-input__label mb-1 block font-medium text-sm"
              htmlFor={`${id}-month`}
            >
              Month
            </label>
            <input
              aria-invalid={hasError ? "true" : undefined}
              className={`govuk-input govuk-date-input__input govuk-input--width-2 w-[5ch] border-2 px-2 py-1 ${
                hasError
                  ? "govuk-input--error border-red-600"
                  : "border-gray-400"
              }`}
              id={`${id}-month`}
              inputMode="numeric"
              maxLength={2}
              name={`${id}-month`}
              onBlur={onBlur}
              onChange={handleMonthChange}
              pattern="[0-9]*"
              type="text"
              value={displayMonth}
            />
          </div>

          <div className="govuk-date-input__item">
            <label
              className="govuk-label govuk-date-input__label mb-1 block font-medium text-sm"
              htmlFor={`${id}-year`}
            >
              Year
            </label>
            <input
              aria-invalid={hasError ? "true" : undefined}
              className={`govuk-input govuk-date-input__input govuk-input--width-4 w-[7ch] border-2 px-2 py-1 ${
                hasError
                  ? "govuk-input--error border-red-600"
                  : "border-gray-400"
              }`}
              id={`${id}-year`}
              inputMode="numeric"
              maxLength={4}
              name={`${id}-year`}
              onBlur={onBlur}
              onChange={handleYearChange}
              pattern="[0-9]*"
              type="text"
              value={displayYear}
            />
          </div>
        </div>
      </fieldset>
    </div>
  );
}
