"use client";

import DynamicMultiStepForm from "@/components/forms/builder/multi-step-form";
import { formSteps } from "@/schema/get-marriage-certificate";

export default function GetMarriageCertificateForm() {
  return (
    <DynamicMultiStepForm
      formSteps={formSteps}
      storageKey="get-marriage-certificate"
    />
  );
}
