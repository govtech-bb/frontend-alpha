import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  // SENTRY_ENABLED must be explicitly set to "true" in the deployment
  // environment. Omitting it (e.g. on localhost) keeps Sentry disabled.
  enabled: process.env.SENTRY_ENABLED === "true",
  tracesSampleRate: 0.1,
  enableLogs: true,
});
