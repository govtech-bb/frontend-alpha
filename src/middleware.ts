import { type NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "research-access";

export function middleware(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("p");
  const secretToken = process.env.RESEARCH_ACCESS_TOKEN;

  // If ?p= param matches the secret, grant access and redirect without the param
  if (token && secretToken && token === secretToken) {
    const url = request.nextUrl.clone();
    url.searchParams.delete("p");

    const response = NextResponse.redirect(url);
    // Session cookie - no maxAge means it clears when browser closes
    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths except static files and api routes
    "/((?!_next/static|_next/image|favicon.ico|api/).*)",
  ],
};
