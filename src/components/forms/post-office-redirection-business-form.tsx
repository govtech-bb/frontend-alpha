"use client";

import DynamicMultiStepForm from "@/components/forms/builder/multi-step-form";
import { formSteps } from "@/schema/post-office-redirection-business";

export default function RedirectMailForBusinessForm() {
  return (
    <DynamicMultiStepForm
      formSteps={formSteps}
      serviceTitle="Change where mail is sent for a business"
      storageKey="post-office-redirection-business"
    />
  );
}
