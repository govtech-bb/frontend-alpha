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
        {/* biome-ignore lint/performance/noImgElement: Tracking pixel in noscript tag cannot use Next.js Image */}
        <img
          alt=""
          height="1"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://alphabb.matomo.cloud/matomo.php?idsite=1&rec=1"
          style={{ border: 0 }}
          width="1"
        />
      </p>
    </noscript>
  );
};
