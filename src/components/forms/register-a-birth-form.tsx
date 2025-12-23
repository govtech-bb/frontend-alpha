"use client";

import DynamicMultiStepForm from "@/components/forms/builder/multi-step-form";
import { formSteps } from "@/schema/register-a-birth";

export default function RegisterBirthForm() {
  return (
    <DynamicMultiStepForm
      formSteps={formSteps}
      serviceTitle="Register a birth"
      storageKey="register-a-birth"
    />
  );
}
