import { NextRequest, NextResponse } from "next/server";
import { createHmac } from "crypto";

const COOKIE_NAME = "wow_admin_session";

function verifyToken(token: string, secret: string): boolean {
  const lastDot = token.lastIndexOf(".");
  if (lastDot === -1) return false;
  const payload = token.substring(0, lastDot);
  const hmac = createHmac("sha256", secret);
  hmac.update(payload);
  const expected = `${payload}.${hmac.digest("hex")}`;
  return token === expected;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip login page and login API
  if (
    pathname === "/admin/login" ||
    pathname === "/api/admin/login"
  ) {
    return NextResponse.next();
  }

  // Protect admin routes
  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api/admin")
  ) {
    const token = request.cookies.get(COOKIE_NAME)?.value;
    const secret =
      process.env.ADMIN_SECRET || "fallback-dev-secret-change-me";

    if (!token || !verifyToken(token, secret)) {
      // API routes return 401
      if (pathname.startsWith("/api/admin")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      // Page routes redirect to login
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
