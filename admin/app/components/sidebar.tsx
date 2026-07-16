"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Tractor,
  FolderKanban,
  Mail,
  Users,
  Sliders,
  Building2,
  Globe,
  Ruler,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Machinery",
    href: "/admin/machinery",
    icon: Tractor,
  },
  {
    name: "Categories",
    href: "/admin/categories",
    icon: FolderKanban,
  },
  {
    name: "Manufacturers",
    href: "/admin/manufacturers",
    icon: Building2,
  },
  {
    name: "Specifications",
    href: "/admin/specifications",
    icon: Sliders,
  },
  {
    name: "Units",
    href: "/admin/units",
    icon: Ruler,
  },
  {
    name: "Export Countries",
    href: "/admin/export-countries",
    icon: Globe,
  },
  {
    name: "Inquiries",
    href: "/admin/inquiries",
    icon: Mail,
  },
  {
    name: "Users",
    href: "/admin/users",
    icon: Users,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  // فحص ما إذا كان المستخدم يقف حالياً داخل صفحة البروفايل لتمييز الصندوق باللون الأبيض
  const isProfileActive = pathname === "/admin/profile";

  return (
    <aside className="flex h-full w-[280px] flex-col bg-[#0B4EA2] text-white overflow-hidden shrink-0">
      <div className="px-7 pt-8 pb-6 shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
            <Tractor size={24} />
          </div>

          <div>
            <h2 className="font-bold text-xl">
              Pyramid Japan
            </h2>
            <p className="text-xs text-blue-100">
              Machinery Management
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-4 custom-scrollbar">
        <div className="space-y-2 pb-6">
          {menuItems.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-3
                  rounded-xl
                  px-4 py-3
                  transition-all duration-200
                  ${active
                    ? "bg-white text-[#0B4EA2] shadow-lg"
                    : "text-blue-100 hover:bg-white/10"
                  }
                `}
              >
                <Icon size={20} />
                <span className="font-medium">
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* 🟢 التحديث الجديد: تحويل الصندوق السفلي إلى زر رابط تفاعلي يدخل على صفحة الـ profile */}
      <div className="p-5 shrink-0 bg-[#0B4EA2] border-t border-white/10">
        <Link
          href="/admin/profile"
          className={`
            block rounded-2xl p-4 backdrop-blur
            transition-all duration-200 cursor-pointer select-none
            ${isProfileActive
              ? "bg-white text-[#0B4EA2] shadow-xl scale-[1.02]" 
              : "bg-white/10 text-white hover:bg-white/15 hover:scale-[1.01] active:scale-[0.99]"
            }
          `}
        >
          <div className="flex items-center gap-3">
            {/* الدائرة التي تحتوي على الحرف الأول من الاسم */}
            <div 
              className={`
                flex h-11 w-11 items-center justify-center rounded-full font-bold transition-colors
                ${isProfileActive ? "bg-[#0B4EA2] text-white" : "bg-white text-[#0B4EA2]"}
              `}
            >
              A
            </div>

            <div>
              <p className="font-semibold leading-none">
                Admin
              </p>
              <p className={`text-xs mt-1 font-medium transition-colors ${isProfileActive ? "text-slate-500" : "text-blue-100"}`}>
                System Administrator
              </p>
            </div>
          </div>
        </Link>
      </div>
    </aside>
  );
}
