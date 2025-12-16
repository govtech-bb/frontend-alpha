"use client";

import DynamicMultiStepForm from "@/components/forms/builder/multi-step-form";
import { formSteps } from "@/schema/project-protege-mentor";

export default function ProjectProtegeForm() {
  return (
    <DynamicMultiStepForm
      formSteps={formSteps}
      serviceTitle="Apply to be a Project Protégé mentor"
      storageKey="project-protege-mentor"
    />
  );
}
