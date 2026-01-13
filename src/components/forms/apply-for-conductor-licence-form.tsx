"use client";

import DynamicMultiStepForm from "@/components/forms/builder/multi-step-form";
import { formSteps } from "@/schema/apply-for-conductor-licence";

export default function ApplyForConductorLicenceForm() {
  return (
    <DynamicMultiStepForm
      formSteps={formSteps}
      serviceTitle="Apply for conductor's licence"
      storageKey="apply-for-conductor-licence"
    />
  );
}
