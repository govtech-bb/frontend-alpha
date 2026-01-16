"use client";

import DynamicMultiStepForm from "@/components/forms/builder/multi-step-form";
import { formSteps } from "@/schema/post-office-redirection-individual";

export default function RedirectMailForIndividualForm() {
  return (
    <DynamicMultiStepForm
      formSteps={formSteps}
      serviceTitle="Redirect my personal mail"
      storageKey="post-office-redirection-individual"
    />
  );
}
