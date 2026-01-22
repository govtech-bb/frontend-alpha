"use client";

import { useEffect } from "react";

type ClearFormStorageProps = {
  storageKey: string;
};

/**
 * Client component that clears session storage for a specific form
 * when the user visits the /start page. This ensures users get a fresh
 * form experience when starting over.
 */
export function ClearFormStorage({ storageKey }: ClearFormStorageProps) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(storageKey);
    }
  }, [storageKey]);

  // Renders nothing - this is a side-effect only component
  return null;
}
