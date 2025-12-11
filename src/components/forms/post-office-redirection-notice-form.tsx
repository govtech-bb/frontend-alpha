"use client";

import DynamicMultiStepForm from "@/components/forms/builder/multi-step-form";
import { formSteps } from "@/schema/post-office-redirection-notice";

export default function PostOfficeRedirectionNoticeForm() {
  return (
    <DynamicMultiStepForm
      formSteps={formSteps}
      storageKey="post-office-redirection-notice"
    />
  );
}
