import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET || "super-secret-jwt-key-change-in-production";
const key = new TextEncoder().encode(JWT_SECRET);

// Add paths that require authentication here in the future (e.g., /dashboard, /profile)
const protectedRoutes = ["/dashboard", "/profile", "/admin"];

// Add paths that are strictly for non-authenticated users
const publicOnlyRoutes = ["/login", "/signup", "/forgot-password"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Basic CSRF Protection: Ensure state-changing requests (POST, PUT, DELETE) have matching origin
  if (["POST", "PUT", "DELETE", "PATCH"].includes(request.method)) {
    const origin = request.headers.get("origin") ?? "";
    const host = request.headers.get("host") ?? "";
    
    // In production, we'd strictly verify this. For development, we allow localhost/127.0.0.1
    if (origin && !origin.includes(host) && process.env.NODE_ENV === "production") {
      return NextResponse.json({ error: "Invalid Origin" }, { status: 403 });
    }
  }

  const sessionCookie = request.cookies.get("session")?.value;
  let isAuthenticated = false;
  let userRole = "USER";

  if (sessionCookie) {
    try {
      const { payload } = await jwtVerify(sessionCookie, key, { algorithms: ["HS256"] });
      isAuthenticated = true;
      userRole = payload.role as string;
    } catch (error) {
      // Invalid or expired token
      isAuthenticated = false;
    }
  }

  // Handle protected routes
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));
  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Handle admin routes
  if (pathname.startsWith("/admin") && userRole !== "ADMIN") {
    // If authenticated but not admin, redirect to home or 403
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Handle public-only routes (e.g., trying to login when already logged in)
  const isPublicOnlyRoute = publicOnlyRoutes.some((route) => pathname.startsWith(route));
  if (isPublicOnlyRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
