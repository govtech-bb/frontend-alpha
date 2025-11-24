# Testing Emails Locally with SMTP

## Overview

The application supports two email sending modes:
- **AWS SES** (production): Used when `SMTP_HOST` is not set
- **SMTP** (local development): Used when `SMTP_HOST` is set

This guide covers setting up SMTP for local email testing.

## Quick Start (Using MailHog)

MailHog is a local SMTP server with a web interface to view sent emails.

### 1. Start MailHog

Using Docker:
```bash
docker run -d -p 1025:1025 -p 8025:8025 mailhog/mailhog
```

Using Homebrew (macOS):
```bash
brew install mailhog
mailhog
```

### 2. Configure Environment

Add to `.env.local`:
```bash
SMTP_HOST="localhost"
SMTP_PORT="1025"
SMTP_SECURE="false"
SMTP_WEB_PORT="8025"
```

### 3. Start Application

```bash
npm run dev
```

You should see in the console:
```
[Email Service] Using SMTP mode: localhost:1025
```

### 4. Test Email Sending

Trigger any email-sending action (e.g., submit feedback form, complete passport application).

View the email at:
```
http://localhost:8025
```

## Alternative: Mailpit

Mailpit is a modern alternative to MailHog with a better UI.

### Start Mailpit

```bash
docker run -d -p 1025:1025 -p 8025:8025 axllent/mailpit
```

Configuration is the same as MailHog (uses same ports).

## Alternative: Mailtrap

Mailtrap is a cloud-based email testing service.

### 1. Sign up at mailtrap.io

### 2. Get SMTP credentials from your inbox

### 3. Configure Environment

Add to `.env.local`:
```bash
SMTP_HOST="sandbox.smtp.mailtrap.io"
SMTP_PORT="2525"
SMTP_SECURE="false"
SMTP_USER="your_username"
SMTP_PASS="your_password"
```

## Configuration Options

All SMTP environment variables:

```bash
# Required
SMTP_HOST=""              # SMTP server hostname

# Optional (with defaults)
SMTP_PORT="1025"          # SMTP port (1025, 587, 465, etc.)
SMTP_SECURE="false"       # "true" for 465, "false" for other ports
SMTP_USER=""              # Username (if authentication required)
SMTP_PASS=""              # Password (if authentication required)
SMTP_WEB_PORT="8025"      # Web interface port (for logging)
```

## Testing Different Forms

### 1. Feedback Form

1. Visit: `http://localhost:3000/feedback`
2. Fill out and submit
3. Check SMTP server for email

### 2. Birth Registration

1. Visit: `http://localhost:3000/family-birth-relationships/register-a-birth/start`
2. Complete the multi-step form
3. Submit
4. Check SMTP server for two emails (department + user receipt)

### 3. Passport Replacement (with Payment)

1. Add `EZPAY_MOCK_MODE="true"` to `.env.local`
2. Visit: `http://localhost:3000/travel-id-citizenship/replace-a-passport/start`
3. Fill out form and "Pay & Submit"
4. Click "Simulate Successful Payment"
5. Check SMTP server for ministry notification email

## Verifying SMTP is Active

Check the console logs when the application starts:

**SMTP Mode:**
```
[Email Service] Using SMTP mode: localhost:1025
```

**AWS SES Mode:**
```
[Email Service] Using AWS SES mode: us-east-1
```

## Email Sending Logs

When an email is sent via SMTP, you'll see:

```
[Email Service] Sending email via SMTP to: testing@govtech.bb
[Email Service] Subject: Passport Replacement Application - PAID
[Email Service] Email sent successfully via SMTP
[Email Service] Message ID: <abc123@localhost>
[Email Service] View email at: http://localhost:8025
```

## Troubleshooting

### "MAIL_FROM environment variable is required"

Add to `.env.local`:
```bash
MAIL_FROM="noreply@gov.bb"
```

### Connection refused to SMTP server

Make sure the SMTP server is running:
```bash
# Check if MailHog is running
docker ps | grep mailhog

# Or check the port
lsof -i :1025
```

### Emails not appearing in MailHog

1. Check console logs for email sending confirmation
2. Verify SMTP_HOST and SMTP_PORT are correct
3. Refresh the MailHog web interface
4. Check MailHog container logs: `docker logs <container_id>`

### "nodemailer is not defined" error

Make sure nodemailer is installed:
```bash
npm list nodemailer
```

If not found:
```bash
npm install nodemailer @types/nodemailer
```

## Switching Between SMTP and AWS SES

### Use SMTP (local testing)

`.env.local`:
```bash
SMTP_HOST="localhost"
```

### Use AWS SES (production)

`.env.local`:
```bash
# Remove or comment out SMTP_HOST
# SMTP_HOST=""

# Configure AWS SES
SES_REGION="us-east-1"
# AWS credentials are automatically handled by IAM roles in AWS Amplify
```

## Email Content Testing

### Test HTML Rendering

1. Send an email (any form)
2. Open MailHog web interface
3. Click on the email
4. Use the tabs to view:
   - **HTML**: Rendered email
   - **Source**: Raw HTML source
   - **Plain Text**: Text version

### Test React Email Templates

The application uses `@react-email/render` for email templates:

- **Birth Registration**: `src/emails/department-notification-email.tsx`, `user-receipt-email.tsx`
- **Passport Replacement**: `src/emails/passport-replacement-email.tsx`
- **Feedback**: Inline HTML in route handler

## Production Deployment

**Important**: Do NOT set `SMTP_HOST` in production environment variables.

Production should use AWS SES:
- No `SMTP_HOST` variable
- AWS IAM roles automatically provide SES credentials
- Emails sent via SES client

## Advanced: Custom SMTP Server

To use a different SMTP server:

```bash
SMTP_HOST="smtp.example.com"
SMTP_PORT="587"
SMTP_SECURE="false"
SMTP_USER="username@example.com"
SMTP_PASS="your-password"
```

## Summary

**For local development:**
1. Run MailHog: `docker run -d -p 1025:1025 -p 8025:8025 mailhog/mailhog`
2. Set `SMTP_HOST="localhost"` in `.env.local`
3. View emails at: `http://localhost:8025`

**For production:**
- Remove `SMTP_HOST` from environment variables
- AWS SES automatically used
- Emails sent to real recipients
