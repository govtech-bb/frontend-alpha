"use client";

import { useEffect } from "react";
import type { TrackingEventName } from "@/lib/analytics";
import { trackEvent } from "@/lib/analytics";

type PageViewTrackerProps = {
  event: Extract<TrackingEventName, "page-service-view" | "page-start-view">;
  form: string;
  category: string;
};

/**
 * Fires a single page-view tracking event on mount.
 * Designed for use alongside server-rendered markdown pages
 * where a hook-based approach isn't possible.
 */
export function PageViewTracker({
  event,
  form,
  category,
}: PageViewTrackerProps) {
  useEffect(() => {
    trackEvent(event, { form, category });
  }, [event, form, category]);

  return null;
}
