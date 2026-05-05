"use client";

import DynamicMultiStepForm from "@/components/forms/builder/multi-step-form";
import type { FormStep } from "@/types";

interface RemoteDynamicFormProps {
  formSteps: FormStep[];
  formName: string;
  formSlug: string;
  notificationEmail: string | null;
  ministryName?: string | null;
}

/**
 * Client entry for S3-backed definitions under `/forms/[formSlug]/form`.
 */
export function RemoteDynamicForm({
  formSteps,
  formName,
  formSlug,
  notificationEmail,
  ministryName,
}: RemoteDynamicFormProps) {
  return (
    <DynamicMultiStepForm
      analyticsCategory="remote-forms"
      confirmationFormId={formSlug}
      formSteps={formSteps}
      ministryName={ministryName}
      notificationEmail={notificationEmail}
      serviceTitle={formName}
      storageKey={formSlug}
      submissionMode="serverActionOnly"
    />
  );
}
