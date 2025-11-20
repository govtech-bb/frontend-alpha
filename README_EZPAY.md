# EZPay Integration - Development Spike

## What Was Built

A complete passport replacement form with EZPay payment gateway integration, demonstrating:

- ✅ Single-step form with validation
- ✅ Payment initiation with EZPay API
- ✅ Redirect to payment gateway (real or mock)
- ✅ Payment callback with verification  
- ✅ Email notification to ministry
- ✅ No server-side PII storage (sessionStorage only)
- ✅ Graceful failure handling

## Quick Test (2 minutes)

1. Add to `.env.local`:
   ```bash
   EZPAY_MOCK_MODE="true"
   ```

2. Start server:
   ```bash
   npm run dev
   ```

3. Visit:
   ```
   http://localhost:3000/travel-id-citizenship/replace-a-passport/start
   ```

4. Fill out form and click "Pay & Submit"

5. Click "Simulate Successful Payment" on mock page

6. See success confirmation!

## Files Created

**Core Integration (4 files)**
- `src/lib/ezpay/types.ts` - TypeScript types
- `src/lib/ezpay/client.ts` - API client (real + mock)
- `src/lib/ezpay/mock-client.ts` - Mock implementation

**Form (4 files)**
- `src/components/forms/passport-replacement/schema.ts` - Zod validation
- `src/components/forms/passport-replacement/types.ts` - TypeScript types
- `src/components/forms/passport-replacement/passport-replacement-form.tsx` - Main form
- `src/components/forms/passport-replacement/index.tsx` - Export wrapper

**API Routes (2 files)**
- `src/app/api/payment/initiate-ezpay/route.ts` - Start payment
- `src/app/api/payment/confirm/route.ts` - Verify & send email

**Pages (3 files)**
- `src/app/payment/callback/page.tsx` - Server component for callback
- `src/app/payment/callback/payment-callback-handler.tsx` - Client component
- `src/app/payment/mock/page.tsx` - Mock payment gateway for testing

**Email (1 file)**
- `src/emails/passport-replacement-email.tsx` - Ministry notification

**Content (2 files)**
- `src/content/replace-a-passport/index.md` - Service information
- `src/content/replace-a-passport/start.md` - Application start page

**Config**
- Updated `src/lib/form-registry.ts`
- Updated `src/data/content-directory.ts`  
- Updated `.env.local.example`

**Total: 18 files created/modified**

## Architecture Highlights

### Payment Flow
```
User fills form
  ↓
SessionStorage saves with UUID
  ↓
POST /api/payment/initiate-ezpay
  ↓
Redirect to EZPay (or mock)
  ↓
User completes payment
  ↓
Redirect to /payment/callback
  ↓
Verify payment with EZPay API
  ↓
Retrieve form data from sessionStorage
  ↓
POST /api/payment/confirm
  ↓
Send email to ministry
  ↓
Clear sessionStorage
  ↓
Show success page
```

### Mock Mode

Set `EZPAY_MOCK_MODE=true` to use the mock payment gateway:
- No real API calls
- Instant "payment" processing
- Simulates success/failure scenarios
- Perfect for local development

### No PII on Server

- Form data stored in browser sessionStorage only
- Identified by UUID generated on submit
- Retrieved on callback, sent via email, then deleted
- Server never persists PII to database

## Production Readiness

**Before deploying:**

1. Get EZPay credentials from payment gateway administrator
2. Whitelist AWS Amplify IP address
3. Configure payment codes in EZPay admin
4. Set `EZPAY_MOCK_MODE=false`
5. Add real API credentials to environment variables
6. Implement webhook handler for async payments
7. Add comprehensive tests
8. Set up error monitoring

## Documentation

- `EZPAY_INTEGRATION_SUMMARY.md` - Complete technical documentation
- `TESTING_GUIDE.md` - Comprehensive testing scenarios
- `HOW_TO_TEST.md` - Quick start testing guide (this file)

## Support

For questions or issues, check the documentation or contact the development team.

---

**Status**: Development spike complete ✅  
**Next Step**: Review with stakeholders, then production deployment

---

## Update: SMTP Email Testing (Nov 20, 2024)

### Local Email Testing Now Available

You can now test emails locally without AWS SES credentials using SMTP!

**Quick Setup:**

1. Start MailHog:
   ```bash
   docker run -d -p 1025:1025 -p 8025:8025 mailhog/mailhog
   ```

2. Add to `.env.local`:
   ```bash
   SMTP_HOST="localhost"
   ```

3. View emails at: http://localhost:8025

**See `TESTING_EMAILS.md` for complete guide**

### Email Service Architecture

The application now uses a centralized email service (`src/lib/email/email-service.ts`) that automatically switches between:

- **SMTP** (when `SMTP_HOST` is set) - For local development
- **AWS SES** (when `SMTP_HOST` is not set) - For production

No code changes needed - just set the environment variable!

