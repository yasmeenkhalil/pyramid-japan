"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Plus, X } from "lucide-react";

export default function AddSpecificationModal() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [nameAr, setNameAr] = useState<string>("");
  const [nameEn, setNameEn] = useState<string>("");
  const [nameJa, setNameJa] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleNameEnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNameEn(value);
    setSlug(
      value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
    );
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!nameAr || !nameEn || !nameJa || !slug) return;

    setLoading(true);
    try {
      const res = await fetch("/api/specifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nameAr, nameEn, nameJa, slug }),
      });

      if (res.ok) {
        setIsOpen(false);
        setNameAr("");
        setNameEn("");
        setNameJa("");
        setSlug("");
        router.refresh();
      } else {
        const errorData = await res.json();
        alert(errorData.message || "Failed to add specification");
      }
    } catch (error) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 rounded-xl bg-[#0B4EA2] px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-blue-700 transition-all cursor-pointer"
      >
        <Plus size={18} />
        Add Specification
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl border border-slate-100">
            <div className="flex items-center justify-between border-b pb-4 mb-5">
              <h3 className="text-xl font-bold text-gray-900">New Specification</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                  Name Arabic
                </label>
                <input
                  type="text"
                  required
                  placeholder="مثال: وزن التشغيل"
                  value={nameAr}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setNameAr(e.target.value)}
                  className="w-full border border-slate-200 px-4 py-3 rounded-xl text-sm bg-slate-50 text-gray-800 focus:border-[#0B4EA2] focus:bg-white focus:outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                  Name English
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Operating Weight"
                  value={nameEn}
                  onChange={handleNameEnChange}
                  className="w-full border border-slate-200 px-4 py-3 rounded-xl text-sm bg-slate-50 text-gray-800 focus:border-[#0B4EA2] focus:bg-white focus:outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                  Name Japanese
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 運転整備重量"
                  value={nameJa}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setNameJa(e.target.value)}
                  className="w-full border border-slate-200 px-4 py-3 rounded-xl text-sm bg-slate-50 text-gray-800 focus:border-[#0B4EA2] focus:bg-white focus:outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                  Slug (Auto Generated)
                </label>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"))}
                  className="w-full border border-slate-200 px-4 py-3 rounded-xl text-sm bg-slate-100 text-gray-500 font-mono focus:outline-none transition-all"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t mt-6">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-600 hover:bg-slate-50 border border-slate-200 transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#0B4EA2] hover:bg-blue-700 disabled:bg-blue-300 transition-all cursor-pointer"
                >
                  {loading ? "Saving..." : "Save Specification"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
