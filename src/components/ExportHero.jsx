"use client";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 
import { ArrowRight, Ship, Globe, ShieldCheck } from "lucide-react";

export default function ExportHero() {
  const [stats, setStats] = useState({
    yearsExperience: "13+",
    countriesServed: "40+",
    machinesExported: "5000+"
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/settings");
        if (res.ok) {
          const data = await res.json();
          setStats({
            yearsExperience: data.experience_years ? `${data.experience_years}+` : "13+",
            countriesServed: data.countries_count ? `${data.countries_count}+` : "40+",
            machinesExported: data.machines_count ? `${data.machines_count}+` : "5000+"
          });
        }
      } catch (error) {
        console.error("Failed to fetch settings stats:", error);
      }
    }
    fetchStats();
  }, []);
  return (
    <section className="relative overflow-hidden bg-[#0b192e] px-4 pt-0">
      <div className="mx-auto mt-0 max-w-[1300px] bg-[#07162c] rounded-[40px] relative overflow-hidden shadow-2xl min-h-[500px] md:min-h-[550px] flex items-center">
        
        <div className="absolute inset-0 z-0 bg-[#07162c]" />

        <div className="relative z-10 w-full p-5 md:p-12 grid items-center gap-12 lg:grid-cols-12">
          
          <div className="lg:col-span-7 max-w-2xl">

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#d9a441]/20 bg-[#d9a441]/10 px-4 py-1.5">
              <Ship className="h-3.5 w-3.5 text-[#d9a441]" />
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#d9a441] uppercase">
                Worldwide Export Services
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-[46px] font-black leading-[1.15] text-white">
              Export Heavy{" "}
              <span className="text-[#d9a441] block sm:inline">
                Machinery Directly
              </span>{" "}
              From Japan
            </h1>

            <p className="mt-4 text-sm md:text-base leading-relaxed text-slate-400">
              Professional inspection, export documentation, logistics management and worldwide shipping for construction and agricultural machinery.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link 
                to="/contact" 
                className="group inline-flex items-center gap-2.5 rounded-xl bg-[#d9a441] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#c49335]"
              >
                Get Export Quote
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>

              <Link 
                to="/machinery-all/all?export=true" 
                className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/10"
              >
                Browse Inventory
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-white/5 pt-6 max-w-md">
              <div>
                <h3 className="text-2xl font-black text-[#d9a441]">{stats.yearsExperience}</h3>
                <p className="mt-1 text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                  Years Experience
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-black text-[#d9a441]">{stats.countriesServed}</h3>
                <p className="mt-1 text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                  Countries Served
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-black text-[#d9a441]">{stats.machinesExported}</h3>
                <p className="mt-1 text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                  Machines Exported
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 hidden lg:flex flex-col gap-4 justify-center items-end">
            
            <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#112240]/50 p-5 backdrop-blur-md w-full max-w-[320px] shadow-xl transition hover:border-white/20">
              <div className="h-12 w-12 rounded-xl bg-[#d9a441]/10 flex items-center justify-center shrink-0">
                <ShieldCheck className="h-6 w-6 text-[#d9a441]" />
              </div>
              <div className="leading-tight">
                <h4 className="text-base font-bold text-white">Verified Machinery</h4>
                <p className="text-xs text-slate-400 mt-1">Full inspection reports included</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#112240]/50 p-5 backdrop-blur-md w-full max-w-[320px] shadow-xl transition hover:border-white/20">
              <div className="h-12 w-12 rounded-xl bg-[#d9a441]/10 flex items-center justify-center shrink-0">
                <Globe className="h-6 w-6 text-[#d9a441]" />
              </div>
              <div className="leading-tight">
                <h4 className="text-base font-bold text-white">Global Shipping</h4>
                <p className="text-xs text-slate-400 mt-1">Worldwide reliable logistics support</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
