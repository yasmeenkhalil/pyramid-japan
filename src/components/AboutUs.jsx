import { CheckCircle2, ShieldCheck, Globe2, Ship } from 'lucide-react';

export default function AboutUs() {
  const advantages = [
    {
      icon: ShieldCheck,
      title: "Certified Ag-Tech Quality",
      desc: "Every tractor, combine harvester, and sugarcane rig undergoes intensive multi-point mechanical and hydraulic testing before export."
    },
    {
      icon: Ship,
      title: "Global Machinery Logistics",
      desc: "Expert handling of oversized farm machinery, including professional dismantling, heavy container loading, and ocean freight."
    },
    {
      icon: Globe2,
      title: "Top Japanese Brands",
      desc: "Direct sourcing from premium Japanese dealer networks and auction houses, ensuring genuine parts and pristine operational hours."
    }
  ];

  return (
    <section id="about-us" className="w-full bg-slate-50 py-20 px-4 md:px-6 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full">
                Agricultural Machinery Experts
              </span>
              <h2 className="text-2xl md:text-4xl font-black text-slate-900 leading-tight">
                PYRAMID JAPAN <span className="text-rose-600">CORP.</span>
              </h2>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                Premier Exporter of Premium Used Agricultural Equipment
              </p>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              Based in Japan, <strong>Pyramid Japan Corp.</strong> stands as a trusted global supplier of elite used agricultural machinery. We specialize in sourcing and exporting high-capacity tractors, precision combine harvesters, specialized sugar harvesters, and high-tech field implements tailored to worldwide farming standards.
            </p>

            <p className="text-sm text-slate-600 leading-relaxed">
              Our engineering team carefully screens each piece of heavy equipment to ensure peak hydraulic performance and field readiness. We bridge the gap between premium Japanese equipment sources and international agricultural enterprises.
            </p>

            {/* نقاط القوة المحدثة للمعدات الزراعية */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Heavy-Duty Farm Tractors</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>High-Capacity Harvesters</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>100% Field-Tested in Japan</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Custom Dismantling & Shipping</span>
              </div>
            </div>
          </div>

          {/* قسم الصورة الكبيرة للمعدات الزراعية */}
          <div className="relative">
            <div className="w-full h-[350px] md:h-[450px] rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-white">
              <img 
                src="https://www.deere.com/assets/images/region-4/industries/agriculture/sugar-harvester/r4k072428_rrd-1024x576.jpg" 
                alt="Pyramid Japan Heavy Agricultural Equipment" 
                className="w-full h-full object-cover object-center"
              />
            </div>

            <div className="absolute -bottom-6 -right-4 bg-slate-950 text-white p-5 rounded-xl shadow-xl hidden sm:block max-w-[220px] border border-slate-800">
              <p className="text-2xl font-mono font-black text-emerald-500">100%</p>
              <p className="text-xs font-bold uppercase tracking-wider mt-1">Global Standard</p>
              <p className="text-[11px] text-slate-400 mt-1 leading-normal">Field-ready machinery exported directly from professional Japanese agricultural hubs.</p>
            </div>
          </div>

        </div>

        {/* الميزات التنافسية الـ 3 المحدثة */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
          {advantages.map((adv, idx) => {
            const Icon = adv.icon;
            return (
              <div 
                key={idx} 
                className="bg-white border border-slate-200/60 p-6 rounded-xl hover:shadow-md transition-shadow duration-200"
              >
                <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100 mb-4">
                  <Icon className="w-5 h-5 text-slate-800" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  {adv.title}
                </h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  {adv.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
