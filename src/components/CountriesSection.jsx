"use client";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Globe2 } from "lucide-react";

export default function CountriesSection() {
  const { t, i18n } = useTranslation();
  const [dbCountries, setDbCountries] = useState([]);
  const [stats, setStats] = useState({
    yearsExperience: "13+",
    countriesServed: "40+",
    machinesExported: "5000+"
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        
        const countriesRes = await fetch("/api/export-countries");
        if (countriesRes.ok) {
          const countriesData = await countriesRes.json();
          setDbCountries(countriesData);
        }
        const statsRes = await fetch("/api/settings");
        if (statsRes.ok) {
          const statsData = await statsRes.json();
          setStats({
            yearsExperience: statsData.experience_years ? `${statsData.experience_years}+` : "13+",
            countriesServed: statsData.countries_count ? `${statsData.countries_count}+` : "40+",
            machinesExported: statsData.machines_count ? `${statsData.machines_count}+` : "5000+"
          });
        }
      } catch (error) {
        console.error("Failed to fetch dynamic data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const getCountryName = (country) => {
    if (i18n.language === "ar" && country.nameAr) return country.nameAr;
    if (i18n.language === "ja" && country.nameJa) return country.nameJa;
    return country.nameEn || country.name;
  };
  return (
    <section className="bg-[#081F3F] py-32">
      <div className="mx-auto max-w-[1280px] px-6">

        <div className="text-center">
          <span className="text-sm font-bold tracking-[0.3em] uppercase text-[#D9A441]">
            {t("countries_section.badge")}
          </span>

          <h2 className="mt-4 text-5xl font-black text-white">
            {t("countries_section.title")}
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
            {t("countries_section.desc")}
          </p>
        </div>

        <div className="mt-20 rounded-[40px] border border-white/10 bg-white/5 p-12 backdrop-blur-xl">

          <div className="mb-12 flex justify-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#D9A441]/20">
              <Globe2 className="h-12 w-12 text-[#D9A441]" />
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-8 gap-3">
              <div className="w-10 h-10 border-4 border-slate-700 border-t-[#D9A441] rounded-full animate-spin" />
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">{t("countries_section.loading")}</p>
            </div>
          ) : dbCountries.length === 0 ? (
            <div className="text-center py-6 text-slate-400 text-sm font-medium">
              {t("countries_section.no_data")}
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {dbCountries.map((country) => (
                <div
                  key={country.id}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center transition hover:bg-white/10"
                >
                  <span className="font-semibold text-white">
                    {getCountryName(country)}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="mt-14 grid grid-cols-3 gap-8 text-center border-t border-white/10 pt-10">

            <div>
              <div className="text-5xl font-black text-[#D9A441]">
                {stats.countriesServed}
              </div>
              <p className="mt-2 text-slate-400 text-sm font-medium tracking-wide">
                {t("countries_section.stat_countries")}
              </p>
            </div>

            <div>
              <div className="text-5xl font-black text-[#D9A441]">
                {stats.machinesExported}
              </div>
              <p className="mt-2 text-slate-400 text-sm font-medium tracking-wide">
                {t("countries_section.stat_machines")}
              </p>
            </div>

            <div>
              <div className="text-5xl font-black text-[#D9A441]">
                {stats.yearsExperience}
              </div>
              <p className="mt-2 text-slate-400 text-sm font-medium tracking-wide">
                {t("countries_section.stat_experience")}
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
