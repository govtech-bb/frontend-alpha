import type { FormStep } from "@/types";

export interface SchemaModule {
  formSteps: FormStep[];
}

// Single source of truth for which forms the chat can drive. Adding a new
// chat-eligible form = one entry here. Loaders are lazy so client bundles
// only the schema actually used in a given turn.
export const CHAT_FORM_SCHEMA_LOADERS: Record<
  string,
  () => Promise<SchemaModule>
> = {
  "apply-for-conductor-licence": () =>
    import("@/schema/apply-for-conductor-licence"),
  "community-sports-programme": () =>
    import("@/schema/sports-training-programme-form-schema"),
  "get-birth-certificate": () => import("@/schema/get-birth-certificate"),
  "get-death-certificate": () => import("@/schema/get-death-certificate"),
  "get-marriage-certificate": () => import("@/schema/get-marriage-certificate"),
  "jobstart-plus-programme": () => import("@/schema/jobstart-plus-programme"),
  "post-office-redirection-business": () =>
    import("@/schema/post-office-redirection-business"),
  "post-office-redirection-deceased": () =>
    import("@/schema/post-office-redirection-deceased"),
  "post-office-redirection-individual": () =>
    import("@/schema/post-office-redirection-individual"),
  "primary-school-textbook-grant": () =>
    import("@/schema/primary-school-textbook-grant"),
  "project-protege-mentor": () => import("@/schema/project-protege-mentor"),
  "request-a-fire-service-inspection": () =>
    import("@/schema/request-a-fire-service-inspection"),
  "request-a-presidential-visit-for-a-centenarian": () =>
    import("@/schema/request-a-presidential-visit-for-a-centenarian"),
  "reserve-society-name": () => import("@/schema/reserve-society-name"),
  "sell-goods-services-beach-park": () =>
    import("@/schema/sell-goods-services-beach-park"),
};

export type ChatFormSlug = keyof typeof CHAT_FORM_SCHEMA_LOADERS;
