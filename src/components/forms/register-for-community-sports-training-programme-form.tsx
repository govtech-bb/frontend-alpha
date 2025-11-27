"use client";

import DynamicMultiStepForm from "@/components/forms/builder/multi-step-form";
import { formSteps } from "@/schema/sports-training-programme-form-schema";

export default function RegisterForCommunitySportsTrainingProgrammeForm() {
  return (
    <DynamicMultiStepForm
      formSteps={formSteps}
      storageKey="sports-training-programme-form"
    />
  );
}
