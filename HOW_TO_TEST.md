# Quick Start: Testing EZPay Integration

## Setup (30 seconds)

1. **Add to `.env.local`:**
```bash
# Mock payment gateway
EZPAY_MOCK_MODE="true"

# Mock email sending (optional but recommended)
SMTP_HOST="localhost"
SMTP_PORT="1025"
```

2. **(Optional) Start MailHog to view emails:**
```bash
docker run -d -p 1025:1025 -p 8025:8025 mailhog/mailhog
```
Then view emails at: http://localhost:8025

3. **Start server:**
```bash
npm run dev
```

4. **Open in browser:**
```
http://localhost:3000/travel-id-citizenship/replace-a-passport/start
```

## Test the Flow (2 minutes)

1. Click "Continue to Application Form"
2. Fill out the passport form:
   - Full Name: `Test User`
   - Email: `test@example.com`
   - Phone: `2461234567`
   - Passport Number: `BRB123456`
   - Reason: `Lost`
   - Address: `123 Test Street, Bridgetown`
   - Parish: `St. Michael`
3. Click "Pay & Submit"
4. You'll see the mock payment page
5. Click "Simulate Successful Payment"
6. You should see success message

## What to Check

✅ Form validation works  
✅ Redirect to mock payment page  
✅ Success page shows transaction details  
✅ Server console logs email attempt  
✅ SessionStorage cleared after success  

## Troubleshooting

**404 Error?**
- Make sure you're using the full path: `/travel-id-citizenship/replace-a-passport/start`

**Payment fails immediately?**
- Check that `EZPAY_MOCK_MODE="true"` is set in `.env.local`
- Restart the dev server

**Email not sending?**
- Check that `SMTP_HOST="localhost"` is set in `.env.local`
- Make sure MailHog is running: `docker ps | grep mailhog`
- View emails at: http://localhost:8025
- See `TESTING_EMAILS.md` for detailed email testing guide

**Real emails in production:**
- Remove `SMTP_HOST` from environment variables
- AWS SES automatically used in production

For full testing guide, see `TESTING_GUIDE.md`
