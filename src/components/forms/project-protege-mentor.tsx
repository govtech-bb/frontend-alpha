"use client";

import DynamicMultiStepForm from "@/components/forms/builder/multi-step-form";
import { formSteps } from "@/schema/project-protege-mentor";

export default function ProjectProtegeForm() {
  return (
    <DynamicMultiStepForm
      formSteps={formSteps}
      storageKey="project-protege-mentor"
    />
  );
}
