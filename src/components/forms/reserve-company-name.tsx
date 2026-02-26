"use client";

import DynamicMultiStepForm from "@/components/forms/builder/multi-step-form";
import { formSteps } from "@/schema/reserve-company-name";

export default function ReserveCompanyNameForm() {
  return (
    <DynamicMultiStepForm
      formSteps={formSteps}
      serviceTitle="Reserve a company name"
      storageKey="reserve-company-name"
    />
  );
}
