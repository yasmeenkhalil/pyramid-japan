import { ArrowUpRight, Gauge, Calendar, ShieldCheck } from "lucide-react";

const constructionMachinery = [
  {
    id: "CN-001",
    title: "Caterpillar 320D Excavator",
    category: "Excavator",
    year: "2018",
    hours: "4,200 hrs",
    condition: "Verified",
    image: "/assets/images/Excavators.png",
  },
  {
    id: "CN-002",
    title: "Komatsu D65EX Bulldozer",
    category: "Bulldozer",
    year: "2017",
    hours: "5,100 hrs",
    condition: "Verified",
    image: "/assets/images/Bulldozers.png",
  },
  {
    id: "CN-003",
    title: "Hitachi ZW220 Wheel Loader",
    category: "Wheel Loader",
    year: "2019",
    hours: "3,800 hrs",
    condition: "Verified",
    image: "/assets/images/Wheel_Loaders.png",
  },
  {
    id: "CN-004",
    title: "Kobelco SK210 Excavator",
    category: "Excavator",
    year: "2020",
    hours: "2,900 hrs",
    condition: "Verified",
    image: "/assets/images/Excavators.png",
  },
  {
    id: "CN-005",
    title: "Kato NK250 Mobile Crane",
    category: "Crane",
    year: "2016",
    hours: "6,400 hrs",
    condition: "Verified",
    image: "/assets/images/Cranes.png",
  },
];

export default function FeaturedConstructionMachinery() {
  return (
    <section className="bg-white py-16 px-4 border-t border-slate-100">
      <div className="mx-auto max-w-[1500px]">
        
        {/* HEADER SECTION */}
        <div className="mb-12 text-center">
          <span className="text-xs font-bold tracking-[0.25em] text-[#D9A441] uppercase">
            In-Stock Machinery
          </span>
          <h2 className="mt-2 text-3xl font-black text-[#081F3F] md:text-[38px] leading-tight">
            Featured Construction Equipment
          </h2>
          <p className="mx-auto mt-2.5 max-w-xl text-sm text-slate-600 leading-relaxed">
            Directly sourced from Japanese construction fleets, fully inspected and job-site ready.
          </p>
        </div>

        {/* 5-COLUMN GRID COMPONENT */}
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full mx-auto">
          {constructionMachinery.map((machine) => (
            <div 
              key={machine.id} 
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md flex flex-col justify-between"
            >
              {/* تكبير ارتفاع الحاوية بالكامل إلى h-52 ليعطي مساحة عرض ضخمة للمعدة */}
              <div className="relative h-52 w-full overflow-hidden bg-[#F4F6F9] border-b border-slate-100">
                <img 
                  src={machine.image} 
                  alt={machine.title}
                 
                  className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* شارة التحقق */}
                <div className="absolute top-3 left-3 z-10 flex items-center gap-1 rounded-full bg-emerald-500 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white shadow">
                  <ShieldCheck className="h-3 w-3" />
                  {machine.condition}
                </div>
                
                {/* كرت المرجع التسلسلي */}
                <div className="absolute bottom-3 right-3 z-10 rounded-md bg-[#081F3F]/85 backdrop-blur-sm px-2 py-0.5 text-[9px] font-mono text-white">
                  Ref: {machine.id}
                </div>
              </div>

              {/* تفاصيل المعدة */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[9px] font-bold tracking-widest text-[#D9A441] uppercase">
                    {machine.category}
                  </span>
                  <h3 className="mt-0.5 text-sm font-black text-[#081F3F] line-clamp-1 group-hover:text-[#D9A441] transition-colors">
                    {machine.title}
                  </h3>

                  {/* مواصفات الآلية */}
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

                {/* زر الإجراء */}
                <button className="mt-1 flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#081F3F] px-3 py-2.5 text-[11px] font-bold text-white transition hover:bg-[#D9A441] hover:text-[#081F3F]">
                  Inquire Now
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
