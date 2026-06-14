import { ChevronRight } from "lucide-react";

// بيانات التصنيفات الزراعية مع صور افتراضية مخصصة لكل قطاع
const agCategories = [
  {
    name: "Tractors",
    count: "35 Units Available",
    description: "Highly efficient 4WD used tractors from world-class brands like Kubota and Yanmar.",
    image: "/assets/images/Tractors.png", // صورة جرار زراعي
  },
  {
    name: "Combine Harvesters",
    count: "14 Units Available",
    description: "Advanced rice and grain harvesters designed for high output and clean separation.",
    image: "/assets/images/Combine_Harvesters.png", // صورة حصادة
  },
  {
    name: "Rotary Tillers",
    count: "22 Units Available",
    description: "Japanese rotary tillers and soil preparation attachments in excellent condition.",
    image: "/assets/images/Rotary_Tillers.png", // صورة معدات حرث وتربة
  },
  {
    name: "Mini Excavators",
    count: "9 Units Available",
    description: "Compact, rubber-tracked mini excavators perfect for farm drainage and orchard work.",
    image: "/assets/images/Mini_Excavators.png", // صورة ميني حفار للمزارع
  },
];

export default function AgricultureCategories() {
  return (
    <section className="bg-[#F8F9FB] py-20 px-4">
      <div className="mx-auto max-w-[1350px]">
        
        {/* HEADER SECTION - متناسق تماماً مع الهيدر القياسي للموقع */}
        <div className="mb-14 text-center">
          <span className="text-xs font-bold tracking-[0.25em] text-[#D9A441] uppercase">
            Browse by Farming Equipment
          </span>
          <h2 className="mt-2 text-3xl font-black text-[#081F3F] md:text-[40px] leading-tight">
            Agricultural Sectors
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-slate-600 leading-relaxed">
            Select a specialized farming category to explore our rigorously inspected and PTO-tested Japanese stock.
          </p>
        </div>

        {/* CATEGORIES GRID (نفس التباعد الفسيح الفخم gap-8) */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
          {agCategories.map((cat, index) => (
            <div
              key={index}
              className="group relative flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-7 shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:border-[#D9A441] hover:shadow-xl cursor-pointer"
            >
              <div>
                {/* حاوية الصورة الكبيرة الفخمة بدلاً من الأيقونة */}
                <div className="mb-6 h-20 w-20 overflow-hidden rounded-2xl bg-slate-100 border border-slate-200 shadow-inner group-hover:border-[#D9A441] transition-colors">
                  <img 
                    src={cat.image} 
                    alt={cat.name} 
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* العناوين الضخمة والواضحة */}
                <h3 className="text-xl font-black text-[#081F3F] group-hover:text-[#D9A441] transition-colors">
                  {cat.name}
                </h3>
                
                <span className="mt-1.5 inline-block text-[11px] font-bold text-[#D9A441] uppercase tracking-wider">
                  {cat.count}
                </span>

                {/* الوصف الموزون والمريح للمزارعين والتجار */}
                <p className="mt-4 text-xs leading-relaxed text-slate-500">
                  {cat.description}
                </p>
              </div>

              {/* سهم الانتقال السفلي المتفاعل */}
              <div className="mt-8 flex items-center gap-1 text-xs font-bold text-[#081F3F] opacity-80 group-hover:opacity-100 group-hover:text-[#D9A441] transition-all">
                <span>View Equipment</span>
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
