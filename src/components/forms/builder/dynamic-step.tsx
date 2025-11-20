import type { FormStep } from "@/types";
import { DynamicField } from "./dynamic-field";

export function DynamicStep({ step }: { step: FormStep }) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-4 font-bold text-[56px] leading-[1.15] focus:outline-none lg:mb-2">
          {step.title}
        </h1>
        {step.description && (
          <p className="mt-1 text-gray-600">{step.description}</p>
        )}
      </div>

      <div className="space-y-4">
        {step.fields.map((field) => (
          <DynamicField field={field} key={field.name} />
        ))}
      </div>
    </div>
  );
}
