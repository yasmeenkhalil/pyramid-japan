"use client"; 

import { Bell, Search, LogOut } from "lucide-react"; 
import { signOut } from "next-auth/react"; 
export default function Topbar() {
  
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  return (
    <header className="h-[90px] border-b border-slate-200 bg-white px-8">
      <div className="flex h-full items-center justify-between">
        {/* Left Side */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Dashboard
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Welcome back to Pyramid Japan Administration
          </p>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          
          {/* User & Logout Section */}
          <div className="flex items-center gap-4">
            {/* بطاقة بيانات الأدمن الحالية */}
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0B4EA2] text-white font-bold">
                A
              </div>

              <div className="hidden sm:block">
                <p className="font-semibold text-slate-900">
                  Admin
                </p>

                <p className="text-xs text-slate-500">
                  System Administrator
                </p>
              </div>
            </div>

            {/* 🟢 زر تسجيل الخروج الجديد بتصميم متناسق */}
            <button
              onClick={handleLogout}
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 transition-all shadow-sm active:scale-95 cursor-pointer"
              title="Log Out"
            >
              <LogOut size={18} />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
