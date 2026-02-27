import Script from "next/script";
import { DatadogRUM } from "./datadog-rum";
import { MatomoAnalytics } from "./matomo-analytics";

export const Analytics = () => {
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_SITE_ID;

  return (
    <>
      {/* Datadog Real User Monitoring */}
      <DatadogRUM />

      {/* Matomo Analytics */}
      <MatomoAnalytics />

      {/* Umami Analytics */}
      {websiteId && (
        <Script
          data-website-id={websiteId}
          src="https://cloud.umami.is/script.js"
          strategy="afterInteractive"
        />
      )}
    </>
  );
};
