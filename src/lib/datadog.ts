export async function initDatadog() {
  // Only initialize in browser environment
  if (typeof window === "undefined") {
    console.log("[Datadog] Skipping initialization - server side");
    return;
  }

  // Check if already initialized
  if (window.DD_RUM) {
    console.log("[Datadog] SDK already loaded, checking initialization status");
    try {
      const context = window.DD_RUM.getInternalContext?.();
      console.log("[Datadog] Internal context:", {
        hasContext: !!context,
        sessionId: context?.session_id,
        applicationId: context?.application_id,
      });
    } catch (error) {
      console.error("[Datadog] Error checking context:", error);
    }
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

  try {
    // Dynamic import to ensure this only runs in the browser
    const { datadogRum } = await import("@datadog/browser-rum");
    const { reactPlugin } = await import("@datadog/browser-rum-react");

    datadogRum.init({
      applicationId,
      clientToken,
      site: "us5.datadoghq.com",
      service,
      env,
      version,
      sessionSampleRate: 100,
      sessionReplaySampleRate: 20,
      trackResources: true,
      trackUserInteractions: true,
      trackLongTasks: true,
      defaultPrivacyLevel: "mask-user-input",
      plugins: [reactPlugin({ router: false })],
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
  } catch (error) {
    console.error("[Datadog] Failed to initialize RUM SDK:", error);
  }
}
