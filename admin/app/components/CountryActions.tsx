"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Edit2, Trash2, X, AlertTriangle } from "lucide-react";

interface CountryActionsProps {
  id: string;
  nameAr: string;
  nameEn: string;
  nameJa: string;
  slug: string;
}

export default function CountryActions({ id, nameAr, nameEn, nameJa, slug }: CountryActionsProps) {
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const [editNameAr, setEditNameAr] = useState<string>(nameAr);
  const [editNameEn, setEditNameEn] = useState<string>(nameEn);
  const [editNameJa, setEditNameJa] = useState<string>(nameJa);
  const [editSlug, setEditSlug] = useState<string>(slug);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleNameEnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEditNameEn(value);
    setEditSlug(
      value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
    );
  };

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/export-countries/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nameAr: editNameAr, nameEn: editNameEn, nameJa: editNameJa, slug: editSlug }),
      });
      if (res.ok) {
        setIsEditOpen(false);
        router.refresh();
      } else {
        const err = await res.json();
        alert(err.message || "Failed to update");
      }
    } catch (error) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/export-countries/${id}`, { method: "DELETE" });
      if (res.ok) {
        setIsDeleteOpen(false);
        router.refresh();
      } else {
        alert("Failed to delete");
      }
    } catch (error) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setIsEditOpen(true)}
        className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-blue-600 shadow-sm hover:bg-slate-50 transition-all cursor-pointer"
      >
        <Edit2 size={16} />
      </button>

      <button
        onClick={() => setIsDeleteOpen(true)}
        className="flex h-9 w-9 items-center justify-center rounded-xl border border-red-100 bg-red-50 text-red-600 shadow-sm hover:bg-red-100 transition-all cursor-pointer"
      >
        <Trash2 size={16} />
      </button>

      {isEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl border border-slate-100">
            <div className="flex items-center justify-between border-b pb-4 mb-5">
              <h3 className="text-xl font-bold text-gray-900">Edit Export Country</h3>
              <button
                onClick={() => setIsEditOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                  Name Arabic
                </label>
                <input
                  type="text"
                  required
                  value={editNameAr}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setEditNameAr(e.target.value)}
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
                  value={editNameEn}
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
                  value={editNameJa}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setEditNameJa(e.target.value)}
                  className="w-full border border-slate-200 px-4 py-3 rounded-xl text-sm bg-slate-50 text-gray-800 focus:border-[#0B4EA2] focus:bg-white focus:outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                  Slug
                </label>
                <input
                  type="text"
                  required
                  value={editSlug}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setEditSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"))}
                  className="w-full border border-slate-200 px-4 py-3 rounded-xl text-sm bg-slate-100 text-gray-500 font-mono focus:outline-none transition-all"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t mt-6">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-600 hover:bg-slate-50 border border-slate-200 transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#0B4EA2] hover:bg-blue-700 disabled:bg-blue-300 transition-all cursor-pointer"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isDeleteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-xl border border-slate-100 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600 mb-4">
              <AlertTriangle size={28} />
            </div>
            
            <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Country</h3>
            <p className="text-sm text-gray-500 mb-6">
              Are you sure you want to delete <span className="font-semibold text-gray-800">"{nameEn}"</span>? This action cannot be undone.
            </p>

            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setIsDeleteOpen(false)}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-600 hover:bg-slate-50 border border-slate-200 transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={loading}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-red-600 hover:bg-red-700 disabled:bg-red-300 transition-all cursor-pointer"
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
