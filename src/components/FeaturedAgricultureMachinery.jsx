import { ArrowUpRight, Gauge, Calendar, ShieldCheck } from "lucide-react";

const agricultureMachinery = [
  {
    id: "AG-001",
    title: "Kubota L4701 Dual Tractor",
    category: "Tractor",
    year: "2019",
    hours: "1,200 hrs",
    condition: "Verified",
    image: "/assets/images/Tractors.png", 
  },
  {
    id: "AG-002",
    title: "Yanmar YT347 Heavy Duty",
    category: "Tractor",
    year: "2020",
    hours: "850 hrs",
    condition: "Verified",
    image: "/assets/images/Yanmar.png",
  },
  {
    id: "AG-003",
    title: "Kubota ER448 Combine Harvester",
    category: "Harvester",
    year: "2018",
    hours: "640 hrs",
    condition: "Verified",
    image: "/assets/images/Combine_Harvesters.png",
  },
  {
    id: "AG-004",
    title: "Iseki NT540 Orchard Tractor",
    category: "Tractor",
    year: "2021",
    hours: "420 hrs",
    condition: "Verified",
    image: "/assets/images/Iseki.jpg",
  },
  {
    id: "AG-005",
    title: "Kubota U17 Farm Mini Digger",
    category: "Mini Excavator",
    year: "2017",
    hours: "2,100 hrs",
    condition: "Verified",
    image: "/assets/images/Mini_Excavators.png",
  },
];

export default function FeaturedAgricultureMachinery() {
  return (
    <section className="bg-white py-16 px-4 border-t border-slate-100">
      {/* الحاوية العريضة max-w-[1500px] لتستوعب الـ 5 كروت بشكل فسيح */}
      <div className="mx-auto max-w-[1500px]">
        
        {/* HEADER SECTION */}
        <div className="mb-12 text-center">
          <span className="text-xs font-bold tracking-[0.25em] text-[#D9A441] uppercase">
            In-Stock Fleet
          </span>
          <h2 className="mt-2 text-3xl font-black text-[#081F3F] md:text-[38px] leading-tight">
            Featured Agricultural Machinery
          </h2>
          <p className="mx-auto mt-2.5 max-w-xl text-sm text-slate-600 leading-relaxed">
            Directly sourced from trusted Japanese farms, fully PTO-tested and ready for immediate deployment.
          </p>
        </div>

        {/* 5-COLUMN GRID COMPONENT */}
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full mx-auto">
          {agricultureMachinery.map((machine) => (
            <div 
              key={machine.id} 
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md flex flex-col justify-between"
            >
              {/* نفس أبعاد حاوية الصورة الضخمة h-52 والـ object-cover المعدل */}
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
                
                {/* كرت المرجع التسلسلي للمعدة الزراعية */}
                <div className="absolute bottom-3 right-3 z-10 rounded-md bg-[#052919]/85 backdrop-blur-sm px-2 py-0.5 text-[9px] font-mono text-white">
                  Ref: {machine.id}
                </div>
              </div>

              {/* تفاصيل الكرت الداخلي والنصوص الداكنة */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[9px] font-bold tracking-widest text-[#D9A441] uppercase">
                    {machine.category}
                  </span>
                  <h3 className="mt-0.5 text-sm font-black text-[#081F3F] line-clamp-1 group-hover:text-[#D9A441] transition-colors">
                    {machine.title}
                  </h3>

                  {/* مواصفات الجرار (سنة الصنع وعداد الساعات) */}
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

                {/* زر الطلب والاستفسار */}
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
