"use client";
import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Plus, X } from "lucide-react";
import MachinerySpecsForm from "./MachinerySpecsForm";
import ImageUploader from "./ImageUploader";

interface DropdownItem { 
  id: string; 
  nameEn?: string; 
  nameAr?: string; 
  name?: string; 
}

interface AddMachineryModalProps { 
  categories: DropdownItem[]; 
  manufacturers: DropdownItem[]; 
  availableSpecs: any[]; 
  availableUnits: any[]; 
}

interface SelectedSpec { 
  specificationId: string; 
  value: string; 
  unitId: string; 
}

export default function AddMachineryModal({ categories, manufacturers, availableSpecs, availableUnits }: AddMachineryModalProps) {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // حالات الإدخال (States)
  const [titleEn, setTitleEn] = useState("");
  const [titleAr, setTitleAr] = useState("");
  const [titleJa, setTitleJa] = useState("");
  const [slug, setSlug] = useState("");
  const [stockNo, setStockNo] = useState("");
  const [year, setYear] = useState("");
  const [hour, setHour] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [sector, setSector] = useState(""); // 💡 حقل السيكتور الجديد
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState(""); 
  const avgPrice = (minPrice && maxPrice) ? ((parseFloat(minPrice) + parseFloat(maxPrice)) / 2).toString() : "";
  const [descriptionEn, setDescriptionEn] = useState("");
  const [descriptionAr, setDescriptionAr] = useState("");
  const [descriptionJa, setDescriptionJa] = useState("");
  const [featured, setFeatured] = useState<boolean>(false);
  const [categoryId, setCategoryId] = useState("");
  const [manufacturerId, setManufacturerId] = useState("");
  const [selectedSpecs, setSelectedSpecs] = useState<SelectedSpec[]>([]);
  const [images, setImages] = useState<string[]>([]);

  const handleTitleEnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value; setTitleEn(value);
    if (errors.titleEn) setErrors(prev => ({ ...prev, titleEn: "" }));
    if (errors.slug) setErrors(prev => ({ ...prev, slug: "" }));
    setSlug(value.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-"));
  };

  // دالة التحقق الإلزامية (Validation)
  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    if (!titleEn.trim()) newErrors.titleEn = "English title is required.";
    if (!titleAr.trim()) newErrors.titleAr = "Arabic title is required.";
    if (!titleJa.trim()) newErrors.titleJa = "Japanese title is required.";
    if (!slug.trim()) newErrors.slug = "Slug is required.";
    if (!location.trim()) newErrors.location = "Location is required.";
    if (!sector) newErrors.sector = "Sector is required. Please select one."; // 💡 السيكتور إلزامي هنا
    if (!categoryId) newErrors.categoryId = "Please select a category.";
    if (!manufacturerId) newErrors.manufacturerId = "Please select a manufacturer.";
    setErrors(newErrors); 
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    if (!validateForm()) return; 
    setLoading(true);
    try {
      const res = await fetch("/api/machinery", {
        method: "POST", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titleEn: titleEn.trim(), 
          titleAr: titleAr.trim(), 
          titleJa: titleJa.trim(), 
          slug: slug.trim(),
          stockNo: stockNo.trim() || null, 
          year: year ? parseInt(year) : null, 
          hour: hour ? parseInt(hour) : null, 
          price: price ? parseFloat(price) : null,
          location: location.trim(), 
          sector, // 💡 إرسال القطاع المختار وجعله إجبارياً
          minPrice: minPrice ? parseFloat(minPrice) : null, 
          avgPrice: avgPrice ? parseFloat(avgPrice) : null, 
          maxPrice: maxPrice ? parseFloat(maxPrice) : null,
          descriptionEn: descriptionEn.trim() || null, 
          descriptionAr: descriptionAr.trim() || null, 
          descriptionJa: descriptionJa.trim() || null,
          featured, 
          categoryId, 
          manufacturerId, 
          specifications: selectedSpecs, 
          images: images,
        }),
      });
      if (res.ok) { 
        handleClose(); 
        router.refresh(); 
      } else {
        const err = await res.json();
        if (err.message?.toLowerCase().includes("slug")) {
          setErrors(prev => ({ ...prev, slug: err.message }));
        } else {
          alert(err.message || "Failed to add machinery");
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
    setTitleEn(""); 
    setTitleAr(""); 
    setTitleJa(""); 
    setSlug(""); 
    setStockNo(""); 
    setYear(""); 
    setHour(""); 
    setPrice(""); 
    setLocation(""); 
    setSector(""); // 💡 تصفير حقل القطاع عند الإغلاق
    setMinPrice("");  
    setMaxPrice(""); 
    setDescriptionEn(""); 
    setDescriptionAr(""); 
    setDescriptionJa(""); 
    setFeatured(false); 
    setCategoryId(""); 
    setManufacturerId(""); 
    setSelectedSpecs([]); 
    setImages([]);
  };

  return (
    <>
      <button onClick={() => setOpen(true)} className="flex items-center gap-2 rounded-2xl bg-[#0B4EA2] px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-blue-700 transition cursor-pointer">
        <Plus size={18} /> Add Machinery
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-[94vw] xl:max-w-[85vw] h-[92vh] rounded-3xl bg-white p-6 shadow-xl border border-slate-100 flex flex-col overflow-hidden">
            <div className="flex items-center justify-between border-b pb-4 mb-5 shrink-0">
              <h3 className="text-xl font-bold text-gray-900">Add New Machinery</h3>
              <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"><X size={20} /></button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden" noValidate>
              <div className="space-y-4 overflow-y-auto flex-1 pr-1 pb-4 text-left">
                {/* صف العناوين باللغات الثلاث */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${errors.titleEn ? "text-red-600" : "text-gray-500"}`}>Title English *</label>
                    <input type="text" value={titleEn} onChange={handleTitleEnChange} className={`w-full border px-4 py-3 rounded-xl text-sm focus:outline-none transition-all ${errors.titleEn ? "border-red-500 bg-red-50 text-red-900 focus:border-red-600" : "border-slate-200 bg-slate-50 text-gray-800 focus:border-[#0B4EA2]"}`} />
                    {errors.titleEn && <p className="mt-1.5 text-xs text-red-600 font-bold bg-red-50 p-2 rounded-lg border border-red-200">🚨 {errors.titleEn}</p>}
                  </div>
                  <div>
                    <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${errors.titleAr ? "text-red-600" : "text-gray-500"}`}>Title Arabic *</label>
                    <input type="text" value={titleAr} onChange={(e) => { setTitleAr(e.target.value); if (errors.titleAr) setErrors(prev => ({ ...prev, titleAr: "" })); }} className={`w-full border px-4 py-3 rounded-xl text-sm focus:outline-none transition-all ${errors.titleAr ? "border-red-500 bg-red-50 text-red-900 focus:border-red-600" : "border-slate-200 bg-slate-50 text-gray-800 focus:border-[#0B4EA2]"}`} />
                    {errors.titleAr && <p className="mt-1.5 text-xs text-red-600 font-bold bg-red-50 p-2 rounded-lg border border-red-200">🚨 {errors.titleAr}</p>}
                  </div>
                  <div>
                    <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${errors.titleJa ? "text-red-600" : "text-gray-500"}`}>Title Japanese *</label>
                    <input type="text" value={titleJa} onChange={(e) => { setTitleJa(e.target.value); if (errors.titleJa) setErrors(prev => ({ ...prev, titleJa: "" })); }} className={`w-full border px-4 py-3 rounded-xl text-sm focus:outline-none transition-all ${errors.titleJa ? "border-red-500 bg-red-50 text-red-900 focus:border-red-600" : "border-slate-200 bg-slate-50 text-gray-800 focus:border-[#0B4EA2]"}`} />
                    {errors.titleJa && <p className="mt-1.5 text-xs text-red-600 font-bold bg-red-50 p-2 rounded-lg border border-red-200">🚨 {errors.titleJa}</p>}
                  </div>
                </div>

                {/* صف الـ Slug، الـ Sector الإلزامي، الـ Category، والـ Manufacturer */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${errors.slug ? "text-red-600" : "text-gray-500"}`}>Slug *</label>
                      <input type="text" value={slug} onChange={(e) => { setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-")); if (errors.slug) setErrors(prev => ({ ...prev, slug: "" })); }} className={`w-full border px-4 py-3 rounded-xl text-sm font-mono focus:outline-none transition-all ${errors.slug ? "border-red-500 bg-red-50 text-red-900 focus:border-red-600" : "border-slate-200 bg-slate-100 text-gray-500"}`} />
                      {errors.slug && <p className="mt-1.5 text-xs text-red-600 font-bold bg-red-50 p-2 rounded-lg border border-red-200">🚨 {errors.slug}</p>}
                    </div>
                    {/* 💡 قائمة الـ Sector الإلزامية الجديدة */}
                    <div>
                      <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${errors.sector ? "text-red-600" : "text-gray-500"}`}>Sector *</label>
                      <select 
                        value={sector} 
                        onChange={(e) => { setSector(e.target.value); if (errors.sector) setErrors(prev => ({ ...prev, sector: "" })); }} 
                        className={`w-full border px-4 py-3 rounded-xl text-sm focus:outline-none transition-all cursor-pointer ${errors.sector ? "border-red-500 bg-red-50 text-red-900 focus:border-red-600" : "border-slate-200 bg-slate-50 text-gray-800 focus:border-[#0B4EA2]"}`}
                      >
                        <option value="">-- Select Sector --</option>
                        <option value="Construction">Construction</option>
                        <option value="Industrial">Industrial</option>
                        <option value="Agriculture">Agriculture</option>
                      </select>
                      {errors.sector && <p className="mt-1.5 text-xs text-red-600 font-bold bg-red-50 p-2 rounded-lg border border-red-200">🚨 {errors.sector}</p>}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Category *</label>
                      <select value={categoryId} onChange={(e) => { setCategoryId(e.target.value); if (errors.categoryId) setErrors(prev => ({ ...prev, categoryId: "" })); }} className="w-full border border-slate-200 px-4 py-3 rounded-xl text-sm bg-slate-50 text-gray-800 focus:border-[#0B4EA2] focus:outline-none">
                        <option value="">-- Select --</option>
                        {categories.map(c => <option key={c.id} value={c.id}>{c.nameEn || c.name}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Manufacturer *</label>
                      <select value={manufacturerId} onChange={(e) => { setManufacturerId(e.target.value); if (errors.manufacturerId) setErrors(prev => ({ ...prev, manufacturerId: "" })); }} className="w-full border border-slate-200 px-4 py-3 rounded-xl text-sm bg-slate-50 text-gray-800 focus:border-[#0B4EA2] focus:outline-none">
                        <option value="">-- Select --</option>
                        {manufacturers.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
                {/* صف تفاصيل الآلة: رقم المخزون، السنة، الساعات، السعر، والموقع */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Stock No</label>
                    <input type="text" value={stockNo} onChange={(e) => setStockNo(e.target.value)} className="w-full border border-slate-200 px-4 py-3 rounded-xl text-sm bg-slate-50 text-gray-800 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Year</label>
                    <input type="number" value={year} onChange={(e) => setYear(e.target.value)} className="w-full border border-slate-200 px-4 py-3 rounded-xl text-sm bg-slate-50 text-gray-800 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Hours</label>
                    <input type="number" value={hour} onChange={(e) => setHour(e.target.value)} className="w-full border border-slate-200 px-4 py-3 rounded-xl text-sm bg-slate-50 text-gray-800 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Price</label>
                    <input type="number" step="any" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full border border-slate-200 px-4 py-3 rounded-xl text-sm bg-slate-50 text-gray-800 focus:outline-none" />
                  </div>
                  <div>
                    <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${errors.location ? "text-red-600" : "text-gray-500"}`}>Location *</label>
                    <input type="text" value={location} onChange={(e) => { setLocation(e.target.value); if (errors.location) setErrors(prev => ({ ...prev, location: "" })); }} className={`w-full border px-4 py-3 rounded-xl text-sm focus:outline-none transition-all ${errors.location ? "border-red-500 bg-red-50 text-red-900" : "border-slate-200 bg-slate-50 text-gray-800 focus:border-[#0B4EA2]"}`} />
                    {errors.location && <p className="mt-1 text-xs text-red-600 font-medium">🚨 {errors.location}</p>}
                  </div>
                </div>

                {/* حقول تقدير الأسعار الثلاثة */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Estimated Min Price</label>
                    <input type="number" step="any" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} className="w-full border border-slate-200 px-4 py-3 rounded-xl text-sm bg-white text-gray-800 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Estimated Avg Price</label>
                    <input
                      type="number"
                      step="any"
                      value={avgPrice}
                      readOnly 
                      className="w-full border border-slate-200 px-4 py-3 rounded-xl text-sm bg-slate-100 text-gray-500 focus:outline-none cursor-not-allowed font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Estimated Max Price</label>
                    <input type="number" step="any" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="w-full border border-slate-200 px-4 py-3 rounded-xl text-sm bg-white text-gray-800 focus:outline-none" />
                  </div>
                </div>

                {/* حقول النصوص والوصف باللغات الثلاث */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Description English</label>
                    <textarea value={descriptionEn} onChange={(e) => setDescriptionEn(e.target.value)} rows={3} className="w-full border border-slate-200 bg-slate-50 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-[#0B4EA2] text-gray-800" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Description Arabic</label>
                    <textarea value={descriptionAr} onChange={(e) => setDescriptionAr(e.target.value)} rows={3} className="w-full border border-slate-200 bg-slate-50 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-[#0B4EA2] text-gray-800" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Description Japanese</label>
                    <textarea value={descriptionJa} onChange={(e) => setDescriptionJa(e.target.value)} rows={3} className="w-full border border-slate-200 bg-slate-50 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-[#0B4EA2] text-gray-800" />
                  </div>
                </div>

              </div>

              {/* أزرار الحفظ والإلغاء السفلية للنموذج */}
              <div className="border-t pt-4 mt-5 flex items-center justify-end gap-3 shrink-0">
                <button type="button" onClick={handleClose} className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition cursor-pointer">
                  Cancel
                </button>
                <button type="submit" disabled={loading} className="px-6 py-2.5 rounded-xl bg-[#0B4EA2] text-sm font-semibold text-white hover:bg-blue-700 transition disabled:opacity-50 cursor-pointer">
                  {loading ? "Saving..." : "Save Machinery"}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </>
  );
}
