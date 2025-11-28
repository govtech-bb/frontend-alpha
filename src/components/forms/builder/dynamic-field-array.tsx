import { Button, Input, Select } from "@govtech-bb/react";
import { useEffect } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import type { FormData } from "@/lib/schema-generator";
import { getNestedValue } from "@/lib/utils";
import type { FormField } from "@/types";

type DynamicFieldArrayProps = {
  field: FormField;
};

export function DynamicFieldArray({ field }: DynamicFieldArrayProps) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<FormData>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: field.name as never,
  });

  const fieldArrayConfig = field.fieldArray;
  const minItems = fieldArrayConfig?.minItems ?? 1;
  const nestedFields = fieldArrayConfig?.fields;

  // Initialize with at least one field if empty
  useEffect(() => {
    if (fields.length === 0) {
      if (nestedFields) {
        // For complex field arrays, initialize with empty values for all nested fields
        const initialItem: Record<string, string> = {};
        for (const f of nestedFields) {
          initialItem[f.name] = "";
        }
        append(initialItem as never);
      } else {
        append({ value: "" } as never);
      }
    }
  }, [fields.length, append, nestedFields]);

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
    }
  };

  // Complex field array with multiple fields per item
  if (nestedFields && nestedFields.length > 0) {
    return (
      <div className="space-y-6">
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
                    {fieldArrayConfig?.itemLabel || "Item"} {index + 1}
                  </h3>
                  {fields.length > minItems && (
                    <Button
                      onClick={() => handleRemove(index)}
                      type="button"
                      variant="secondary"
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

                  if (nestedField.type === "select" && nestedField.options) {
                    return (
                      <Select
                        error={fieldError?.message}
                        key={nestedField.name}
                        label={nestedField.label}
                        {...register(fieldName)}
                      >
                        {nestedField.options.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </Select>
                    );
                  }

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

        <div className="pt-2">
          <Button onClick={handleAddAnother} type="button" variant="secondary">
            {fieldArrayConfig?.addButtonText || "Add another"}
          </Button>
        </div>
      </div>
    );
  }

  // Simple field array with single value per item
  return (
    <div className="space-y-4">
      {fields.map((item, index) => {
        const fieldName = `${field.name}.${index}.value` as keyof FormData;
        const error = errors[field.name as keyof FormData];
        // @ts-expect-error - nested array error access
        const itemError = error?.[index]?.value;

        return (
          <div className="flex flex-col gap-2" key={item.id}>
            <div className="flex items-end gap-2">
              <div className="flex-1">
                <Input
                  error={itemError?.message}
                  id={`${field.name}-${index}`}
                  label={
                    index === 0
                      ? fieldArrayConfig?.itemLabel || field.label
                      : undefined
                  }
                  placeholder={field.placeholder}
                  type="text"
                  {...register(fieldName)}
                />
              </div>
              {fields.length > minItems && (
                <Button
                  onClick={() => handleRemove(index)}
                  type="button"
                  variant="secondary"
                >
                  {fieldArrayConfig?.removeButtonText || "Remove"}
                </Button>
              )}
            </div>
          </div>
        );
      })}

      <div>
        <Button onClick={handleAddAnother} type="button" variant="secondary">
          {fieldArrayConfig?.addButtonText || "Add another"}
        </Button>
      </div>
    </div>
  );
}
