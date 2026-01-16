"use client";

import DynamicMultiStepForm from "@/components/forms/builder/multi-step-form";
import { formSteps } from "@/schema/post-office-redirection-deceased";

export default function RedirectMailForDeceasedForm() {
  return (
    <DynamicMultiStepForm
      formSteps={formSteps}
      serviceTitle="Tell the Post Office someone has died"
      storageKey="post-office-redirection-deceased"
    />
  );
}
