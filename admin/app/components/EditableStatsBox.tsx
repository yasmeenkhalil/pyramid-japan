"use client";

import { useState } from "react";
import { Globe, GraduationCap, Ship, Save, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

interface EditableStatsBoxProps {
  initialStats: {
    countries_count: string;
    experience_years: string;
    machines_count: string;
  };
}

export default function EditableStatsBox({ initialStats }: EditableStatsBoxProps) {
  const [stats, setStats] = useState(initialStats);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(stats),
      });

      if (!res.ok) throw new Error("Failed to update settings");

      toast.success("Stats updated successfully!", {
        duration: 4000,
        style: {
          borderRadius: "14px",
          background: "#10B981",
          color: "#fff",
          fontSize: "14px",
          fontWeight: "600",
        },
      });

    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-[28px] bg-white p-6 shadow-sm border border-slate-200">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Website Quick Stats</h3>
          <p className="text-xs text-slate-500 mt-0.5">Manage numbers displayed on the homepage counter.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-xl bg-[#0B4EA2] px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#1E40AF] transition disabled:opacity-50"
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          Save Changes
        </button>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100 space-y-2">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <Globe size={14} className="text-[#0B4EA2]" />
            Countries Served
          </div>
          <div className="relative flex items-center">
            <input
              type="text"
              value={stats.countries_count}
              onChange={(e) => setStats({ ...stats, countries_count: e.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 focus:border-[#0B4EA2] focus:outline-none pr-8"
            />
            <span className="absolute right-3 text-sm font-bold text-slate-400 pointer-events-none">+</span>
          </div>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100 space-y-2">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <GraduationCap size={14} className="text-[#0B4EA2]" />
            Years Experience
          </div>
          <div className="relative flex items-center">
            <input
              type="text"
              value={stats.experience_years}
              onChange={(e) => setStats({ ...stats, experience_years: e.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 focus:border-[#0B4EA2] focus:outline-none pr-8"
            />
            <span className="absolute right-3 text-sm font-bold text-slate-400 pointer-events-none">+</span>
          </div>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100 space-y-2">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <Ship size={14} className="text-[#0B4EA2]" />
            Machines Exported
          </div>
          <div className="relative flex items-center">
            <input
              type="text"
              value={stats.machines_count}
              onChange={(e) => setStats({ ...stats, machines_count: e.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 focus:border-[#0B4EA2] focus:outline-none pr-8"
            />
            <span className="absolute right-3 text-sm font-bold text-slate-400 pointer-events-none">+</span>
          </div>
        </div>
      </div>
    </div>
  );
}
