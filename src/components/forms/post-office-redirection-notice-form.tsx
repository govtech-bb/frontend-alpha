"use client";

import DynamicMultiStepForm from "@/components/forms/builder/multi-step-form";
import { formSteps } from "@/schema/post-office-redirection-notice";

export default function PostOfficeRedirectionNoticeForm() {
  return (
    <DynamicMultiStepForm
      formSteps={formSteps}
      serviceTitle="Post office redirection notice"
      storageKey="post-office-redirection-notice"
    />
  );
}
