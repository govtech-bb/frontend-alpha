import {
  Button,
  Input,
  Radio,
  RadioGroup,
  Select,
  Text,
} from "@govtech-bb/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import {
  getCategoryShortId,
  getFormShortIdFromSlug,
  trackEvent,
} from "@/lib/analytics";
import type { FormData } from "@/lib/schema-generator";
import { getNestedValue } from "@/lib/utils";
import type { FieldArrayConfig, FormField } from "@/types";

// Convert index to ordinal word (0 -> "First", 1 -> "Second", etc.)
function getOrdinalWord(index: number): string {
  const ordinals = [
    "First",
    "Second",
    "Third",
    "Fourth",
    "Fifth",
    "Sixth",
    "Seventh",
    "Eighth",
    "Ninth",
    "Tenth",
  ];
  return ordinals[index] || `${index + 1}`;
}

type FieldArrayField = FormField & {
  type: "fieldArray";
  fieldArray: FieldArrayConfig;
};

type DynamicFieldArrayProps = {
  field: FieldArrayField;
};

export function DynamicFieldArray({ field }: DynamicFieldArrayProps) {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);
  const formSlug = pathSegments[1] ?? "";
  const categorySlug = pathSegments[0] ?? "";

  const {
    register,
    control,
    watch,
    formState: { errors },
    getValues,
  } = useFormContext<FormData>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: field.name as never,
  });

  // Use a ref to track if we've already initialized this field array
  // to prevent double-initialization in React 18 Strict Mode
  const hasInitialized = useRef(false);

  const fieldArrayConfig = field.fieldArray;
  const minItems = fieldArrayConfig?.minItems ?? 1;
  const maxItems = fieldArrayConfig?.maxItems;
  const nestedFields = fieldArrayConfig?.fields;
  const canAddMore = maxItems === undefined || fields.length < maxItems;

  // Initialize with at least one field if empty
  useEffect(() => {
    // Skip if already initialized
    if (hasInitialized.current) return;

    // Check if fields are actually empty in the form state
    const currentValues = getValues(field.name as keyof FormData);
    const hasValues = Array.isArray(currentValues) && currentValues.length > 0;

    // Only append if we really have no fields and no values in form state
    // AND if we are not currently in the middle of a render cycle that might update fields
    if (fields.length === 0 && !hasValues) {
      hasInitialized.current = true;
      const minItems = fieldArrayConfig?.minItems ?? 1;
      if (minItems > 0) {
        if (nestedFields) {
          const initialItem: Record<string, string> = {};
          for (const f of nestedFields) {
            initialItem[f.name] = "";
          }
          append(initialItem as never);
        } else {
          append({ value: "" } as never);
        }
      }
    } else {
      hasInitialized.current = true;
    }
  }, [
    fields.length,
    append,
    nestedFields,
    field.name,
    getValues,
    fieldArrayConfig?.minItems,
  ]);

  const handleAddAnother = () => {
    if (nestedFields) {
      const newItem: Record<string, string> = {};
      for (const f of nestedFields) {
        newItem[f.name] = "";
      }
      append(newItem as never);
    } else {
      append({ value: "" } as never);
    }
  };

  const handleRemove = (index: number) => {
    if (fields.length > minItems) {
      remove(index);
      trackEvent("form-remove-item", {
        form: getFormShortIdFromSlug(formSlug),
        category: getCategoryShortId(categorySlug),
        field: field.name,
      });
    }
  };

  // Complex field array with multiple fields per item
  if (nestedFields && nestedFields.length > 0) {
    return (
      <div className="space-y-6" id={field.name}>
        {fields.map((item, index) => {
          // Get errors for this array item
          const itemErrors = getNestedValue<
            Record<string, { message?: string }>
          >(errors as Record<string, unknown>, `${field.name}.${index}`);

          return (
            <div key={item.id}>
              {/* Show divider and header for items after the first */}
              {index > 0 && (
                <div className="mb-6 flex items-center justify-between border-neutral-300 border-t pt-6">
                  <h3 className="font-bold text-lg">
                    {getOrdinalWord(index)}{" "}
                    {(fieldArrayConfig?.itemLabel || "item").toLowerCase()}
                  </h3>
                  {fields.length > minItems && (
                    <Button
                      onClick={() => handleRemove(index)}
                      type="button"
                      variant="link"
                    >
                      {fieldArrayConfig?.removeButtonText || "Remove"}
                    </Button>
                  )}
                </div>
              )}

              <div className="space-y-4">
                {nestedFields.map((nestedField) => {
                  const fieldName =
                    `${field.name}.${index}.${nestedField.name}` as keyof FormData;
                  const fieldError = itemErrors?.[nestedField.name];

                  // Check if field should be shown based on conditionalOn
                  if (nestedField.conditionalOn) {
                    const conditionalFieldName =
                      `${field.name}.${index}.${nestedField.conditionalOn.field}` as keyof FormData;
                    const conditionalValue = watch(conditionalFieldName);

                    if (conditionalValue !== nestedField.conditionalOn.value) {
                      return null; // Don't render if condition not met
                    }
                  }

                  // Render select field
                  if (nestedField.type === "select" && nestedField.options) {
                    const options = nestedField.options;
                    return nestedField.hint ? (
                      <div
                        className="flex flex-col gap-1"
                        key={nestedField.name}
                      >
                        <label
                          className="font-bold text-lg"
                          htmlFor={`${field.name}.${index}.${nestedField.name}`}
                        >
                          {nestedField.label}
                        </label>
                        <Text
                          as="p"
                          className={
                            fieldError?.message
                              ? "text-red-700"
                              : "text-mid-grey-00"
                          }
                          size="body"
                        >
                          {fieldError?.message ?? nestedField.hint}
                        </Text>
                        <Select
                          error={fieldError?.message}
                          id={`${field.name}.${index}.${nestedField.name}`}
                          {...register(fieldName)}
                        >
                          {options.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </Select>
                      </div>
                    ) : (
                      <Select
                        error={fieldError?.message}
                        key={nestedField.name}
                        label={nestedField.label}
                        {...register(fieldName)}
                      >
                        {options.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </Select>
                    );
                  }

                  // Render radio field
                  if (nestedField.type === "radio" && nestedField.options) {
                    const options = nestedField.options;
                    return (
                      <Controller
                        control={control}
                        key={nestedField.name}
                        name={fieldName}
                        render={({ field: controllerField }) => (
                          <RadioGroup
                            error={fieldError?.message}
                            label={nestedField.label}
                            onValueChange={controllerField.onChange}
                            value={controllerField.value as string}
                          >
                            {options.map((option) => (
                              <Radio
                                id={`${fieldName}-${option.value}`}
                                key={option.value}
                                label={option.label}
                                value={option.value}
                              />
                            ))}
                          </RadioGroup>
                        )}
                      />
                    );
                  }

                  // Render text/other input fields
                  return (
                    <Input
                      error={fieldError?.message}
                      id={`${field.name}-${index}-${nestedField.name}`}
                      key={nestedField.name}
                      label={nestedField.label}
                      placeholder={nestedField.placeholder}
                      type={nestedField.type}
                      {...register(fieldName)}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}

        {canAddMore && (
          <div className="pt-2">
            <Button onClick={handleAddAnother} type="button" variant="link">
              {fieldArrayConfig?.addButtonText || "Add another"}
            </Button>
          </div>
        )}
      </div>
    );
  }

  // Simple field array with single value per item
  return (
    <div className="space-y-4" id={field.name}>
      {fields.map((item, index) => {
        const fieldName = `${field.name}.${index}.value` as keyof FormData;

        // Use getNestedValue to handle dotted field names correctly
        const itemError = getNestedValue<{ message?: string }>(
          errors as Record<string, unknown>,
          `${field.name}.${index}.value`
        );

        return (
          <div className="flex flex-col gap-2" key={item.id}>
            <div className="flex items-end gap-2">
              <div className={`flex-1 ${index > 0 ? "[&_label]:sr-only" : ""}`}>
                <Input
                  error={itemError?.message}
                  id={`${field.name}-${index}`}
                  label={fieldArrayConfig?.itemLabel || field.label}
                  placeholder={field.placeholder}
                  type="text"
                  {...register(fieldName)}
                />
              </div>
              {fields.length > minItems && (
                <div className="flex h-12 items-center">
                  <Button
                    onClick={() => handleRemove(index)}
                    type="button"
                    variant="link"
                  >
                    {fieldArrayConfig?.removeButtonText || "Remove"}
                  </Button>
                </div>
              )}
            </div>
          </div>
        );
      })}

      {canAddMore && (
        <div>
          <Button onClick={handleAddAnother} type="button" variant="link">
            {fieldArrayConfig?.addButtonText || "Add another"}
          </Button>
        </div>
      )}
    </div>
  );
}
