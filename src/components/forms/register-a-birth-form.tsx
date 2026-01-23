"use client";

import DynamicMultiStepForm from "@/components/forms/builder/multi-step-form";
import { formSteps } from "@/schema/register-a-birth";

export default function RegisterABirthForm() {
  return (
    <DynamicMultiStepForm
      formSteps={formSteps}
      serviceTitle="Register a birth"
      // storageKey="register-a-birth"
      storageKey="register-birth-form"
    />
  );
}
