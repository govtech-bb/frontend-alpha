import { type NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME, isValidToken } from "@/lib/research-access";

/**
 * Validate redirect URL to prevent open redirect attacks.
 * Only allows relative paths starting with /
 */
function getSafeRedirect(url: string | null): string {
  if (url?.startsWith("/") && !url.startsWith("//")) {
    return url;
  }
  return "/";
}

/**
 * GET /api/research-access?token=SECRET_TOKEN
 *
 * Grants research access by setting a session cookie.
 * Share this URL with interviewees to unlock forms.
 *
 * Query params:
 * - token: The secret access token (required)
 * - redirect: Where to go after (optional, default: /)
 * - revoke: Set to "true" to clear access
 */
export function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get("token");
  const redirectTo = getSafeRedirect(searchParams.get("redirect"));
  const revoke = searchParams.get("revoke");

  // Handle revoke request
  if (revoke === "true") {
    const response = NextResponse.redirect(new URL(redirectTo, request.url));
    response.cookies.set(COOKIE_NAME, "", { maxAge: 0, path: "/" });
    return response;
  }

  // Validate token
  if (!token) {
    return NextResponse.json(
      { error: "Access token required" },
      { status: 401 }
    );
  }

  if (!isValidToken(token)) {
    return NextResponse.json({ error: "Invalid token" }, { status: 403 });
  }

  const response = NextResponse.redirect(new URL(redirectTo, request.url));
  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 86_400, // 24 hours
  });

  return response;
}
