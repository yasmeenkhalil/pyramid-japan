import { useTranslation } from "react-i18next";
import { ArrowRight, FileText, Tractor } from "lucide-react";
import { Link } from "react-router-dom";

export default function AgricultureCTA() {
  const { t } = useTranslation();

  return (
    <section className="relative bg-[#052919] py-20 px-4 overflow-hidden">
      <div className="absolute -bottom-20 -right-20 h-[350px] w-[350px] rounded-full bg-[#D9A441]/5 blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-[1100px] relative z-10 text-center">
        <span className="text-xs font-bold tracking-[0.25em] text-[#D9A441] uppercase">
          {t("ag_cta.badge")}
        </span>
        
        <h2 className="mt-3 text-3xl font-black text-white md:text-[40px] leading-tight">
          {t("ag_cta.title")}
        </h2>
        
        <p className="mx-auto mt-4 max-w-2xl text-sm md:text-base text-slate-300 leading-relaxed">
          {t("ag_cta.desc")}
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2 max-w-3xl mx-auto">
          
          <div className="rounded-2xl border border-emerald-900 bg-emerald-950/20 p-6 text-left flex flex-col justify-between hover:border-[#D9A441]/30 transition-all">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0b2416] border border-emerald-900 mb-4">
                <Tractor className="h-5 w-5 text-[#D9A441]" />
              </div>
              <h3 className="text-lg font-bold text-white">{t("ag_cta.box1_title")}</h3>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                {t("ag_cta.box1_desc")}
              </p>
            </div>
            <Link 
              to="/machinery-all/all?sector=Agriculture"
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-[#D9A441] hover:text-white transition-colors group"
            >
              {t("ag_cta.box1_btn")}
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="rounded-2xl border border-emerald-900 bg-emerald-950/20 p-6 text-left flex flex-col justify-between hover:border-[#D9A441]/30 transition-all">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0b2416] border border-emerald-900 mb-4">
                <FileText className="h-5 w-5 text-[#D9A441]" />
              </div>
              <h3 className="text-lg font-bold text-white">{t("ag_cta.box2_title")}</h3>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                {t("ag_cta.box2_desc")}
              </p>
            </div>
            <Link 
              to="/contact?inquiry=agriculture-sourcing"
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-[#D9A441] hover:text-white transition-colors group"
            >
              {t("ag_cta.box2_btn")}
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
