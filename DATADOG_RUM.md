# Datadog RUM Integration

This document explains how Datadog Real User Monitoring (RUM) is integrated into the Alpha Portal frontend.

## Overview

Datadog RUM tracks real user interactions, performance metrics, and errors in the browser. It provides insights into:
- Page load times and Core Web Vitals
- User sessions and journeys
- JavaScript errors and stack traces
- API call performance
- User interactions (clicks, form submissions)
- Session replays

## Configuration

### Environment Variables

Add these to your `.env.local` file (or configure in AWS Amplify):

```bash
NEXT_PUBLIC_DD_CLIENT_TOKEN="pub4d95362c505b47482fc97b644193384e"
NEXT_PUBLIC_DD_APPLICATION_ID="c4c295a9-eb1b-4de3-892a-9fa23e6735ea"
NEXT_PUBLIC_DD_ENV="sandbox"  # or "dev", "staging", "prod"
NEXT_PUBLIC_DD_SERVICE="alpha-portal"
NEXT_PUBLIC_DD_VERSION="1.0.0"
```

### AWS Amplify Configuration

1. Go to AWS Console → Amplify → Your App
2. Navigate to "Environment variables"
3. Add the variables above
4. Redeploy the application

## Features Enabled

### Session Replay
- Records 100% of user sessions (configurable)
- Automatically masks user input for privacy (PII protection)
- Captures console logs and network requests

### Performance Tracking
- Core Web Vitals (LCP, FID, CLS)
- Page load times
- Resource loading times
- Long tasks detection

### Error Tracking
- JavaScript errors with stack traces
- Failed API calls
- Console errors

### User Interactions
- Click tracking
- Form submissions
- Navigation events
- Frustration signals (rage clicks, error clicks)

### Distributed Tracing
- Connects frontend requests to backend API traces
- End-to-end request tracking from browser to server

## Usage Examples

### Track Custom Actions

```typescript
import { trackAction } from '@/lib/datadog-helpers';

// Track form submission
trackAction('form_submitted', {
  formType: 'birth-certificate',
  formId: 'form-123',
  success: true
});

// Track payment completion
trackAction('payment_completed', {
  amount: 50.00,
  currency: 'BBD',
  paymentMethod: 'ezpay'
});
```

### Track Custom Errors

```typescript
import { trackError } from '@/lib/datadog-helpers';

try {
  // Your code
} catch (error) {
  trackError(error, {
    context: 'payment-processing',
    userId: user.id,
    formId: 'form-123'
  });
}
```

### Set User Context

```typescript
import { setUser, clearUser } from '@/lib/datadog-helpers';

// After user logs in
setUser({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role
});

// On logout
clearUser();
```

### Add Custom Timing

```typescript
import { addTiming } from '@/lib/datadog-helpers';

// Mark when form validation completes
addTiming('form_validation_complete');

// Mark when payment is initiated
addTiming('payment_initiated');
```

### Add Global Context

```typescript
import { addGlobalContext } from '@/lib/datadog-helpers';

// Add context that will be attached to all events
addGlobalContext('feature_flag_new_ui', true);
addGlobalContext('user_segment', 'premium');
```

## Privacy & Compliance

### PII Protection

The RUM configuration uses `defaultPrivacyLevel: 'mask-user-input'` which:
- Masks all form input values
- Masks sensitive text content
- Protects user privacy in session replays

### Data Sovereignty

- RUM data is sent to Datadog's US5 region
- Session replays can be disabled if needed
- Sampling rates can be adjusted to control data volume

### DPA-BB Compliance

- Only non-sensitive user information should be tracked
- Review session replays for any PII exposure
- Use `beforeSend` callback to filter sensitive data if needed

## Monitoring & Dashboards

### Access Datadog

1. Log into Datadog: https://us5.datadoghq.com
2. Navigate to: UX Monitoring → RUM Applications
3. Select: "Alpha Portal - Sandbox"

### Key Metrics to Monitor

- **Page Load Time**: Target < 3 seconds
- **Largest Contentful Paint (LCP)**: Target < 2.5 seconds
- **First Input Delay (FID)**: Target < 100ms
- **Cumulative Layout Shift (CLS)**: Target < 0.1
- **Error Rate**: Target < 1%
- **API Response Time**: Target < 500ms

## Troubleshooting

### RUM Not Initializing

1. Check environment variables are set correctly
2. Verify `NEXT_PUBLIC_` prefix is used
3. Check browser console for errors
4. Ensure `@datadog/browser-rum` is installed

### No Data in Datadog

1. Wait 2-3 minutes for data to propagate
2. Check Network tab for requests to `datadoghq.com`
3. Verify client token and application ID are correct
4. Check that environment is not blocking third-party scripts

### Session Replays Not Working

1. Verify `sessionReplaySampleRate` is > 0
2. Check browser console for errors
3. Ensure session replay is enabled in Datadog settings
4. Try in incognito mode (ad blockers may interfere)

## Cost Optimization

### Sampling Rates

Adjust in `src/lib/datadog.ts`:

```typescript
sessionSampleRate: 100,        // % of sessions to track
sessionReplaySampleRate: 20,   // % of sessions to record (reduce for cost savings)
```

### Filtering Events

Add `beforeSend` callback to filter unwanted events:

```typescript
beforeSend: (event) => {
  // Don't send events from bots
  if (event.context?.userAgent?.includes('bot')) {
    return false;
  }
  return true;
}
```

## Resources

- [Datadog RUM Documentation](https://docs.datadoghq.com/real_user_monitoring/)
- [Browser SDK API](https://docs.datadoghq.com/real_user_monitoring/browser/)
- [Session Replay](https://docs.datadoghq.com/real_user_monitoring/session_replay/)
- [Core Web Vitals](https://web.dev/vitals/)

## Support

For issues or questions:
- Infrastructure team: infra@govtech.bb
- Datadog dashboard: https://us5.datadoghq.com/rum/application/c4c295a9-eb1b-4de3-892a-9fa23e6735ea
