"use client";

import DynamicMultiStepForm from "@/components/forms/builder/multi-step-form";
import { formSteps } from "@/schema/rausing-public-service-fellowship";

export default function ApplyForRausingPublicServiceFellowshipForm() {
  return (
    <DynamicMultiStepForm
      formSteps={formSteps}
      serviceTitle="Apply for the Rausing Public Service Fellowship for Barbados (2026–2027)"
      storageKey="rausing-public-service-fellowship"
    />
  );
}
