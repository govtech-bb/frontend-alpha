"use client";

import DynamicMultiStepForm from "@/components/forms/builder/multi-step-form";
import { formSteps } from "@/schema/sports-training-programme-form-schema";

export default function RegisterForCommunitySportsTrainingProgrammeForm() {
  return (
    <DynamicMultiStepForm
      formSteps={formSteps}
      serviceTitle="Registering for a YDP Community Sports Training programme"
      storageKey="community-sports-programme"
    />
  );
}
