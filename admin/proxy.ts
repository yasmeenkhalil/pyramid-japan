
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ALLOWED_ORIGIN = "https://pyramidjapan.jp";

const CORS_METHODS = "GET, POST, PUT, PATCH, DELETE, OPTIONS";

const CORS_HEADERS =
  "Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept";

function addCorsHeaders(
  response: NextResponse,
  request: NextRequest
) {
  const origin = request.headers.get("origin");

  if (origin === ALLOWED_ORIGIN) {
    response.headers.set("Access-Control-Allow-Origin", origin);
    response.headers.set("Access-Control-Allow-Credentials", "true");
    response.headers.set("Access-Control-Allow-Methods", CORS_METHODS);
    response.headers.set("Access-Control-Allow-Headers", CORS_HEADERS);
    response.headers.set("Access-Control-Max-Age", "86400");
    response.headers.append("Vary", "Origin");
  }

  return response;
}

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const isApiRoute =
    pathname === "/api" || pathname.startsWith("/api/");

  const isAdminPage =
    pathname === "/admin" || pathname.startsWith("/admin/");

  const isAdminApi =
    pathname === "/api/admin" ||
    pathname.startsWith("/api/admin/");

  // Handle CORS preflight before authentication.
  if (isApiRoute && request.method === "OPTIONS") {
    const response = new NextResponse(null, {
      status: 204,
    });

    return addCorsHeaders(response, request);
  }

  // Public API routes are not authenticated here.
  // They must implement their own authorization where required.
  if (!isAdminPage && !isAdminApi) {
    if (isApiRoute) {
      return addCorsHeaders(NextResponse.next(), request);
    }

    return NextResponse.next();
  }

  // Fail closed if the production secret is missing.
  const secret = process.env.NEXTAUTH_SECRET;

  if (!secret) {
    if (isAdminApi) {
      return addCorsHeaders(
        NextResponse.json(
          { message: "Authentication configuration error." },
          { status: 500 }
        ),
        request
      );
    }

    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  let token;

  try {
    token = await getToken({
      req: request,
      secret,
      secureCookie: process.env.NODE_ENV === "production",
    });
  } catch (error) {
    console.error("Failed to read authentication token:", error);
    token = null;
  }

  if (!token) {
    if (isAdminApi) {
      return addCorsHeaders(
        NextResponse.json(
          { message: "Authentication required." },
          { status: 401 }
        ),
        request
      );
    }

    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set(
      "callbackUrl",
      request.nextUrl.pathname + request.nextUrl.search
    );

    return NextResponse.redirect(loginUrl);
  }

  if (token.role !== "admin") {
    if (isAdminApi) {
      return addCorsHeaders(
        NextResponse.json(
          { message: "Not authorized." },
          { status: 403 }
        ),
        request
      );
    }

    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  const response = NextResponse.next();

  if (isApiRoute) {
    return addCorsHeaders(response, request);
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/api/:path*"],
};