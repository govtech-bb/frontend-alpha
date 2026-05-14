"use client";

import DynamicMultiStepForm from "@/components/forms/builder/multi-step-form";
import { formSteps } from "@/schema/request-a-presidential-visit-for-a-centenarian";

export default function RequestAPresidentialVisitForACentenarianForm() {
  return (
    <DynamicMultiStepForm
      formSteps={formSteps}
      ministryName="Office of the President"
      notificationEmail="testing@govtech.bb"
      serviceTitle="Request a Presidential Visit for a Centenarian"
      storageKey="request-a-presidential-visit-for-a-centenarian"
      submissionMode="serverActionOnly"
    />
  );
}
