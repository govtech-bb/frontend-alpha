import Script from "next/script";
import { isUmamiEnabled } from "@/lib/umami-env";

export const Analytics = () => {
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_SITE_ID;
  if (!(websiteId && isUmamiEnabled())) {
    return null;
  }
  return (
    <Script
      data-website-id={websiteId}
      src="https://cloud.umami.is/script.js"
      strategy="afterInteractive"
    />
  );
};

declare global {
  // biome-ignore lint/style/useConsistentTypeDefinitions: Window requires interface
  interface Window {
    umami?: {
      track: (eventName: string, eventData?: Record<string, unknown>) => void;
    };
  }
}
