import { ArrowRight, Hammer, HardHat, ShieldAlert } from "lucide-react";

export default function ConstructionHero() {
  return (
    <section className="relative overflow-hidden bg-[#0b192e] px-4 pt-0">
      <div className="mx-auto mt-0 max-w-[1300px] bg-[#07162c] rounded-[40px] relative overflow-hidden shadow-2xl min-h-[500px] md:min-h-[550px] flex items-center">
        
        <div className="absolute inset-0 z-0 bg-[#07162c]" />

        <div className="relative z-10 w-full p-5 md:p-12 grid items-center gap-12 lg:grid-cols-12">
          
          <div className="lg:col-span-7 max-w-2xl">

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#d9a441]/20 bg-[#d9a441]/10 px-4 py-1.5">
              <Hammer className="h-3.5 w-3.5 text-[#d9a441]" />
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#d9a441] uppercase">
                Heavy Machinery Sector
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-[46px] font-black leading-[1.15] text-white">
              Premium Equipment{" "}
              <span className="text-[#d9a441] block sm:inline">
                For High-Performance
              </span>{" "}
              Construction Projects
            </h1>

            <p className="mt-4 text-sm md:text-base leading-relaxed text-slate-400">
              Explore Japan's most reliable and strictly inspected used construction equipment. From heavy-duty excavators to high-capacity loaders, we deliver machinery built to conquer any job site.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button className="group flex items-center gap-2.5 rounded-xl bg-[#d9a441] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#c49335]">
                Explore Fleet Inventory
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </button>

              <button className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/10">
                Browse Construction Stock
              </button>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-white/5 pt-6 max-w-md">
              <div>
                <h3 className="text-2xl font-black text-[#d9a441]">24+</h3>
                <p className="mt-1 text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                  Excavators
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-black text-[#d9a441]">18+</h3>
                <p className="mt-1 text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                  Wheel Loaders
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-black text-[#d9a441]">12+</h3>
                <p className="mt-1 text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                  Bulldozers
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 hidden lg:flex flex-col gap-4 justify-center items-end">
            
            <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#112240]/50 p-5 backdrop-blur-md w-full max-w-[320px] shadow-xl transition hover:border-white/20">
              <div className="h-12 w-12 rounded-xl bg-[#d9a441]/10 flex items-center justify-center shrink-0">
                <HardHat className="h-6 w-6 text-[#d9a441]" />
              </div>
              <div className="leading-tight">
                <h4 className="text-base font-bold text-white">Job-Site Ready</h4>
                <p className="text-xs text-slate-400 mt-1">Rigorous hydraulic pressure and structural tests included</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#112240]/50 p-5 backdrop-blur-md w-full max-w-[320px] shadow-xl transition hover:border-white/20">
              <div className="h-12 w-12 rounded-xl bg-[#d9a441]/10 flex items-center justify-center shrink-0">
                <ShieldAlert className="h-6 w-6 text-[#d9a441]" />
              </div>
              <div className="leading-tight">
                <h4 className="text-base font-bold text-white">Japanese Quality</h4>
                <p className="text-xs text-slate-400 mt-1">Direct sourcing with transparent service logs</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
