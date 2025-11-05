"use client";

import { useEffect, useState } from "react";
import { combineToMMDDYYYY, parseMMDDYYYY } from "@/lib/date-format";

export type DateInputProps = {
  id: string;
  label: string;
  hint?: string;
  value: string; // MM/DD/YYYY format or empty string
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  required?: boolean;
  maxDate?: Date; // For preventing future dates
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
export function DateInput({
  id,
  label,
  hint = "For example, 27 3 2007",
  value,
  onChange,
  onBlur,
  error,
  required = false,
}: DateInputProps) {
  // Parse the MM/DD/YYYY value into separate fields
  const parsed = parseMMDDYYYY(value);
  const [day, setDay] = useState(parsed.day);
  const [month, setMonth] = useState(parsed.month);
  const [year, setYear] = useState(parsed.year);

  // Update internal state when external value changes
  useEffect(() => {
    const parsedValue = parseMMDDYYYY(value);
    setDay(parsedValue.day);
    setMonth(parsedValue.month);
    setYear(parsedValue.year);
  }, [value]);

  // Update the parent when any field changes
  const handleFieldChange = (
    newDay: string,
    newMonth: string,
    newYear: string
  ) => {
    const combined = combineToMMDDYYYY(newDay, newMonth, newYear);
    onChange(combined);
  };

  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDay = e.target.value;
    setDay(newDay);
    handleFieldChange(newDay, month, year);
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMonth = e.target.value;
    setMonth(newMonth);
    handleFieldChange(day, newMonth, year);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newYear = e.target.value;
    setYear(newYear);
    handleFieldChange(day, month, newYear);
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
        <legend className="govuk-label govuk-label--m">
          {label}
          {required && <span className="ml-1 text-red-600">*</span>}
        </legend>

        {hint && (
          <div className="govuk-hint mb-2 text-gray-600 text-sm" id={hintId}>
            {hint}
          </div>
        )}

        {hasError && (
          <p className="govuk-error-message mb-2 text-red-600" id={errorId}>
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
              className={`govuk-input govuk-date-input__input govuk-input--width-2 w-[5ch] rounded border-2 px-2 py-1 ${
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
              value={day}
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
              className={`govuk-input govuk-date-input__input govuk-input--width-2 w-[5ch] rounded border-2 px-2 py-1 ${
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
              value={month}
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
              className={`govuk-input govuk-date-input__input govuk-input--width-4 w-[7ch] rounded border-2 px-2 py-1 ${
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
              value={year}
            />
          </div>
        </div>
      </fieldset>
    </div>
  );
}
