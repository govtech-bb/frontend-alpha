# Payment Service Architecture

## Overview

The payment system uses a provider abstraction pattern to support multiple payment gateways. Currently supports EZPay+ with a mock provider for development.

## Architecture

```
┌─────────────────┐
│   React Forms   │
└────────┬────────┘
         │
         v
┌─────────────────────────┐
│  API Route: /initiate   │  ← Provider-agnostic
└────────┬────────────────┘
         │
         v
┌────────────────────────┐
│  PaymentProvider       │  ← Interface
│  Interface             │
└────────┬───────────────┘
         │
    ┌────┴────┐
    v         v
┌──────┐  ┌──────────┐
│EZPay │  │   Mock   │
└──────┘  └──────────┘
```

## Directory Structure

```
src/lib/payment/
├── index.ts                    # Factory & exports
├── types.ts                    # Core interfaces
├── config.ts                   # Service configuration
├── providers/
│   ├── ezpay-provider.ts       # EZPay implementation
│   └── mock-provider.ts        # Mock implementation
└── __tests__/
    ├── config.test.ts
    ├── providers.test.ts
    └── factory.test.ts
```

## Key Components

### 1. PaymentProvider Interface

All payment providers must implement:

```typescript
interface PaymentProvider {
  readonly name: string;
  initiatePayment(request: PaymentInitiationRequest): Promise<PaymentInitiationResult>;
  verifyPayment(request: PaymentVerificationRequest): Promise<PaymentVerificationResult>;
}
```

### 2. Configuration System

Single source of truth for all payment services:

```typescript
// src/lib/payment/config.ts
export const PAYMENT_CONFIGS = {
  'passport-replacement': {
    code: 'PASSPORT001',
    amount: 150.00,
    description: 'Passport Replacement',
    requiresVerification: true,
  },
  // Add more services here
};
```

### 3. Provider Factory

Automatically selects the correct provider based on environment:

```typescript
export function getPaymentProvider(): PaymentProvider {
  const isMockMode = process.env.EZPAY_MOCK_MODE === 'true';
  return isMockMode ? new MockPaymentProvider() : new EzPayProvider();
}
```

## Payment Flow

### Initiation

1. User submits form with payment
2. Client generates UUID reference number
3. Form data stored in sessionStorage
4. Client calls `/api/payment/initiate` with:
   - `referenceNumber` (UUID)
   - `serviceType` (e.g., 'passport-replacement')
   - `email`
   - `name`
5. Server looks up amount/description from config
6. Provider initiates payment
7. User redirected to payment gateway

### Verification

1. User completes payment at gateway
2. Gateway redirects to `/payment/callback?tx=...&rid=...`
3. Server verifies payment with provider
4. Client retrieves form data from sessionStorage
5. Client calls `/api/payment/confirm`
6. Server re-verifies payment
7. Email sent to department
8. SessionStorage cleared

## Security Features

### Server-Side Amount Enforcement

**Critical:** Payment amounts are NEVER accepted from the client.

```typescript
// ❌ OLD (INSECURE)
const { amount } = await request.json();
// Client could send any amount!

// ✅ NEW (SECURE)
const config = getPaymentConfig(serviceType);
const amount = config.amount;
// Amount comes from server config only
```

### Service Type Validation

```typescript
if (!isValidServiceType(serviceType)) {
  return NextResponse.json(
    { message: 'Invalid service type' },
    { status: 400 }
  );
}
```

### Payment Verification

All payments verified server-side before processing:

```typescript
const provider = getPaymentProvider();
const result = await provider.verifyPayment({
  transactionId,
  referenceId,
});

if (!result.success) {
  // Reject the payment
}
```

## Adding a New Service

1. Add configuration to `src/lib/payment/config.ts`:

```typescript
export const PAYMENT_CONFIGS = {
  'passport-replacement': { /* ... */ },
  'birth-certificate': {
    code: process.env.EZPAY_BIRTH_CERT_CODE || 'BIRTH001',
    amount: 25.00,
    description: 'Birth Certificate Copy',
    requiresVerification: true,
  },
};
```

2. Add environment variable to `.env.local.example`:

```bash
EZPAY_BIRTH_CERT_CODE="BIRTH001"
```

3. Update form to use `serviceType: 'birth-certificate'`

That's it! The payment system will automatically handle the new service.

## Adding a New Payment Provider

To add support for Stripe or another gateway:

1. Create provider class implementing `PaymentProvider`:

```typescript
// src/lib/payment/providers/stripe-provider.ts
export class StripeProvider implements PaymentProvider {
  readonly name = 'Stripe';

  async initiatePayment(request: PaymentInitiationRequest) {
    // Stripe-specific implementation
  }

  async verifyPayment(request: PaymentVerificationRequest) {
    // Stripe-specific implementation
  }
}
```

2. Update factory in `src/lib/payment/index.ts`:

```typescript
export function getPaymentProvider(): PaymentProvider {
  const provider = process.env.PAYMENT_PROVIDER || 'ezpay';
  
  switch (provider) {
    case 'stripe':
      return new StripeProvider();
    case 'mock':
      return new MockPaymentProvider();
    default:
      return new EzPayProvider();
  }
}
```

3. Add environment variable:

```bash
PAYMENT_PROVIDER="stripe"
```

## Testing

### Unit Tests

Run payment system unit tests:

```bash
npm test src/lib/payment/__tests__
```

Tests cover:
- Configuration validation
- Provider factory selection
- Mock provider behavior

### Integration Tests

Run payment flow integration tests:

```bash
npm test tests/integration/payment-flow.test.ts
```

Tests cover:
- Full payment flow
- Security validation
- Error handling

### Manual Testing with Mock Mode

1. Set environment variable:

```bash
EZPAY_MOCK_MODE=true
```

2. Navigate to passport replacement form
3. Complete form and click "Pay & Submit"
4. You'll be redirected to `/payment/mock`
5. Click "Simulate Successful Payment" or "Simulate Failed Payment"
6. Test the full flow without real API calls

## Environment Variables

### Required for Production

```bash
# EZPay Configuration
EZPAY_API_KEY="your_api_key_here"
EZPAY_API_URL="https://ezpay.gov.bb"
EZPAY_PASSPORT_CODE="PASSPORT001"

# Email Configuration
PASSPORT_DEPARTMENT_EMAIL="immigration@gov.bb"
MAIL_FROM="noreply@gov.bb"
SES_REGION="us-east-1"
```

### Optional for Development

```bash
# Mock Mode (no real API calls)
EZPAY_MOCK_MODE="true"

# SMTP for local email testing
SMTP_HOST="localhost"
SMTP_PORT="1025"
```

## API Reference

### POST /api/payment/initiate

Initiates a payment with the configured payment gateway.

**Request:**
```json
{
  "referenceNumber": "passport-abc123",
  "serviceType": "passport-replacement",
  "email": "user@example.com",
  "name": "John Doe"
}
```

**Response:**
```json
{
  "paymentUrl": "https://ezpay.gov.bb/payment_page?token=...",
  "referenceNumber": "passport-abc123"
}
```

**Security:** Amount and description are determined server-side based on `serviceType`.

### POST /api/payment/confirm

Confirms payment and sends notification emails.

**Request:**
```json
{
  "transactionId": "TX-12345",
  "referenceId": "passport-abc123",
  "formData": { /* form fields */ }
}
```

**Response:**
```json
{
  "message": "Payment confirmed and notification sent",
  "transactionNumber": "TX-12345"
}
```

**Security:** Payment is re-verified with the gateway before processing.

## Breaking Changes from Previous Implementation

### API Endpoints

- `/api/payment/initiate-ezpay` → `/api/payment/initiate`

### Request Payload

**OLD:**
```json
{
  "referenceNumber": "...",
  "amount": 150.00,           // ❌ Removed (security risk)
  "description": "...",       // ❌ Removed (not needed)
  "email": "...",
  "name": "..."
}
```

**NEW:**
```json
{
  "referenceNumber": "...",
  "serviceType": "passport-replacement",  // ✅ Added
  "email": "...",
  "name": "..."
}
```

### Forms

Forms must:
1. Import `getPaymentConfig` from `@/lib/payment`
2. Remove hardcoded fee constants
3. Call `/api/payment/initiate` (not `initiate-ezpay`)
4. Include `serviceType` in request

## Troubleshooting

### Payment initiation fails with "Invalid service type"

**Cause:** Service type not configured in `PAYMENT_CONFIGS`.

**Solution:** Add the service type to `src/lib/payment/config.ts`.

### Payment verification fails

**Cause:** Transaction ID or reference ID mismatch.

**Solution:** Check that the callback URL parameters match the initiated payment.

### Mock mode not working

**Cause:** `EZPAY_MOCK_MODE` environment variable not set.

**Solution:** Set `EZPAY_MOCK_MODE=true` in `.env.local`.

### Email not sending

**Cause:** Email configuration not set.

**Solution:** Check `SMTP_HOST` or AWS SES configuration in environment variables.

## Future Enhancements

### Planned Features

1. **Webhook Handler** for async payment updates (Direct Debit)
2. **Payment History Tracking** (when database available)
3. **User Receipt Emails** (currently only department notifications)
4. **Refund Support** for payment cancellations
5. **React Hooks** for reusable payment flows

### Adding a Webhook Handler

```typescript
// src/app/api/webhooks/payment/route.ts
export async function POST(request: NextRequest) {
  // Verify webhook signature
  // Update payment status
  // Send notifications if status changed
}
```

## Support

For questions or issues:

1. Check this documentation
2. Review the code in `src/lib/payment/`
3. Run the test suite
4. Check environment variables

## License

Internal use only - Government of Barbados
