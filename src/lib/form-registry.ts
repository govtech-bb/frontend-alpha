import { lazy } from "react";

export const FORM_COMPONENTS = {
  "register-a-birth": lazy(
    () => import("@/components/forms/register-a-birth-form")
  ),
  "apply-to-be-a-project-protege-mentor": lazy(
    () => import("@/components/forms/mentorship-application-form")
  ),
  // Add other forms here
} as const;

export type FormSlug = keyof typeof FORM_COMPONENTS;
