import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next"; // استيراد مكتبة الترجمة

export default function ServiceCapabilities() {
  const { t, i18n } = useTranslation(); // تفعيل تابع الترجمة وقراءة اللغة الحالية
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // فحص لغة الموقع الحالية لعرض الحقول المناسبة من قاعدة البيانات
  const isArabic = i18n.language === "ar";
  const isJapanese = i18n.language === "ja";

  useEffect(() => {
    const fetchMaintenanceCategories = async () => {
      try {
        const response = await fetch("/api/categories?sector=maintenance"); 
        const data = await response.json();
        
        if (Array.isArray(data)) {
          setCategories(data);
        }
      } catch (error) {
        console.error("Error fetching maintenance categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMaintenanceCategories();
  }, []);

  return (
    <section className="bg-[#F8F9FB] py-20 px-4">
      <div className="mx-auto max-w-[1350px]">
        
        <div className="mb-14 text-center">
          <span className="text-xs font-bold tracking-[0.25em] text-[#D9A441] uppercase">
            {t('services.sub_title')}
          </span>
          <h2 className="mt-2 text-3xl font-black text-[#081F3F] md:text-[40px] leading-tight">
            {t('services.main_title')}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-slate-600 leading-relaxed">
            {t('services.description')}
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
          {loading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="animate-pulse flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-7 h-[320px] shadow-sm">
                <div>
                  <div className="mb-6 h-20 w-20 rounded-2xl bg-slate-200" />
                  <div className="h-5 bg-slate-200 rounded w-1/2 mb-3" />
                  <div className="space-y-2">
                    <div className="h-3 bg-slate-100 rounded w-full" />
                    <div className="h-3 bg-slate-100 rounded w-5/6" />
                  </div>
                </div>
                <div className="h-4 bg-slate-200 rounded w-1/3 mt-6" />
              </div>
            ))
          ) : categories.length === 0 ? (
            <div className="col-span-full text-center text-slate-500 font-medium">
              {t('services.no_data')}
            </div>
          ) : (
            categories.map((cat) => (
              <div
                key={cat.id || cat.slug}
                onClick={() => navigate(`/machinery-all/${cat.slug}?sector=maintenance`)}
                className="group relative flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-7 shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:border-[#D9A441] hover:shadow-xl cursor-pointer text-left rtl:text-right"
              >
                <div>
                  <div className="mb-6 h-20 w-20 overflow-hidden rounded-2xl bg-slate-100 border border-slate-200 shadow-inner group-hover:border-[#D9A441] transition-colors">
                    {cat.imageUrl ? (
                      <img 
                        src={cat.imageUrl} 
                        alt={isArabic ? (cat.nameAr || cat.nameEn) : isJapanese ? (cat.nameJa || cat.nameEn) : cat.nameEn} 
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="h-full w-full bg-slate-200 flex items-center justify-center text-xs text-slate-400">
                        {t('services.no_image')}
                      </div>
                    )}
                  </div>

                  <h3 className="text-xl font-black text-[#081F3F] group-hover:text-[#D9A441] transition-colors">
                    {/* قراءة حقل الاسم المناسب للغة الحالية بناءً على السكيما الخاصة بك */}
                    {isArabic ? (cat.nameAr || cat.nameEn) : isJapanese ? (cat.nameJa || cat.nameEn) : cat.nameEn}
                  </h3>
                  
                  {/* قراءة حقل الوصف المناسب للغة الحالية بناءً على السكيما الخاصة بك */}
                  {(isArabic ? (cat.descriptionAr || cat.descriptionEn) : isJapanese ? (cat.descriptionJa || cat.descriptionEn) : cat.descriptionEn) && (
                    <p className="mt-4 text-xs leading-relaxed text-slate-500">
                      {isArabic ? (cat.descriptionAr || cat.descriptionEn) : isJapanese ? (cat.descriptionJa || cat.descriptionEn) : cat.descriptionEn}
                    </p>
                  )}
                </div>

                <div className="mt-8 flex items-center gap-1 text-xs font-bold text-[#081F3F] opacity-80 group-hover:opacity-100 group-hover:text-[#D9A441] transition-all">
                  <span>{t('services.btn_details')}</span>
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rlt:rotate-180" />
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </section>
  );
}
