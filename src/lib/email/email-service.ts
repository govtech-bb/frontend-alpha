/**
 * Centralized Email Service
 * Supports both AWS SES (production) and SMTP (local development)
 */

import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";
import { createTransport, type Transporter } from "nodemailer";
import { logDev, logError, logWarn } from "@/lib/logger";

interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
}

class EmailService {
  private isSmtpMode: boolean;
  private transporter?: Transporter;
  private sesClient?: SESv2Client;
  private mailFrom: string;
  private sesRegion: string;
  private configurationSet?: string;
  private tagKey?: string;
  private tagValue?: string;

  constructor() {
    // Check if SMTP mode is enabled
    this.isSmtpMode = !!process.env.SMTP_HOST;

    // Get common configuration
    this.mailFrom = process.env.MAIL_FROM || "";
    if (!this.mailFrom) {
      throw new Error("MAIL_FROM environment variable is required");
    }

    this.sesRegion = process.env.SES_REGION || "us-east-1";
    this.configurationSet = process.env.SES_CONFIGURATION_SET;
    this.tagKey = process.env.SES_TAG_KEY || "ses:configuration-set";
    this.tagValue = process.env.SES_TAG_VALUE || "prod";

    if (this.isSmtpMode) {
      this.initializeSmtp();
    } else {
      this.initializeSes();
    }
  }

  private initializeSmtp(): void {
    const smtpHost = process.env.SMTP_HOST!;
    const smtpPort = Number.parseInt(process.env.SMTP_PORT || "1025", 10);
    const smtpSecure = process.env.SMTP_SECURE === "true";
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    logDev(`[Email Service] Using SMTP mode: ${smtpHost}:${smtpPort}`);

    this.transporter = createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth:
        smtpUser && smtpPass
          ? {
              user: smtpUser,
              pass: smtpPass,
            }
          : undefined,
      // Disable some checks for local development
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  private initializeSes(): void {
    logDev(`[Email Service] Using AWS SES mode: ${this.sesRegion}`);

    this.sesClient = new SESv2Client({
      region: this.sesRegion,
    });
  }

  /**
   * Send an email using either SMTP or AWS SES
   */
  async send(options: EmailOptions): Promise<void> {
    const recipients = Array.isArray(options.to) ? options.to : [options.to];

    if (this.isSmtpMode) {
      await this.sendViaSmtp({
        ...options,
        to: recipients,
      });
    } else {
      await this.sendViaSes({
        ...options,
        to: recipients,
      });
    }
  }

  private async sendViaSmtp(options: {
    to: string[];
    subject: string;
    html: string;
  }): Promise<void> {
    if (!this.transporter) {
      throw new Error("SMTP transporter not initialized");
    }

    // Only log email details in development (contains PII)
    logDev(
      `[Email Service] Sending email via SMTP to: ${options.to.join(", ")}`
    );
    logDev(`[Email Service] Subject: ${options.subject}`);

    try {
      const info = await this.transporter.sendMail({
        from: this.mailFrom,
        to: options.to,
        subject: options.subject,
        html: options.html,
      });

      logDev(`[Email Service] Email sent successfully via SMTP`);
      logDev(`[Email Service] Message ID: ${info.messageId}`);

      // For MailHog/Mailpit, provide a link to view the email
      if (
        process.env.SMTP_HOST === "localhost" ||
        process.env.SMTP_HOST === "127.0.0.1"
      ) {
        const webPort = process.env.SMTP_WEB_PORT || "8025";
        logDev(`[Email Service] View email at: http://localhost:${webPort}`);
      }
    } catch (error) {
      logError("[Email Service] SMTP error", error);
      throw error;
    }
  }

  private async sendViaSes(options: {
    to: string[];
    subject: string;
    html: string;
  }): Promise<void> {
    if (!this.sesClient) {
      throw new Error("SES client not initialized");
    }

    const cmd = new SendEmailCommand({
      FromEmailAddress: this.mailFrom,
      Destination: { ToAddresses: options.to },
      ...(this.configurationSet && {
        ConfigurationSetName: this.configurationSet,
        EmailTags: [
          {
            Name: this.tagKey!,
            Value: this.tagValue!,
          },
        ],
      }),
      Content: {
        Simple: {
          Subject: { Data: options.subject },
          Body: { Html: { Data: options.html } },
        },
      },
    });

    await this.sesClient.send(cmd);
  }
}

// Create a singleton instance
let emailServiceInstance: EmailService | null = null;

/**
 * Get the email service instance
 * Creates a new instance if one doesn't exist
 */
export function getEmailService(): EmailService {
  if (!emailServiceInstance) {
    emailServiceInstance = new EmailService();
  }
  return emailServiceInstance;
}

/**
 * Send an email using the configured email service
 * This is the main function that should be used throughout the application
 */
export async function sendEmail(options: EmailOptions): Promise<void> {
  const service = getEmailService();
  await service.send(options);
}
