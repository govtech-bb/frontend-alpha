"use client";

import { Suspense } from "react";
import { FORM_COMPONENTS, type FormSlug } from "@/lib/form-registry";
import { NoScriptMessage } from "./no-script-message";

interface DynamicFormLoaderProps {
  formSlug: string;
}

export function DynamicFormLoader({ formSlug }: DynamicFormLoaderProps) {
  const FormComponent = FORM_COMPONENTS[formSlug as FormSlug];

  if (!FormComponent) {
    return <div className="container">Form not found</div>;
  }

  return (
    <>
      <noscript>
        <NoScriptMessage />
        <style>{".js-only{display:none!important}"}</style>
      </noscript>
      <div className="js-only">
        <Suspense fallback={<div className="container">Loading form...</div>}>
          <FormComponent />
        </Suspense>
      </div>
    </>
  );
}
