import { lazy } from "react";

export const FORM_COMPONENTS = {
  "register-a-birth": lazy(
    () => import("@/components/forms/register-a-birth-form")
  ),
  "register-for-community-sports-training-programme": lazy(
    () =>
      import(
        "@/components/forms/register-for-community-sports-training-programme-form"
      )
  ),
  "apply-to-be-a-project-protege-mentor": lazy(
    () => import("@/components/forms/project-protege-mentor")
  ),
  "get-a-primary-school-textbook-grant": lazy(
    () => import("@/components/forms/primary-school-textbook-grant-form")
  ),
  // Add other forms here
} as const;

export type FormSlug = keyof typeof FORM_COMPONENTS;
