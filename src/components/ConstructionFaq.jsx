import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function ConstructionFaq() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(0);

  const constructionFaqs = t("con_faq.questions", { returnObjects: true }) || [];

  return (
    <section className="bg-[#F8F9FB] py-20 px-4">
      <div className="mx-auto max-w-[850px]">
        
        <div className="mb-12 text-center">
          <span className="text-xs font-bold tracking-[0.25em] text-[#D9A441] uppercase">
            {t("con_faq.badge")}
          </span>
          <h2 className="mt-2 text-3xl font-black text-[#081F3F] md:text-[38px] leading-tight">
            {t("con_faq.title")}
          </h2>
        </div>

        <div className="space-y-4">
          {Array.isArray(constructionFaqs) && constructionFaqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors hover:bg-slate-50/50"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className={`h-4 w-4 shrink-0 transition-colors ${isOpen ? 'text-[#D9A441]' : 'text-slate-400'}`} />
                    <span className="text-sm font-bold text-[#081F3F]">
                      {faq.q}
                    </span>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-slate-500 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-[#D9A441]" : ""
                    }`}
                  />
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-[300px] border-t border-slate-100 p-5 bg-slate-50/30" : "max-h-0 pointer-events-none"
                  }`}
                >
                  <p className="text-xs leading-relaxed text-slate-600">
                    {faq.a}
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
