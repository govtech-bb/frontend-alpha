"use client";

import { useEffect } from "react";
import { initMatomo } from "@/lib/matomo";

export const MatomoAnalytics = () => {
  useEffect(() => {
    initMatomo();
  }, []);

  return (
    <noscript>
      <p>
        <img
          alt=""
          referrerPolicy="no-referrer-when-downgrade"
          src="https://alphabb.matomo.cloud/matomo.php?idsite=1&rec=1"
          style={{ border: 0 }}
        />
      </p>
    </noscript>
  );
};
