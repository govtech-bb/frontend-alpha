import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";
import type { FormConfig } from "@/config/forms";

// Get environment variables
const region = process.env.SES_REGION ?? "us-east-1";

// Optional CloudWatch telemetry configuration
const configurationSet = process.env.SES_CONFIGURATION_SET;
const tagKey = process.env.SES_TAG_KEY ?? "ses:configuration-set";
const tagValue = process.env.SES_TAG_VALUE ?? "prod";

// Create AWS SES v2 client (lazily initialized)
let sesClient: SESv2Client | null = null;

function getSESClient(): SESv2Client {
  if (!sesClient) {
    sesClient = new SESv2Client({ region });
  }
  return sesClient;
}

/**
 * Format a field value for display in email
 */
function formatFieldValue(value: unknown): string {
  if (value === null || value === undefined || value === "") {
    return '<em style="color: #999;">Not provided</em>';
  }

  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  if (typeof value === "object") {
    return `<pre style="background: #f5f5f5; padding: 10px; border-radius: 4px;">${JSON.stringify(value, null, 2)}</pre>`;
  }

  // Escape HTML and preserve line breaks
  const escaped = String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

  return escaped.replace(/\n/g, "<br>");
}

/**
 * Convert camelCase or snake_case to Title Case
 */
function formatFieldLabel(key: string): string {
  return key
    .replace(/([A-Z])/g, " $1") // Add space before capitals
    .replace(/[_-]/g, " ") // Replace underscores and hyphens with spaces
    .trim()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

/**
 * Generate HTML email body for form submission
 */
function generateFormEmailHTML(
  formConfig: FormConfig,
  formData: Record<string, unknown>
): string {
  const fields = Object.entries(formData)
    .map(([key, value]) => {
      const label = formatFieldLabel(key);
      const formattedValue = formatFieldValue(value);

      return `
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #374151; vertical-align: top;">
            ${label}
          </td>
          <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; color: #111827;">
            ${formattedValue}
          </td>
        </tr>
      `;
    })
    .join("");

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${formConfig.name}</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f9fafb;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; padding: 20px 0;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); overflow: hidden;">
              <!-- Header -->
              <tr>
                <td style="background-color: #1e3a8a; padding: 30px; text-align: center;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">
                    ${formConfig.name}
                  </h1>
                  <p style="margin: 8px 0 0 0; color: #bfdbfe; font-size: 14px;">
                    ${formConfig.department}
                  </p>
                </td>
              </tr>

              <!-- Content -->
              <tr>
                <td style="padding: 30px;">
                  <p style="margin: 0 0 20px 0; color: #6b7280; font-size: 14px;">
                    A new form submission has been received from the Government of Barbados online services portal.
                  </p>

                  <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; border: 1px solid #e5e7eb; border-radius: 6px; overflow: hidden;">
                    ${fields}
                  </table>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background-color: #f9fafb; padding: 20px 30px; border-top: 1px solid #e5e7eb;">
                  <p style="margin: 0; color: #6b7280; font-size: 12px; text-align: center;">
                    Sent from Government of Barbados Online Services
                    <br>
                    <a href="https://alpha.gov.bb" style="color: #2563eb; text-decoration: none;">alpha.gov.bb</a>
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

/**
 * Send form submission email via AWS SES
 */
export async function sendFormSubmissionEmail(
  formConfig: FormConfig,
  formData: Record<string, unknown>
): Promise<void> {
  const mailFrom = process.env.MAIL_FROM;
  if (!mailFrom) {
    throw new Error("MAIL_FROM environment variable is required");
  }

  const subject = `New ${formConfig.name} Submission`;
  const html = generateFormEmailHTML(formConfig, formData);

  const cmd = new SendEmailCommand({
    FromEmailAddress: mailFrom,
    Destination: { ToAddresses: [formConfig.recipientEmail] },
    ...(configurationSet && {
      ConfigurationSetName: configurationSet,
      EmailTags: [
        {
          Name: tagKey,
          Value: tagValue,
        },
      ],
    }),
    Content: {
      Simple: {
        Subject: { Data: subject },
        Body: { Html: { Data: html } },
      },
    },
  });

  await getSESClient().send(cmd);
}
