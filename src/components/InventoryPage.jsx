"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, Calendar, Gauge, ArrowUpRight, ShieldCheck } from "lucide-react";

// بيانات تجريبية شاملة للمخزون (معدات بناء وزراعة)
const allMachinery = [
  { id: "EX-001", title: "Caterpillar 320D Excavator", category: "Construction", type: "Excavator", maker: "CAT", year: "2018", hours: "4,200 hrs", condition: "Verified", price: "Inquire", image: "https://unsplash.com" },
  { id: "BL-002", title: "Komatsu D65EX Bulldozer", category: "Construction", type: "Bulldozer", maker: "Komatsu", year: "2017", hours: "5,100 hrs", condition: "Verified", price: "Inquire", image: "https://unsplash.com" },
  { id: "TR-003", title: "Kuboat M7 Tractor", category: "Agriculture", type: "Tractor", maker: "Kubota", year: "2020", hours: "1,500 hrs", condition: "Verified", price: "Inquire", image: "https://unsplash.com" },
  { id: "WL-004", title: "Hitachi ZW220 Loader", category: "Construction", type: "Wheel Loader", maker: "Hitachi", year: "2019", hours: "3,800 hrs", condition: "Verified", price: "Inquire", image: "https://unsplash.com" },
  { id: "TR-005", title: "Yanmar YT347 Tractor", category: "Agriculture", type: "Tractor", maker: "Yanmar", year: "2021", hours: "850 hrs", condition: "Verified", price: "Inquire", image: "https://unsplash.com" },
];

export default function InventoryPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedMaker, setSelectedMaker] = useState("All");

  // تصفية البيانات ديناميكياً بناءً على البحث والفلترة
  const filteredMachinery = allMachinery.filter((machine) => {
    const matchesSearch = machine.title.toLowerCase().includes(search.toLowerCase()) || machine.id.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "All" || machine.category === selectedCategory;
    const matchesMaker = selectedMaker === "All" || machine.maker === selectedMaker;
    return matchesSearch && matchesCategory && matchesMaker;
  });

  return (
    <main className="min-h-screen bg-[#F8F9FB] pt-28 pb-16 px-4 md:px-8">
      <div className="mx-auto max-w-[1350px]">
        
        {/* HEADER */}
        <div className="mb-8">
          <span className="text-xs font-bold tracking-widest text-[#D9A441] uppercase">Pyramid Japan Fleet</span>
          <h1 className="text-3xl font-black text-[#081F3F] mt-1">Live Machinery Inventory</h1>
        </div>

        {/* SEARCH & FILTERS CONTROLS */}
        <div className="mb-8 grid gap-4 md:flex md:items-center md:justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          {/* شريط البحث */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text"
              placeholder="Search by model, maker or Stock No..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#D9A441] text-[#081F3F]"
            />
          </div>

          {/* أزرار الفلترة السريعة */}
          <div className="flex flex-wrap gap-2 items-center">
            <SlidersHorizontal className="h-4 w-4 text-slate-500 mr-1 hidden sm:block" />
            
            {/* فلتر القطاع */}
            <select 
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-[#081F3F] bg-white focus:outline-none focus:border-[#D9A441]"
            >
              <option value="All">All Sectors</option>
              <option value="Construction">Construction</option>
              <option value="Agriculture">Agriculture</option>
            </select>

            {/* فلتر الشركة المصنعة */}
            <select 
              onChange={(e) => setSelectedMaker(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-[#081F3F] bg-white focus:outline-none focus:border-[#D9A441]"
            >
              <option value="All">All Makers</option>
              <option value="CAT">Caterpillar</option>
              <option value="Komatsu">Komatsu</option>
              <option value="Kubota">Kubota</option>
              <option value="Hitachi">Hitachi</option>
            </select>
          </div>
        </div>

        {/* MACHINERY GRID */}
        {filteredMachinery.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200">
            <p className="text-slate-500 text-sm font-medium">No machinery matches your search criteria.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredMachinery.map((machine) => (
              <div key={machine.id} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md flex flex-col justify-between">
                
                {/* Image Container */}
                <div className="relative h-44 w-full overflow-hidden bg-[#081F3F]">
                  <img src={machine.image} alt={machine.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute top-3 left-3 z-10 flex items-center gap-1 rounded-full bg-emerald-500 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white shadow">
                    <ShieldCheck className="h-3 w-3" />
                    {machine.condition}
                  </div>
                  <div className="absolute bottom-3 right-3 z-10 rounded-md bg-[#081F3F]/80 backdrop-blur-sm px-2 py-0.5 text-[9px] font-mono text-white">Ref: {machine.id}</div>
                </div>

                {/* Content Details */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] font-bold tracking-widest text-[#D9A441] uppercase">{machine.type}</span>
                    <h3 className="mt-0.5 text-sm font-black text-[#081F3F] line-clamp-1 group-hover:text-[#D9A441] transition-colors">{machine.title}</h3>

                    {/* Specs */}
                    <div className="mt-3 grid grid-cols-2 gap-2 border-t border-b border-slate-100 py-2.5 my-3">
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <Calendar className="h-3.5 w-3.5 text-[#D9A441]" />
                        <div className="flex flex-col">
                          <span className="text-[9px] text-slate-400 leading-none">Year</span>
                          <span className="text-xs font-bold text-[#081F3F] mt-0.5">{machine.year}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <Gauge className="h-3.5 w-3.5 text-[#D9A441]" />
                        <div className="flex flex-col">
                          <span className="text-[9px] text-slate-400 leading-none">Hours</span>
                          <span className="text-xs font-bold text-[#081F3F] mt-0.5">{machine.hours}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pricing & Button */}
                  <div className="mt-2 flex items-center justify-between gap-3">
                    <div className="flex flex-col">
                      <span className="text-[9px] text-slate-400 leading-none">FOB Price</span>
                      <span className="text-xs font-black text-[#081F3F] mt-0.5">{machine.price}</span>
                    </div>
                    <button className="flex items-center gap-1 rounded-xl bg-[#081F3F] px-3 py-2 text-[11px] font-bold text-white transition hover:bg-[#D9A441] hover:text-[#081F3F]">
                      Inquire <ArrowUpRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}
