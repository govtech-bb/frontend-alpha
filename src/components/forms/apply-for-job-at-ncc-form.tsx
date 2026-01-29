"use client";

import DynamicMultiStepForm from "@/components/forms/builder/multi-step-form";
import { formSteps } from "@/schema/apply-for-job-at-ncc";

export default function ApplyForJobAtNccForm() {
  return (
    <DynamicMultiStepForm
      formSteps={formSteps}
      serviceTitle="Apply for a job at National Conservation Commission"
      storageKey="apply-for-job-at-ncc"
    />
  );
}
