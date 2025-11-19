"use client";

import { Suspense } from "react";
import { FormSkeleton } from "@/components/forms/form-skeleton";
import { FORM_COMPONENTS, type FormSlug } from "@/lib/form-registry";

type DynamicFormLoaderProps = {
  formSlug: string;
};

export function DynamicFormLoader({ formSlug }: DynamicFormLoaderProps) {
  const FormComponent = FORM_COMPONENTS[formSlug as FormSlug];

  if (!FormComponent) {
    return <div>Form not found</div>;
  }

  return (
    <Suspense fallback={<FormSkeleton />}>
      <FormComponent />
    </Suspense>
  );
}
