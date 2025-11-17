import { lazy } from "react";

export const FORM_COMPONENTS = {
  "register-a-birth": lazy(
    () => import("@/components/forms/register-a-birth-form")
  ),
  "apply-to-be-a-project-protege-mentor": lazy(
    () => import("@/components/forms/mentorship-application-form")
  ),
  "register-for-community-sports-training-programme": lazy(
    () => import("@/components/forms/ydp-sports-training-form")
  ),
  // Add other forms here
} as const;

export type FormSlug = keyof typeof FORM_COMPONENTS;
