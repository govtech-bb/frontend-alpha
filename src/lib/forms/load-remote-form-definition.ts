import "server-only";

/**
 * Loads form JSON from S3 using `@aws-sdk/client-s3` (never from the browser).
 * Credentials use the AWS SDK default provider chain (env vars, shared config,
 * IAM role on Vercel/AWS, etc.). See: https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/setting-credentials-node.html
 */
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import {
  type ParsedRemoteFormDefinition,
  parseRemoteFormDefinition,
} from "@/lib/forms/remote-form-schema";
import { assertValidRemoteFormSlug } from "@/lib/forms/remote-form-slug";

const MAX_DEFINITION_BYTES = 2 * 1024 * 1024;

function getS3KeyForSlug(formSlug: string): string {
  const prefix = (process.env.FORMS_S3_PREFIX ?? "").replace(/^\/+/, "");
  const normalizedPrefix =
    prefix.length > 0 ? `${prefix.replace(/\/+$/, "")}/` : "";
  return `${normalizedPrefix}definitions/${formSlug}.json`;
}

let s3Client: S3Client | null = null;

function getS3Client(): S3Client {
  if (!s3Client) {
    s3Client = new S3Client({
      region:
        process.env.FORMS_S3_REGION ?? process.env.AWS_REGION ?? "us-east-1",
    });
  }
  return s3Client;
}

/**
 * Loads and validates a form definition JSON object from S3 for the given URL slug.
 * The JSON must contain `formSlug` equal to `formSlug` (prevents object/key mismatch).
 */
export async function loadRemoteFormDefinitionFromS3(
  formSlug: string
): Promise<ParsedRemoteFormDefinition | null> {
  assertValidRemoteFormSlug(formSlug);

  const bucket = process.env.FORMS_S3_BUCKET;
  if (!bucket) {
    if (process.env.NODE_ENV === "development") {
      console.error(
        "[remote-form] FORMS_S3_BUCKET is not set — remote form routes will 404"
      );
    }
    return null;
  }

  const key = getS3KeyForSlug(formSlug);

  try {
    const response = await getS3Client().send(
      new GetObjectCommand({
        Bucket: bucket,
        Key: key,
      })
    );

    const length = response.ContentLength;
    if (length !== undefined && length > MAX_DEFINITION_BYTES) {
      return null;
    }

    const body = response.Body;
    if (!body) {
      return null;
    }

    const text = await body.transformToString();
    if (new TextEncoder().encode(text).length > MAX_DEFINITION_BYTES) {
      return null;
    }

    const json: unknown = JSON.parse(text);
    const parsed = parseRemoteFormDefinition(json);

    if (parsed.formSlug !== formSlug) {
      return null;
    }

    return parsed;
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      const message = err instanceof Error ? err.message : String(err);
      console.error("[remote-form] Failed to load form definition from S3", {
        bucket,
        key,
        region:
          process.env.FORMS_S3_REGION ??
          process.env.AWS_REGION ??
          "us-east-1(default)",
        message,
      });
    }
    return null;
  }
}
