"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react";

export default function FaqSection() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(0);

  const faqs = t("faq_section.questions", { returnObjects: true }) || [];

  return (
    <section className="bg-[#F8F9FB] py-32">
      <div className="mx-auto max-w-[900px] px-6">

        <div className="text-center">
          <span className="text-sm font-bold tracking-[0.3em] uppercase text-[#D9A441]">
            {t("faq_section.badge")}
          </span>

          <h2 className="mt-4 text-5xl font-black text-[#081F3F]">
            {t("faq_section.title")}
          </h2>
        </div>

        <div className="mt-16 space-y-5">
          {Array.isArray(faqs) && faqs.map((faq, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-3xl border border-slate-200 bg-white"
            >
              <button
                onClick={() => setOpen(open === index ? null : index)}
                className="flex w-full items-center justify-between p-7 text-left"
              >
                <span className="text-lg font-bold text-[#081F3F]">
                  {faq.q}
                </span>

                <ChevronDown
                  className={`transition ${open === index ? "rotate-180" : ""}`}
                />
              </button>

              {open === index && (
                <div className="px-7 pb-7 text-slate-600">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
