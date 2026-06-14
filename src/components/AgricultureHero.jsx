import { ArrowRight, Leaf, ShieldCheck, Tractor } from "lucide-react";

export default function AgricultureHero() {
  return (
    <section className="relative overflow-hidden bg-[#0b2416] px-4 pt-0">
      {/* البوكس الداخلي الكبير المستدير بنفس أبعاد ومارجن الصفحات السابقة ولكن بلون أخضر غامق جداً عميق */}
      <div className="mx-auto mt-0 max-w-[1300px] bg-[#052919] rounded-[40px] relative overflow-hidden shadow-2xl min-h-[500px] md:min-h-[550px] flex items-center">
        
        {/* خلفية صلبة متناسقة */}
        <div className="absolute inset-0 z-0 bg-[#052919]" />

        {/* CONTENT CONTAINER */}
        <div className="relative z-10 w-full p-5 md:p-12 grid items-center gap-12 lg:grid-cols-12">
          
          {/* LEFT SIDE: TEXT CONTENT */}
          <div className="lg:col-span-7 max-w-2xl">

            {/* الشارة العلوية الزراعية */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#d9a441]/20 bg-[#d9a441]/10 px-4 py-1.5">
              <Tractor className="h-3.5 w-3.5 text-[#d9a441]" />
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#d9a441] uppercase">
                High-Efficiency Agricultural Fleet
              </span>
            </div>

            {/* العنوان الرئيسي الضخم والموزون بنفس مقاس الـ Export */}
            <h1 className="text-3xl md:text-4xl lg:text-[46px] font-black leading-[1.15] text-white">
              Premium Japanese{" "}
              <span className="text-[#d9a441] block sm:inline">
                Tractors & Machinery
              </span>{" "}
              For Modern Farming
            </h1>

            {/* الوصف المنسق */}
            <p className="mt-4 text-sm md:text-base leading-relaxed text-slate-300">
              Source highly reliable, multi-functional, and fuel-efficient used agricultural equipment directly from Japan. Tailored for maximum harvest productivity and small-to-large scale farming.
            </p>

            {/* الأزرار المطابقة للأبعاد القياسية للموقع */}
            <div className="mt-8 flex flex-wrap gap-3">
              <button className="group flex items-center gap-2.5 rounded-xl bg-[#d9a441] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#c49335]">
                Explore Agriculture Inventory
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </button>

              <button className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/10">
                Browse Tractor Stock
              </button>
            </div>

            {/* إحصائيات قطاع الزراعة تحت الخط الرفيع */}
            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-white/5 pt-6 max-w-md">
              <div>
                <h3 className="text-2xl font-black text-[#d9a441]">35+</h3>
                <p className="mt-1 text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                  Tractors In Stock
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-black text-[#d9a441]">Kubota</h3>
                <p className="mt-1 text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                  Top Brand Partner
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-black text-[#d9a441]">100%</h3>
                <p className="mt-1 text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                  PTO Tested
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: ENLARGED FLOATING CARDS (الكروت العائمة الجانبية الموحدة المظهر) */}
          <div className="lg:col-span-5 hidden lg:flex flex-col gap-4 justify-center items-end">
            
            {/* الكرت الأول مخصص لفحص المحاور وعمود الدوران PTO */}
            <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#143d27]/50 p-5 backdrop-blur-md w-full max-w-[320px] shadow-xl transition hover:border-white/20">
              <div className="h-12 w-12 rounded-xl bg-[#d9a441]/10 flex items-center justify-center shrink-0">
                <ShieldCheck className="h-6 w-6 text-[#d9a441]" />
              </div>
              <div className="leading-tight">
                <h4 className="text-base font-bold text-white">PTO & Engine Tested</h4>
                <p className="text-xs text-slate-400 mt-1">Full operational rotary test reports</p>
              </div>
            </div>

            {/* الكرت الثاني مخصص لجودة التروس والقطع اليابانية */}
            <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#143d27]/50 p-5 backdrop-blur-md w-full max-w-[320px] shadow-xl transition hover:border-white/20">
              <div className="h-12 w-12 rounded-xl bg-[#d9a441]/10 flex items-center justify-center shrink-0">
                <Leaf className="h-6 w-6 text-[#d9a441]" />
              </div>
              <div className="leading-tight">
                <h4 className="text-base font-bold text-white">Farm-Ready Units</h4>
                <p className="text-xs text-slate-400 mt-1">Serviced, lubricated and completely operational</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
