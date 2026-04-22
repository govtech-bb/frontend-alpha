import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  // NEXT_PUBLIC_SENTRY_ENABLED must be explicitly set to "true" in the
  // deployment environment. Omitting it (e.g. on localhost) keeps Sentry disabled.
  enabled: process.env.NEXT_PUBLIC_SENTRY_ENABLED === "true",
  // Set NEXT_PUBLIC_SENTRY_ENVIRONMENT to "development" or "production" in
  // each Amplify environment so issues are filterable by environment in Sentry.
  environment: process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT,
  tracesSampleRate: 0.1,
  enableLogs: true,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
