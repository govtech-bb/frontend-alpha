"use client";

import DynamicMultiStepForm from "@/components/forms/builder/multi-step-form";
import { formSteps } from "@/schema/referral-student-support-services";

export default function ReferralStudentSupportServicesForm() {
  return (
    <DynamicMultiStepForm
      formSteps={formSteps}
      serviceTitle="Referral to Student Support Services"
      storageKey="referral-student-support-services"
    />
  );
}
