import React from "react";
import { useTranslation } from "react-i18next";
import { ArrowRight, ArrowLeft, Wrench, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

export default function MaintenanceCTA() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === "rtl";

  return (
    <section className="relative bg-[#051429] py-20 px-4 overflow-hidden">
      <div className="absolute -bottom-20 -left-20 h-[350px] w-[350px] rounded-full bg-[#D9A441]/5 blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-[1100px] relative z-10 text-center">
        <span className="text-xs font-bold tracking-[0.25em] text-[#D9A441] uppercase">
          {t("maintenance_cta.badge")}
        </span>
        
        <h2 className="mt-3 text-3xl font-black text-white md:text-[40px] leading-tight">
          {t("maintenance_cta.title")}
        </h2>
        
        <p className="mx-auto mt-4 max-w-2xl text-sm md:text-base text-slate-300 leading-relaxed">
          {t("maintenance_cta.desc")}
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2 max-w-3xl mx-auto">
          
          {/* Card 1 */}
          <div className={`rounded-2xl border border-slate-800 bg-slate-950/40 p-6 flex flex-col justify-between hover:border-[#D9A441]/30 transition-all ${isRtl ? "text-right" : "text-left"}`}>
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#081F3F] border border-slate-800 mb-4">
                <Wrench className="h-5 w-5 text-[#D9A441]" />
              </div>
              <h3 className="text-lg font-bold text-white">{t("maintenance_cta.card1.title")}</h3>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                {t("maintenance_cta.card1.desc")}
              </p>
            </div>
            <Link 
              to="/contact?inquiry=custom-test"
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-[#D9A441] hover:text-white transition-colors group w-fit"
            >
              <span>{t("maintenance_cta.card1.btn")}</span>
              {isRtl ? (
                <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
              ) : (
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              )}
            </Link>
          </div>

          {/* Card 2 */}
          <div className={`rounded-2xl border border-slate-800 bg-slate-950/40 p-6 flex flex-col justify-between hover:border-[#D9A441]/30 transition-all ${isRtl ? "text-right" : "text-left"}`}>
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#081F3F] border border-slate-800 mb-4">
                <ShieldCheck className="h-5 w-5 text-[#D9A441]" />
              </div>
              <h3 className="text-lg font-bold text-white">{t("maintenance_cta.card2.title")}</h3>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                {t("maintenance_cta.card2.desc")}
              </p>
            </div>
            <Link 
              to="/contact?inquiry=engineer-consultation"
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-[#D9A441] hover:text-white transition-colors group w-fit"
            >
              <span>{t("maintenance_cta.card2.btn")}</span>
              {isRtl ? (
                <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
              ) : (
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              )}
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
