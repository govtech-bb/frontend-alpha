import { lazy } from "react";

export const FORM_COMPONENTS = {
  "register-a-birth": lazy(
    () => import("@/components/forms/register-a-birth-form")
  ),
  // Add other forms here
} as const;

export type FormSlug = keyof typeof FORM_COMPONENTS;
