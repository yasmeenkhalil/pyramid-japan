import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight, Leaf, ShieldCheck, Tractor } from "lucide-react";

export default function AgricultureHero() {
  const { t } = useTranslation();
  const [tractorCount, setTractorCount] = useState(0);
  const [totalAgriCount, setTotalAgriCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgriData = async () => {
      try {
        const response = await fetch("/api/machinery/all?sector=Agriculture");
        const machines = await response.json();
        
        if (Array.isArray(machines)) {
          setTotalAgriCount(machines.length);

          const tractors = machines.filter(item => {
            const catName = item.category?.nameEn || item.category || "";
            return catName.toLowerCase().includes("tractor");
          });
          
          setTractorCount(tractors.length);
        }
      } catch (error) {
        console.error("Error fetching agriculture machinery data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAgriData();
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#0b2416] px-4 pt-0">
      <div className="mx-auto mt-0 max-w-[1300px] bg-[#052919] rounded-[40px] relative overflow-hidden shadow-2xl min-h-[500px] md:min-h-[550px] flex items-center">
        
        <div className="absolute inset-0 z-0 bg-[#052919]" />

        <div className="relative z-10 w-full p-5 md:p-12 grid items-center gap-12 lg:grid-cols-12">
          
          <div className="lg:col-span-7 max-w-2xl">

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#d9a441]/20 bg-[#d9a441]/10 px-4 py-1.5">
              <Tractor className="h-3.5 w-3.5 text-[#d9a441]" />
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#d9a441] uppercase">
                {t("ag_hero.badge")}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-[46px] font-black leading-[1.15] text-white">
              {t("ag_hero.title1")}{" "}
              <span className="text-[#d9a441] block sm:inline">
                {t("ag_hero.title2")}
              </span>{" "}
              {t("ag_hero.title3")}
            </h1>

            <p className="mt-4 text-sm md:text-base leading-relaxed text-slate-300">
              {t("ag_hero.desc")}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link 
                to="/machinery-all/all?sector=Agriculture"
                className="group inline-flex items-center gap-2.5 rounded-xl bg-[#d9a441] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#c49335] text-center"
              >
                {t("ag_hero.btn1")}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>

              <Link 
                to="/machinery-all/tractors?sector=Agriculture"
                className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/10 text-center"
              >
                {t("ag_hero.btn2")}
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-white/5 pt-6 max-w-md">
              <div>
                <h3 className="text-2xl font-black text-[#d9a441]">
                  {loading ? "..." : `${tractorCount}+`}
                </h3>
                <p className="mt-1 text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                  {t("ag_hero.stat1")}
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-black text-[#d9a441]">
                  {loading ? "..." : `${totalAgriCount}+`}
                </h3>
                <p className="mt-1 text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                  {t("ag_hero.stat2")}
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-black text-[#d9a441]">100%</h3>
                <p className="mt-1 text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                  {t("ag_hero.stat3")}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 hidden lg:flex flex-col gap-4 justify-center items-end">
            
            <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#143d27]/50 p-5 backdrop-blur-md w-full max-w-[320px] shadow-xl transition hover:border-white/20">
              <div className="h-12 w-12 rounded-xl bg-[#d9a441]/10 flex items-center justify-center shrink-0">
                <ShieldCheck className="h-6 w-6 text-[#d9a441]" />
              </div>
              <div className="leading-tight">
                <h4 className="text-base font-bold text-white">{t("ag_hero.card1_title")}</h4>
                <p className="text-xs text-slate-400 mt-1">{t("ag_hero.card1_desc")}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#143d27]/50 p-5 backdrop-blur-md w-full max-w-[320px] shadow-xl transition hover:border-white/20">
              <div className="h-12 w-12 rounded-xl bg-[#d9a441]/10 flex items-center justify-center shrink-0">
                <Leaf className="h-6 w-6 text-[#d9a441]" />
              </div>
              <div className="leading-tight">
                <h4 className="text-base font-bold text-white">{t("ag_hero.card2_title")}</h4>
                <p className="text-xs text-slate-400 mt-1">{t("ag_hero.card2_desc")}</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
