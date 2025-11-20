# EZPay Reference Number Format Testing

This script tests what formats the `ez_reference_number` field accepts in the EZPay API.

## What It Tests

The script tests **10 different reference number formats**:

1. **UUID v4** - Current implementation (e.g., `550e8400-e29b-41d4-a716-446655440000`)
2. **Integer string** - Pure numbers (e.g., `123456789`)
3. **Timestamp integer** - Unix timestamp (e.g., `1731564890123`)
4. **Base64 encoded UUID** - Binary-safe encoding
5. **Base64 URL-safe** - No `+` or `/` characters
6. **Alphanumeric with hyphens** - Custom format (e.g., `REF-1731564890-abc123`)
7. **Short alphanumeric** - 13 random characters
8. **Long alphanumeric** - 50 random characters
9. **Special characters** - Underscores and hash symbols
10. **Very short** - Only 5 characters

## How to Run

### Prerequisites

- Node.js 18+ (for native `fetch` support)
- `.env.local` file with EZPay credentials

### Step 1: Run the Test

**Option A: Using export command (recommended)**

```bash
export $(cat .env.local | grep -v '^#' | xargs) && node scripts/test-ezpay-reference-formats.mjs
```

**Option B: Set variables inline**

```bash
EZPAY_API_URL="https://test.ezpay.gov.bb" \
EZPAY_API_KEY="your-api-key" \
EZPAY_PASSPORT_CODE="your-payment-code" \
node scripts/test-ezpay-reference-formats.mjs
```

## Required Environment Variables

The script needs these variables from `.env.local`:

- `EZPAY_API_URL` - EZPay API base URL
- `EZPAY_API_KEY` - Your EZPay API key
- `EZPAY_PAYMENT_CODE` - A valid payment code from EZPay admin

## What the Script Does

1. **Tests each format** by making a real API call to `/ezpay_receivecart`
2. **Uses minimal amount** ($1.00 BBD) for testing
3. **Adds delays** (1 second between requests) to avoid rate limiting
4. **Logs detailed results** for each test case
5. **Provides summary table** showing success/failure
6. **Exits with code**:
   - `0` if all tests pass
   - `1` if any test fails

## Example Output

```
================================================================================
EZPay Reference Number Format Testing
================================================================================
API URL: https://ezpay-api.example.com
Payment Code: TEST001
Total Tests: 10
================================================================================

🧪 Testing: UUID v4 (current implementation)
   Value: 550e8400-e29b-41d4-a716-446655440000
   Length: 36 characters
   ✅ SUCCESS - Status: 200
   Response: {
     "token": "abc123def456"
   }

...

================================================================================
TEST SUMMARY
================================================================================

✅ Successful: 8/10
   • UUID v4 (current implementation)
   • Integer as string
   • Large integer as string
   ...

❌ Failed: 2/10
   • With special characters
   • Very short (5 chars)

================================================================================
RECOMMENDATIONS
================================================================================

⚠️  Some formats work, others don't. Accepted formats:
   • UUID v4 (current implementation)
     Example: 550e8400-e29b-41d4-a716-446655440000
     Length: 36 chars
   ...
```

## Interpreting Results

### All Tests Pass ✅
EZPay accepts all reference formats - you have flexibility to choose any format.

### Some Tests Pass ⚠️
EZPay has restrictions. The output will show which formats work and which don't.

### All Tests Fail ❌
Likely a configuration issue:
- Check API credentials
- Verify API URL is accessible
- Ensure payment code exists in EZPay admin panel

## Safety Notes

- **Test amounts**: Uses $1.00 BBD per test (total: $10.00 if all succeed)
- **Rate limiting**: 1-second delay between requests
- **Test email**: Uses `test@example.com` (not a real email)
- **Unique references**: Each test uses a different reference number

## Next Steps

After running the test:

1. **Review the recommendations** in the output
2. **Choose the best format** based on your needs:
   - UUID v4: Best for global uniqueness
   - Timestamp + random: Shorter, sortable by time
   - Integer: Simplest, but requires sequence management
3. **Update your code** if you want to change from UUID format
4. **Document the constraints** for your team

## Troubleshooting

### Error: "EZPAY_API_URL not configured"
```bash
# Make sure to source the .env.local file first
source .env.local
echo $EZPAY_API_URL  # Should print the URL
```

### Error: "fetch is not defined"
Your Node.js version is too old. Upgrade to Node.js 18+:
```bash
node --version  # Should be v18.0.0 or higher
```

### Connection Errors
- Check if the API URL is accessible from your network
- Verify API credentials are correct
- Try testing one format manually with curl

## Files Modified

- `scripts/test-ezpay-reference-formats.mjs` - The test script
- `scripts/README_EZPAY_TEST.md` - This documentation
