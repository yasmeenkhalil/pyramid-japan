"use client";

import { useState } from "react";

interface Category {
  id: string;
  nameEn: string;
}

interface Machinery {
  id: string;
  titleEn: string;
  titleAr: string;
  titleJa: string;
  stockNo: string | null;
  year: number | null;
  hour: number | null;
  price: number | null;
  descriptionEn: string | null;
  descriptionAr: string | null;
  descriptionJa: string | null;
  featured: boolean;
  categoryId: string;
  images: { id: string; imageUrl: string }[];
}

interface MachineryModalProps {
  machinery?: Machinery | null;
  categories: Category[];
  onSuccess?: () => void;
}

export default function CategoryModal({ machinery, categories, onSuccess }: MachineryModalProps) {
  const [open, setOpen] = useState(false);

  const [titleEn, setTitleEn] = useState(machinery?.titleEn || "");
  const [titleAr, setTitleAr] = useState(machinery?.titleAr || "");
  const [titleJa, setTitleJa] = useState(machinery?.titleJa || "");
  const [stockNo, setStockNo] = useState(machinery?.stockNo || "");
  const [year, setYear] = useState(machinery?.year?.toString() || "");
  const [hour, setHour] = useState(machinery?.hour?.toString() || "");
  const [price, setPrice] = useState(machinery?.price?.toString() || "");
  const [descriptionEn, setDescriptionEn] = useState(machinery?.descriptionEn || "");
  const [descriptionAr, setDescriptionAr] = useState(machinery?.descriptionAr || "");
  const [descriptionJa, setDescriptionJa] = useState(machinery?.descriptionJa || "");
  const [featured, setFeatured] = useState(machinery?.featured || false);
  const [categoryId, setCategoryId] = useState(machinery?.categoryId || "");

  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>(machinery?.images.map(img => img.imageUrl) || []);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const isEditMode = !!machinery;

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!titleEn.trim()) newErrors.titleEn = "English title is required.";
    if (!titleAr.trim()) newErrors.titleAr = "Arabic title is required.";
    if (!titleJa.trim()) newErrors.titleJa = "Japanese title is required.";
    if (!categoryId) newErrors.categoryId = "Please select a category.";

    if (!isEditMode && files.length === 0) {
      newErrors.files = "At least one image is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);
      let uploadedUrls: string[] = [...previews];

      if (files.length > 0) {
        const uploadPromises = files.map(async (file) => {
          const formData = new FormData();
          formData.append("file", file);
          const res = await fetch("/api/upload", { method: "POST", body: formData });
          if (!res.ok) throw new Error("Image upload failed");
          const data: { url: string } = await res.json();
          return data.url;
        });
        
        const newUrls = await Promise.all(uploadPromises);
        uploadedUrls = isEditMode ? [...uploadedUrls, ...newUrls] : newUrls;
      }

      const apiUrl = isEditMode ? `/api/machinery/${machinery.id}` : "/api/machinery";
      const apiMethod = isEditMode ? "PUT" : "POST";

      const res = await fetch(apiUrl, {
        method: apiMethod,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titleEn: titleEn.trim(),
          titleAr: titleAr.trim(),
          titleJa: titleJa.trim(),
          stockNo: stockNo.trim() || null,
          year: year ? parseInt(year) : null,
          hour: hour ? parseInt(hour) : null,
          price: price ? parseFloat(price) : null,
          descriptionEn: descriptionEn.trim() || null,
          descriptionAr: descriptionAr.trim() || null,
          descriptionJa: descriptionJa.trim() || null,
          featured,
          categoryId,
          images: uploadedUrls,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
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
      setTitleEn("");
      setTitleAr("");
      setTitleJa("");
      setStockNo("");
      setYear("");
      setHour("");
      setPrice("");
      setDescriptionEn("");
      setDescriptionAr("");
      setDescriptionJa("");
      setFeatured(false);
      setCategoryId("");
      setFiles([]);
      setPreviews([]);
    }
  };

  const removeExistingImage = (urlToRemove: string) => {
    setPreviews((prev) => prev.filter((url) => url !== urlToRemove));
  };

  const removeNewFile = (indexToRemove: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== indexToRemove));
  };
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-2xl bg-[#0B4EA2] px-4 py-2 text-white font-medium shadow-md hover:bg-[#093d80] transition"
      >
        {isEditMode ? "Edit" : "Add Machinery"}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 p-4">
          <div className="flex min-h-full items-center justify-center py-8">
            <div className="w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl bg-white p-6 shadow-2xl overflow-hidden">
              
              <h2 className="mb-4 text-xl font-bold text-gray-900 shrink-0">
                {isEditMode ? "Edit Machinery" : "Add New Machinery"}
              </h2>

              <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden" noValidate>
                
                <div className="space-y-4 overflow-y-auto flex-1 pr-2 pb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  <div className="md:col-span-2 space-y-4">
                    <div>
                      <label className={`block text-xs font-bold mb-1 ${errors.titleEn ? "text-red-600" : "text-gray-500"}`}>English Title *</label>
                      <input
                        type="text"
                        placeholder="Enter English title"
                        value={titleEn}
                        onChange={(e) => {
                          setTitleEn(e.target.value);
                          if (errors.titleEn) setErrors((prev) => ({ ...prev, titleEn: "" }));
                        }}
                        className={`w-full rounded-xl border p-3 focus:outline-none text-gray-900 transition ${errors.titleEn ? "border-red-500 bg-red-50 focus:border-red-600" : "border-gray-200 bg-white focus:border-[#0B4EA2]"}`}
                      />
                      {errors.titleEn && <p className="mt-1.5 text-xs text-red-600 font-bold bg-red-50 p-2 rounded-lg border border-red-200">🚨 {errors.titleEn}</p>}
                    </div>

                    <div>
                      <label className={`block text-xs font-bold mb-1 ${errors.titleAr ? "text-red-600" : "text-gray-500"}`}>Arabic Title *</label>
                      <input
                        type="text"
                        placeholder="أدخل العنوان العربي"
                        value={titleAr}
                        onChange={(e) => {
                          setTitleAr(e.target.value);
                          if (errors.titleAr) setErrors((prev) => ({ ...prev, titleAr: "" }));
                        }}
                        className={`w-full rounded-xl border p-3 focus:outline-none text-gray-900 transition ${errors.titleAr ? "border-red-500 bg-red-50 focus:border-red-600" : "border-gray-200 bg-white focus:border-[#0B4EA2]"}`}
                      />
                      {errors.titleAr && <p className="mt-1.5 text-xs text-red-600 font-bold bg-red-50 p-2 rounded-lg border border-red-200">🚨 {errors.titleAr}</p>}
                    </div>

                    <div>
                      <label className={`block text-xs font-bold mb-1 ${errors.titleJa ? "text-red-600" : "text-gray-500"}`}>Japanese Title *</label>
                      <input
                        type="text"
                        placeholder="日本語のタイトルを入力してください"
                        value={titleJa}
                        onChange={(e) => {
                          setTitleJa(e.target.value);
                          if (errors.titleJa) setErrors((prev) => ({ ...prev, titleJa: "" }));
                        }}
                        className={`w-full rounded-xl border p-3 focus:outline-none text-gray-900 transition ${errors.titleJa ? "border-red-500 bg-red-50 focus:border-red-600" : "border-gray-200 bg-white focus:border-[#0B4EA2]"}`}
                      />
                      {errors.titleJa && <p className="mt-1.5 text-xs text-red-600 font-bold bg-red-50 p-2 rounded-lg border border-red-200">🚨 {errors.titleJa}</p>}
                    </div>

                    <div>
                      <label className={`block text-xs font-bold mb-1 ${errors.categoryId ? "text-red-600" : "text-gray-500"}`}>Category *</label>
                      <select
                        value={categoryId}
                        onChange={(e) => {
                          setCategoryId(e.target.value);
                          if (errors.categoryId) setErrors((prev) => ({ ...prev, categoryId: "" }));
                        }}
                        className={`w-full rounded-xl border p-3 focus:outline-none text-gray-900 transition cursor-pointer ${errors.categoryId ? "border-red-500 bg-red-50 focus:border-red-600" : "border-gray-200 bg-white focus:border-[#0B4EA2]"}`}
                      >
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>{cat.nameEn}</option>
                        ))}
                      </select>
                      {errors.categoryId && <p className="mt-1.5 text-xs text-red-600 font-bold bg-red-50 p-2 rounded-lg border border-red-200">🚨 {errors.categoryId}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1 text-gray-500">Stock Number</label>
                    <input
                      type="text"
                      placeholder="e.g. ST-2016"
                      value={stockNo}
                      onChange={(e) => setStockNo(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 p-3 focus:outline-none focus:border-[#0B4EA2] text-gray-900 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-1 text-gray-500">Year</label>
                    <input
                      type="number"
                      placeholder="e.g. 2016"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 p-3 focus:outline-none focus:border-[#0B4EA2] text-gray-900 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-1 text-gray-500">Hours</label>
                    <input
                      type="number"
                      placeholder="e.g. 5458"
                      value={hour}
                      onChange={(e) => setHour(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 p-3 focus:outline-none focus:border-[#0B4EA2] text-gray-900 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-1 text-gray-500">Price ($)</label>
                    <input
                      type="number"
                      placeholder="Leave empty for 'Ask Price'"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 p-3 focus:outline-none focus:border-[#0B4EA2] text-gray-900 bg-white"
                    />
                  </div>

                  <div className="md:col-span-2 space-y-4">
                    <div>
                      <label className="block text-xs font-bold mb-1 text-gray-500">English Description</label>
                      <textarea
                        rows={2}
                        placeholder="Description in English"
                        value={descriptionEn}
                        onChange={(e) => setDescriptionEn(e.target.value)}
                        className="w-full rounded-xl border border-gray-200 p-3 focus:outline-none focus:border-[#0B4EA2] text-gray-900 bg-white resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold mb-1 text-gray-500">Arabic Description</label>
                      <textarea
                        rows={2}
                        placeholder="الوصف باللغة العربية"
                        value={descriptionAr}
                        onChange={(e) => setDescriptionAr(e.target.value)}
                        className="w-full rounded-xl border border-gray-200 p-3 focus:outline-none focus:border-[#0B4EA2] text-gray-900 bg-white resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold mb-1 text-gray-500">Japanese Description</label>
                      <textarea
                        rows={2}
                        placeholder="日本語の説明"
                        value={descriptionJa}
                        onChange={(e) => setDescriptionJa(e.target.value)}
                        className="w-full rounded-xl border border-gray-200 p-3 focus:outline-none focus:border-[#0B4EA2] text-gray-900 bg-white resize-none"
                      />
                    </div>

                    <div className="flex items-center gap-2 p-1">
                      <input
                        type="checkbox"
                        id="featured"
                        checked={featured}
                        onChange={(e) => setFeatured(e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 text-[#0B4EA2] focus:ring-[#0B4EA2] cursor-pointer"
                      />
                      <label htmlFor="featured" className="text-sm font-bold text-gray-700 cursor-pointer">Feature this machinery on homepage</label>
                    </div>

                    <div className="space-y-2">
                      <label className={`block text-xs font-bold mb-1 ${errors.files ? "text-red-600" : "text-gray-500"}`}>Machinery Images *</label>
                      <div className={`rounded-xl border p-4 transition ${errors.files ? "border-red-500 bg-red-50" : "border-gray-200 bg-zinc-50"}`}>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={(e) => {
                            if (!e.target.files) return;
                            const chosenFiles = Array.from(e.target.files);
                            setFiles((prev) => [...prev, ...chosenFiles]);
                            if (errors.files) setErrors((prev) => ({ ...prev, files: "" }));
                          }}
                          className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-[#0B4EA2] hover:file:bg-blue-100 cursor-pointer mb-4"
                        />

                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                          {previews.map((url, index) => (
                            <div key={`existing-${index}`} className="relative h-20 w-full rounded-xl border overflow-hidden group shadow-sm bg-white">
                              <img src={url} alt="Existing" className="h-full w-full object-cover" />
                              <button
                                type="button"
                                onClick={() => removeExistingImage(url)}
                                className="absolute top-1 right-1 bg-red-600 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold shadow hover:bg-red-700 transition"
                              >
                                ×
                              </button>
                            </div>
                          ))}

                          {files.map((file, index) => {
                            const objectUrl = URL.createObjectURL(file);
                            return (
                              <div key={`new-${index}`} className="relative h-20 w-full rounded-xl border border-dashed border-[#0B4EA2] overflow-hidden group shadow-sm bg-blue-50/50">
                                <img src={objectUrl} alt="New Preview" className="h-full w-full object-cover" />
                                <button
                                  type="button"
                                  onClick={() => removeNewFile(index)}
                                  className="absolute top-1 right-1 bg-gray-800 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold shadow hover:bg-gray-900 transition"
                                >
                                  ×
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      {errors.files && <p className="mt-1.5 text-xs text-red-600 font-bold bg-red-50 p-2 rounded-lg border border-red-200">🚨 {errors.files}</p>}
                    </div>
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
