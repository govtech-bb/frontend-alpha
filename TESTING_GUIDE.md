# Testing Guide: EZPay Integration

## Quick Start - Local Testing (Mock Mode)

The easiest way to test the complete payment flow without EZPay credentials.

### Step 1: Enable Mock Mode

Add to your `.env.local`:
```bash
EZPAY_MOCK_MODE="true"
```

### Step 2: Start Development Server

```bash
npm run dev
```

### Step 3: Test the Flow

1. **Navigate to the form:**
   ```
   http://localhost:3000/travel-id-citizenship/replace-a-passport/start
   ```

2. **Fill out the form:**
   - Full Name: `John Smith`
   - Email: `john.smith@example.com`
   - Phone: `246-123-4567`
   - Passport Number: `BRB123456`
   - Reason: Select any option
   - Delivery Address: `123 Main Street, Bridgetown`
   - Parish: Select any option

3. **Click "Pay & Submit"**
   - Form will validate
   - You'll be redirected to `/payment/mock` (mock payment gateway)

4. **On the mock payment page:**
   - Click "Simulate Successful Payment" to test success flow
   - OR click "Simulate Failed Payment" to test failure flow

5. **Verify the results:**
   - **Success**: Check server console for email sending log
   - **Success**: SessionStorage should be cleared
   - **Failure**: Error message shown, can retry payment
   - **Failure**: Form data still in sessionStorage

### Step 4: Check Browser DevTools

**SessionStorage (before payment):**
1. Open DevTools (F12)
2. Go to Application → Storage → Session Storage
3. Look for key like `passport-550e8400-...`
4. See your form data stored as JSON

**SessionStorage (after successful payment):**
- The key should be deleted

**Network Tab:**
- Watch API calls to `/api/payment/initiate-ezpay`
- Watch API calls to `/api/payment/confirm`

## Testing Different Scenarios

### Test Case 1: Successful Payment
```
1. Fill out form correctly
2. Click "Pay & Submit"
3. Click "Simulate Successful Payment"
4. ✅ Should see success message with transaction details
5. ✅ Email should be logged in server console
6. ✅ SessionStorage should be cleared
```

### Test Case 2: Failed Payment
```
1. Fill out form correctly
2. Click "Pay & Submit"
3. Click "Simulate Failed Payment"
4. ✅ Should see failure message
5. ✅ "Return to Application" link visible
6. ✅ SessionStorage NOT cleared (data preserved for retry)
```

### Test Case 3: Form Validation
```
1. Click "Pay & Submit" without filling form
2. ✅ Should see validation errors
3. ✅ Error summary at top of page
4. ✅ Individual field errors shown
5. Fill in one field at a time
6. ✅ Errors clear as you type
```

### Test Case 4: SessionStorage Persistence
```
1. Fill out form partially
2. Wait 2-3 seconds (debounced save)
3. Refresh page
4. ✅ Form should be empty (sessionStorage only saves with UUID after submit)
   Note: The passport form doesn't auto-save like birth registration
```

### Test Case 5: Browser Back Button
```
1. Complete successful payment
2. Press browser back button
3. ✅ Should see success page (or handle gracefully)
4. SessionStorage already cleared, no retry possible
```

## Testing with Real EZPay (Staging)

### Prerequisites

You'll need from EZPay administrator:
1. Test API key
2. Your server IP whitelisted
3. Test payment codes
4. Test account credentials

### Configuration

Update `.env.local`:
```bash
# Disable mock mode
EZPAY_MOCK_MODE="false"

# Add real credentials
EZPAY_API_KEY="your_test_api_key_here"
EZPAY_API_URL="https://test.ezpay.gov.bb"
EZPAY_PASSPORT_CODE="PASSPORT_TEST_001"
```

### Deployment to Staging

Since EZPay is IP-restricted, you'll need to deploy to a staging environment:

1. **Deploy to AWS Amplify staging branch**
2. **Get the outbound IP address** of your Amplify environment
3. **Request IP whitelisting** from EZPay administrator
4. **Set environment variables** in Amplify console

### Test with Real Payment Methods

⚠️ **Warning**: Even in test mode, EZPay may process real transactions. Confirm with EZPay if test mode uses real or fake payment processing.

```
1. Navigate to https://staging.alpha.gov.bb/replace-a-passport/start
2. Fill out form with real test data
3. Click "Pay & Submit"
4. Redirected to real EZPay gateway
5. Select payment method:
   - Credit Card (immediate)
   - Debit Card (immediate)
   - Direct Debit (5 days)
   - Payce Digital (immediate)
6. Complete payment
7. Redirected back to callback
8. Verify email sent to ministry
```

## Debugging Tips

### Check Server Logs

```bash
# In development, watch the terminal where npm run dev is running
# Look for:
- "EZPay environment variables not configured" (if mock mode disabled but no credentials)
- Email sending logs from AWS SES
- Any error messages from payment APIs
```

### Check Network Requests

In browser DevTools → Network tab:

1. **POST /api/payment/initiate-ezpay**
   - Should return `{ paymentUrl, token, referenceNumber }`
   - Mock mode: paymentUrl = `/payment/mock?token=...`
   - Real mode: paymentUrl = `https://test.ezpay.gov.bb/payment_page?token=...`

2. **POST /api/payment/confirm**
   - Should return `{ message, transactionNumber }`
   - Only called after successful payment

### Common Issues

**Issue**: "EZPay initiation failed: 403"
- **Cause**: IP not whitelisted
- **Fix**: Contact EZPay admin to whitelist your IP

**Issue**: "EZPay initiation failed: 401"
- **Cause**: Invalid API key
- **Fix**: Check EZPAY_API_KEY in .env.local

**Issue**: Email not sending
- **Cause**: AWS SES not configured or email not verified
- **Fix**: Verify sender email in AWS SES console

**Issue**: SessionStorage cleared too early
- **Cause**: Callback triggered before client component loads
- **Fix**: This shouldn't happen, but check browser console for errors

**Issue**: Form data lost after payment
- **Cause**: User cleared sessionStorage or used different browser
- **Fix**: This is expected behavior - inform user payment succeeded but to contact support

## Manual Testing Checklist

Before deploying to production:

### Functional Tests
- [ ] Form validation works for all fields
- [ ] Required fields cannot be skipped
- [ ] Phone number validation accepts valid formats
- [ ] Passport number accepts only alphanumeric
- [ ] All parishes appear in dropdown
- [ ] All replacement reasons appear in dropdown
- [ ] Form submits successfully in mock mode
- [ ] Payment success flow works in mock mode
- [ ] Payment failure flow works in mock mode
- [ ] Success flow with real EZPay (staging)
- [ ] Failure flow with real EZPay (staging)
- [ ] Direct Debit async payment handling

### Email Tests
- [ ] Email sent to correct ministry address
- [ ] Email contains all form data
- [ ] Email contains payment confirmation
- [ ] Email contains transaction ID
- [ ] Email formatting looks correct
- [ ] No sensitive data exposed in email

### Security Tests
- [ ] Form data not visible in server logs
- [ ] Payment verification happens server-side
- [ ] Cannot fake payment by manipulating URL
- [ ] SessionStorage data expires appropriately
- [ ] XSS protection in form inputs
- [ ] CSRF protection on API endpoints

### UX Tests
- [ ] Loading states shown during submission
- [ ] Error messages are user-friendly
- [ ] Success message is clear
- [ ] Transaction ID displayed prominently
- [ ] Back button behavior is reasonable
- [ ] Mobile responsive design works
- [ ] Accessibility (keyboard navigation)
- [ ] Screen reader compatibility

### Browser Compatibility
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

## Automated Testing (Future)

For production, consider adding:

### Unit Tests
```typescript
// test: Form validation
describe('PassportReplacementForm validation', () => {
  it('should require all fields', () => {
    // Test Zod schema
  });
});

// test: EZPay client
describe('EZPay client', () => {
  it('should format cart items correctly', () => {
    // Test API payload structure
  });
});
```

### Integration Tests
```typescript
// test: Payment flow
describe('Payment flow', () => {
  it('should complete successful payment', async () => {
    // Fill form → Submit → Mock success → Verify email
  });
});
```

### E2E Tests (Playwright)
```typescript
// test: Full user journey
test('passport replacement flow', async ({ page }) => {
  await page.goto('/replace-a-passport/start');
  await page.fill('[name="fullName"]', 'John Smith');
  // ... fill form
  await page.click('[type="submit"]');
  await page.click('text=Simulate Successful Payment');
  await expect(page.locator('text=Application Submitted')).toBeVisible();
});
```

## Performance Testing

For production readiness:

1. **Load Testing**: Test with 100+ concurrent submissions
2. **Email Rate Limits**: AWS SES has sending limits
3. **Payment Gateway Limits**: Check EZPay rate limits
4. **SessionStorage Size**: Each form is ~1KB, browsers typically allow 5-10MB

## Monitoring in Production

Set up alerts for:
- Payment initiation failures
- Payment verification failures
- Email sending failures
- SessionStorage quota exceeded errors
- High error rates on callback page

## Support Runbook

When users report payment issues:

1. **Get transaction ID** from user
2. **Check EZPay admin panel** for transaction status
3. **Check server logs** for email sending confirmation
4. **Check AWS SES** for email delivery status
5. **If payment succeeded** but email failed: Manually send confirmation
6. **If payment failed**: Refund if charged, ask user to retry

