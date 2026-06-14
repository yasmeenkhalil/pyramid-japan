import { PhoneCall, FileSpreadsheet, ArrowRight } from "lucide-react";

export default function RentalOrSaleCTA() {
  return (
    <section className="relative bg-[#051429] py-20 px-4 overflow-hidden">
      {/* تأثير إضاءة ذهبي خفيف في الخلفية لكسر العتمة */}
      <div className="absolute -bottom-20 -left-20 h-[350px] w-[350px] rounded-full bg-[#D9A441]/5 blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-[1100px] relative z-10 text-center">
        <span className="text-xs font-bold tracking-[0.25em] text-[#D9A441] uppercase">
          Flexible Procurement Options
        </span>
        
        <h2 className="mt-3 text-3xl font-black text-white md:text-[40px] leading-tight">
          Looking for Direct Purchase or Long-Term Rental?
        </h2>
        
        <p className="mx-auto mt-4 max-w-2xl text-sm md:text-base text-slate-300 leading-relaxed">
          We provide flexible acquisition solutions tailored to your fleet size and construction project timelines. Get verified heavy machinery on your job site with comprehensive support.
        </p>

        {/* كروتان مائلتان للخيارات المتاحة لتعزيز اتخاذ القرار */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 max-w-3xl mx-auto">
          
          {/* كرت الشراء والمخزون المتاح */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-6 text-left flex flex-col justify-between hover:border-[#D9A441]/30 transition-all">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#081F3F] border border-slate-800 mb-4">
                <FileSpreadsheet className="h-5 w-5 text-[#D9A441]" />
              </div>
              <h3 className="text-lg font-bold text-white">Buy Machinery</h3>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                Browse our inspected, owned Japanese fleet. Full customs clearance and logistics documentation included.
              </p>
            </div>
            <button className="mt-6 flex items-center gap-1.5 text-xs font-bold text-[#D9A441] hover:text-white transition-colors group">
              View Sales Inventory 
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* كرت الاستفسار عن خيارات الإيجار */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-6 text-left flex flex-col justify-between hover:border-[#D9A441]/30 transition-all">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#081F3F] border border-slate-800 mb-4">
                <PhoneCall className="h-5 w-5 text-[#D9A441]" />
              </div>
              <h3 className="text-lg font-bold text-white">Rental & Leasing</h3>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                Flexible project-based leasing programs for large construction companies and international contractors.
              </p>
            </div>
            <button className="mt-6 flex items-center gap-1.5 text-xs font-bold text-[#D9A441] hover:text-white transition-colors group">
              Inquire About Rental Rates 
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
