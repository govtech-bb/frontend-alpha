"use client";

import DynamicMultiStepForm from "@/components/forms/builder/multi-step-form";
import { formSteps } from "@/schema/permission-to-remove-tree";

export default function PermissionToRemoveTreeForm() {
  return (
    <DynamicMultiStepForm
      formSteps={formSteps}
      serviceTitle="Apply to remove a protected tree"
      storageKey="permission-to-remove-tree"
    />
  );
}
