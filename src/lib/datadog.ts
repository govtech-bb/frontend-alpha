import { datadogRum } from "@datadog/browser-rum";
import { reactPlugin } from "@datadog/browser-rum-react";

export function initDatadog() {
  // Only initialize in browser environment
  if (typeof window === "undefined") {
    return;
  }

  // Check if already initialized
  if (window.DD_RUM) {
    console.log("[Datadog] Already initialized");
    return;
  }

  const clientToken =
    process.env.NEXT_PUBLIC_DD_CLIENT_TOKEN ||
    "pub4d95362c505b47482fc97b644193384e";
  const applicationId =
    process.env.NEXT_PUBLIC_DD_APPLICATION_ID ||
    "c4c295a9-eb1b-4de3-892a-9fa23e6735ea";
  const env = process.env.NEXT_PUBLIC_DD_ENV || "sandbox";
  const service = process.env.NEXT_PUBLIC_DD_SERVICE || "alpha-portal";
  const version = process.env.NEXT_PUBLIC_DD_VERSION || "1.0.0";

  console.log("[Datadog] Initializing RUM SDK", {
    applicationId,
    clientToken: clientToken.substring(0, 10) + "...",
    env,
    service,
    version,
  });

  datadogRum.init({
    applicationId,
    clientToken,
    site: "us5.datadoghq.com",
    service,
    env,
    version,
    sessionSampleRate: 100,
    sessionReplaySampleRate: 20, // Recommended: 20% to balance cost and coverage
    trackResources: true,
    trackUserInteractions: true,
    trackLongTasks: true,
    defaultPrivacyLevel: "mask-user-input",

    // React plugin for better component tracking
    plugins: [
      reactPlugin({ router: false }), // Set to true if using React Router
    ],

    // Enable distributed tracing to backend API
    allowedTracingUrls: [
      "https://dev.api.alpha.gov.bb",
      /https:\/\/dev\.api\.alpha\.gov\.bb\/.*/,
      "https://api.alpha.gov.bb",
      /https:\/\/api\.alpha\.gov\.bb\/.*/,
    ],
  });

  // Start session replay recording
  datadogRum.startSessionReplayRecording();

  console.log("[Datadog] RUM SDK initialized successfully");
}
