"use client";

import DynamicMultiStepForm from "@/components/forms/builder/multi-step-form";
import { formSteps } from "@/schema/get-death-certificate";

export default function GetDeathCertificateForm() {
  return (
    <DynamicMultiStepForm
      formSteps={formSteps}
      storageKey="get-death-certificate"
    />
  );
}
