import { ArrowRight, FileText, Tractor } from "lucide-react";

export default function AgricultureCTA() {
  return (
    <section className="relative bg-[#052919] py-20 px-4 overflow-hidden">
      {/* تأثير إضاءة ذهبي ناعم في الزاوية ليتماشى مع الألوان */}
      <div className="absolute -bottom-20 -right-20 h-[350px] w-[350px] rounded-full bg-[#D9A441]/5 blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-[1100px] relative z-10 text-center">
        <span className="text-xs font-bold tracking-[0.25em] text-[#D9A441] uppercase">
          Empower Your Harvest
        </span>
        
        <h2 className="mt-3 text-3xl font-black text-white md:text-[40px] leading-tight">
          Ready to Have Your Next Japanese Tractor?
        </h2>
        
        <p className="mx-auto mt-4 max-w-2xl text-sm md:text-base text-slate-300 leading-relaxed">
          We streamline the entire export pipeline for agricultural machinery. From complete PTO testing to secure seaport container loading, get farm-ready units delivered directly to your region.
        </p>

        {/* توزيع كروت الخيارات بالأبعاد القياسية الفسيحة */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 max-w-3xl mx-auto">
          
          {/* كرت طلب الكتالوج والمخزون المتوفر */}
          <div className="rounded-2xl border border-emerald-900 bg-emerald-950/20 p-6 text-left flex flex-col justify-between hover:border-[#D9A441]/30 transition-all">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0b2416] border border-emerald-900 mb-4">
                <Tractor className="h-5 w-5 text-[#D9A441]" />
              </div>
              <h3 className="text-lg font-bold text-white">Request Stock List</h3>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                Receive our complete live agricultural catalog including multi-angle field photos and complete engine test documentation.
              </p>
            </div>
            <button className="mt-6 flex items-center gap-1.5 text-xs font-bold text-[#D9A441] hover:text-white transition-colors group">
              Get Tractor List 
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* كرت الاستفسار عن فحص الآليات والـ PTO */}
          <div className="rounded-2xl border border-emerald-900 bg-emerald-950/20 p-6 text-left flex flex-col justify-between hover:border-[#D9A441]/30 transition-all">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0b2416] border border-emerald-900 mb-4">
                <FileText className="h-5 w-5 text-[#D9A441]" />
              </div>
              <h3 className="text-lg font-bold text-white">PTO Custom Inquiries</h3>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                Need a specific horse-power (HP) rating or specialized rotary attachments? Connect with our sourcing experts in Japan.
              </p>
            </div>
            <button className="mt-6 flex items-center gap-1.5 text-xs font-bold text-[#D9A441] hover:text-white transition-colors group">
              Consult Sourcing Expert 
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
