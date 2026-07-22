import { useEffect, useState } from "react";
import worldMapImage from '/assets/images/map.jpeg';
import { useTranslation } from "react-i18next";

export default function WorldShipping() {
  const { t } = useTranslation();
  const [stats, setStats] = useState(null);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/settings").then(res => res.ok ? res.json() : null),
      fetch("/api/export-countries").then(res => res.ok ? res.json() : [])
    ])
    .then(([statsData, countriesData]) => {
      if (statsData) setStats(statsData);
      if (Array.isArray(countriesData)) setCountries(countriesData);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Error loading shipping data:", err);
      setLoading(false);
    });
  }, []);

  return (
    <section className="w-full">
      <div className="text-center mb-8">
        <span className="inline-flex items-center px-5 py-2 rounded-full bg-[#FFF7ED] border border-[#D6A06A]/40 text-[#C47B36] text-xs font-semibold tracking-[0.25em] uppercase">
          {t("shipping_map.tag")}
        </span>

        <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-[#0F172A]">
          {t("shipping_map.main_title")}
        </h2>

        <p className="mt-3 text-slate-500 max-w-3xl mx-auto">
          {t("shipping_map.description")}
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="grid grid-cols-2 md:grid-cols-4 border-b border-slate-100">
          
          <div className="p-6 text-center">
            {loading ? (
              <div className="h-9 w-16 bg-slate-200 rounded-xl mx-auto animate-pulse" />
            ) : (
              <div className="text-3xl font-black text-[#C47B36]">{stats?.countries_count || 0}+</div>
            )}
            <div className="text-sm text-slate-500 mt-2">{t("shipping_map.stat_countries")}</div>
          </div>

          <div className="p-6 text-center border-l border-slate-100">
            {loading ? (
              <div className="h-9 w-16 bg-slate-200 rounded-xl mx-auto animate-pulse" />
            ) : (
              <div className="text-3xl font-black text-[#0F172A]">{stats?.experience_years || 0}+</div>
            )}
            <div className="text-sm text-slate-500 mt-2">{t("shipping_map.stat_years")}</div>
          </div>
          <div className="p-6 text-center border-l border-slate-100">
            {loading ? (
              <div className="h-9 w-20 bg-slate-200 rounded-xl mx-auto animate-pulse" />
            ) : (
              <div className="text-3xl font-black text-[#0F172A]">{stats?.machines_count || 0}+</div>
            )}
            <div className="text-sm text-slate-500 mt-2">{t("shipping_map.stat_machines")}</div>
          </div>

          <div className="p-6 text-center border-l border-slate-100">
            <div className="text-3xl font-black text-[#0F172A]">{t("shipping_map.stat_global_title")}</div>
            <div className="text-sm text-slate-500 mt-2">{t("shipping_map.stat_global_desc")}</div>
          </div>
        </div>

        <div className="p-6 md:p-10">
          <div className="overflow-hidden rounded-2xl border border-slate-200">
            <img src={worldMapImage} alt="Worldwide Shipping Network" className="w-full object-cover" />
          </div>
        </div>

        <div className="px-6 md:px-10 pb-10">
          <div className="border-t border-slate-100 pt-8">
            <h3 className="text-lg font-bold text-[#0F172A] mb-5">{t("shipping_map.countries_list_title")}</h3>

            <div className="flex flex-wrap gap-3">
              {loading ? (
                Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="h-9 w-28 bg-slate-100 border border-slate-200/60 rounded-full animate-pulse" />
                ))
              ) : countries.length > 0 ? (
                countries.map((country, index) => (
                  <span
                    key={country.id || index}
                    className="px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-sm text-slate-700 hover:border-[#C47B36] hover:text-[#C47B36] transition-all duration-300 cursor-pointer"
                  >
                    {/* استخدام التسمية الافتراضية العادية لأن السيرفر يعدلها يدوياً من طرفه بناءً على طريقتك العبقرية */}
                    {country.nameEn}
                  </span>
                ))
              ) : (
                <div className="text-sm text-slate-400 italic py-2">{t("shipping_map.no_countries")}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
