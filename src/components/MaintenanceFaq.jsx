import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function MaintenanceFaq() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === "rtl";
  const [openIndex, setOpenIndex] = useState(0); // فتح السؤال الأول تلقائياً لتطابق المظهر

  // مصفوفة تعتمد على المفاتيح لجلب الأسئلة والأجوبة المترجمة
  const faqsKeys = ["faq1", "faq2", "faq3", "faq4"];

  return (
    <section className="bg-[#F8F9FB] py-20 px-4">
      <div className="mx-auto max-w-[850px]">
        
        {/* HEADER SECTION */}
        <div className="mb-12 text-center">
          <span className="text-xs font-bold tracking-[0.25em] text-[#D9A441] uppercase">
            {t("maintenance_faq.badge")}
          </span>
          <h2 className="mt-2 text-3xl font-black text-[#081F3F] md:text-[38px] leading-tight">
            {t("maintenance_faq.title")}
          </h2>
        </div>

        {/* ACCORDION ITEMS CONTAINER */}
        <div className="space-y-4">
          {faqsKeys.map((key, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all"
              >
                {/* QUESTION TRIGGER */}
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className={`flex w-full items-center justify-between gap-4 p-5 transition-colors hover:bg-slate-50/50 ${isRtl ? "text-right" : "text-left"}`}
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className={`h-4 w-4 shrink-0 transition-colors ${isOpen ? 'text-[#D9A441]' : 'text-slate-400'}`} />
                    <span className="text-sm font-bold text-[#081F3F]">
                      {t(`maintenance_faq.items.${key}.q`)}
                    </span>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-slate-500 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-[#D9A441]" : ""
                    }`}
                  />
                </button>

                {/* ANSWER CONTAINER */}
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-[300px] border-t border-slate-100 p-5 bg-slate-50/30" : "max-h-0 pointer-events-none"
                  }`}
                >
                  <p className={`text-xs leading-relaxed text-slate-600 ${isRtl ? "text-right" : "text-left"}`}>
                    {t(`maintenance_faq.items.${key}.a`)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
