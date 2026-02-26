"use client";

export default function DatadogTestPage() {
  const envVars = {
    clientToken: process.env.NEXT_PUBLIC_DD_CLIENT_TOKEN,
    applicationId: process.env.NEXT_PUBLIC_DD_APPLICATION_ID,
    env: process.env.NEXT_PUBLIC_DD_ENV,
    service: process.env.NEXT_PUBLIC_DD_SERVICE,
    version: process.env.NEXT_PUBLIC_DD_VERSION,
  };

  const hasDatadog =
    typeof window !== "undefined" &&
    typeof (window as any).DD_RUM !== "undefined";

  return (
    <div style={{ padding: "2rem", fontFamily: "monospace" }}>
      <h1>Datadog RUM Test Page</h1>

      <h2>Environment Variables:</h2>
      <pre
        style={{ background: "#f5f5f5", padding: "1rem", borderRadius: "4px" }}
      >
        {JSON.stringify(envVars, null, 2)}
      </pre>

      <h2>Datadog SDK Status:</h2>
      <p
        style={{
          padding: "1rem",
          background: hasDatadog ? "#d4edda" : "#f8d7da",
          color: hasDatadog ? "#155724" : "#721c24",
          borderRadius: "4px",
        }}
      >
        {hasDatadog
          ? "✅ Datadog RUM SDK is loaded"
          : "❌ Datadog RUM SDK is NOT loaded"}
      </p>

      {hasDatadog && (
        <>
          <h2>Available Methods:</h2>
          <pre
            style={{
              background: "#f5f5f5",
              padding: "1rem",
              borderRadius: "4px",
            }}
          >
            {JSON.stringify(Object.keys((window as any).DD_RUM), null, 2)}
          </pre>
        </>
      )}

      <h2>Troubleshooting:</h2>
      <ul>
        <li>Check browser console for errors</li>
        <li>Check Network tab for requests to datadoghq.com</li>
        <li>Verify environment variables are set in Amplify Console</li>
        <li>Try disabling ad blocker</li>
      </ul>

      <button
        onClick={() => {
          if (hasDatadog) {
            (window as any).DD_RUM.addAction("test_button_click", {
              timestamp: new Date().toISOString(),
              page: "datadog-test",
            });
            alert("Test action sent to Datadog!");
          } else {
            alert("Datadog SDK is not loaded");
          }
        }}
        style={{
          padding: "0.5rem 1rem",
          background: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "1rem",
        }}
      >
        Send Test Action
      </button>
    </div>
  );
}
