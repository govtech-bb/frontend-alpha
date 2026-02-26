import { lazy } from "react";

export const FORM_COMPONENTS = {
  // "register-a-birth": lazy(
  //   () => import("@/components/forms/register-a-birth-form")
  // ),
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
  "apply-to-jobstart-plus-programme": lazy(
    () => import("@/components/forms/jobstart-plus-programme-form")
  ),
  "get-birth-certificate": lazy(
    () => import("@/components/forms/get-birth-certificate-form")
  ),
  "get-death-certificate": lazy(
    () => import("@/components/forms/get-death-certificate-form")
  ),
  "get-marriage-certificate": lazy(
    () => import("@/components/forms/get-marriage-certificate-form")
  ),
  "reserve-society-name": lazy(
    () => import("@/components/forms/reserve-society-name-form")
  ),
  "post-office-redirection-individual": lazy(
    () => import("@/components/forms/post-office-redirection-individual-form")
  ),
  "post-office-redirection-deceased": lazy(
    () => import("@/components/forms/post-office-redirection-deceased-form")
  ),
  "post-office-redirection-business": lazy(
    () => import("@/components/forms/post-office-redirection-business-form")
  ),
  "request-a-fire-service-inspection": lazy(
    () => import("@/components/forms/request-a-fire-service-inspection")
  ),
  "apply-for-conductor-licence": lazy(
    () => import("@/components/forms/apply-for-conductor-licence-form")
  ),
  "sell-goods-services-beach-park": lazy(
    () => import("@/components/forms/sell-goods-services-beach-park-form")
  ),
  "apply-for-job-at-ncc": lazy(
    () => import("@/components/forms/apply-for-job-at-ncc-form")
  ),
  // Add other forms here
} as const;

export type FormSlug = keyof typeof FORM_COMPONENTS;

/**
 * Maps page slugs to their corresponding session storage keys.
 * Used to clear form data when a user visits the /start page.
 */
export const FORM_STORAGE_KEYS: Record<FormSlug, string> = {
  "register-for-community-sports-training-programme":
    "community-sports-programme",
  "apply-to-be-a-project-protege-mentor": "project-protege-mentor",
  "get-a-primary-school-textbook-grant": "primary-school-textbook-grant",
  "apply-to-jobstart-plus-programme": "jobstart-plus-programme",
  "get-birth-certificate": "get-birth-certificate",
  "get-death-certificate": "get-death-certificate",
  "get-marriage-certificate": "get-marriage-certificate",
  "reserve-society-name": "reserve-society-name",
  "post-office-redirection-individual": "post-office-redirection-individual",
  "post-office-redirection-deceased": "post-office-redirection-deceased",
  "post-office-redirection-business": "post-office-redirection-business",
  "request-a-fire-service-inspection": "request-a-fire-service-inspection",
  "apply-for-conductor-licence": "apply-for-conductor-licence",
  "sell-goods-services-beach-park": "sell-goods-services-beach-park",
};

/**
 * Gets the session storage key for a given form slug.
 * Returns undefined if the form slug is not recognized.
 */
export function getFormStorageKey(formSlug: string): string | undefined {
  return FORM_STORAGE_KEYS[formSlug as FormSlug];
}
