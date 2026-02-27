export function initMatomo() {
  // Only initialize in browser environment
  if (typeof window === "undefined") {
    console.log("[Matomo] Skipping initialization - server side");
    return;
  }

  // Check if already initialized
  if (window._paq) {
    console.log("[Matomo] Already initialized");
    return;
  }

  console.log("[Matomo] Initializing tracking");

  // Initialize Matomo tracking array
  window._paq = window._paq || [];

  // Matomo configuration
  window._paq.push([
    "setCookieDomain",
    "*.sandbox.d2g2eevpv12sde.amplifyapp.com",
  ]);
  window._paq.push(["trackPageView"]);
  window._paq.push(["enableLinkTracking"]);

  // Load Matomo script
  (() => {
    const u = "https://alphabb.matomo.cloud/";
    window._paq.push(["setTrackerUrl", u + "matomo.php"]);
    window._paq.push(["setSiteId", "1"]);
    const d = document;
    const g = d.createElement("script");
    const s = d.getElementsByTagName("script")[0];
    g.async = true;
    g.src = "https://cdn.matomo.cloud/alphabb.matomo.cloud/matomo.js";
    if (s && s.parentNode) {
      s.parentNode.insertBefore(g, s);
    }
  })();

  console.log("[Matomo] Tracking initialized successfully");
}

// Track page views for client-side navigation
export function trackPageView(url?: string) {
  if (typeof window === "undefined" || !window._paq) {
    return;
  }

  if (url) {
    window._paq.push(["setCustomUrl", url]);
  }
  window._paq.push(["trackPageView"]);
}

// Track custom events
export function trackEvent(
  category: string,
  action: string,
  name?: string,
  value?: number
) {
  if (typeof window === "undefined" || !window._paq) {
    return;
  }

  window._paq.push(["trackEvent", category, action, name, value]);
}
