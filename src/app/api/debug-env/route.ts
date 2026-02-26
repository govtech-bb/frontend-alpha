import { NextResponse } from "next/server";

export async function GET() {
  // This runs on the server, so it can see all env vars
  const envVars = {
    clientToken: process.env.NEXT_PUBLIC_DD_CLIENT_TOKEN || "NOT SET",
    applicationId: process.env.NEXT_PUBLIC_DD_APPLICATION_ID || "NOT SET",
    env: process.env.NEXT_PUBLIC_DD_ENV || "NOT SET",
    service: process.env.NEXT_PUBLIC_DD_SERVICE || "NOT SET",
    version: process.env.NEXT_PUBLIC_DD_VERSION || "NOT SET",
  };

  return NextResponse.json({
    message: "Environment variables check",
    variables: envVars,
    note: "These should all show actual values, not 'NOT SET'",
  });
}
