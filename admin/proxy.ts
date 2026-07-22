import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// تصدير دالة الـ proxy بالاسم الصارم الجديد المطلوب للنظام
export const proxy = withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isApiRoute = req.nextUrl.pathname.startsWith("/api");

    // حماية لوحة التحكم ومنع أي مستخدم عادي من تصفح بيانات الإدارة والآليات
    if (token?.role !== "admin") {
      if (isApiRoute) {
        return NextResponse.json({ message: "Not Authorized" }, { status: 403 });
      }
      return NextResponse.redirect(new URL("/", req.url));
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
