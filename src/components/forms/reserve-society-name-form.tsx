"use client";

import DynamicMultiStepForm from "@/components/forms/builder/multi-step-form";
import { formSteps } from "@/schema/reserve-society-name";

export default function GetBirthCertificateForm() {
  return (
    <DynamicMultiStepForm
      formSteps={formSteps}
      serviceTitle="Request to reserve a society name"
      storageKey="reserve-society-name"
    />
  );
}
