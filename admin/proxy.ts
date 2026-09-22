import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 1. تعريف هيدرز الـ CORS المطلوبة بشكل موحد
const corsHeaders = {
  "Access-Control-Allow-Origin": "https://app.pyramidjapan.jp",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS, PATCH",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version",
  "Access-Control-Allow-Credentials": "true",
  "Access-Control-Max-Age": "86400", // كاش للإعدادات لتسريع الطلبات القادمة
};

// 2. دالة لفحص ومعالجة طلبات الـ CORS المبكرة (OPTIONS)
function handleCors(req: NextRequest) {
  if (req.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 204,
      headers: corsHeaders,
    });
  }
  return null;
}

// 3. تصدير دالة الـ middleware المحدثة
export default withAuth(
  function middleware(req) {
    // أ) فحص ومعالجة الـ CORS أولاً (مهم جداً لمنع الحظر التلقائي)
    const corsResponse = handleCors(req);
    if (corsResponse) return corsResponse;

    const token = req.nextauth.token;
    const isApiRoute = req.nextUrl.pathname.startsWith("/api");

    // ب) إذا لم يكن المستخدم أدمن
    if (token?.role !== "admin") {
      if (isApiRoute) {
        // نرجع خطأ 403 مع تمرير هيدرز الـ CORS لئلا يظهر خطأ CORS بالمتصفح
        return NextResponse.json(
          { message: "Not Authorized" }, 
          { status: 403, headers: corsHeaders } 
        );
      }
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // ج) في حال النجاح (المستخدم أدمن ومصرح له)
    const response = NextResponse.next();
    // نرفق هيدرز الـ CORS مع الاستجابة الناجحة
    Object.entries(corsHeaders).forEach(([key, value]) => {
      response.headers.set(key, value);
    });
    return response;
  },
  {
    callbacks: {
      // تعديل جوهري: السماح بمرور طلبات الـ OPTIONS والـ CORS دون فحص التوكن لمنع حظر المتصفح
      authorized: ({ token, req }) => {
        if (req.method === "OPTIONS") return true;
        return !!token;
      },
    },
    pages: {
      signIn: "/login", 
    }
  }
);

export const config = {
  matcher: [
    "/admin/:path*",        
    "/api/admin/:path*",
  ], 
};

