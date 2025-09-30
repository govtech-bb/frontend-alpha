import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Suspicious patterns that might indicate path traversal attempts
const SUSPICIOUS_PATTERNS = [
  /\.\./, // Parent directory
  /%2e%2e/i, // Encoded ..
  /%252e/i, // Double-encoded .
  /\\/, // Backslash
  /%5c/i, // Encoded backslash
  /%2f/i, // Encoded forward slash
  /\/\//, // Double slash
  /etc\/passwd/i, // Common attack target
  /\.env/i, // Environment files
  /\.git/i, // Git directory
  /\.ssh/i, // SSH keys
  /proc\/self/i, // Linux proc
  /windows/i, // Windows paths
];

// Rate limiting map (in-memory, use Redis in production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Configuration
const RATE_LIMIT_WINDOW = 60_000; // 1 minute
const RATE_LIMIT_MAX = 100; // requests per window
const SECURITY_LOG_ENABLED = process.env.NODE_ENV === "production";

/**
 * Check if the request path contains suspicious patterns
 */
function containsSuspiciousPatterns(
  pathname: string,
  searchParams: URLSearchParams
): boolean {
  const fullPath = pathname + searchParams.toString();

  return SUSPICIOUS_PATTERNS.some((pattern) => pattern.test(fullPath));
}

/**
 * Simple in-memory rate limiting
 * In production, use Redis or similar distributed cache
 */
function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(identifier);

  if (!record || now > record.resetTime) {
    // New window
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }

  record.count++;
  return true;
}

/**
 * Log security events
 */
function logSecurityEvent(
  event: string,
  request: NextRequest,
  details?: Record<string, unknown>
) {
  if (!SECURITY_LOG_ENABLED) return;

  const logData = {
    timestamp: new Date().toISOString(),
    event,
    method: request.method,
    url: request.url,
    pathname: request.nextUrl.pathname,
    ip:
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown",
    userAgent: request.headers.get("user-agent"),
    ...details,
  };

  // In production, send to your logging service (CloudWatch, Datadog, etc.)
  // biome-ignore lint/suspicious/noConsole: <explanation>
  console.warn("[SECURITY]", JSON.stringify(logData));
}

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Skip middleware for static assets and API health checks
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/robots") ||
    pathname.startsWith("/sitemap") ||
    pathname === "/api/health"
  ) {
    return NextResponse.next();
  }

  // Block .well-known and other system paths early
  // These are browser/system requests, not content requests
  if (
    pathname.startsWith("/.well-known") ||
    pathname.startsWith("/.env") ||
    pathname.startsWith("/.git") ||
    pathname.includes("/.") // Any hidden directory
  ) {
    return new NextResponse("Not Found", { status: 404 });
  }

  // Get client identifier (IP address)
  const clientIp =
    request.headers.get("x-forwarded-for") ||
    request.headers.get("x-real-ip") ||
    "unknown";

  // Rate limiting check
  if (!checkRateLimit(clientIp)) {
    logSecurityEvent("RATE_LIMIT_EXCEEDED", request, {
      clientIp,
      limit: RATE_LIMIT_MAX,
      window: RATE_LIMIT_WINDOW,
    });

    return NextResponse.json(
      { error: "Too many requests" },
      {
        status: 429,
        headers: {
          "Retry-After": "60",
          "X-RateLimit-Limit": RATE_LIMIT_MAX.toString(),
          "X-RateLimit-Remaining": "0",
        },
      }
    );
  }

  // Check for suspicious patterns in URL
  if (containsSuspiciousPatterns(pathname, searchParams)) {
    logSecurityEvent("SUSPICIOUS_PATH_DETECTED", request, {
      clientIp,
      pathname,
      searchParams: searchParams.toString(),
      blocked: true,
    });

    // Return 404 instead of 403 to avoid information disclosure
    return new NextResponse("Not Found", { status: 404 });
  }

  // Validate content routes specifically
  if (pathname.startsWith("/blog/") || pathname.startsWith("/api/content/")) {
    const pathSegments = pathname.split("/").filter(Boolean);

    // Check each segment for invalid characters
    const hasInvalidSegment = pathSegments.some((segment) => {
      // Allowlist validation at middleware level (defense in depth)
      return (
        // biome-ignore lint/performance/useTopLevelRegex: <explanation>
        !/^[A-Za-z0-9_-]+$/.test(segment) &&
        segment !== "blog" &&
        segment !== "api" &&
        segment !== "content"
      );
    });

    if (hasInvalidSegment) {
      logSecurityEvent("INVALID_PATH_SEGMENT", request, {
        clientIp,
        pathname,
        segments: pathSegments,
      });

      return new NextResponse("Not Found", { status: 404 });
    }
  }

  // Add security headers to all responses
  const response = NextResponse.next();

  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );

  // Add CSP header for additional protection
  response.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
  );

  return response;
}

// Configure which routes use this middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico (favicon file)
     * - public files (public directory)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
