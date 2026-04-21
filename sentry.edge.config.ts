import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  // SENTRY_ENABLED must be explicitly set to "true" in the deployment
  // environment. Omitting it (e.g. on localhost) keeps Sentry disabled.
  enabled: process.env.SENTRY_ENABLED === "true",
  // Set SENTRY_ENVIRONMENT to "development" or "production" in each Amplify
  // environment so issues are filterable by environment in Sentry.
  environment: process.env.SENTRY_ENVIRONMENT,
  tracesSampleRate: 0.1,
  enableLogs: true,
});
