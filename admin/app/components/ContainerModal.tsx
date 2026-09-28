"use client";

import { useState, useEffect } from "react";

interface Container {
  id: string;
  imageUrl: string;
  titleAr?: string | null;
  titleEn?: string | null;
  titleRu?: string | null;
  titleJa?: string | null;
  exportCountryId?: string | null;
}

interface ContainerModalProps {
  container?: Container | null;
  onSuccess?: () => void;
}
export default function ContainerModal({ container, onSuccess }: ContainerModalProps) {
  const [open, setOpen] = useState(false);
  const [countries, setCountries] = useState<any[]>([]);

  // إعداد حالات الحقول للغات الأربع والدولة
  const [titleAr, setTitleAr] = useState(container?.titleAr || "");
  const [titleEn, setTitleEn] = useState(container?.titleEn || "");
  const [titleRu, setTitleRu] = useState(container?.titleRu || "");
  const [titleJa, setTitleJa] = useState(container?.titleJa || "");
  const [exportCountryId, setExportCountryId] = useState(container?.exportCountryId || "");

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState(container?.imageUrl || "");
  const [loading, setLoading] = useState(false);
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const isEditMode = !!container;

  // جلب الدول عند فتح المودال لتعبئة القائمة المنسدلة
  useEffect(() => {
    if (open) {
      fetch("/api/export-countries")
        .then((res) => res.json())
        .then((data) => setCountries(data))
        .catch((err) => console.error("Failed to load countries", err));
    }
  }, [open]);
 const validateForm = (): boolean => {
  const newErrors: { [key: string]: string } = {};

  if (!isEditMode && !file) {
    newErrors.file = "Container image is required.";
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

      const apiUrl = isEditMode ? `/api/containers/${container.id}` : "/api/containers";
      const apiMethod = isEditMode ? "PUT" : "POST";

      const containerRes = await fetch(apiUrl, {
        method: apiMethod,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          titleAr: titleAr.trim() || null,
          titleEn: titleEn.trim() || null,
          titleRu: titleRu.trim() || null,
          titleJa: titleJa.trim() || null,
          exportCountryId: exportCountryId || null,
          imageUrl: finalImageUrl,
        }),
      });

      if (!containerRes.ok) {
        const errorData = await containerRes.json();
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
      setTitleAr("");
      setTitleEn("");
      setTitleRu("");
      setTitleJa("");
      setExportCountryId("");
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
        {isEditMode ? "Edit" : "Add Container Image"}
      </button>
      
      {open && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 p-4">
          <div className="flex min-h-full items-center justify-center py-8">
            <div className="w-full max-w-lg max-h-[90vh] flex flex-col rounded-3xl bg-white p-6 shadow-2xl overflow-hidden">            
              
              <h2 className="mb-4 text-xl font-bold text-gray-900 shrink-0">
                {isEditMode ? "Edit Container Data" : "Add Container Image"}
              </h2>

              <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden" noValidate>
                
                <div className="space-y-4 overflow-y-auto flex-1 pr-2 pb-4">
                  
                  {/* الحقل الإنجليزي */}
                  <div>
                    <label className={`block text-xs font-bold mb-1 ${errors.titleEn ? "text-red-600" : "text-gray-500"}`}>
                      English Title
                    </label>
                    <input
                      type="text"
                      placeholder="Enter English title"
                      value={titleEn}
                      onChange={(e) => {
                        setTitleEn(e.target.value);
                        if (errors.titleEn) setErrors((prev) => ({ ...prev, titleEn: "" }));
                      }}
                      className={`w-full rounded-xl border p-3 focus:outline-none text-gray-900 transition ${
                        errors.titleEn ? "border-red-500 bg-red-50 focus:border-red-600" : "border-gray-200 bg-white focus:border-[#0B4EA2]"
                      }`}
                    />
                    {errors.titleEn && <p className="mt-1.5 text-xs text-red-600 font-bold bg-red-50 p-2 rounded-lg border border-red-200">🚨 {errors.titleEn}</p>}
                  </div>

                  {/* الحقل العربي */}
                  <div>
                    <label className={`block text-xs font-bold mb-1 ${errors.titleAr ? "text-red-600" : "text-gray-500"}`}>
                      Arabic Title
                    </label>
                    <input
                      type="text"
                      placeholder="أدخل العنوان بالعربية"
                      value={titleAr}
                      onChange={(e) => {
                        setTitleAr(e.target.value);
                        if (errors.titleAr) setErrors((prev) => ({ ...prev, titleAr: "" }));
                      }}
                      className={`w-full rounded-xl border p-3 focus:outline-none text-gray-900 transition text-right ${
                        errors.titleAr ? "border-red-500 bg-red-50 focus:border-red-600" : "border-gray-200 bg-white focus:border-[#0B4EA2]"
                      }`}
                    />
                    {errors.titleAr && <p className="mt-1.5 text-xs text-red-600 font-bold bg-red-50 p-2 rounded-lg border border-red-200">🚨 {errors.titleAr}</p>}
                  </div>

                  {/* الحقل الياباني */}
                  <div>
                    <label className="block text-xs font-bold mb-1 text-gray-500">
                      Japanese Title
                    </label>
                    <input
                      type="text"
                      placeholder="日本語のタイトルを入力してください"
                      value={titleJa}
                      onChange={(e) => setTitleJa(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 bg-white p-3 focus:outline-none text-gray-900 transition focus:border-[#0B4EA2]"
                    />
                  </div>

                  {/* الحقل الروسي */}
                  <div>
                    <label className={`block text-xs font-bold mb-1 ${errors.titleRu ? "text-red-600" : "text-gray-500"}`}>
                      Russian Title
                    </label>
                    <input
                      type="text"
                      placeholder="Введите русское название"
                      value={titleRu}
                      onChange={(e) => {
                        setTitleRu(e.target.value);
                        if (errors.titleRu) setErrors((prev) => ({ ...prev, titleRu: "" }));
                      }}
                      className={`w-full rounded-xl border p-3 focus:outline-none text-gray-900 transition ${
                        errors.titleRu ? "border-red-500 bg-red-50 focus:border-red-600" : "border-gray-200 bg-white focus:border-[#0B4EA2]"
                      }`}
                    />
                    {errors.titleRu && <p className="mt-1.5 text-xs text-red-600 font-bold bg-red-50 p-2 rounded-lg border border-red-200">🚨 {errors.titleRu}</p>}
                  </div>

                  {/* اختيار الدولة المصدر إليها */}
                  <div>
                    <label className="block text-xs font-bold mb-1 text-gray-500">
                      Destination Country (Optional)
                    </label>
                    <select
                      value={exportCountryId}
                      onChange={(e) => setExportCountryId(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 bg-white p-3 focus:outline-none text-gray-900 transition cursor-pointer focus:border-[#0B4EA2]"
                    >
                      <option value="">Select Destination Country</option>
                      {countries.map((country) => (
                        <option key={country.id} value={country.id}>
                          {country.nameEn} ({country.nameAr})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* اختيار الصورة */}
                  <div className="space-y-2">
                    <label className={`block text-xs font-bold mb-1 ${errors.file ? "text-red-600" : "text-gray-500"}`}>
                      Container Image {isEditMode ? "" : "*"}
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
