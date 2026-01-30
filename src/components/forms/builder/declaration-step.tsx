"use client";

import { Checkbox, ErrorSummary, Heading, Text } from "@govtech-bb/react";
import { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import type { FormData } from "@/lib/schema-generator";
import { getNestedValue } from "@/lib/utils";
import type { FormStep } from "@/types";
import { DynamicField } from "./dynamic-field";

type DeclarationStepProps = {
  step: FormStep;
  serviceTitle: string;
};

/**
 * Formats a date as DD/MM/YYYY
 */
function formatDate(date: Date): string {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

/**
 * Specialized step component for declaration pages.
 * Auto-fills applicant name and today's date when applicant fields exist,
 * otherwise falls back to rendering input fields.
 */
export function DeclarationStep({ step, serviceTitle }: DeclarationStepProps) {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext<FormData>();

  // Get applicant name parts from form data
  const formValues = control._formValues as Record<string, unknown>;
  const applicant = getNestedValue<Record<string, string>>(
    formValues,
    "applicant"
  );

  const firstName = applicant?.firstName;
  const middleName = applicant?.middleName;
  const lastName = applicant?.lastName;

  // Check if we have applicant data to auto-fill
  const hasApplicantData = Boolean(firstName && lastName);

  // Build full name from available parts
  const fullName = hasApplicantData
    ? [firstName, middleName, lastName].filter(Boolean).join(" ")
    : "";

  // Today's date formatted as DD/MM/YYYY
  const today = new Date();
  const formattedDate = formatDate(today);

  // Find the checkbox field and date field from step config
  const checkboxField = step.fields.find((f) => f.type === "checkbox");
  const dateField = step.fields.find((f) => f.type === "date");

  // Find any other fields that should be rendered as inputs (fallback mode)
  const nameInputFields = step.fields.filter(
    (f) =>
      f.type !== "checkbox" &&
      f.type !== "date" &&
      f.name !== "declaration.confirmed"
  );

  // Auto-set the date field value on mount
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (dateField) {
      setValue(
        dateField.name as keyof FormData,
        {
          day: today.getDate().toString(),
          month: (today.getMonth() + 1).toString(),
          year: today.getFullYear().toString(),
        } as FormData[keyof FormData],
        { shouldValidate: false }
      );
    }
    // Only run on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Get checkbox error
  const checkboxError = checkboxField
    ? getNestedValue<{ message?: string }>(
        errors as Record<string, unknown>,
        checkboxField.name
      )
    : null;

  // Build error summary
  const stepErrors = checkboxError?.message
    ? [
        {
          target: `#${CSS.escape(checkboxField?.name ?? "")}`,
          text: checkboxError.message,
        },
      ]
    : [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="border-blue-40 border-l-4 py-xs pl-s">
          <Text as="p" className="text-mid-grey-00">
            {serviceTitle}
          </Text>
        </div>
        <Heading
          as="h1"
          className="focus:outline-none"
          id="step-heading"
          tabIndex={-1}
        >
          {step.title}
        </Heading>
      </div>

      {/* Error Summary */}
      {stepErrors.length > 0 && (
        <div id="error-summary">
          <ErrorSummary errors={stepErrors} title="There is a problem" />
        </div>
      )}

      {/* Declaration content */}
      <div className="space-y-6">
        {hasApplicantData ? (
          /* Auto-filled mode: show name and date as static text */
          <>
            <div>
              <Text as="p">
                <span className="font-bold">Applicant's name:</span> {fullName}
              </Text>
            </div>
            <div>
              <Text as="p">
                <span className="font-bold">Date:</span> {formattedDate}
              </Text>
            </div>
          </>
        ) : (
          /* Fallback mode: render input fields */
          <>
            {nameInputFields.map((field) => (
              <DynamicField field={field} key={field.name} />
            ))}
            {dateField && <DynamicField field={dateField} />}
          </>
        )}

        {/* Checkbox - always rendered */}
        {checkboxField && (
          <div id={checkboxField.name}>
            <Controller
              control={control}
              name={checkboxField.name as keyof FormData}
              render={({ field: controllerField }) => (
                <Checkbox
                  checked={controllerField.value === "yes"}
                  id={checkboxField.name}
                  label={checkboxField.label}
                  onCheckedChange={(checked) => {
                    controllerField.onChange(checked ? "yes" : "no");
                  }}
                />
              )}
            />
          </div>
        )}
      </div>
    </div>
  );
}
