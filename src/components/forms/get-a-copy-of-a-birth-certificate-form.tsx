"use client";

import DynamicMultiStepForm from "@/components/forms/builder/multi-step-form";
import { formSteps } from "@/schema/get-a-copy-of-a-birth-certificate";

export default function GetACopyOfABirthCertificateForm() {
  return (
    <DynamicMultiStepForm
      formSteps={formSteps}
      storageKey="get-a-copy-of-a-birth-certificate"
    />
  );
}
