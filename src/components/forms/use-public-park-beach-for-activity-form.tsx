"use client";

import DynamicMultiStepForm from "@/components/forms/builder/multi-step-form";
import { formSteps } from "@/schema/use-public-park-beach-for-activity";

export default function ApplyToUsePublicParkBeachForActivityForm() {
  return (
    <DynamicMultiStepForm
      formSteps={formSteps}
      serviceTitle="Apply to use a public park or beach for an activity"
      storageKey="use-public-park-beach-for-activity"
    />
  );
}
