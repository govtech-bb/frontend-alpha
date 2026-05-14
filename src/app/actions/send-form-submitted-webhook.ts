"use server";

import * as Sentry from "@sentry/nextjs";
import { z } from "zod";

const webhookPayloadSchema = z.object({
  referenceNumber: z.string().min(1),
  programmeCode: z.string().min(1),
  applicantName: z.string(),
  applicantEmail: z.string().email().nullable(),
  formData: z.record(z.string(), z.unknown()),
});

type WebhookPayload = z.infer<typeof webhookPayloadSchema>;

type LogLevel = "INFO" | "WARN" | "ERROR";

const cloudwatchLog: Record<LogLevel, (message: string) => void> = {
  INFO: console.info,
  WARN: console.warn,
  ERROR: console.error,
};

function log(
  level: LogLevel,
  event: string,
  fields?: Record<string, unknown>
): void {
  cloudwatchLog[level](
    JSON.stringify({
      timestamp: new Date().toISOString(),
      level,
      service: "form-submitted-webhook",
      event,
      ...fields,
    })
  );
}

function maskEmail(email: string | null | undefined): string {
  if (!email) return "(none)";
  const atIndex = email.indexOf("@");
  if (atIndex < 0) return "***";
  const local = email.slice(0, atIndex);
  const domain = email.slice(atIndex + 1);
  const visible = local.slice(0, Math.min(2, local.length));
  return `${visible}***@${domain}`;
}

function buildWebhookEndpoint(baseUrl: string): string {
  // `URL` resolves `api/webhooks/...` against the base safely whether or not
  // the configured WEBHOOK_URL has a trailing slash.
  const normalisedBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  return new URL("api/webhooks/form-submitted", normalisedBase).toString();
}

export async function sendFormSubmittedWebhook(payload: WebhookPayload) {
  const webhookUrl = process.env.WEBHOOK_URL;
  const webhookSecret = process.env.WEBHOOK_SECRET;
  const actionStart = Date.now();

  const correlationRef =
    typeof payload?.referenceNumber === "string"
      ? payload.referenceNumber
      : "unknown";

  if (!(webhookUrl && webhookSecret)) {
    log("WARN", "sendFormSubmittedWebhook.not_configured", {
      referenceNumber: correlationRef,
      hasWebhookUrl: Boolean(webhookUrl),
      hasWebhookSecret: Boolean(webhookSecret),
      hint: "Set WEBHOOK_URL and WEBHOOK_SECRET to dispatch case-management webhooks",
    });
    return {
      success: false as const,
      error: "Webhook is not configured",
    };
  }

  const parsed = webhookPayloadSchema.safeParse(payload);
  if (!parsed.success) {
    const flatErrors = parsed.error.flatten();
    log("ERROR", "sendFormSubmittedWebhook.validation_failed", {
      referenceNumber: correlationRef,
      fieldErrors: flatErrors.fieldErrors,
      formErrors: flatErrors.formErrors,
    });
    Sentry.captureMessage(
      "sendFormSubmittedWebhook: payload validation failed",
      {
        level: "error",
        extra: {
          referenceNumber: correlationRef,
          fieldErrors: flatErrors.fieldErrors,
        },
      }
    );
    return {
      success: false as const,
      error: "Invalid webhook payload",
    };
  }

  const {
    applicantEmail,
    applicantName,
    formData,
    programmeCode,
    referenceNumber,
  } = parsed.data;

  const endpoint = buildWebhookEndpoint(webhookUrl);

  log("INFO", "sendFormSubmittedWebhook.attempt", {
    referenceNumber,
    programmeCode,
    endpoint,
    applicantEmail: maskEmail(applicantEmail),
  });

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": webhookSecret,
      },
      body: JSON.stringify({
        code: referenceNumber,
        programme_code: programmeCode,
        applicant: {
          name: applicantName,
          email: applicantEmail,
        },
        form_data: formData,
      }),
    });

    const responseBody = await response.text().catch(() => "");

    if (!response.ok) {
      log("ERROR", "sendFormSubmittedWebhook.http_error", {
        referenceNumber,
        programmeCode,
        status: response.status,
        statusText: response.statusText,
        responseBody: responseBody.slice(0, 500),
        durationMs: Date.now() - actionStart,
      });
      Sentry.captureMessage("sendFormSubmittedWebhook: non-2xx response", {
        level: "error",
        extra: {
          referenceNumber,
          programmeCode,
          status: response.status,
          responseBody: responseBody.slice(0, 500),
        },
      });
      return {
        success: false as const,
        status: response.status,
        responseBody,
        error: `Webhook responded with ${response.status}`,
      };
    }

    log("INFO", "sendFormSubmittedWebhook.success", {
      referenceNumber,
      programmeCode,
      status: response.status,
      durationMs: Date.now() - actionStart,
    });

    return {
      success: true as const,
      status: response.status,
      responseBody,
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown webhook error";
    log("ERROR", "sendFormSubmittedWebhook.network_error", {
      referenceNumber,
      programmeCode,
      error: message,
      durationMs: Date.now() - actionStart,
    });
    Sentry.captureException(error, {
      extra: { referenceNumber, programmeCode },
    });
    return {
      success: false as const,
      error: message,
    };
  }
}
