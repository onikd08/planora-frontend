import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get("accessToken")?.value;

  let userInfo: any = null;

  // ✅ Decode token manually because `jsonwebtoken` crashes in the Next.js Edge Runtime
  if (accessToken) {
    try {
      const payloadBase64 = accessToken.split(".")[1];
      const base64 = payloadBase64.replace(/-/g, "+").replace(/_/g, "/");
      const decodedJson = atob(base64);
      userInfo = JSON.parse(decodedJson);
    } catch {
      userInfo = null;
    }
  }

  const isAuthenticated = !!userInfo;

  const isPublicRoute = pathname === "/login" || pathname === "/register";

  const isProtected =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/admin-dashboard");

  // 🔒 Role-based routing
  if (userInfo?.role === "USER" && pathname.startsWith("/admin-dashboard")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (userInfo?.role === "ADMIN" && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/admin-dashboard", request.url));
  }

  // 🚫 Prevent logged-in users from visiting auth pages
  if (isAuthenticated && isPublicRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 🔐 Protect private routes
  if (!isAuthenticated && isProtected) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin-dashboard/:path*",
    "/login",
    "/register",
  ],
};
