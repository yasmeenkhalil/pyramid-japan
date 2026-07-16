"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Plus, X } from "lucide-react";

export default function AddManufacturerModal() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>((""));
  const [slug, setSlug] = useState<string>((""));
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    setSlug(
      value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
    );
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !slug) return;

    setLoading(true);

    try {
      const res = await fetch("/api/manufacturers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, slug }),
      });

      if (res.ok) {
        setIsOpen(false);
        setName("");
        setSlug("");
        router.refresh();
      } else {
        const errorData = await res.json();
        alert(errorData.message || "Failed to add manufacturer");
      }
    } catch (error) {
      console.error(error);
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
        Add Manufacturer
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl border border-slate-100">
            <div className="flex items-center justify-between border-b pb-4 mb-5">
              <h3 className="text-xl font-bold text-gray-900">
                New Manufacturer
              </h3>
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
                  Manufacturer Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Caterpillar, Komatsu"
                  value={name}
                  onChange={handleNameChange}
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
                  placeholder="e.g. caterpillar"
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
                  {loading ? "Saving..." : "Save Manufacturer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
