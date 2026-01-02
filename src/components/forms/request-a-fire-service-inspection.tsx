"use client";

import DynamicMultiStepForm from "@/components/forms/builder/multi-step-form";
import { formSteps } from "@/schema/request-a-fire-service-inspection";

export default function RequestAFireServiceInspectionForm() {
  return (
    <DynamicMultiStepForm
      formSteps={formSteps}
      serviceTitle="Request a fire service inspection"
      storageKey="request-a-fire-service-inspection"
    />
  );
}
