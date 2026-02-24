"use client";

import { useEffect } from "react";
import {
  getCategoryShortId,
  getFormShortIdFromSlug,
  trackEvent,
} from "@/lib/analytics";

type PageViewTrackerProps = {
  eventName: string;
  formSlug: string;
  categorySlug: string;
  pageUrl: string;
};

/**
 * Client component that fires an analytics event once on mount.
 * Resolves raw URL slugs to short analytics IDs internally so the
 * parent server component doesn't need to import from analytics.ts.
 */
export function PageViewTracker({
  eventName,
  formSlug,
  categorySlug,
  pageUrl,
}: PageViewTrackerProps) {
  useEffect(() => {
    trackEvent(eventName, {
      form: getFormShortIdFromSlug(formSlug),
      category: getCategoryShortId(categorySlug),
      pageUrl,
    });
  }, [eventName, formSlug, categorySlug, pageUrl]);

  return null;
}
