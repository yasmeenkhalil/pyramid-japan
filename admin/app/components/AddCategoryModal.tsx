"use client";

import { useState } from "react";

interface Category {
  id: string | number;
  nameEn: string;
  nameAr: string;
  nameJa: string;
  imageUrl: string;
  sector: string;
}

interface CategoryModalProps {
  category?: Category | null;
  onSuccess?: () => void;
}

export default function CategoryModal({ category, onSuccess }: CategoryModalProps) {
  const [open, setOpen] = useState(false);

  const [nameEn, setNameEn] = useState(category?.nameEn || "");
  const [nameAr, setNameAr] = useState(category?.nameAr || "");
  const [nameJa, setNameJa] = useState(category?.nameJa || "");
  const [sector, setSector] = useState(category?.sector || "");

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState(category?.imageUrl || "");
  const [loading, setLoading] = useState(false);
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const isEditMode = !!category;

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

    if (!sector) {
      newErrors.sector = "Please select a sector.";
    }

    if (!isEditMode && !file) {
      newErrors.file = "Category image is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);
      let finalImageUrl = preview;

      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!uploadRes.ok) throw new Error("Image upload failed");
        const uploadData: { url: string } = await uploadRes.json();
        finalImageUrl = uploadData.url;
      }

      const apiUrl = isEditMode ? `/api/categories/${category.id}` : "/api/categories";
      const apiMethod = isEditMode ? "PUT" : "POST";

      const categoryRes = await fetch(apiUrl, {
        method: apiMethod,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nameEn: nameEn.trim(),
          nameAr: nameAr.trim(),
          nameJa: nameJa.trim(),
          sector,
          imageUrl: finalImageUrl,
        }),
      });

      if (!categoryRes.ok) {
        const errorData = await categoryRes.json();
        throw new Error(errorData.error || "Operation failed");
      }

      setOpen(false);
      if (onSuccess) onSuccess();
      else window.location.reload();
    } catch (error: unknown) {
      console.error(error);
      alert(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  const handleClose = () => {
    setOpen(false);
    setErrors({});
    if (!isEditMode) {
      setNameEn("");
      setNameAr("");
      setNameJa("");
      setSector("");
      setFile(null);
      setPreview("");
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-2xl bg-[#0B4EA2] px-4 py-2 text-white font-medium shadow-md hover:bg-[#093d80] transition"
      >
        {isEditMode ? "Edit" : "Add Category"}
      </button>
      
      {open && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 p-4">
          <div className="flex min-h-full items-center justify-center py-8">
            <div className="w-full max-w-lg max-h-[90vh] flex flex-col rounded-3xl bg-white p-6 shadow-2xl overflow-hidden">            
              
              <h2 className="mb-4 text-xl font-bold text-gray-900 shrink-0">
                {isEditMode ? "Edit Category" : "Add Category"}
              </h2>

              <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden" noValidate>
                
                <div className="space-y-4 overflow-y-auto flex-1 pr-2 pb-4">
                  
                  <div>
                    <label className={`block text-xs font-bold mb-1 ${errors.nameEn ? "text-red-600" : "text-gray-500"}`}>
                      English Name *
                    </label>
                    <input
                      type="text"
                      placeholder="Enter English name"
                      value={nameEn}
                      onChange={(e) => {
                        setNameEn(e.target.value);
                        if (errors.nameEn) setErrors((prev) => ({ ...prev, nameEn: "" }));
                      }}
                      className={`w-full rounded-xl border p-3 focus:outline-none text-gray-900 transition ${
                        errors.nameEn ? "border-red-500 bg-red-50 focus:border-red-600" : "border-gray-200 bg-white focus:border-[#0B4EA2]"
                      }`}
                    />
                    {errors.nameEn && <p className="mt-1.5 text-xs text-red-600 font-bold bg-red-50 p-2 rounded-lg border border-red-200">🚨 {errors.nameEn}</p>}
                  </div>

                  <div>
                    <label className={`block text-xs font-bold mb-1 ${errors.nameAr ? "text-red-600" : "text-gray-500"}`}>
                      Arabic Name *
                    </label>
                    <input
                      type="text"
                      placeholder="أدخل الاسم العربي"
                      value={nameAr}
                      onChange={(e) => {
                        setNameAr(e.target.value);
                        if (errors.nameAr) setErrors((prev) => ({ ...prev, nameAr: "" }));
                      }}
                      className={`w-full rounded-xl border p-3 focus:outline-none text-gray-900 transition ${
                        errors.nameAr ? "border-red-500 bg-red-50 focus:border-red-600" : "border-gray-200 bg-white focus:border-[#0B4EA2]"
                      }`}
                    />
                    {errors.nameAr && <p className="mt-1.5 text-xs text-red-600 font-bold bg-red-50 p-2 rounded-lg border border-red-200">🚨 {errors.nameAr}</p>}
                  </div>

                  <div>
                    <label className={`block text-xs font-bold mb-1 ${errors.nameJa ? "text-red-600" : "text-gray-500"}`}>
                      Japanese Name *
                    </label>
                    <input
                      type="text"
                      placeholder="日本語の名前を入力してください"
                      value={nameJa}
                      onChange={(e) => {
                        setNameJa(e.target.value);
                        if (errors.nameJa) setErrors((prev) => ({ ...prev, nameJa: "" }));
                      }}
                      className={`w-full rounded-xl border p-3 focus:outline-none text-gray-900 transition ${
                        errors.nameJa ? "border-red-500 bg-red-50 focus:border-red-600" : "border-gray-200 bg-white focus:border-[#0B4EA2]"
                      }`}
                    />
                    {errors.nameJa && <p className="mt-1.5 text-xs text-red-600 font-bold bg-red-50 p-2 rounded-lg border border-red-200">🚨 {errors.nameJa}</p>}
                  </div>

                  <div>
                    <label className={`block text-xs font-bold mb-1 ${errors.sector ? "text-red-600" : "text-gray-500"}`}>
                      Sector *
                    </label>
                    <select
                      value={sector}
                      onChange={(e) => {
                        setSector(e.target.value);
                        if (errors.sector) setErrors((prev) => ({ ...prev, sector: "" }));
                      }}
                      className={`w-full rounded-xl border p-3 focus:outline-none text-gray-900 transition cursor-pointer ${
                        errors.sector ? "border-red-500 bg-red-50 focus:border-red-600" : "border-gray-200 bg-white focus:border-[#0B4EA2]"
                      }`}
                    >
                      <option value="">Select Sector</option>
                      <option value="construction">Construction Machinery (إنشائية)</option>
                      <option value="Industrial">Industrial Machinery (صناعية )</option>
                      <option value="agricultural">Agricultural Machinery (زراعية)</option>
                      <option value="maintenance">Maintenance & Support (صيانة ودعم فني)</option>
                    </select>
                    {errors.sector && <p className="mt-1.5 text-xs text-red-600 font-bold bg-red-50 p-2 rounded-lg border border-red-200">🚨 {errors.sector}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className={`block text-xs font-bold mb-1 ${errors.file ? "text-red-600" : "text-gray-500"}`}>
                      Category Image {isEditMode ? "" : "*"}
                    </label>
                    <div className={`flex items-center gap-4 rounded-xl border p-3 transition ${
                      errors.file ? "border-red-500 bg-red-50" : "border-gray-200 bg-zinc-50"
                    }`}>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const selectedFile = e.target.files?.[0];
                          if (!selectedFile) return;
                          setFile(selectedFile);
                          setPreview(URL.createObjectURL(selectedFile));
                          if (errors.file) setErrors((prev) => ({ ...prev, file: "" }));
                        }}
                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-[#0B4EA2] hover:file:bg-blue-100 cursor-pointer"
                      />
                      {preview && (
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border-2 border-white shadow-md">
                          <img src={preview} alt="Preview" className="h-full w-full object-cover" />
                        </div>
                      )}
                    </div>
                    {errors.file && <p className="mt-1.5 text-xs text-red-600 font-bold bg-red-50 p-2 rounded-lg border border-red-200">🚨 {errors.file}</p>}
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-6 border-t mt-auto shrink-0 bg-white">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="rounded-xl bg-slate-100 px-5 py-2 text-gray-700 font-medium hover:bg-slate-200 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="rounded-xl bg-[#0B4EA2] px-5 py-2 text-white font-medium disabled:opacity-50 hover:bg-[#093d80] transition"
                  >
                    {loading ? "Saving..." : "Save"}
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
