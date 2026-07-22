import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// 1. يجب تصدير الدالة باسم middleware حصراً ليقرأها Next.js
export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isApiRoute = req.nextUrl.pathname.startsWith("/api");

    // 2. إذا لم يكن المستخدم أدمن
    if (token?.role !== "admin") {
      if (isApiRoute) {
        return NextResponse.json({ message: "Not Authorized" }, { status: 403 });
      }
      return NextResponse.redirect(new URL("/login", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/login", 
    }
  }
);

export const config = {
  matcher: [
    "/admin/:path*",        
    "/api/admin/:path*" 
  ], 
};
