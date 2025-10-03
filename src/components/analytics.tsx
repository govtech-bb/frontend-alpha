import Script from "next/script";

export const Analytics = () => {
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_SITE_ID;
  if (!websiteId) {
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
