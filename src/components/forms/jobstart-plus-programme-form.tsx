"use client";

import DynamicMultiStepForm from "@/components/forms/builder/multi-step-form";
import { formSteps } from "@/schema/jobstart-plus-programme";

export default function ApplyToJobstartPlusProgrammeForm() {
  return (
    <DynamicMultiStepForm
      formSteps={formSteps}
      serviceTitle="Apply to JobStart Plus programme"
      storageKey="jobstart-plus-programme"
    />
  );
}
