# Datadog RUM - Quick Start

## ✅ Status: READY TO DEPLOY

Build passes ✓ | TypeScript ✓ | Configuration ✓

## 🚀 Deploy in 3 Steps

### 1. Configure Amplify (2 minutes)

AWS Console → Amplify → Sandbox App → Environment variables:

```
NEXT_PUBLIC_DD_CLIENT_TOKEN = your-datadog-client-token-here
NEXT_PUBLIC_DD_APPLICATION_ID = your-datadog-application-id-here
NEXT_PUBLIC_DD_ENV = sandbox
NEXT_PUBLIC_DD_SERVICE = alpha-portal
NEXT_PUBLIC_DD_VERSION = 1.0.0
```

### 2. Deploy (1 minute)

```bash
git add .
git commit -m "feat: Add Datadog RUM monitoring"
git push origin sandbox
```

### 3. Verify (5 minutes)

Wait for Amplify build, then check:
https://us5.datadoghq.com/rum/application/c4c295a9-eb1b-4de3-892a-9fa23e6735ea

## 📊 What You Get

- 📹 Session Replays (20% of sessions)
- ⚡ Performance Metrics (Core Web Vitals)
- 🐛 Error Tracking (with stack traces)
- 👆 User Interaction Tracking
- 🔗 API Call Tracing
- 🔒 Privacy Protected (inputs masked)

## 📚 Full Documentation

- `READY_TO_DEPLOY.md` - Complete deployment guide
- `DATADOG_RUM.md` - Full documentation
- `DATADOG_SETUP_INSTRUCTIONS.md` - Detailed setup

## 💡 Quick Usage

```typescript
// Track action
import { trackAction } from '@/lib/datadog-helpers';
trackAction('button_clicked', { buttonId: 'submit' });

// Track error
import { trackError } from '@/lib/datadog-helpers';
trackError(error, { context: 'checkout' });

// Set user
import { setUser } from '@/lib/datadog-helpers';
setUser({ id: user.id, name: user.name });
```

## 🎯 Datadog Dashboard

https://us5.datadoghq.com/rum/application/c4c295a9-eb1b-4de3-892a-9fa23e6735ea

---

**Total Time**: ~8 minutes from start to finish
