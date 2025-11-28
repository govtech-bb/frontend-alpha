"use client";

import DynamicMultiStepForm from "@/components/forms/builder/multi-step-form";
import { formSteps } from "@/schema/primary-school-textbook-grant";

export default function ProjectProtegeForm() {
  return (
    <DynamicMultiStepForm
      formSteps={formSteps}
      storageKey="primary-school-textbook-grant"
    />
  );
}
