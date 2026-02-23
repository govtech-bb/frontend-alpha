import posthog from "posthog-js";
import { useEffect, useRef } from "react";
import { getNestedValue } from "@/lib/utils";

// --- Type declarations for Umami's global API ---

type UmamiEventData = Record<string, string | number | boolean>;

type UmamiPageviewProps = {
  hostname: string;
  language: string;
  referrer: string;
  screen: string;
  title: string;
  url: string;
  website: string;
};

declare global {
  interface Window {
    umami?: {
      track: {
        (event: string, data?: UmamiEventData): void;
        (
          callback: (props: UmamiPageviewProps) => Partial<UmamiPageviewProps>
        ): void;
      };
    };
  }
}

// --- Identifier lookup maps ---
// Maps storageKey (used in DynamicMultiStepForm) to short form IDs for clean dashboard data.
// See docs/umami-event-naming-strategy.md for the full reference.

const FORM_SHORT_IDS: Record<string, string> = {
  "get-birth-certificate": "birth-cert",
  "get-death-certificate": "death-cert",
  "get-marriage-certificate": "marriage-cert",
  "register-a-birth": "birth-reg",
  "primary-school-textbook-grant": "textbook-grant",
  "community-sports-programme": "sports-training",
  "project-protege-mentor": "protege-mentor",
  "jobstart-plus-programme": "jobstart-plus",
  "apply-for-conductor-licence": "conductor-licence",
  "post-office-redirection-individual": "mail-individual",
  "post-office-redirection-deceased": "mail-deceased",
  "post-office-redirection-business": "mail-business",
  "sell-goods-services-beach-park": "beach-park-vendor",
  "reserve-society-name": "society-name",
  "request-a-fire-service-inspection": "fire-inspection",
  "exit-survey": "exit-survey",
};

// Maps URL page slugs to short form IDs (for components that only have URL context).
// Some URL slugs differ from storageKeys (e.g. "register-for-community-sports-training-programme"
// has storageKey "community-sports-programme"), so both mappings are needed.
const URL_SLUG_SHORT_IDS: Record<string, string> = {
  "get-birth-certificate": "birth-cert",
  "get-death-certificate": "death-cert",
  "get-marriage-certificate": "marriage-cert",
  "register-a-birth": "birth-reg",
  "get-a-primary-school-textbook-grant": "textbook-grant",
  "register-for-community-sports-training-programme": "sports-training",
  "apply-to-be-a-project-protege-mentor": "protege-mentor",
  "apply-to-jobstart-plus-programme": "jobstart-plus",
  "apply-for-conductor-licence": "conductor-licence",
  "post-office-redirection-individual": "mail-individual",
  "post-office-redirection-deceased": "mail-deceased",
  "post-office-redirection-business": "mail-business",
  "sell-goods-services-beach-park": "beach-park-vendor",
  "reserve-society-name": "society-name",
  "request-a-fire-service-inspection": "fire-inspection",
};

const CATEGORY_SHORT_IDS: Record<string, string> = {
  "family-birth-relationships": "family",
  "work-employment": "employment",
  "money-financial-support": "financial",
  "travel-id-citizenship": "travel",
  "business-trade": "business",
  "public-safety": "safety",
};

// --- Public helper functions ---

/** Resolves a storageKey to the short form identifier used in analytics events. */
export function getFormShortId(storageKey: string): string {
  return FORM_SHORT_IDS[storageKey] ?? storageKey;
}

/** Resolves a URL page slug to the short form identifier. */
export function getFormShortIdFromSlug(urlSlug: string): string {
  return URL_SLUG_SHORT_IDS[urlSlug] ?? urlSlug;
}

/** Resolves a category slug (from the URL) to the short category identifier. */
export function getCategoryShortId(categorySlug: string): string {
  return CATEGORY_SHORT_IDS[categorySlug] ?? categorySlug;
}

/**
 * Fires a PostHog event. Accepts any JSON-serializable properties
 * (arrays, nested objects, etc.) unlike Umami's flat key-value constraint.
 * No-ops if PostHog is not initialized (missing env var, ad-blocked, or SSR).
 */
function trackPostHogEvent(
  eventName: string,
  data?: Record<string, unknown>
): void {
  if (typeof window === "undefined") return;

  try {
    posthog.capture(eventName, data);
  } catch {
    // PostHog not available — silently ignore
  }
}

/**
 * Fires a custom event to both Umami and PostHog. No-ops gracefully if
 * either provider is unavailable (ad blocker, missing env variable, etc.).
 *
 * PostHog supports richer property types than Umami (arrays, objects, etc.).
 * Pass `posthogProperties` to send structured data to PostHog while Umami
 * receives the flat `data`. If omitted, both providers get the same `data`.
 */
export function trackEvent(
  eventName: string,
  data?: UmamiEventData,
  posthogProperties?: Record<string, unknown>
): void {
  if (typeof window === "undefined") return;

  if (process.env.NODE_ENV === "development") {
    console.debug(`[analytics] ${eventName}`, posthogProperties ?? data);
  }

  if (window.umami) {
    window.umami.track(eventName, data);
  }

  trackPostHogEvent(eventName, posthogProperties ?? data);
}

/**
 * Fires a virtual pageview for Umami funnel tracking.
 * The browser URL stays unchanged — only Umami records the synthetic URL.
 * Only schema-defined constants should be interpolated into the URL (never user input).
 */
export function trackVirtualPageview(syntheticUrl: string): void {
  if (typeof window !== "undefined" && window.umami) {
    window.umami.track((props) => ({ ...props, url: syntheticUrl }));
  }
}

/**
 * Extracts validation error metadata from react-hook-form errors and fires
 * both a custom event and a virtual pageview (for funnel visibility).
 *
 * PII safeguard: only field names (schema keys) and error type categories
 * are extracted — never field values or error message text.
 */
export function trackValidationErrors({
  formId,
  category,
  stepId,
  fieldNames,
  errors,
}: {
  formId: string;
  category: string;
  stepId: string;
  fieldNames: string[];
  errors: Record<string, unknown>;
}): void {
  const failedFields = fieldNames
    .filter((name) => getNestedValue(errors, name))
    .map((name) => ({
      field: name,
      type:
        (getNestedValue(errors, name) as { type?: string })?.type ?? "unknown",
    }));

  if (failedFields.length === 0) return;

  const form = getFormShortId(formId);
  const cat = getCategoryShortId(category);
  const pageUrl = window.location.pathname;

  // Umami: flat comma-separated strings (only format it supports)
  const umamiData: UmamiEventData = {
    form,
    category: cat,
    step: stepId,
    errorCount: failedFields.length,
    fields: failedFields.map((f) => f.field).join(","),
    errorTypes: failedFields.map((f) => f.type).join(","),
  };

  // PostHog: structured arrays for native filtering and breakdown in dashboards
  const posthogData: Record<string, unknown> = {
    form,
    category: cat,
    step: stepId,
    pageUrl,
    errorCount: failedFields.length,
    errors: failedFields.map((f) => ({ field: f.field, type: f.type })),
    fields: failedFields.map((f) => f.field),
    errorTypes: [...new Set(failedFields.map((f) => f.type))],
  };

  trackEvent("form-validation-error", umamiData, posthogData);

  // Virtual pageview for Umami funnel visibility (PostHog uses event-based funnels instead)
  trackVirtualPageview(
    `${window.location.pathname}?step=${stepId}&validation=failed`
  );
}

// --- Abandonment tracking ---

/**
 * Sends an Umami event via sendBeacon, bypassing the Umami client script.
 * Used during page unload when normal fetch/XHR may be cancelled.
 * Returns false if sendBeacon is unavailable or the website ID is not set.
 */
function sendUmamiBeaconEvent(
  eventName: string,
  data?: UmamiEventData
): boolean {
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_SITE_ID;
  if (typeof navigator === "undefined" || !navigator.sendBeacon || !websiteId) {
    return false;
  }

  const payload = JSON.stringify({
    payload: {
      hostname: window.location.hostname,
      language: navigator.language,
      referrer: document.referrer,
      screen: `${window.screen.width}x${window.screen.height}`,
      title: document.title,
      url: window.location.pathname + window.location.search,
      website: websiteId,
      name: eventName,
      data,
    },
    type: "event",
  });

  return navigator.sendBeacon(
    "https://cloud.umami.is/api/send",
    new Blob([payload], { type: "application/json" })
  );
}

/**
 * Sends a PostHog event via sendBeacon for reliable delivery during page unload.
 * Falls back to the posthog client's distinct_id if available.
 */
function sendPostHogBeaconEvent(
  eventName: string,
  data?: Record<string, unknown>
): boolean {
  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;
  if (
    typeof navigator === "undefined" ||
    !navigator.sendBeacon ||
    !posthogKey ||
    !posthogHost
  ) {
    return false;
  }

  let distinctId = "anonymous";
  try {
    distinctId = posthog.get_distinct_id() ?? "anonymous";
  } catch {
    // PostHog not initialized — use fallback
  }

  const payload = JSON.stringify({
    api_key: posthogKey,
    event: eventName,
    properties: {
      ...data,
      distinct_id: distinctId,
      $current_url: window.location.href,
    },
    timestamp: new Date().toISOString(),
  });

  return navigator.sendBeacon(
    `${posthogHost}/capture/`,
    new Blob([payload], { type: "application/json" })
  );
}

/**
 * Sends an analytics event via sendBeacon to both Umami and PostHog.
 * Used during page unload (abandonment tracking) when normal fetch may be cancelled.
 */
function sendBeaconEvent(eventName: string, data?: UmamiEventData): void {
  sendUmamiBeaconEvent(eventName, data);
  sendPostHogBeaconEvent(eventName, data);
}

/**
 * React hook that tracks form abandonment. Fires a "{formId}-abandon" event
 * when the user leaves the page (tab close, navigation away, etc.) without
 * having submitted the form.
 *
 * Uses visibilitychange with a 30-second debounce to avoid false positives
 * from brief tab switches. Falls back to beforeunload for immediate departures.
 * Both use sendBeacon for reliable delivery during page unload.
 */
export function useFormAbandonmentTracking({
  storageKey,
  categorySlug,
  currentStepId,
  isSubmitted,
  formStartTime,
}: {
  storageKey: string;
  categorySlug: string;
  currentStepId: string;
  isSubmitted: boolean;
  formStartTime: number | null;
}): void {
  // Use refs so the event handlers always see the latest values
  // without re-registering listeners on every render
  const currentStepRef = useRef(currentStepId);
  const isSubmittedRef = useRef(isSubmitted);
  const startTimeRef = useRef(formStartTime);

  useEffect(() => {
    currentStepRef.current = currentStepId;
  }, [currentStepId]);

  useEffect(() => {
    isSubmittedRef.current = isSubmitted;
  }, [isSubmitted]);

  useEffect(() => {
    startTimeRef.current = formStartTime;
  }, [formStartTime]);

  useEffect(() => {
    const form = getFormShortId(storageKey);
    const category = getCategoryShortId(categorySlug);
    let abandonTimeout: ReturnType<typeof setTimeout> | null = null;

    const fireAbandonEvent = () => {
      if (isSubmittedRef.current) return;

      const durationSeconds = startTimeRef.current
        ? Math.round((Date.now() - startTimeRef.current) / 1000)
        : 0;

      sendBeaconEvent("form-abandon", {
        form,
        category,
        step: currentStepRef.current,
        duration: durationSeconds,
      });
    };

    // Debounced visibilitychange: wait 30s before firing to avoid
    // false positives from brief tab switches
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        abandonTimeout = setTimeout(fireAbandonEvent, 30_000);
      } else if (abandonTimeout) {
        // User returned — cancel the pending abandonment event
        clearTimeout(abandonTimeout);
        abandonTimeout = null;
      }
    };

    // Immediate beforeunload: fires when the tab/window is actually closing
    // or the user navigates to a different origin
    const handleBeforeUnload = () => {
      if (abandonTimeout) {
        clearTimeout(abandonTimeout);
        abandonTimeout = null;
      }
      fireAbandonEvent();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      if (abandonTimeout) {
        clearTimeout(abandonTimeout);
      }
    };
  }, [storageKey, categorySlug]);
}
