# Testing URL-in-Reference Encoding

This guide explains how to test the URL-in-reference encoding feature for EZPay payment callbacks.

## Overview

The system now encodes the return URL directly in the EZPay reference ID, eliminating the need for external redirect infrastructure. This allows callbacks to work seamlessly across multiple environments (localhost, staging, production, Vercel previews).

## How It Works

### 1. Payment Initiation
```
Client generates: passport-abc-123-def
Server encodes:   aHR0cDovL2xvY2FsaG9zdDozMDAw.passport-abc-123-def
                  ^                            ^
                  base64url(returnURL)         client's UUID
```

### 2. EZPay Callback
EZPay sends the encoded reference ID back in the callback URL:
```
http://staging.gov.bb/payment/callback?tx=TX123&rid=aHR0cDovL2xvY2FsaG9zdDozMDAw.passport-abc-123-def
```

### 3. Callback Handler
- Decodes the reference ID
- Extracts the return URL: `http://localhost:3000`
- Compares with current environment: `http://staging.gov.bb`
- Redirects to correct environment if needed:
  ```
  http://localhost:3000/payment/callback?tx=TX123&rid=aHR0cDovL2xvY2FsaG9zdDozMDAw.passport-abc-123-def
  ```

### 4. SessionStorage Lookup
- Extracts UUID: `passport-abc-123-def`
- Retrieves form data from `sessionStorage.getItem("passport-abc-123-def")`

## Manual Testing

### Test 1: Single Environment Flow (Localhost)

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to: http://localhost:3000/replace-a-passport/start

3. Fill out the form and submit

4. Check the reference ID format in the network tab (should see base64 format)

5. Complete mock payment

6. Verify callback returns to localhost

7. Check that success page displays correctly

**Expected Result**: Seamless flow with no redirects

### Test 2: Cross-Environment Redirect

This test simulates a callback arriving at the wrong environment.

1. Start localhost dev server:
   ```bash
   npm run dev
   ```

2. Fill out passport form and submit (don't complete payment yet)

3. Check the browser console for the encoded reference ID

4. Manually construct a callback URL as if coming from staging:
   ```
   http://localhost:3000/payment/callback?tx=mock-tx-123&rid=YOUR_ENCODED_REFERENCE_ID
   ```

5. The decoded URL should point to `localhost:3000` since that's where the form was submitted

**Expected Result**: No redirect (same environment)

### Test 3: Reference ID Encoding/Decoding

Run the test suite to verify encoding logic:

```bash
npm test -- reference-encoder.test.ts
```

**Expected Output**: 29/29 tests passing

Key tests:
- ✓ Generate encoded reference with UUID
- ✓ Decode reference to extract URL and UUID  
- ✓ Extract UUID for sessionStorage lookup
- ✓ Whitelist validation (only gov.bb, localhost, Vercel allowed)
- ✓ Security validation (reject malicious URLs)

### Test 4: SessionStorage Compatibility

1. Start dev server and open browser DevTools

2. Navigate to passport replacement form

3. Fill out and submit form

4. In DevTools Console, check sessionStorage:
   ```javascript
   // Should see entry with key like: passport-abc-123-def
   Object.keys(sessionStorage)
   ```

5. Complete payment (use mock mode)

6. Verify callback handler successfully retrieves the data

7. Check sessionStorage is cleared after success

**Expected Result**: Data stored with client UUID, retrieved using extracted UUID

## Testing with Mock Provider

Mock mode is enabled by default in development. To explicitly enable:

```bash
EZPAY_MOCK_MODE=true npm run dev
```

Mock provider:
- Returns predictable mock URLs
- Uses transaction IDs like `mock-tx-{timestamp}`
- Simulates successful payments
- No actual payment processing

## Testing with Real EZPay

⚠️ **Only test in staging/sandbox environment, not production!**

1. Set up EZPay credentials in `.env.local`:
   ```
   EZPAY_MOCK_MODE=false
   EZPAY_CLIENTID=your_sandbox_client_id
   EZPAY_CLIENTSECRET=your_sandbox_secret
   EZPAY_API_URL=https://sandbox.ezpay.com
   ```

2. Test the full flow with actual EZPay sandbox

3. Verify callbacks work correctly

## Verifying URL Encoding

To manually inspect encoded reference IDs:

```javascript
// In browser console or Node.js
const encoded = "aHR0cDovL2xvY2FsaG9zdDozMDAw.passport-abc-123";
const [urlPart, uuidPart] = encoded.split(".");

// Decode URL
const url = Buffer.from(urlPart, "base64").toString("utf-8");
console.log("URL:", url);  // http://localhost:3000

// Extract UUID
console.log("UUID:", uuidPart);  // passport-abc-123
```

## Troubleshooting

### Issue: Callback goes to wrong environment

**Symptom**: Payment completes but callback doesn't return to your dev environment

**Solution**: 
1. Check the decoded URL in the reference ID
2. Verify BASE_URL or VERCEL_URL environment variables
3. Make sure the redirect logic is working

### Issue: SessionStorage not found

**Symptom**: "Session data not found" error after payment

**Solution**:
1. Check browser console for the UUID being used for lookup
2. Verify `extractUuid()` is correctly parsing the reference ID
3. Check if sessionStorage was cleared by browser (e.g., incognito mode)

### Issue: Invalid reference ID format

**Symptom**: Decoding fails, null returned

**Solution**:
1. Check reference ID format (should contain a dot: `base64.uuid`)
2. Verify base64url encoding is correct (not base64)
3. Check whitelist allows the URL

## Security Notes

The decoder validates all URLs against a whitelist:
- ✅ `https://gov.bb`
- ✅ `https://staging.gov.bb`
- ✅ `https://alpha.gov.bb`
- ✅ `http://localhost:*`
- ✅ `http://127.0.0.1:*`
- ✅ `https://*.vercel.app`
- ❌ Any other domain

Attempting to decode a reference ID with an unlisted URL will fail safely, returning `null`.

## Next Steps

After testing:
1. Deploy to staging environment
2. Test cross-environment redirects (staging ↔ localhost)
3. Verify with Vercel preview deployments
4. Test production deployment (careful!)

## Support

If you encounter issues:
1. Check test output: `npm test -- payment`
2. Review logs in browser DevTools
3. Check server logs for decoding errors
4. Verify environment variables are set correctly
