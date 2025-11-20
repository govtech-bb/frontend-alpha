import { Input, Radio, RadioGroup, Select, TextArea } from "@govtech-bb/react";
import { Controller, useFormContext } from "react-hook-form";
import type { FormData } from "@/lib/schema-generator";
import type { FormField } from "@/types";

export function DynamicField({ field }: { field: FormField }) {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext<FormData>();

  const error = errors[field.name as keyof FormData];

  return (
    <div>
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
    </div>
  );
}
