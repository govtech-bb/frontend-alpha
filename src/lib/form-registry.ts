import { lazy } from "react";

export const FORM_COMPONENTS = {
  "register-a-birth": lazy(
    () => import("@/components/forms/register-a-birth-form")
  ),
  "replace-a-passport": lazy(
    () => import("@/components/forms/passport-replacement")
  ),
} as const;

export type FormSlug = keyof typeof FORM_COMPONENTS;
