import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const constructionFaqs = [
  {
    q: "How do you verify the actual working hours of the machinery?",
    a: "Every machine listed in our construction inventory undergoes strict digital and mechanical hour-meter checks. We also verify the historical service logs from the original Japanese owners to ensure 100% data authenticity.",
  },
  {
    q: "Can you provide specific detail reports on hydraulic and engine pressure?",
    a: "Yes. For every piece of heavy equipment (Excavators, Loaders, Dozers), we provide comprehensive hydraulic pressure tests, engine blow-by inspection reports, and operational high-definition videos before procurement.",
  },
  {
    q: "Are undercarriage and track conditions inspected?",
    a: "Absolutely. Undercarriage links, pins, bushings, rollers, and shoes are carefully measured and documented. The remaining life expectancy (percentage) of the undercarriage or rubber tracks is detailed in the item sheet.",
  },
  {
    q: "Do you offer spare parts support for the construction machinery sold?",
    a: "Yes, Pyramid Japan Co. Ltd provides genuine spare parts backup and support. We can pack critical replacement filters, seals, and wear parts inside the machinery cabin or container prior to international shipment.",
  },
];

export default function ConstructionFaq() {
  const [openIndex, setOpenIndex] = useState(0); // يجعل السؤال الأول مفتوحاً تلقائياً كالعينة السابقة

  return (
    <section className="bg-[#F8F9FB] py-20 px-4">
      <div className="mx-auto max-w-[850px]">
        
        {/* HEADER SECTION */}
        <div className="mb-12 text-center">
          <span className="text-xs font-bold tracking-[0.25em] text-[#D9A441] uppercase">
            Questions & Answers
          </span>
          <h2 className="mt-2 text-3xl font-black text-[#081F3F] md:text-[38px] leading-tight">
            Construction Machinery FAQ
          </h2>
        </div>

        {/* ACCORDION ITEMS CONTAINER */}
        <div className="space-y-4">
          {constructionFaqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all"
              >
                {/* QUESTION TRIGGER */}
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

                {/* ANSWER CONTAINER (تأثير فتح وإغلاق هادئ) */}
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
