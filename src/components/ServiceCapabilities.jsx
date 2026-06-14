import { ChevronRight } from "lucide-react";

// بيانات خدمات الصيانة مدعومة بصور حقيقية لأعمال الورش والميكانيك
const services = [
  {
    name: "Engine Diagnostics",
    detail: "Complete diesel engine overhaul, compression tests, and genuine fuel injector calibration.",
    image: "/assets/images/Engine_Diagnostics.jpg", // صورة محرك أو ورشة صيانة
  },
  {
    name: "Hydraulic Rebuilding",
    detail: "Testing and resealing of main hydraulic pumps, control valves, and heavy cylinders.",
    image: "/assets/images/Hydraulic_Rebuilding.jpg", // صورة ميكانيكي أو ضغط هيدروليك
  },
  {
    name: "Undercarriage Service",
    detail: "Link, roller, and track pin replacements to guarantee longevity on tough work terrains.",
    image: "/assets/images/Undercarriage_Service.jpg", // صورة جنزير أو عجلات معدة
  },
  {
    name: "Electrical Calibration",
    detail: "Sensor mapping, computerized wiring updates, and troubleshooting for advanced machinery.",
    image: "/assets/images/Electrical_Calibration.jpg", // صورة فحص كهربائي أو تقني للآلات
  },
];

export default function ServiceCapabilities() {
  return (
    <section className="bg-[#F8F9FB] py-20 px-4">
      <div className="mx-auto max-w-[1350px]">
        
        {/* HEADER SECTION */}
        <div className="mb-14 text-center">
          <span className="text-xs font-bold tracking-[0.25em] text-[#D9A441] uppercase">
            Technical Excellence
          </span>
          <h2 className="mt-2 text-3xl font-black text-[#081F3F] md:text-[40px] leading-tight">
            Workshop Capabilities
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-slate-600 leading-relaxed">
            Our specialized repair centers are staffed by certified engineers dedicated to extending your fleet's working lifespan.
          </p>
        </div>

        {/* SERVICES GRID (نفس التباعد القياسي الفخم والمريح gap-8) */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
          {services.map((svc, index) => (
            <div
              key={index}
              className="group relative flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-7 shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:border-[#D9A441] hover:shadow-xl cursor-pointer"
            >
              <div>
                {/* حاوية الصورة الكبيرة الفخمة بدلاً من الأيقونة */}
                <div className="mb-6 h-20 w-20 overflow-hidden rounded-2xl bg-slate-100 border border-slate-200 shadow-inner group-hover:border-[#D9A441] transition-colors">
                  <img 
                    src={svc.image} 
                    alt={svc.name} 
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* العنوان بحجم كبير فاخر */}
                <h3 className="text-xl font-black text-[#081F3F] group-hover:text-[#D9A441] transition-colors">
                  {svc.name}
                </h3>
                
                {/* تفاصيل خدمة الصيانة الموزونة */}
                <p className="mt-4 text-xs leading-relaxed text-slate-500">
                  {svc.detail}
                </p>
              </div>

              {/* سهم التفاعل السفلي النظيف */}
              <div className="mt-8 flex items-center gap-1 text-xs font-bold text-[#081F3F] opacity-80 group-hover:opacity-100 group-hover:text-[#D9A441] transition-all">
                <span>Service Details</span>
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
