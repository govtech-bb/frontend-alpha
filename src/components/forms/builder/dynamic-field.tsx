import { Input, Radio, RadioGroup, Select, TextArea } from "@govtech-bb/react";
import { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import type { FormData } from "@/lib/schema-generator";
import type { FormField } from "@/types";

export function DynamicField({ field }: { field: FormField }) {
  const {
    register,
    formState: { errors },
    control,
    watch,
    setValue,
  } = useFormContext<FormData>();

  const error = errors[field.name as keyof FormData];

  // Watch conditional field value (always call hook, even if no condition)
  const watchedValue = field.conditionalOn
    ? watch(field.conditionalOn.field as keyof FormData)
    : null;

  const shouldShow = field.conditionalOn
    ? watchedValue === field.conditionalOn.value
    : true;

  // Clear field value when condition is not met (always call hook)
  useEffect(() => {
    if (field.conditionalOn && !shouldShow) {
      setValue(field.name as keyof FormData, "" as FormData[keyof FormData], {
        shouldValidate: false,
        shouldDirty: false,
      });
    }
  }, [shouldShow, field.name, field.conditionalOn, setValue]);

  // Return null if conditional field shouldn't be shown
  if (field.conditionalOn && !shouldShow) {
    return null;
  }

  // Render the field content
  const fieldContent = (
    <>
      {/* TODO: Display custom date input if field.type === "date" */}
      {field.type === "select" ? (
        <Select
          error={error?.message}
          label={field.label}
          {...register(field.name as keyof FormData)}
        >
          {field.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      ) : field.type === "radio" ? (
        <Controller
          control={control}
          name={field.name as keyof FormData}
          render={({ field: controllerField }) => (
            <RadioGroup
              error={error?.message}
              label={field.label}
              onValueChange={controllerField.onChange}
              value={controllerField.value as string}
            >
              {field.options?.map((option) => (
                <Radio
                  key={option.value}
                  label={option.label}
                  value={option.value}
                />
              ))}
            </RadioGroup>
          )}
        />
      ) : field.type === "textarea" ? (
        <TextArea
          {...register(field.name as keyof FormData)}
          error={error?.message}
          label={field.label}
          placeholder={field.placeholder}
          rows={field.rows || 4}
        />
      ) : (
        <Input
          error={error?.message}
          label={field.label}
          type={field.type}
          {...register(field.name as keyof FormData)}
          placeholder={field.placeholder}
        />
      )}
    </>
  );

  // Wrap conditional fields with animation and border styling
  if (field.conditionalOn) {
    return (
      <div
        className="motion-safe:fade-in motion-safe:slide-in-from-top-2 pl-[20px] motion-safe:animate-in motion-safe:duration-200"
        id={field.name}
      >
        <div className="border-neutral-grey border-l-8 border-solid pb-4 pl-[52px]">
          {fieldContent}
        </div>
      </div>
    );
  }

  // Regular field without conditional styling
  return <div id={field.name}>{fieldContent}</div>;
}
