import { Button, Input } from "@govtech-bb/react";
import { useEffect } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import type { FormData } from "@/lib/schema-generator";
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

  // Initialize with at least one field if empty
  useEffect(() => {
    if (fields.length === 0) {
      append({ value: "" } as never);
    }
  }, [fields.length, append]);

  const handleAddAnother = () => {
    append({ value: "" } as never);
  };

  const handleRemove = (index: number) => {
    if (fields.length > minItems) {
      remove(index);
    }
  };

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
        {/* TODO: Change to variant link when it becomes available */}
        <Button onClick={handleAddAnother} type="button" variant="secondary">
          {fieldArrayConfig?.addButtonText || "Add another"}
        </Button>
      </div>
    </div>
  );
}
