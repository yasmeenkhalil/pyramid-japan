import { ArrowRight, Ship, Globe, ShieldCheck } from "lucide-react";

export default function ExportHero() {
  return (
    <section className="relative overflow-hidden bg-[#0b192e] px-4 pt-0">
      <div className="mx-auto mt-0 max-w-[1300px] bg-[#07162c] rounded-[40px] relative overflow-hidden shadow-2xl min-h-[500px] md:min-h-[550px] flex items-center">
        
        {/* SOLID BACKGROUND LAYER WITHOUT IMAGE */}
        <div className="absolute inset-0 z-0 bg-[#07162c]" />

        {/* CONTENT CONTAINER */}
        <div className="relative z-10 w-full p-5 md:p-12 grid items-center gap-12 lg:grid-cols-12">
          
          {/* LEFT SIDE: TEXT CONTENT */}
          <div className="lg:col-span-7 max-w-2xl">

            {/* Badge */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#d9a441]/20 bg-[#d9a441]/10 px-4 py-1.5">
              <Ship className="h-3.5 w-3.5 text-[#d9a441]" />
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#d9a441] uppercase">
                Worldwide Export Services
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-3xl md:text-4xl lg:text-[46px] font-black leading-[1.15] text-white">
              Export Heavy{" "}
              <span className="text-[#d9a441] block sm:inline">
                Machinery Directly
              </span>{" "}
              From Japan
            </h1>

            {/* Description */}
            <p className="mt-4 text-sm md:text-base leading-relaxed text-slate-400">
              Professional inspection, export documentation, logistics management and worldwide shipping for construction and agricultural machinery.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap gap-3">
              <button className="group flex items-center gap-2.5 rounded-xl bg-[#d9a441] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#c49335]">
                Get Export Quote
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </button>

              <button className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/10">
                Browse Inventory
              </button>
            </div>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-white/5 pt-6 max-w-md">
              <div>
                <h3 className="text-2xl font-black text-[#d9a441]">13+</h3>
                <p className="mt-1 text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                  Years Experience
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-black text-[#d9a441]">40+</h3>
                <p className="mt-1 text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                  Countries Served
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-black text-[#d9a441]">5000+</h3>
                <p className="mt-1 text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                  Machines Exported
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: ENLARGED FLOATING CARDS */}
          <div className="lg:col-span-5 hidden lg:flex flex-col gap-4 justify-center items-end">
            
            {/* Card 1 */}
            <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#112240]/50 p-5 backdrop-blur-md w-full max-w-[320px] shadow-xl transition hover:border-white/20">
              <div className="h-12 w-12 rounded-xl bg-[#d9a441]/10 flex items-center justify-center shrink-0">
                <ShieldCheck className="h-6 w-6 text-[#d9a441]" />
              </div>
              <div className="leading-tight">
                <h4 className="text-base font-bold text-white">Verified Machinery</h4>
                <p className="text-xs text-slate-400 mt-1">Full inspection reports included</p>
              </div>
            </div>

            {/* Card 2 */}
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
