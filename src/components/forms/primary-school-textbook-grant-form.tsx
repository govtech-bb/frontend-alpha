"use client";

import DynamicMultiStepForm from "@/components/forms/builder/multi-step-form";
import { formSteps } from "@/schema/primary-school-textbook-grant";

export default function PrimarySchoolTextbookGrantForm() {
  return (
    <DynamicMultiStepForm
      formSteps={formSteps}
      serviceTitle="Get a Primary School Textbook Grant"
      storageKey="primary-school-textbook-grant"
    />
  );
}
