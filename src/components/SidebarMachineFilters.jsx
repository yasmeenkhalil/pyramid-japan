import React, { useState, useEffect } from "react";
import { SlidersHorizontal, RotateCcw } from "lucide-react";
import { useSearchParams, useNavigate, useParams } from "react-router-dom";

export default function SidebarMachineFilters() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { category: currentCategorySlug } = useParams();

  const [categories, setCategories] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);
  const [specNames, setSpecNames] = useState([]);

  const [selectedSector, setSelectedSector] = useState(searchParams.get("sector") || "All Sectors");
  const [selectedSpecId, setSelectedSpecId] = useState(searchParams.get("specId") || "");
  const [operator, setOperator] = useState(searchParams.get("specOp") || "eq");
  const [specVal, setSpecVal] = useState(searchParams.get("specVal") || "");
  const [selectedMaker, setSelectedMaker] = useState(searchParams.get("maker") || "All Makers");

  useEffect(() => {
    setSelectedSector(searchParams.get("sector") || "All Sectors");
    setSelectedSpecId(searchParams.get("specId") || "");
    setOperator(searchParams.get("specOp") || "eq");
    setSpecVal(searchParams.get("specVal") || "");
    setSelectedMaker(searchParams.get("maker") || "All Makers");
  }, [searchParams]);

  useEffect(() => {
    async function fetchFilterOptions() {
      try {
        const catRes = await fetch("/api/categories");
        if (catRes.ok) setCategories(await catRes.json());

        const manRes = await fetch("/api/manufacturers");
        if (manRes.ok) setManufacturers(await manRes.json());

        const machRes = await fetch("/api/machinery");
        if (machRes.ok) {
          const machData = await machRes.json();
          const uniqueSpecs = [];

          machData.forEach((m) => {
            if (m.specifications && Array.isArray(m.specifications)) {
              m.specifications.forEach((s) => {
                if (s.specification && !uniqueSpecs.some(x => x.id === s.specificationId)) {
                  uniqueSpecs.push({
                    id: s.specificationId,
                    nameEn: s.specification.nameEn
                  });
                }
              });
            }
          });
          setSpecNames(uniqueSpecs);
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchFilterOptions();
  }, []);

  const handleFilterClick = () => {
    const params = new URLSearchParams();
    if (selectedSector && selectedSector !== "All Sectors") params.append("sector", selectedSector);
    if (selectedSpecId) params.append("specId", selectedSpecId);
    if (operator) params.append("specOp", operator);
    if (specVal) params.append("specVal", specVal);
    if (selectedMaker && selectedMaker !== "All Makers") params.append("maker", selectedMaker);

    const targetCategory = currentCategorySlug && currentCategorySlug !== "All Categories" ? currentCategorySlug : "all";
    // ✅ تعديل طريقة الدمج لضمان وجود علامة '?' الفاصلة بشكل برمجي صحيح
    const queryString = params.toString();
    navigate(`/machinery-all/${targetCategory}${queryString ? `?${queryString}` : ""}`);
  };

  const handleReset = () => {
    setSelectedSector("All Sectors");
    setSelectedSpecId("");
    setOperator("eq");
    setSpecVal("");
    setSelectedMaker("All Makers");
    navigate("/machinery-all/all");
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5">
      <div className="flex flex-col xl:flex-row xl:items-end gap-4">
        <div className="flex items-center gap-2 min-w-fit">
          <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
            <SlidersHorizontal className="w-5 h-5 text-[#C47B36]" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-slate-500">Filters</p>
            <h3 className="font-semibold text-slate-900">Find Machinery</h3>
          </div>
        </div>

         <div className="flex-1">
          <label className="block text-xs font-medium text-slate-600 mb-2">Sector</label>
          <select 
            value={selectedSector} 
            onChange={(e) => {
              const newSector = e.target.value;
              setSelectedSector(newSector);
              
              const params = new URLSearchParams(searchParams);
              if (newSector && newSector !== "All Sectors") {
                params.set("sector", newSector);
              } else {
                params.delete("sector");
              }
              
              const targetCategory = currentCategorySlug && currentCategorySlug !== "All Categories" ? currentCategorySlug : "all";
              navigate(`/machinery-all/${targetCategory}${params.toString() ? `?${params.toString()}` : ""}`);
            }}
            className="w-full h-11 rounded-xl border border-slate-200 px-3 bg-white focus:ring-2 focus:ring-[#C47B36] focus:border-[#C47B36] outline-none text-xs font-medium text-gray-800 cursor-pointer transition-all duration-200"
          >
            <option value="All Sectors">All Sectors</option>
            <option value="Construction">Construction</option>
            <option value="Industrial">Industrial</option>
            <option value="Agriculture">Agriculture</option>
          </select>
        </div>

        <div className="flex-1">
          <label className="block text-xs font-medium text-slate-600 mb-2">Category</label>
          <select
            value={currentCategorySlug || "All Categories"}
            onChange={(e) => {
              const target = e.target.value === "All Categories" ? "all" : e.target.value;
              navigate(`/machinery-all/${target}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`);
            }}
            className="w-full h-11 rounded-xl border border-slate-200 px-3 bg-white focus:ring-2 focus:ring-[#C47B36] focus:border-[#C47B36] outline-none text-xs font-medium text-gray-800 cursor-pointer transition-all duration-200"
          >
            <option value="All Categories">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.slug}>{cat.nameEn}</option>
            ))}
          </select>
        </div>


        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex-1">
            <label className="block text-xs font-medium text-slate-600 mb-2">Specification</label>
            <select value={selectedSpecId} onChange={(e) => setSelectedSpecId(e.target.value)} className="w-full h-11 rounded-xl border border-slate-200 px-3 bg-white focus:ring-2 focus:ring-[#C47B36] focus:border-[#C47B36] outline-none text-xs font-medium text-gray-800">
              <option value="">Select Spec</option>
              {specNames.map((s) => (
                <option key={s.id} value={s.id}>{s.nameEn}</option>
              ))}
            </select>
          </div>
          <div className="w-full sm:w-20">
            <label className="block text-xs font-medium text-slate-600 mb-2">Condition</label>
            <select value={operator} onChange={(e) => setOperator(e.target.value)} className="w-full h-11 rounded-xl border border-slate-200 px-3 bg-white focus:ring-2 focus:ring-[#C47B36] focus:border-[#C47B36] outline-none text-xs font-bold text-gray-800">
              <option value="eq">=</option>
              <option value="gt">&gt;</option>
              <option value="lt">&lt;</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-xs font-medium text-slate-600 mb-2">Value</label>
            <input type="text" placeholder="e.g. 20" value={specVal} onChange={(e) => setSpecVal(e.target.value)} className="w-full h-11 rounded-xl border border-slate-200 px-4 bg-white focus:ring-2 focus:ring-[#C47B36] focus:border-[#C47B36] outline-none text-xs font-medium text-gray-800 placeholder-slate-400" />
          </div>
        </div>

        <div className="flex-1">
          <label className="block text-xs font-medium text-slate-600 mb-2">Manufacturer</label>
          <select value={selectedMaker} onChange={(e) => setSelectedMaker(e.target.value)} className="w-full h-11 rounded-xl border border-slate-200 px-3 bg-white focus:ring-2 focus:ring-[#C47B36] focus:border-[#C47B36] outline-none text-xs font-medium text-gray-800">
            <option value="All Makers">All Makers</option>
            {manufacturers.map((m) => (
              <option key={m.id} value={m.name}>{m.name}</option>
            ))}
          </select>
        </div>

        <div className="flex gap-3">
          <button type="button" onClick={handleFilterClick} className="h-11 px-6 rounded-xl bg-[#C47B36] hover:bg-[#b26f30] text-white font-semibold transition text-xs tracking-wider uppercase cursor-pointer">
            Apply
          </button>
          <button type="button" onClick={handleReset} className="h-11 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold transition text-xs flex items-center justify-center gap-2 cursor-pointer border border-slate-200">
            <RotateCcw className="w-4 h-4" /> Reset
          </button>
        </div>
      </div>
    </div>
  );
}
