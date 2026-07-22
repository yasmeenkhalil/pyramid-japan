import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const BRAND_COLORS = {
  KOMATSU: "text-[#003B8E]",
  KOBELCO: "text-[#00A6E7]",
  HITACHI: "text-[#FF6600]",
  CATERPILLAR: "text-[#FFCD11]",
  KUBOTA: "text-[#E60012]",
  YANMAR: "text-[#D50000]",
  TADANO: "text-[#005BAC]",
  KATO: "text-[#002B7F]",
  SUMITOMO: "text-[#003DA5]",
  MITSUBISHI: "text-[#E60012]",
  ISUZU: "text-[#D50000]",
  HINO: "text-[#666666]",
};

const FALLBACK_COLORS = [
  "text-blue-600",
  "text-red-600",
  "text-orange-500",
  "text-amber-500",
  "text-green-600",
  "text-purple-600",
  "text-indigo-600",
  "text-teal-600"
];

export default function MakerSection() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === "rtl";
  const [makers, setMakers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/manufacturers")
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setMakers(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading manufacturers:", err);
        setLoading(false);
      });
  }, []);

  const getMakerColor = (name, index) => {
    if (!name) return "text-slate-600";
    const upperName = name.toUpperCase();
    
    if (BRAND_COLORS[upperName]) {
      return BRAND_COLORS[upperName];
    }
    return FALLBACK_COLORS[index % FALLBACK_COLORS.length];
  };

  return (
    <section className="w-full">
      <div className="mb-8 text-center">
        <span className="inline-flex items-center px-5 py-2 rounded-full bg-[#FFF7ED] border border-[#D6A06A]/40 text-[#C47B36] text-xs font-semibold tracking-[0.25em] uppercase">
          {t("maker_section.badge")}
        </span>

        <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-[#0F172A]">
          {t("maker_section.title")}
        </h2>

        <p className="mt-3 text-slate-500 max-w-2xl mx-auto">
          {t("maker_section.desc")}
        </p>
      </div>

      <div className="bg-white border border-[#D6A06A]/20 rounded-3xl p-6 md:p-8 shadow-sm">
        
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div 
                key={i} 
                className="h-20 rounded-2xl border border-slate-100 bg-slate-50 animate-pulse flex items-center justify-center"
              >
                <div className="h-4 bg-slate-200 rounded-md w-1/2" />
              </div>
            ))}
          </div>
        ) : makers.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
            {makers.map((maker, index) => {
              const colorClass = getMakerColor(maker.name, index);
              return (
                <button
                  key={maker.id || index}
                  className="group h-20 rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 hover:border-[#D6A06A] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex items-center justify-center"
                >
                  <span
                    className={`text-sm font-extrabold tracking-wide transition-all duration-300 group-hover:scale-105 ${colorClass}`}
                  >
                    {maker.name}
                  </span>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-10 text-sm text-slate-400 italic">
            {t("maker_section.no_brands")}
          </div>
        )}

      </div>
    </section>
  );
}
