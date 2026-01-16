import { ErrorSummary, Heading, Text } from "@govtech-bb/react";
import { type FieldError, useFormContext } from "react-hook-form";
import type { FormData } from "@/lib/schema-generator";
import { getNestedValue } from "@/lib/utils";
import type { ConditionalRule, FormStep } from "@/types";
import { DynamicField } from "./dynamic-field";

type DynamicStepProps = {
  step: FormStep;
  serviceTitle: string;
};

/**
 * Type guard to check if a ConditionalRule is a simple field/value rule (not an OR rule)
 */
function isSimpleConditionalRule(
  rule: ConditionalRule
): rule is { field: string; value: string } {
  return "field" in rule;
}

export function DynamicStep({ step, serviceTitle }: DynamicStepProps) {
  const {
    formState: { errors },
    watch,
    getValues,
  } = useFormContext<FormData>();

  // Get errors for the current step's fields (supports nested field names)
  const stepFieldNames = step.fields.map((f) => f.name);
  const formValues = getValues();
  // Collect errors for direct fields
  const directFieldErrors = stepFieldNames
    .map((fieldName) => {
      const error = getNestedValue<FieldError>(
        errors as Record<string, unknown>,
        fieldName
      );
      const field = step.fields.find((f) => f.name === fieldName);

      // Skip errors for fields that are conditionally hidden
      if (
        field?.conditionalOn &&
        isSimpleConditionalRule(field.conditionalOn)
      ) {
        const watchedValue = watch(field.conditionalOn.field as keyof FormData);
        if (watchedValue !== field.conditionalOn.value) {
          return null; // Don't show error if field is hidden
        }
      }

      if (field) {
        const escapedSelector = `#${CSS.escape(fieldName)}`;

        // If it's a field error with a direct message
        if (error && "message" in error && typeof error.message === "string") {
          return {
            target: escapedSelector,
            text: error.message,
          };
        }

        // If it's a field array with item errors (error is an array or object without direct message)
        if (
          error &&
          (Array.isArray(error) ||
            (typeof error === "object" && Object.keys(error).length > 0))
        ) {
          return {
            target: escapedSelector,
            text: field.validation.required || "This field is required",
          };
        }
      }
      return null;
    })
    .filter(
      (error): error is { target: string; text: string } => error !== null
    );

  // Collect errors for ShowHide child fields
  const showHideChildErrors = step.fields
    .filter((field) => field.type === "showHide" && field.showHide)
    .flatMap((field) => {
      if (!field.showHide) return [];
      const showHideState = getNestedValue<unknown>(
        formValues as Record<string, unknown>,
        field.showHide.stateFieldName
      );

      // Only collect errors when ShowHide is open
      if (showHideState === "open") {
        return field.showHide.fields.map((childField) => {
          const childError = getNestedValue<FieldError>(
            errors as Record<string, unknown>,
            childField.name
          );

          if (
            childError &&
            "message" in childError &&
            typeof childError.message === "string"
          ) {
            const escapedSelector = `#${CSS.escape(childField.name)}`;
            return {
              target: escapedSelector,
              text: childError.message,
            };
          }
          return null;
        });
      }
      return [];
    })
    .filter(
      (error): error is { target: string; text: string } => error !== null
    );

  const stepErrors = [...directFieldErrors, ...showHideChildErrors];

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="border-blue-40 border-l-4 py-xs pl-s">
          <Text as="p" className="text-mid-grey-00">
            {serviceTitle}
          </Text>
        </div>
        <Heading
          as="h1"
          className={`focus:outline-none ${
            step.id === "declaration"
              ? "inline rounded-xl bg-[#ffe53f] px-4 py-2 shadow-lg"
              : ""
          }`}
        >
          {step.title}
        </Heading>
        {step.description && (
          <Text as="p" className="whitespace-pre-line leading-[1.5]">
            {step.description}
          </Text>
        )}
      </div>

      {/* Error Summary - only show if there are errors */}
      {stepErrors.length > 0 && (
        <div id="error-summary">
          <ErrorSummary errors={stepErrors} title="There is a problem" />
        </div>
      )}

      <div className="space-y-4">
        {step.id === "declaration" ? (
          <>
            {/* Group applicant name and date together with less spacing */}
            <div className="space-y-1">
              {(() => {
                const applicantNameField = step.fields.find(
                  (f) => f.name === "declaration.applicantName"
                );
                const dateField = step.fields.find(
                  (f) => f.name === "declaration.date"
                );

                if (applicantNameField) {
                  const formValues = getValues();
                  const firstName =
                    getNestedValue<string>(
                      formValues as Record<string, unknown>,
                      "mother.firstName"
                    ) || "";
                  const middleName =
                    getNestedValue<string>(
                      formValues as Record<string, unknown>,
                      "mother.middleName"
                    ) || "";
                  const lastName =
                    getNestedValue<string>(
                      formValues as Record<string, unknown>,
                      "mother.lastName"
                    ) || "";

                  const nameParts = [firstName, middleName, lastName].filter(
                    Boolean
                  );
                  const applicantName =
                    nameParts.join(" ") ||
                    "First name + middle name + last name";

                  return (
                    <div key={applicantNameField.name}>
                      <Text as="p" className="text-lg">
                        <span className="font-bold">
                          {applicantNameField.label}
                        </span>{" "}
                        {applicantName}
                      </Text>
                    </div>
                  );
                }
                return null;
              })()}
              {(() => {
                const dateField = step.fields.find(
                  (f) => f.name === "declaration.date"
                );

                if (dateField) {
                  const today = new Date();
                  const day = String(today.getDate()).padStart(2, "0");
                  const month = String(today.getMonth() + 1).padStart(2, "0");
                  const year = today.getFullYear();
                  const formattedDate = `${day}/${month}/${year}`;

                  return (
                    <div key={dateField.name}>
                      <Text as="p" className="text-lg">
                        <span className="font-bold">{dateField.label}</span>{" "}
                        {formattedDate}
                      </Text>
                    </div>
                  );
                }
                return null;
              })()}
            </div>
            {/* Render other fields (like checkbox) with normal spacing */}
            {step.fields
              .filter(
                (field) =>
                  !field.conditionalOn &&
                  field.name !== "declaration.applicantName" &&
                  field.name !== "declaration.date"
              )
              .map((field, index) => {
                const conditionalFields = step.fields.filter(
                  (f) =>
                    f.conditionalOn &&
                    isSimpleConditionalRule(f.conditionalOn) &&
                    f.conditionalOn.field === field.name
                );
                const fieldKey = field.name || `${field.type}-${index}`;
                return (
                  <DynamicField
                    conditionalFields={conditionalFields}
                    field={field}
                    key={fieldKey}
                  />
                );
              })}
          </>
        ) : (
          step.fields
            .filter((field) => !field.conditionalOn)
            .map((field, index) => {
              // Find conditional fields that depend on this field
              const conditionalFields = step.fields.filter(
                (f) =>
                  f.conditionalOn &&
                  isSimpleConditionalRule(f.conditionalOn) &&
                  f.conditionalOn.field === field.name
              );
              // Use field name if available, otherwise use index to ensure unique keys
              // This is especially important for heading fields with empty names
              const fieldKey = field.name || `${field.type}-${index}`;
              return (
                <DynamicField
                  conditionalFields={conditionalFields}
                  field={field}
                  key={fieldKey}
                />
              );
            })
        )}
      </div>
    </div>
  );
}
