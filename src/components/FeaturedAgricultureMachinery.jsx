import React, { useState, useEffect } from "react";
import { ArrowUpRight, Gauge, Calendar, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function FeaturedAgricultureMachinery() {
  const { t, i18n } = useTranslation();
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(true);

  const transformData = (items) => {
    if (!items || !Array.isArray(items)) return [];
    return items.map((item) => {
      let finalTitle = item.titleEn || item.title || "";
      if (i18n.language === "ar" && item.titleAr) finalTitle = item.titleAr;
      if (i18n.language === "ja" && item.titleJa) finalTitle = item.titleJa;

      let finalCategory = item.category?.nameEn || "Machinery";
      if (i18n.language === "ar" && item.category?.nameAr) finalCategory = item.category.nameAr;
      if (i18n.language === "ja" && item.category?.nameJa) finalCategory = item.category.nameJa;

      return {
        id: item.id,
        title: finalTitle,
        category: finalCategory,
        year: item.year ? item.year.toString() : "",
        hours: item.hour ? `${item.hour.toLocaleString()} ${t("featured_agri.hrs")}` : `0 ${t("featured_agri.hrs")}`,
        condition: t("featured_agri.condition_val"),
        price: item.price ? `${item.price.toLocaleString()} JPY` : t("featured_agri.ask_price"),
        image: item.images && item.images.length > 0 ? item.images[0].imageUrl : '/assets/images/Tractors.png',
      };
    });
  };

  useEffect(() => {
    async function fetchFeaturedMachines() {
      try {
        setLoading(true);
        const response = await fetch("/api/machinery/all?sector=Agriculture&featured=true");
        if (response.ok) {
          const data = await response.json();
          setMachines(transformData(data));
        }
      } catch (err) {
        console.error("Fetch featured agriculture machinery error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchFeaturedMachines();
  }, [i18n.language]);

  return (
    <section className="bg-white py-16 px-9 border-t border-slate-100">
      <div className="mx-auto max-w-[1500px]">
        
        <div className="mb-12 text-center">
          <span className="text-xs font-bold tracking-[0.25em] text-[#D9A441] uppercase">
            {t("featured_agri.badge")}
          </span>
          <h2 className="mt-2 text-3xl font-black text-[#081F3F] md:text-[38px] leading-tight">
            {t("featured_agri.title")}
          </h2>
          <p className="mx-auto mt-2.5 max-w-xl text-sm text-slate-600 leading-relaxed">
            {t("featured_agri.desc")}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full mx-auto">
          {loading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="animate-pulse rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col justify-between h-[380px]">
                <div className="relative h-52 w-full bg-slate-200 rounded-t-2xl" />
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="h-2 w-12 bg-slate-200 rounded mb-1" />
                    <div className="h-4 w-3/4 bg-slate-200 rounded" />
                    <div className="grid grid-cols-2 gap-2 border-t border-b border-slate-100 py-2.5 my-3">
                      <div className="h-6 bg-slate-100 rounded" />
                      <div className="h-6 bg-slate-100 rounded" />
                    </div>
                  </div>
                  <div className="h-10 bg-slate-200 rounded-xl w-full" />
                </div>
              </div>
            ))
          ) : machines.length === 0 ? (
            <div className="col-span-full text-center text-slate-500 font-medium py-10">
              {t("featured_agri.no_data")}
            </div>
          ) : (
            machines.map((machine) => (
              <Link 
                key={machine.id} 
                to={`/machinery/${machine.id}`}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md flex flex-col justify-between block"
              >
                <div className="relative h-52 w-full overflow-hidden bg-[#F4F6F9] border-b border-slate-100">
                  <img 
                    src={machine.image} 
                    alt={machine.title}
                    className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 z-10 flex items-center gap-1 rounded-full bg-emerald-500 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white shadow">
                    <ShieldCheck className="h-3 w-3" />
                    {machine.condition}
                  </div>
                  <div className="absolute bottom-3 right-3 z-10 rounded-md bg-[#052919]/85 backdrop-blur-sm px-2 py-0.5 text-[9px] font-mono text-white">
                    {t("featured_agri.ref_label")}: {machine.id}
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] font-bold tracking-widest text-[#D9A441] uppercase">
                      {machine.category}
                    </span>
                    <h3 className="mt-0.5 text-sm font-black text-[#081F3F] line-clamp-1 group-hover:text-[#D9A441] transition-colors">
                      {machine.title}
                    </h3>

                    <div className="mt-3 grid grid-cols-2 gap-2 border-t border-b border-slate-100 py-2.5 my-3">
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <Calendar className="h-3.5 w-3.5 text-[#D9A441]" />
                        <div className="flex flex-col">
                          <span className="text-[9px] text-slate-400 leading-none">{t("featured_agri.year_label")}</span>
                          <span className="text-xs font-bold text-[#081F3F] mt-0.5">{machine.year}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <Gauge className="h-3.5 w-3.5 text-[#D9A441]" />
                        <div className="flex flex-col">
                          <span className="text-[9px] text-slate-400 leading-none">{t("featured_agri.hours_label")}</span>
                          <span className="text-xs font-bold text-[#081F3F] mt-0.5">{machine.hours}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-2">
                      <span className="text-[10px] text-slate-400 block leading-none">{t("featured_agri.price_label")}</span>
                      <span className="text-xs font-black text-[#C47B36] mt-0.5 block">{machine.price}</span>
                    </div>
                  </div>

                  <button className="mt-1 flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#081F3F] px-3 py-2.5 text-[11px] font-bold text-white transition hover:bg-[#D9A441] hover:text-[#081F3F]">
                    {t("featured_agri.btn_details")}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
