"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import MachineCard from './MachineCard';
import SidebarMachineFilters from './SidebarMachineFilters';
import { Search, Grid, LayoutGrid } from 'lucide-react';

export default function AllMachineryPage() {
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');

  const searchFilter = searchParams.get('search') || '';
  const sectorFilter = searchParams.get('sector') || ''; 
  const specId = searchParams.get('specId') || '';
  const specOp = searchParams.get('specOp') || '';
  const specVal = searchParams.get('specVal') || '';
  const makerFilter = searchParams.get('maker') || '';
  const exportFilter = searchParams.get('export') || '';


  const [machines, setCategoriesMachines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid-4');
  const [sortBy, setSortBy] = useState('newest');

  const transformData = (items) => {
    if (!items || !Array.isArray(items)) return [];
    return items.map((item) => ({
      id: item.id,
      title: item.titleEn || item.titleAr || item.titleJa,
      model: item.model || "",
      hours: item.hour ? item.hour.toLocaleString() : "0",
      rawHours: item.hour || 0,
      year: item.year ? item.year.toString() : "",
      rawYear: item.year || 0,
      location: item.location || "AOCHI Yard",
      tag: item.featured ? "Featured" : "",
      price: item.price ? `${item.price.toLocaleString()} JPY` : "Ask Price",
      image: item.images && item.images.length > 0 ? item.images[0].imageUrl : '/assets/images/Crushers_Wood_Chippers.png',
      createdAt: item.createdAt ? new Date(item.createdAt).getTime() : 0
    }));
  };

  const handleSearchSubmit = (value) => {
    const currentParams = new URLSearchParams(searchParams);
    if (value.trim()) {
      currentParams.set("search", value.trim());
    } else {
      currentParams.delete("search");
    }
    setSearchParams(currentParams);
  };
  const handleExportToggle = (checked) => {
  const currentParams = new URLSearchParams(searchParams);
  if (checked) {
    currentParams.set("export", "true");
  } else {
    currentParams.delete("export");
  }
  setSearchParams(currentParams);
};


  useEffect(() => {
    setSearchQuery(searchParams.get('search') || '');
  }, [searchParams]);

  useEffect(() => {
    if (searchQuery === "") {
      handleSearchSubmit("");
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      handleSearchSubmit(searchQuery);
    }, 800);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  useEffect(() => {
    async function fetchFilteredMachines() {
      try {
        setLoading(true);
        let url = '/api/machinery/all';
        const params = new URLSearchParams();
        
        if (category && category !== 'all') params.append("category", category);
        if (searchFilter) params.append("search", searchFilter);
        if (makerFilter) params.append("maker", makerFilter);
        if (sectorFilter) params.append("sector", sectorFilter); 
        if (specId) params.append("specId", specId);
        if (specOp) params.append("specOp", specOp);
        if (specVal) params.append("specVal", specVal);
        if (exportFilter) params.append("export", exportFilter);


        const queryString = params.toString();
        if (queryString) url += `?${queryString}`;

        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          setCategoriesMachines(transformData(data));
        } else {
          console.error("Server responded with an error status:", res.status);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchFilteredMachines();
  }, [category, searchFilter, specId, specOp, specVal, makerFilter, sectorFilter, searchParams]); 

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit(searchQuery);
    }
  };

  const getSortedMachines = () => {
    const cloned = [...machines];
    if (sortBy === 'newest') return cloned.sort((a, b) => b.createdAt - a.createdAt);
    if (sortBy === 'oldest') return cloned.sort((a, b) => a.createdAt - b.createdAt);
    if (sortBy === 'year') return cloned.sort((a, b) => b.rawYear - a.rawYear);
    return cloned;
  };

  const sortedMachines = getSortedMachines();

  return (
    <section className="bg-[#FAFBFD] min-h-screen py-12">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8">

        <div className="relative mb-10 overflow-hidden bg-[#0B1B3A] rounded-[32px] p-8 md:p-12 shadow-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(196,123,54,0.12),transparent_45%)]" />
          
          <div className="relative z-10 space-y-2 max-w-xl text-center md:text-left">
            <span className="inline-flex px-3 py-1 rounded-full bg-[#C47B36]/10 text-[#C47B36] text-xs uppercase tracking-[0.25em] font-semibold border border-[#C47B36]/20">
              Pyramid Japan Co.
            </span>
            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              Premium Machinery Fleet
            </h1>
            <p className="text-slate-400 text-sm">
              Discover certified high-performance equipment imported directly from Japan.
            </p>
          </div>

          <div className="relative z-10 w-full md:max-w-md shrink-0">
            <div className="relative flex items-center bg-slate-900/60 rounded-2xl border border-slate-700 p-1 pl-4 focus-within:border-[#C47B36] focus-within:bg-slate-900 transition-all duration-300 shadow-inner">
              <input
                type="text"
                placeholder="Search machinery..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full h-12 bg-transparent text-white placeholder-slate-500 text-sm focus:outline-none pr-4"
              />
              <button 
                type="button"
                onClick={() => handleSearchSubmit(searchQuery)}
                className="h-12 px-5 bg-[#C47B36] hover:bg-[#b26f30] text-white rounded-xl flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer shrink-0"
              >
                <Search size={16} />
                Search
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 mb-8 flex flex-col gap-4">
          <SidebarMachineFilters /> 
        </div>

        <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-xl font-black text-[#0B1B3A] tracking-tight">
              Available Inventory
            </h2>
            <p className="text-xs font-semibold text-slate-400 mt-0.5 uppercase tracking-wider">
              {loading ? "..." : sortedMachines.length} Units Found
            </p>
          </div>

                   <div className="flex items-center gap-4">
            {/* زر التبديل الاحترافي للتصدير الدولي */}
            <label className="flex items-center gap-2 px-3 py-2 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 shadow-sm cursor-pointer select-none transition-all duration-200">
              <input 
                type="checkbox" 
                checked={exportFilter === "true"}
                onChange={(e) => handleExportToggle(e.target.checked)}
                className="w-4 h-4 rounded text-[#C47B36] border-slate-300 focus:ring-[#C47B36] cursor-pointer"
              />
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Export Fleet Only
              </span>
            </label>

            <div className="hidden sm:flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200/60">
              <button 
                onClick={() => setViewMode('grid-4')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'grid-4' ? 'bg-white text-[#0B1B3A] shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <LayoutGrid size={16} />
              </button>
              <button 
                onClick={() => setViewMode('grid-3')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'grid-3' ? 'bg-white text-[#0B1B3A] shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <Grid size={16} />
              </button>
            </div>
            
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-slate-200 rounded-xl px-4 py-2.5 bg-white text-xs font-bold text-slate-700 focus:outline-none focus:border-[#C47B36] transition cursor-pointer shadow-sm"
            >
              <option value="newest">Latest Arrivals</option>
              <option value="oldest">Oldest</option>
              <option value="year">Manufacture Year</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${viewMode === 'grid-4' ? 'xl:grid-cols-4' : 'xl:grid-cols-3'}`}>
            {Array.from({ length: viewMode === 'grid-4' ? 4 : 3 }).map((_, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-[24px] overflow-hidden shadow-sm space-y-4 p-4 animate-pulse">
                <div className="w-full h-44 bg-slate-200 rounded-xl" />
                <div className="space-y-2">
                  <div className="h-4 bg-slate-200 rounded-md w-3/4" />
                  <div className="h-3 bg-slate-200 rounded-md w-1/2" />
                </div>
                <div className="pt-2 border-t border-slate-100 flex justify-between items-center">
                  <div className="h-5 bg-slate-200 rounded-md w-1/3" />
                  <div className="h-4 bg-slate-200 rounded-md w-1/4" />
                </div>
              </div>
            ))}
          </div>
         ) : sortedMachines.length === 0 ? (
          <div className="bg-white rounded-3xl p-20 text-center border border-slate-100 shadow-sm text-slate-400 font-medium">
            No active machinery matching your filter options.
          </div>
        ) : (
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${viewMode === 'grid-4' ? 'xl:grid-cols-4' : 'xl:grid-cols-3'}`}>
            {sortedMachines.map((machine) => (
              <MachineCard key={machine.id} machine={machine} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
