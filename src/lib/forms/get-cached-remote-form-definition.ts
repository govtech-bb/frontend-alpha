import "server-only";

import { cache } from "react";
import { loadRemoteFormDefinitionFromS3 } from "@/lib/forms/load-remote-form-definition";
import type { ParsedRemoteFormDefinition } from "@/lib/forms/remote-form-schema";

/**
 * One S3 fetch + parse per request for all `/forms/[slug]/*` routes that need the definition.
 */
export const getCachedRemoteFormDefinition = cache(
  async (formSlug: string): Promise<ParsedRemoteFormDefinition | null> =>
    loadRemoteFormDefinitionFromS3(formSlug)
);
