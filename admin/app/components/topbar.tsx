import {
  Bell,
  Search,
} from "lucide-react";

export default function Topbar() {
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
          {/* Search */}
          <div className="hidden lg:flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 w-[300px]">
            <Search size={18} className="text-slate-400" />

            <input
              type="text"
              placeholder="Search machinery..."
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>

          {/* Notifications */}
          <button className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white hover:bg-slate-50">
            <Bell size={20} />

            <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-red-500"></span>
          </button>

          {/* User */}
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
        </div>
      </div>
    </header>
  );
}