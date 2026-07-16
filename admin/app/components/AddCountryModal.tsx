"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Plus, X } from "lucide-react";

export default function AddCountryModal() {
  const [open, setOpen] = useState<boolean>(false);
  const [nameAr, setNameAr] = useState<string>( "");
  const [nameEn, setNameEn] = useState<string>("");
  const [nameJa, setNameJa] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();

  const handleNameEnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNameEn(value);
    
    if (errors.nameEn) setErrors((prev) => ({ ...prev, nameEn: "" }));
    if (errors.slug) setErrors((prev) => ({ ...prev, slug: "" }));

    setSlug(
      value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
    );
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!nameEn.trim()) {
      newErrors.nameEn = "English name is required.";
    } else if (!/^[A-Za-z0-9\s\-_,.:()]+$/.test(nameEn)) {
      newErrors.nameEn = "English name must contain English characters only.";
    }

    if (!nameAr.trim()) {
      newErrors.nameAr = "Arabic name is required.";
    } else if (!/^[\u0600-\u06FF0-9\s\-_,.:()]+$/.test(nameAr)) {
      newErrors.nameAr = "Arabic name must contain Arabic characters only.";
    }

    if (!nameJa.trim()) {
      newErrors.nameJa = "Japanese name is required.";
    }

    if (!slug.trim()) {
      newErrors.slug = "Slug is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/export-countries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nameAr: nameAr.trim(),
          nameEn: nameEn.trim(),
          nameJa: nameJa.trim(),
          slug: slug.trim(),
        }),
      });

      if (res.ok) {
        handleClose();
        router.refresh();
      } else {
        const err = await res.json();
        if (err.message && err.message.toLowerCase().includes("slug")) {
          setErrors((prev) => ({ ...prev, slug: err.message }));
        } else if (err.message && err.message.toLowerCase().includes("name")) {
          setErrors((prev) => ({ ...prev, nameEn: err.message }));
        } else {
          alert(err.message || "Failed to add country");
        }
      }
    } catch (error) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setErrors({});
    setNameAr("");
    setNameEn("");
    setNameJa("");
    setSlug("");
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-2xl bg-[#0B4EA2] px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-blue-700 transition cursor-pointer"
      >
        <Plus size={18} />
        Add Country
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl border border-slate-100 flex flex-col max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between border-b pb-4 mb-5 shrink-0">
              <h3 className="text-xl font-bold text-gray-900">Add Export Country</h3>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden" noValidate>
              <div className="space-y-4 overflow-y-auto flex-1 pr-1 pb-4">
                
                <div>
                  <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${errors.nameAr ? "text-red-600" : "text-gray-500"}`}>
                    Name Arabic *
                  </label>
                  <input
                    type="text"
                    placeholder="أدخل الاسم العربي"
                    value={nameAr}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setNameAr(e.target.value);
                      if (errors.nameAr) setErrors((prev) => ({ ...prev, nameAr: "" }));
                    }}
                    className={`w-full border px-4 py-3 rounded-xl text-sm focus:outline-none transition-all ${
                      errors.nameAr ? "border-red-500 bg-red-50 text-red-900 focus:border-red-600 focus:bg-white" : "border-slate-200 bg-slate-50 text-gray-800 focus:border-[#0B4EA2] focus:bg-white"
                    }`}
                  />
                  {errors.nameAr && (
                    <p className="mt-1.5 text-xs text-red-600 font-bold bg-red-50 p-2 rounded-lg border border-red-200">🚨 {errors.nameAr}</p>
                  )}
                </div>

                <div>
                  <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${errors.nameEn ? "text-red-600" : "text-gray-500"}`}>
                    Name English *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter English name"
                    value={nameEn}
                    onChange={handleNameEnChange}
                    className={`w-full border px-4 py-3 rounded-xl text-sm focus:outline-none transition-all ${
                      errors.nameEn ? "border-red-500 bg-red-50 text-red-900 focus:border-red-600 focus:bg-white" : "border-slate-200 bg-slate-50 text-gray-800 focus:border-[#0B4EA2] focus:bg-white"
                    }`}
                  />
                  {errors.nameEn && (
                    <p className="mt-1.5 text-xs text-red-600 font-bold bg-red-50 p-2 rounded-lg border border-red-200">🚨 {errors.nameEn}</p>
                  )}
                </div>

                <div>
                  <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${errors.nameJa ? "text-red-600" : "text-gray-500"}`}>
                    Name Japanese *
                  </label>
                  <input
                    type="text"
                    placeholder="日本語の名前を入力してください"
                    value={nameJa}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setNameJa(e.target.value);
                      if (errors.nameJa) setErrors((prev) => ({ ...prev, nameJa: "" }));
                    }}
                    className={`w-full border px-4 py-3 rounded-xl text-sm focus:outline-none transition-all ${
                      errors.nameJa ? "border-red-500 bg-red-50 text-red-900 focus:border-red-600 focus:bg-white" : "border-slate-200 bg-slate-50 text-gray-800 focus:border-[#0B4EA2] focus:bg-white"
                    }`}
                  />
                  {errors.nameJa && (
                    <p className="mt-1.5 text-xs text-red-600 font-bold bg-red-50 p-2 rounded-lg border border-red-200">🚨 {errors.nameJa}</p>
                  )}
                </div>

                <div>
                  <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${errors.slug ? "text-red-600" : "text-gray-500"}`}>
                    Slug
                  </label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"));
                      if (errors.slug) setErrors((prev) => ({ ...prev, slug: "" }));
                    }}
                    className={`w-full border px-4 py-3 rounded-xl text-sm font-mono focus:outline-none transition-all ${
                      errors.slug ? "border-red-500 bg-red-50 text-red-900 focus:border-red-600 focus:bg-white" : "border-slate-200 bg-slate-100 text-gray-500"
                    }`}
                  />
                  {errors.slug && (
                    <p className="mt-1.5 text-xs text-red-600 font-bold bg-red-50 p-2 rounded-lg border border-red-200">🚨 {errors.slug}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t mt-6 shrink-0">
                <button
                  type="button"
                  onClick={handleClose}
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
    </>
  );
}
