"use client";

import DynamicMultiStepForm from "@/components/forms/builder/multi-step-form";
import { formSteps } from "@/schema/get-birth-certificate";

export default function GetBirthCertificateForm() {
  return (
    <DynamicMultiStepForm
      formSteps={formSteps}
      storageKey="get-birth-certificate"
    />
  );
}
