# EZPay+ Payment Integration - Development Spike

## Overview

This is a development spike demonstrating EZPay+ payment gateway integration for the Alpha.Gov.bb platform. The implementation showcases a complete payment flow for a simple passport replacement form.

## Implementation Summary

### Architecture

**No Server-Side PII Storage**: Form data is stored exclusively in browser sessionStorage identified by UUID. The server only handles payment verification and email sending.

**Payment Flow**:
1. User fills out form → Form data saved to sessionStorage with UUID
2. User clicks "Pay & Submit" → Server initiates payment with EZPay
3. User redirected to EZPay gateway → Completes payment
4. EZPay redirects back to callback page → Server verifies payment
5. Client component retrieves form data from sessionStorage → Sends to server
6. Server sends email to ministry with form + payment confirmation
7. SessionStorage cleared, success message shown

### Files Created

#### Core EZPay Integration
- `src/lib/ezpay/types.ts` - TypeScript interfaces for EZPay API
- `src/lib/ezpay/client.ts` - Type-safe API client (initiate, verify)

#### Passport Replacement Form
- `src/components/forms/passport-replacement/`
  - `schema.ts` - Zod validation schema
  - `types.ts` - TypeScript types
  - `passport-replacement-form.tsx` - Single-step form component
  - `index.tsx` - Form page wrapper

#### Payment API Routes
- `src/app/api/payment/initiate-ezpay/route.ts` - Payment initiation
- `src/app/api/payment/confirm/route.ts` - Payment confirmation + email sending
- `src/app/payment/callback/page.tsx` - Payment callback page (server component)
- `src/app/payment/callback/payment-callback-handler.tsx` - Client component for sessionStorage interaction

#### Email Template
- `src/emails/passport-replacement-email.tsx` - Ministry notification with payment details

#### Configuration
- Updated `src/lib/form-registry.ts` - Registered new form
- Updated `.env.local.example` - Added EZPay environment variables

## Environment Variables Required

```env
# EZPay Configuration
EZPAY_API_KEY="your_api_key_here"
EZPAY_API_URL="https://test.ezpay.gov.bb"  # or https://ezpay.gov.bb for production
EZPAY_PASSPORT_CODE="PASSPORT001"  # Payment code from EZPay admin

# Email Configuration (existing)
PASSPORT_DEPARTMENT_EMAIL="immigration@gov.bb"
MAIL_FROM="noreply@gov.bb"
SES_REGION="us-east-1"
```

## Payment Flow Details

### 1. Form Submission (`passport-replacement-form.tsx`)
```typescript
// Generate UUID reference
const referenceNumber = `passport-${crypto.randomUUID()}`;

// Store form data in sessionStorage
sessionStorage.setItem(referenceNumber, JSON.stringify(formData));

// Initiate payment
const response = await fetch("/api/payment/initiate-ezpay", {
  method: "POST",
  body: JSON.stringify({ referenceNumber, amount, email, name }),
});

// Redirect to EZPay
window.location.href = paymentUrl;
```

### 2. Payment Initiation API (`/api/payment/initiate-ezpay/route.ts`)
```typescript
// Create cart item
const cartItem: EzPayCartItem = {
  code: "PASSPORT001",
  amount: 150.00,
  details: "Passport Replacement",
  reference: referenceNumber,
};

// Call EZPay API (IP-restricted)
const { token } = await initiatePayment({
  cartItems: [cartItem],
  email, name, referenceNumber,
});

// Return payment URL
return { paymentUrl: `${EZPAY_API_URL}/payment_page?token=${token}` };
```

### 3. Payment Callback (`/payment/callback/page.tsx`)
```typescript
// Verify payment with EZPay
const paymentStatus = await verifyPayment({ transactionNumber, reference });

// Render client component with payment status
return <PaymentCallbackHandler paymentStatus={paymentStatus} />;
```

### 4. Client-Side Confirmation (`payment-callback-handler.tsx`)
```typescript
// Retrieve form data from sessionStorage
const storedData = sessionStorage.getItem(referenceId);
const formData = JSON.parse(storedData);

// Send to server for email
await fetch("/api/payment/confirm", {
  method: "POST",
  body: JSON.stringify({ transactionId, referenceId, formData }),
});

// Clear sessionStorage
sessionStorage.removeItem(referenceId);
```

### 5. Email Sending (`/api/payment/confirm/route.ts`)
```typescript
// Verify payment again (don't trust client)
const paymentStatus = await verifyPayment({ transactionNumber, reference });

if (paymentStatus._status === "Success") {
  // Send email to ministry with form data + payment confirmation
  await sendEmail({
    to: "immigration@gov.bb",
    subject: "Passport Replacement Application - PAID",
    html: render(PassportReplacementEmail({ formData, transactionNumber, ... })),
  });
}
```

## Failure Handling

### Payment Failed
- User sees failure message with retry option
- Form data remains in sessionStorage
- Can retry payment without re-entering data

### SessionStorage Cleared
- User sees error message with transaction ID
- Instructions to contact support
- Payment was successful but application data lost

### Network Errors
- User sees error message
- Can retry submission
- Form data preserved in sessionStorage

### Async Payments (Direct Debit)
- Status shows "Initiated" instead of "Success"
- User informed of 5-day processing time
- Webhook handler (not implemented in spike) would send email when status changes

## Testing Notes

### Unit Tests
- Existing tests pass (361 tests in ~2s)
- Pre-existing test failures in birth registration (35 failures, unrelated to our changes)
- No tests written for passport form (acceptable for development spike)

### Manual Testing Required
- EZPay API requires IP whitelisting (won't work on localhost without configuration)
- Need test EZPay account credentials
- Test payment codes must be configured in EZPay admin panel
- AWS SES requires verified email addresses for testing

## Production Considerations

### Required Before Production
1. **IP Whitelisting**: Add AWS Amplify/Lambda IP to EZPay whitelist
2. **Payment Codes**: Configure real payment codes in EZPay admin
3. **Email Addresses**: Update department email addresses
4. **Error Monitoring**: Add Sentry/CloudWatch for payment failures
5. **Webhook Handler**: Implement `/api/webhooks/ezpay` for async payment updates
6. **Rate Limiting**: Add rate limiting to prevent abuse
7. **CSRF Protection**: Add CSRF tokens to form submissions
8. **Audit Logging**: Log all payment transactions
9. **Tests**: Write comprehensive tests for payment flow
10. **Content Page**: Create `/src/content/replace-a-passport.md` service information page

### Security Considerations
- **Never store PII** on server without encryption
- **Always verify** payment status with EZPay API (don't trust callback URL params)
- **Validate** all form data with Zod before sending emails
- **Sanitize** user input in emails to prevent XSS
- **Use HTTPS** everywhere (enforced by Next.js in production)
- **IP whitelist** EZPay API endpoint

### Known Limitations (Spike Only)
- No webhook handler for async payment updates (Direct Debit takes 5 days)
- No retry mechanism for email failures
- No payment transaction logging/audit trail
- No user receipt email (only ministry notification)
- SessionStorage data lost on browser close (acceptable for spike)
- No payment cancellation flow
- No refund handling

## API Documentation Reference

EZPay API documentation used:
- Payment initiation: `POST /ezpay_receivecart`
- Payment verification: `POST /check_api`
- Payment page URL: `GET /payment_page?token={token}`

Key API quirks:
- Uses form-data POST (not JSON)
- Cart items must be JSON stringified in `ez_cart_array` field
- Requires `EZPluginKey` header for authentication
- IP restricted (must whitelist server IP)
- Callback returns `tx` (transaction ID) and `rid` (reference ID) as URL params

## Next Steps

For production deployment:
1. Set up EZPay test account and obtain API credentials
2. Whitelist AWS Amplify IP address in EZPay admin
3. Create payment codes for all services in EZPay admin
4. Implement webhook handler for async payment updates
5. Add comprehensive error handling and monitoring
6. Write unit and integration tests for payment flow
7. Create user-facing content page explaining the service
8. Add audit logging for all payment transactions
9. Test thoroughly in staging environment
10. Create runbook for handling payment issues

## File Tree

```
src/
├── lib/
│   └── ezpay/
│       ├── types.ts          # EZPay API types
│       └── client.ts         # EZPay API client
├── components/
│   └── forms/
│       └── passport-replacement/
│           ├── index.tsx                        # Form page
│           ├── types.ts                         # Form types
│           ├── schema.ts                        # Zod validation
│           └── passport-replacement-form.tsx    # Form component
├── emails/
│   └── passport-replacement-email.tsx           # Email template
└── app/
    ├── api/
    │   └── payment/
    │       ├── initiate-ezpay/
    │       │   └── route.ts                     # Payment initiation
    │       └── confirm/
    │           └── route.ts                     # Payment confirmation + email
    └── payment/
        └── callback/
            ├── page.tsx                          # Callback page (server)
            └── payment-callback-handler.tsx      # Callback handler (client)
```

## Cost Estimate

Per transaction costs (estimated):
- EZPay gateway fee: ~2.5% + $0.50 BBD (varies by payment method)
- AWS SES: $0.10 per 1,000 emails (~$0.0001 per application)
- AWS Amplify hosting: Included in existing plan

For 1,000 passport applications/month:
- EZPay fees: ~$500 BBD (assuming $150 fee per passport)
- AWS costs: ~$0.10 (negligible)
- **Total: ~$500 BBD/month in payment processing fees**
