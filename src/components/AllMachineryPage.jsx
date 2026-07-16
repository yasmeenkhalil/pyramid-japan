import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import MachineCard from './MachineCard';
import SidebarMachineFilters from './SidebarMachineFilters';
import { Search, Grid, LayoutGrid } from 'lucide-react';

export default function AllMachineryPage() {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSearch, setActiveSearch] = useState(''); 
  const [machines, setCategoriesMachines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid-4');
  const [sortBy, setSortBy] = useState('newest');

  const specId = searchParams.get('specId') || '';
  const specOp = searchParams.get('specOp') || '';
  const specVal = searchParams.get('specVal') || '';
  const makerFilter = searchParams.get('maker') || '';

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

  useEffect(() => {
    async function fetchFilteredMachines() {
      try {
        setLoading(true);
        let url = '/api/machinery/all';
        const params = new URLSearchParams();
        
        if (category && category !== 'all') params.append("category", category);
        if (activeSearch) params.append("search", activeSearch);
        if (makerFilter) params.append("maker", makerFilter);
        if (specId) params.append("specId", specId);
        if (specOp) params.append("specOp", specOp);
        if (specVal) params.append("specVal", specVal);

        const queryString = params.toString();
        if (queryString) url += `?${queryString}`;

        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          setCategoriesMachines(transformData(data));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchFilteredMachines();
  }, [category, activeSearch, specId, specOp, specVal, makerFilter]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setActiveSearch(searchQuery);
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
            <div className="relative group">
              <button 
                onClick={() => setActiveSearch(searchQuery)}
                className="absolute inset-y-0 left-0 flex items-center pl-5 text-slate-400 hover:text-[#C47B36] transition-colors"
              >
                <Search size={20} />
              </button>
              <input
                type="text"
                placeholder="Search & press Enter..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full h-14 pl-12 pr-6 rounded-2xl border border-slate-700 bg-slate-900/60 text-white placeholder-slate-500 text-sm shadow-inner focus:outline-none focus:border-[#C47B36] focus:bg-slate-900 transition-all duration-300"
              />
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
              {sortedMachines.length} Units Found
            </p>
          </div>

          <div className="flex items-center gap-3">
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
          <div className="text-center py-24 text-slate-500 font-semibold">Loading fleet data...</div>
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
