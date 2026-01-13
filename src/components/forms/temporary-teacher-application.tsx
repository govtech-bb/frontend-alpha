"use client";

import DynamicMultiStepForm from "@/components/forms/builder/multi-step-form";
import { formSteps } from "@/schema/temporary-teacher-application";

export default function FunctionName() {
  return (
    <DynamicMultiStepForm
      formSteps={formSteps}
      serviceTitle="Apply for being a Temporary Teacher"
      storageKey="temporary-teacher-application"
    />
  );
}
