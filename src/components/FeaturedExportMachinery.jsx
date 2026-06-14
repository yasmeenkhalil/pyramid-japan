

import { ArrowUpRight, Gauge, Calendar, ShieldCheck } from "lucide-react";

const featuredMachinery = [
  {
    id: "EX-001",
    title: "Caterpillar 320D Excavator",
    category: "Excavator",
    year: "2018",
    hours: "4,200 hrs",
    condition: "Verified",
    image: "/assets/images/Crushers_Wood_Chippers.png",
  },
  {
    id: "BL-002",
    title: "Komatsu D65EX Bulldozer",
    category: "Bulldozer",
    year: "2017",
    hours: "5,100 hrs",
    condition: "Verified",
    image: "/assets/images/Crushers_Wood_Chippers.png",
  },
  {
    id: "WL-003",
    title: "Hitachi ZW220 Loader",
    category: "Wheel Loader",
    year: "2019",
    hours: "3,800 hrs",
    condition: "Verified",
    image: "/assets/images/Crushers_Wood_Chippers.png",
  },
  {
    id: "EX-004",
    title: "Kobelco SK210 Excavator",
    category: "Excavator",
    year: "2020",
    hours: "2,900 hrs",
    condition: "Verified",
    image: "/assets/images/Crushers_Wood_Chippers.png",
  },
  {
    id: "CR-005",
    title: "Kato NK250 Crane",
    category: "Crane",
    year: "2016",
    hours: "6,400 hrs",
    condition: "Verified",
    image: "/assets/images/Crushers_Wood_Chippers.png",
  },
];

export default function FeaturedExportMachinery() {
  return (
    <section className="bg-white py-16 px-4 border-t border-slate-100">
      {/* زيادة العرض الأقصى للحاوية إلى max-w-[1500px] لتستوعب 5 كروت براحة */}
      <div className="mx-auto max-w-[1500px]">
        
        {/* HEADER SECTION */}
        <div className="mb-12 text-center">
          <span className="text-xs font-bold tracking-[0.25em] text-[#D9A441] uppercase">
            Available Inventory
          </span>
          <h2 className="mt-2 text-3xl font-black text-[#081F3F] md:text-[38px] leading-tight">
            Ready for Worldwide Export
          </h2>
        </div>

        {/* MACHINERY GRID (تعديل العرض لـ 5 كروت متجاوبة) */}
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full mx-auto">
          {featuredMachinery.map((machine) => (
            <div 
              key={machine.id} 
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-3xl hover:-translate-y-1 hover:shadow-md flex flex-col justify-between"
            >
              {/* Image Container - إصلاح ظهور الصورة بالكامل */}
              <div className="relative h-44 w-full overflow-hidden bg-[#081F3F]">
                <img 
                  src={machine.image} 
                  alt={machine.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Condition Tag */}
                <div className="absolute top-3 left-3 z-10 flex items-center gap-1 rounded-full bg-emerald-500 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white shadow">
                  <ShieldCheck className="h-3 w-3" />
                  {machine.condition}
                </div>
                
                {/* Stock ID Tag */}
                <div className="absolute bottom-3 right-3 z-10 rounded-md bg-[#081F3F]/80 backdrop-blur-sm px-2 py-0.5 text-[9px] font-mono text-white">
                  Ref: {machine.id}
                </div>
              </div>

              {/* Content Details */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[9px] font-bold tracking-widest text-[#D9A441] uppercase">
                    {machine.category}
                  </span>
                  {/* تصغير الخط قليلاً ليناسب مقاس الـ 5 كروت العرضي */}
                  <h3 className="mt-0.5 text-sm font-black text-[#081F3F] line-clamp-1 group-hover:text-[#D9A441] transition-colors">
                    {machine.title}
                  </h3>

                  {/* Specifications Grid */}
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

                {/* Action Button */}
                <button className="mt-1 flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#081F3F] px-3 py-2.5 text-[11px] font-bold text-white transition hover:bg-[#D9A441] hover:text-[#081F3F]">
                  Inquire
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

