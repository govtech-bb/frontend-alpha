"use client";

import { useEffect } from "react";
import { clearFormStartTime } from "@/lib/analytics";

interface ClearFormStorageProps {
  storageKey: string;
}

/**
 * Client component that clears session storage for a specific form
 * when the user visits the /start page. This ensures users get a fresh
 * form experience when starting over.
 */
export function ClearFormStorage({ storageKey }: ClearFormStorageProps) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(storageKey);
      clearFormStartTime(storageKey);
    }
  }, [storageKey]);

  return null;
}
