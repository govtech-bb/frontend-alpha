"use client";

import DynamicMultiStepForm from "@/components/forms/builder/multi-step-form";
import { formSteps } from "@/schema/post-office-redirection-business";

export default function RedirectMailForDeceasedForm() {
  return (
    <DynamicMultiStepForm
      formSteps={formSteps}
      serviceTitle="Change where mail is sent for a deceased person"
      storageKey="post-office-redirection-deceased"
    />
  );
}
