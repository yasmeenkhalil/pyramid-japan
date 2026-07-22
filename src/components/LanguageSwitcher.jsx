"use client";

import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  // دالة موحدة لتغيير اللغة وتغيير اتجاه الصفحة ديناميكياً
  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng);
    document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lng;
  };

  // التأكد من ضبط الاتجاه الصحيح عند تحميل الصفحة لأول مرة بناءً على اللغة الحالية
  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <div className="flex items-center gap-2" dir="ltr"> {/* تضمن بقاء ترتيب الأزرار ثابتاً لا ينعكس */}
      <button 
        onClick={() => handleLanguageChange("en")} 
        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
          i18n.language.startsWith("en") 
            ? "bg-[#D9A441] text-[#081F3F] shadow-sm animate-pulse-once" 
            : "bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10"
        }`}
      >
        EN
      </button>
      
      <button 
        onClick={() => handleLanguageChange("ja")} 
        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
          i18n.language.startsWith("ja") 
            ? "bg-[#D9A441] text-[#081F3F] shadow-sm" 
            : "bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10"
        }`}
      >
        JP
      </button>
      
      <button 
        onClick={() => handleLanguageChange("ar")} 
        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
          i18n.language.startsWith("ar") 
            ? "bg-[#D9A441] text-[#081F3F] shadow-sm" 
            : "bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10"
        }`}
      >
        عربي
      </button>
    </div>
  );
}
