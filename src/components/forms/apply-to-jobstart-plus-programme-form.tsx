"use client";

import DynamicMultiStepForm from "@/components/forms/builder/multi-step-form";
import { formSteps } from "@/schema/jobstart-plus-programme";

export default function ProjectProtegeForm() {
  return (
    <DynamicMultiStepForm
      formSteps={formSteps}
      storageKey="jobstart-plus-programme"
    />
  );
}
