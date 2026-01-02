"use client";

import DynamicMultiStepForm from "@/components/forms/builder/multi-step-form";
import { formSteps } from "@/schema/post-office-redirection-individual";

export default function RedirectMailForIndividualForm() {
  return (
    <DynamicMultiStepForm
      formSteps={formSteps}
      serviceTitle="Change where mail is sent for an individual"
      storageKey="post-office-redirection-individual"
    />
  );
}
