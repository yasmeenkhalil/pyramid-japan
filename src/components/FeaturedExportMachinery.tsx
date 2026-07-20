"use client";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Gauge, Calendar, ShieldCheck, ArrowRight } from "lucide-react";

interface Machine {
  id: string;
  titleEn: string;
  titleAr: string;
  titleJa: string;
  slug: string;
  stockNo: string | null;
  year: number | null;
  hour: number | null;
  price: number | null;
  featured: boolean;
  isAvailableForExport: boolean;
  category: { nameEn: string } | null;
  images: { imageUrl: string }[];
}

export default function FeaturedExportMachinery() {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchFeatured() {
      try {
        setLoading(true);
        const res = await fetch("/api/machinery/all?export=true");
        if (res.ok) {
          const data = await res.json();
          setMachines(data.slice(0, 10));
        }
      } catch (error) {
        console.error("Failed to fetch featured export machinery:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchFeatured();
  }, []);
  return (
    <section className="bg-white py-16 px-4 border-t border-slate-100">
      <div className="mx-auto max-w-[1500px]">
        
        <div className="mb-12 text-center">
          <span className="text-xs font-bold tracking-[0.25em] text-[#D9A441] uppercase">
            Available Inventory
          </span>
          <h2 className="mt-2 text-3xl font-black text-[#081F3F] md:text-[38px] leading-tight">
            Ready for Worldwide Export
          </h2>
        </div>

        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full mx-auto">
            {Array.from({ length: 5 }).map((_, i) => (
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
        ) : machines.length === 0 ? (
          <div className="text-center py-8 text-slate-400 font-medium">
            No machinery currently listed for export.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full mx-auto">
            {machines.map((machine) => (
              <div 
                key={machine.id} 
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md flex flex-col justify-between"
              >
                <div className="relative h-44 w-full overflow-hidden bg-[#081F3F]">
                  <img 
                    src={machine.images && machine.images.length > 0 ? machine.images[0].imageUrl : '/assets/images/Crushers_Wood_Chippers.png'} 
                    alt={machine.titleEn}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  <div className="absolute top-3 left-3 z-10 flex items-center gap-1 rounded-full bg-emerald-500 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white shadow">
                    <ShieldCheck className="h-3 w-3" />
                    Verified
                  </div>
                  
                  {machine.stockNo && (
                    <div className="absolute bottom-3 right-3 z-10 rounded-md bg-[#081F3F]/80 backdrop-blur-sm px-2 py-0.5 text-[9px] font-mono text-white">
                      Ref: {machine.stockNo}
                    </div>
                  )}
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] font-bold tracking-widest text-[#D9A441] uppercase">
                      {machine.category?.nameEn || "Machinery"}
                    </span>
                    <h3 className="mt-0.5 text-sm font-black text-[#081F3F] line-clamp-1 group-hover:text-[#D9A441] transition-colors">
                      {machine.titleEn || machine.titleAr}
                    </h3>

                    <div className="mt-3 grid grid-cols-2 gap-2 border-t border-b border-slate-100 py-2.5 my-3">
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <Calendar className="h-3.5 w-3.5 text-[#D9A441]" />
                        <div className="flex flex-col">
                          <span className="text-[9px] text-slate-400 leading-none">Year</span>
                          <span className="text-xs font-bold text-[#081F3F] mt-0.5">{machine.year || "—"}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <Gauge className="h-3.5 w-3.5 text-[#D9A441]" />
                        <div className="flex flex-col">
                          <span className="text-[9px] text-slate-400 leading-none">Hours</span>
                          <span className="text-xs font-bold text-[#081F3F] mt-0.5">
                            {machine.hour ? machine.hour.toLocaleString() : "—"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Link 
                    to={`/machinery/${machine.slug}`}
                    className="mt-1 flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#081F3F] px-3 py-2.5 text-[11px] font-bold text-white transition hover:bg-[#D9A441] hover:text-[#081F3F]"
                  >
                    View Details
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 flex justify-center">
          <Link 
            to="/machinery-all/all?export=true"
            className="flex items-center gap-2 rounded-xl bg-[#081F3F] px-8 py-3.5 text-xs font-bold text-white uppercase tracking-wider transition hover:bg-[#D9A441] hover:text-[#081F3F] shadow-md"
          >
            View All Inventory
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
