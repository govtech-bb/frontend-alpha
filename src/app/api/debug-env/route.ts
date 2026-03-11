export const runtime = "nodejs";

export async function GET() {
  // This runs on the server, so it can see all env vars
  const envVars = {
    MAIL_FROM: process.env.MAIL_FROM || "NOT SET",
    FEEDBACK_TO_EMAIL: process.env.FEEDBACK_TO_EMAIL || "NOT SET",
    SES_REGION: process.env.SES_REGION || "NOT SET",
    SES_CONFIGURATION_SET: process.env.SES_CONFIGURATION_SET || "NOT SET",
    _COMPUTE_ROLE_ARN: process.env._COMPUTE_ROLE_ARN || "NOT SET",
    NODE_ENV: process.env.NODE_ENV,
  };

  return Response.json(envVars);
}
