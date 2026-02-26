"use client";

import { useEffect } from "react";
import { initDatadog } from "@/lib/datadog";

export const DatadogRUM = () => {
  useEffect(() => {
    // Call the async init function
    initDatadog().catch((error) => {
      console.error("[Datadog] Initialization error:", error);
    });
  }, []);

  return null;
};
