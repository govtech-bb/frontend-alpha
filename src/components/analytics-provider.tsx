"use client";

import Script from "next/script";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { useEffect, useState } from "react";

const UMAMI_SITE_ID = process.env.NEXT_PUBLIC_UMAMI_SITE_ID;
const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST;

/**
 * Unified analytics wrapper that conditionally enables each provider
 * based on its environment variable. If neither is set, renders children as-is.
 *
 * - Umami:   enabled when NEXT_PUBLIC_UMAMI_SITE_ID is set
 * - PostHog: enabled when NEXT_PUBLIC_POSTHOG_KEY and NEXT_PUBLIC_POSTHOG_HOST are set
 */
export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const [posthogReady, setPosthogReady] = useState(false);

  useEffect(() => {
    if (!(POSTHOG_KEY && POSTHOG_HOST)) return;

    posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      person_profiles: "identified_only",
      capture_pageview: true,
      capture_pageleave: true,
      // PII safeguard: disable session recording to avoid capturing form field values
      disable_session_recording: true,
    });

    setPosthogReady(true);
  }, []);

  const content = (
    <>
      {UMAMI_SITE_ID && (
        <Script
          data-website-id={UMAMI_SITE_ID}
          defer
          src="https://cloud.umami.is/script.js"
          strategy="afterInteractive"
        />
      )}
      {children}
    </>
  );

  if (posthogReady) {
    return <PostHogProvider client={posthog}>{content}</PostHogProvider>;
  }

  return content;
}
