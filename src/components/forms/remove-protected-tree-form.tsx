"use client";

import DynamicMultiStepForm from "@/components/forms/builder/multi-step-form";
import { formSteps } from "@/schema/remove-protected-tree";

export default function RemoveProtectedTreeForm() {
  return (
    <DynamicMultiStepForm
      formSteps={formSteps}
      serviceTitle="Apply for permission to remove a protected tree"
      storageKey="remove-protected-tree"
    />
  );
}
