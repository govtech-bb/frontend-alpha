// components/dynamic-form-loader.tsx
"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

type DynamicFormLoaderProps = {
  formSlug: string;
};

const Fallback = () => <div>Form not found</div>;

export function DynamicFormLoader({ formSlug }: DynamicFormLoaderProps) {
  const FormComponent = dynamic<Record<string, never>>(
    () =>
      import(`@/components/forms/${formSlug}-form`)
        .then((mod) => mod.default as ComponentType<Record<string, never>>)
        .catch(() => {
          // Return a fallback component if import fails

          return Fallback as ComponentType<Record<string, never>>;
        }),
    {
      loading: () => <div>Loading form...</div>,
      ssr: false, // Optional: disable SSR for the form if needed
    }
  );

  return <FormComponent />;
}
