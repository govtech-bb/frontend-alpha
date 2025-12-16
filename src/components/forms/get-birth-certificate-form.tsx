"use client";

import DynamicMultiStepForm from "@/components/forms/builder/multi-step-form";
import { formSteps } from "@/schema/get-birth-certificate";

export default function GetBirthCertificateForm() {
  return (
    <DynamicMultiStepForm
      formSteps={formSteps}
      serviceTitle="Get a copy of a birth certificate"
      storageKey="get-birth-certificate"
    />
  );
}
