import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight, ArrowLeft, Wrench, ShieldCheck, Settings } from "lucide-react";

export default function MaintenanceHero() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === "rtl";

  const scrollToParts = () => {
    const element = document.getElementById("parts-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#0b192e] px-4 pt-0">
      <div className="mx-auto mt-0 max-w-[1300px] bg-[#07162c] rounded-[40px] relative overflow-hidden shadow-2xl min-h-[500px] md:min-h-[550px] flex items-center">
        
        <div className="absolute inset-0 z-0 bg-[#07162c]" />

        <div className="relative z-10 w-full p-5 md:p-12 grid items-center gap-12 lg:grid-cols-12">
          
          <div className={`relative z-10 w-full max-w-2xl lg:col-span-7 ${isRtl ? "text-right" : "text-left"}`}>

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#d9a441]/20 bg-[#d9a441]/10 px-4 py-1.5">
              <Wrench className="h-3.5 w-3.5 text-[#d9a441]" />
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#d9a441] uppercase">
                {t("maintenance_hero.badge")}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-[46px] font-black leading-[1.15] text-white">
              {t("maintenance_hero.title_start")}{" "}
              <span className="text-[#d9a441] block sm:inline">
                {t("maintenance_hero.title_highlight")}
              </span>{" "}
              {t("maintenance_hero.title_end")}
            </h1>

            <p className="mt-4 text-sm md:text-base leading-relaxed text-slate-400">
              {t("maintenance_hero.desc")}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link 
                to="/contact?inquiry=maintenance-service"
                className="group inline-flex items-center gap-2.5 rounded-xl bg-[#d9a441] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#c49335] text-center"
              >
                <span>{t("maintenance_hero.btn_service")}</span>
                {isRtl ? (
                  <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />
                ) : (
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                )}
              </Link>

              <button 
                onClick={scrollToParts}
                className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/10 text-center cursor-pointer"
              >
                {t("maintenance_hero.btn_parts")}
              </button>
            </div>

            {/* Stats Section */}
            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-white/5 pt-6 max-w-md">
              <div>
                <h3 className="text-2xl font-black text-[#d9a441]">{t("maintenance_hero.stats.stat1_num")}</h3>
                <p className="mt-1 text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                  {t("maintenance_hero.stats.stat1_lbl")}
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-black text-[#d9a441]">{t("maintenance_hero.stats.stat2_num")}</h3>
                <p className="mt-1 text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                  {t("maintenance_hero.stats.stat2_lbl")}
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-black text-[#d9a441]">{t("maintenance_hero.stats.stat3_num")}</h3>
                <p className="mt-1 text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                  {t("maintenance_hero.stats.stat3_lbl")}
                </p>
              </div>
            </div>
          </div>

          {/* Right Cards Section */}
          <div className={`lg:col-span-5 hidden lg:flex flex-col gap-4 justify-center ${isRtl ? "items-start" : "items-end"}`}>
            
            <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#112240]/50 p-5 backdrop-blur-md w-full max-w-[320px] shadow-xl transition hover:border-white/20">
              <div className="h-12 w-12 rounded-xl bg-[#d9a441]/10 flex items-center justify-center shrink-0">
                <ShieldCheck className="h-6 w-6 text-[#d9a441]" />
              </div>
              <div className={`leading-tight ${isRtl ? "text-right" : "text-left"}`}>
                <h4 className="text-base font-bold text-white">{t("maintenance_hero.cards.card1_title")}</h4>
                <p className="text-xs text-slate-400 mt-1">{t("maintenance_hero.cards.card1_desc")}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#112240]/50 p-5 backdrop-blur-md w-full max-w-[320px] shadow-xl transition hover:border-white/20">
              <div className="h-12 w-12 rounded-xl bg-[#d9a441]/10 flex items-center justify-center shrink-0">
                <Settings className="h-6 w-6 text-[#d9a441]" />
              </div>
              <div className={`leading-tight ${isRtl ? "text-right" : "text-left"}`}>
                <h4 className="text-base font-bold text-white">{t("maintenance_hero.cards.card2_title")}</h4>
                <p className="text-xs text-slate-400 mt-1">{t("maintenance_hero.cards.card2_desc")}</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
