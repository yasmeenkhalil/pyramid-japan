import { PhoneCall, FileSpreadsheet, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next"; // استيراد مكتبة الترجمة

export default function RentalOrSaleCTA() {
  const { t } = useTranslation(); // تفعيل تابع الترجمة

  return (
    <section className="relative bg-[#051429] py-20 px-4 overflow-hidden">
      <div className="absolute -bottom-20 -left-20 h-[350px] w-[350px] rounded-full bg-[#D9A441]/5 blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-[1100px] relative z-10 text-center">
        <span className="text-xs font-bold tracking-[0.25em] text-[#D9A441] uppercase">
          {t('cta.sub_title')}
        </span>
        
        <h2 className="mt-3 text-3xl font-black text-white md:text-[40px] leading-tight">
          {t('cta.main_title')}
        </h2>
        
        <p className="mx-auto mt-4 max-w-2xl text-sm md:text-base text-slate-300 leading-relaxed">
          {t('cta.description')}
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2 max-w-3xl mx-auto">
          
          <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-6 text-left rtl:text-right flex flex-col justify-between hover:border-[#D9A441]/30 transition-all">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#081F3F] border border-slate-800 mb-4">
                <FileSpreadsheet className="h-5 w-5 text-[#D9A441]" />
              </div>
              <h3 className="text-lg font-bold text-white">{t('cta.card_1_title')}</h3>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                {t('cta.card_1_desc')}
              </p>
            </div>
            <Link 
              to="/machinery-all/all" 
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-[#D9A441] hover:text-white transition-colors group"
            >
              {t('cta.card_1_btn')}
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 group-hover:rtl:-translate-x-0.5" />
            </Link>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-6 text-left rtl:text-right flex flex-col justify-between hover:border-[#D9A441]/30 transition-all">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#081F3F] border border-slate-800 mb-4">
                <PhoneCall className="h-5 w-5 text-[#D9A441]" />
              </div>
              <h3 className="text-lg font-bold text-white">{t('cta.card_2_title')}</h3>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                {t('cta.card_2_desc')}
              </p>
            </div>
            <Link 
              to="/contact?inquiry=custom-sourcing" 
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-[#D9A441] hover:text-white transition-colors group"
            >
              {t('cta.card_2_btn')}
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 group-hover:rtl:-translate-x-0.5" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
