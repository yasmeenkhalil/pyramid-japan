import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight, Hammer, HardHat, ShieldAlert } from "lucide-react";

export default function ConstructionHero() {
  const { t, i18n } = useTranslation();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMachineryData = async () => {
      try {
        const response = await fetch("/api/categories?sector=Construction");
        const data = await response.json();

        if (Array.isArray(data)) {
          setCategories(data);
        }
      } catch (error) {
        console.error("Error fetching machinery data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMachineryData();
  }, []);

  const getCategoryName = (cat) => {
    if (i18n.language === "ar" && cat.nameAr) return cat.nameAr;
    if (i18n.language === "ja" && cat.nameJa) return cat.nameJa;
    return cat.nameEn || cat.name;
  };

  return (
    <section className="relative overflow-hidden bg-[#0b192e] px-4 pt-0">
      <div className="mx-auto mt-0 max-w-[1300px] bg-[#07162c] rounded-[40px] relative overflow-hidden shadow-2xl min-h-[500px] md:min-h-[550px] flex items-center">

        <div className="absolute inset-0 z-0 bg-[#07162c]" />

        <div className="relative z-10 w-full p-5 md:p-12 grid items-center gap-12 lg:grid-cols-12">

          <div className="lg:col-span-7 max-w-2xl">

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#d9a441]/20 bg-[#d9a441]/10 px-4 py-1.5">
              <Hammer className="h-3.5 w-3.5 text-[#d9a441]" />
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#d9a441] uppercase">
                {t("con_hero.badge")}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-[46px] font-black leading-[1.15] text-white">
              {t("con_hero.title1")}{" "}
              <span className="text-[#d9a441] block sm:inline">
                {t("con_hero.title2")}
              </span>{" "}
              {t("con_hero.title3")}
            </h1>

            <p className="mt-4 text-sm md:text-base leading-relaxed text-slate-400">
              {t("con_hero.desc")}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/machinery-all/all?sector=Construction"
                className="group inline-flex items-center gap-2.5 rounded-xl bg-[#d9a441] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#c49335]"
              >
                {t("con_hero.btn1")}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>

              <Link
                to="/contact?inquiry=construction"
                className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/10 text-center"
              >
                {t("con_hero.btn2")}
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-white/5 pt-6 max-w-md">
              {loading ? (
                <div className="text-slate-400 text-sm">{t("con_hero.loading_cats")}</div>
              ) : categories.length === 0 ? (
                <div className="text-slate-400 text-sm">{t("con_hero.no_cats")}</div>
              ) : (
                categories.slice(0, 3).map((cat) => (
                  <div key={cat.id || cat.slug}>
                    <h3 className="text-2xl font-black text-[#d9a441]">
                      {cat.machineryCount}+
                    </h3>
                    <p className="mt-1 text-[11px] font-medium text-slate-400 uppercase tracking-wider breakdown-words">
                      {getCategoryName(cat)}
                    </p>
                  </div>
                ))
              )}
            </div>

          </div>

          <div className="lg:col-span-5 hidden lg:flex flex-col gap-4 justify-center items-end">

            <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#112240]/50 p-5 backdrop-blur-md w-full max-w-[320px] shadow-xl transition hover:border-white/20">
              <div className="h-12 w-12 rounded-xl bg-[#d9a441]/10 flex items-center justify-center shrink-0">
                <HardHat className="h-6 w-6 text-[#d9a441]" />
              </div>
              <div className="leading-tight">
                <h4 className="text-base font-bold text-white">{t("con_hero.card1_title")}</h4>
                <p className="text-xs text-slate-400 mt-1">{t("con_hero.card1_desc")}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#112240]/50 p-5 backdrop-blur-md w-full max-w-[320px] shadow-xl transition hover:border-white/20">
              <div className="h-12 w-12 rounded-xl bg-[#d9a441]/10 flex items-center justify-center shrink-0">
                <ShieldAlert className="h-6 w-6 text-[#d9a441]" />
              </div>
              <div className="leading-tight">
                <h4 className="text-base font-bold text-white">{t("con_hero.card2_title")}</h4>
                <p className="text-xs text-slate-400 mt-1">{t("con_hero.card2_desc")}</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
