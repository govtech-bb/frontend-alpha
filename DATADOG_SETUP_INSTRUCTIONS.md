# Datadog RUM Setup Instructions for Sandbox Branch

## What Was Added

The following files have been created/modified to integrate Datadog RUM:

### New Files:
1. `src/lib/datadog.ts` - Datadog RUM initialization
2. `src/components/datadog-rum.tsx` - React component for RUM
3. `src/lib/datadog-helpers.ts` - Helper functions for custom tracking
4. `DATADOG_RUM.md` - Complete documentation

### Modified Files:
1. `src/components/analytics.tsx` - Added Datadog RUM component
2. `.env.local.example` - Added Datadog environment variables
3. `package.json` - Added `@datadog/browser-rum` dependency

## Next Steps

### 1. ✅ Client Token Already Configured

The Datadog Client Token has been configured:
- **Client Token**: `pub4d95362c505b47482fc97b644193384e`
- **Application ID**: `c4c295a9-eb1b-4de3-892a-9fa23e6735ea`
- **Site**: `us5.datadoghq.com`

### 2. Environment Variables Already Set

The `.env.local` file has been updated with:

```bash
NEXT_PUBLIC_DD_CLIENT_TOKEN="pub4d95362c505b47482fc97b644193384e"
NEXT_PUBLIC_DD_APPLICATION_ID="c4c295a9-eb1b-4de3-892a-9fa23e6735ea"
NEXT_PUBLIC_DD_ENV="sandbox"
NEXT_PUBLIC_DD_SERVICE="alpha-portal"
NEXT_PUBLIC_DD_VERSION="1.0.0"
```

### 3. Test Locally

```bash
# Install dependencies (already done)
npm install

# Run development server
npm run dev

# Open http://localhost:3000
# Navigate around the site
# Check browser DevTools → Network tab for requests to datadoghq.com
```

### 4. Verify RUM is Working

1. Open browser DevTools (F12)
2. Go to Console tab
3. Type: `window.DD_RUM`
4. You should see an object with RUM methods
5. Go to Network tab and filter by "datadog"
6. You should see requests to `browser-intake-datadoghq.com`

### 5. Configure AWS Amplify Environment Variables

Before deploying to Amplify, add environment variables:

1. Go to AWS Console → Amplify → Your sandbox app
2. Navigate to "Environment variables"
3. Click "Manage variables"
4. Add these variables:
   ```
   NEXT_PUBLIC_DD_CLIENT_TOKEN = pub4d95362c505b47482fc97b644193384e
   NEXT_PUBLIC_DD_APPLICATION_ID = c4c295a9-eb1b-4de3-892a-9fa23e6735ea
   NEXT_PUBLIC_DD_ENV = sandbox
   NEXT_PUBLIC_DD_SERVICE = alpha-portal
   NEXT_PUBLIC_DD_VERSION = 1.0.0
   ```
5. Click "Save"

### 6. Commit and Push Changes

```bash
# Stage all changes
git add .

# Commit with descriptive message
git commit -m "feat: Add Datadog RUM monitoring to sandbox

- Install @datadog/browser-rum package
- Create Datadog initialization and helper functions
- Integrate RUM into Analytics component
- Add environment variables for configuration
- Include comprehensive documentation

Datadog Application ID: c4c295a9-eb1b-4de3-892a-9fa23e6735ea
Site: us5.datadoghq.com"

# Push to sandbox branch
git push origin sandbox
```

### 7. Monitor Deployment

1. Amplify will automatically trigger a build
2. Wait for deployment to complete (~5-10 minutes)
3. Check build logs for any errors

### 8. Verify in Datadog

After deployment:

1. Visit your deployed site
2. Navigate through a few pages
3. Wait 2-3 minutes
4. Go to Datadog: https://us5.datadoghq.com/rum/application/c4c295a9-eb1b-4de3-892a-9fa23e6735ea
5. You should see:
   - Active sessions
   - Page views
   - Performance metrics
   - Session replays

## Features Enabled

✅ Session Replay (100% of sessions)
✅ Performance Monitoring (Core Web Vitals)
✅ Error Tracking
✅ User Interaction Tracking
✅ API Call Tracing
✅ Frustration Signals (rage clicks, error clicks)
✅ Privacy Protection (mask-user-input)

## Privacy & Security

- All form inputs are automatically masked
- Only non-sensitive user data should be tracked
- Session replays respect privacy settings
- Compliant with DPA-BB requirements

## Usage Examples

### Track Form Submission

```typescript
import { trackAction } from '@/lib/datadog-helpers';

trackAction('form_submitted', {
  formType: 'birth-certificate',
  success: true
});
```

### Track Errors

```typescript
import { trackError } from '@/lib/datadog-helpers';

try {
  // Your code
} catch (error) {
  trackError(error, { context: 'payment-processing' });
}
```

### Set User Context

```typescript
import { setUser } from '@/lib/datadog-helpers';

setUser({
  id: user.id,
  name: user.name,
  email: user.email
});
```

## Troubleshooting

### RUM Not Loading

1. Check `.env.local` has correct values
2. Verify environment variables start with `NEXT_PUBLIC_`
3. Check browser console for errors
4. Ensure ad blockers are disabled for testing

### No Data in Datadog

1. Wait 2-3 minutes for data propagation
2. Check Network tab for requests to datadoghq.com
3. Verify client token and application ID are correct
4. Check Datadog application status

### Build Errors

If you get build errors:
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json .next
npm install
npm run build
```

## Cost Considerations

Current configuration:
- Session sample rate: 100% (all sessions tracked)
- Session replay rate: 100% (all sessions recorded)

For production, consider reducing replay rate to 20-50% to save costs:

Edit `src/lib/datadog.ts`:
```typescript
sessionReplaySampleRate: 20,  // Only record 20% of sessions
```

## Support

- Datadog Dashboard: https://us5.datadoghq.com/rum/application/c4c295a9-eb1b-4de3-892a-9fa23e6735ea
- Documentation: See `DATADOG_RUM.md`
- Infrastructure Team: infra@govtech.bb

## Summary

✅ Datadog RUM package installed
✅ Initialization code created
✅ Helper functions for custom tracking
✅ Integrated into Analytics component
✅ Environment variables configured
✅ Documentation provided

**Next Action**: Get your Client Token from Datadog and update `.env.local`
