"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Tractor,
  FolderKanban,
  Mail,
  Users,
  Settings,
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

  return (
    <aside className="flex w-[280px] flex-col bg-[#0B4EA2] text-white">
      {/* Logo */}
      <div className="px-7 pt-8 pb-6">
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

      {/* Navigation */}
      <div className="flex-1 px-4">
        <div className="space-y-2">
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
                  ${
                    active
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

      {/* Footer User Card */}
      <div className="p-5">
        <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#0B4EA2] font-bold">
              A
            </div>

            <div>
              <p className="font-semibold">
                Admin
              </p>

              <p className="text-xs text-blue-100">
                System Administrator
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}