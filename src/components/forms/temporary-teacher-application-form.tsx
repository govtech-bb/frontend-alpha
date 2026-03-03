"use client";

import DynamicMultiStepForm from "@/components/forms/builder/multi-step-form";
import { formSteps } from "@/schema/temporary-teacher-application";

export default function TemporaryTeacherApplicationForm() {
  return (
    <DynamicMultiStepForm
      formSteps={formSteps}
      serviceTitle="Apply to be a Temporary Teacher"
      storageKey="temporary-teacher-application"
    />
  );
}
