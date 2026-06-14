import { ArrowRight, Wrench, ShieldCheck } from "lucide-react";

export default function MaintenanceCTA() {
  return (
    <section className="relative bg-[#051429] py-20 px-4 overflow-hidden">
      {/* تأثير إضاءة ذهبي خفيف متناسق مع هوية موقعك */}
      <div className="absolute -bottom-20 -left-20 h-[350px] w-[350px] rounded-full bg-[#D9A441]/5 blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-[1100px] relative z-10 text-center">
        <span className="text-xs font-bold tracking-[0.25em] text-[#D9A441] uppercase">
          Uncompromised Reliability
        </span>
        
        <h2 className="mt-3 text-3xl font-black text-white md:text-[40px] leading-tight">
          Need a Custom Inspection Report Before Shipping?
        </h2>
        
        <p className="mx-auto mt-4 max-w-2xl text-sm md:text-base text-slate-300 leading-relaxed">
          Our team of senior Japanese engineers is ready to prepare custom diagnostic reports for your target machinery. Ensure your field operations stay 100% efficient from day one.
        </p>

        {/* كروت اتخاذ القرار بالأبعاد الفسيحة المعتادة للموقع */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 max-w-3xl mx-auto">
          
          {/* كرت طلب الفحص المخصص */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-6 text-left flex flex-col justify-between hover:border-[#D9A441]/30 transition-all">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#081F3F] border border-slate-800 mb-4">
                <Wrench className="h-5 w-5 text-[#D9A441]" />
              </div>
              <h3 className="text-lg font-bold text-white">Schedule Custom Test</h3>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                Request specific cylinder pressure tests, engine blow-by videos, or digital multi-point diagnostics for your fleet.
              </p>
            </div>
            <button className="mt-6 flex items-center gap-1.5 text-xs font-bold text-[#D9A441] hover:text-white transition-colors group">
              Book Test Service
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* كرت الاستشارة الفنية */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-6 text-left flex flex-col justify-between hover:border-[#D9A441]/30 transition-all">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#081F3F] border border-slate-800 mb-4">
                <ShieldCheck className="h-5 w-5 text-[#D9A441]" />
              </div>
              <h3 className="text-lg font-bold text-white">Technical Consultation</h3>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                Unsure about parts compatibility or modification requirements for your local climate? Speak to our workshop foreman.
              </p>
            </div>
            <button className="mt-6 flex items-center gap-1.5 text-xs font-bold text-[#D9A441] hover:text-white transition-colors group">
              Talk to an Engineer
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
