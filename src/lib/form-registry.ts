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
