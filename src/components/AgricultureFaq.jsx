import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const agricultureFaqs = [
  {
    q: "What technical checks do you perform on Japanese used tractors?",
    a: "Every tractor undergoes a comprehensive multi-point inspection, including full Power Take-Off (PTO) operational tests, hydraulic lift load-testing, 4WD engagement checks, and a complete analysis of engine compression and fluid levels.",
  },
  {
    q: "Are the rotary tillers and farm attachments included in the price?",
    a: "Many of our Japanese used tractors come directly with their original rotary tillers attached. The exact pricing and inclusion of tillers or backhoes will be clearly labeled on each specific machinery stock sheet.",
  },
  {
    q: "Which agricultural machinery brands do you primarily export?",
    a: "We specialize in exporting Japan's most reliable and universally trusted farm brands, primarily focusing on Kubota, Yanmar, Iseki, and Mitsubishi machinery, ensuring high parts availability worldwide.",
  },
  {
    q: "Can you pack additional farming components or spare parts inside the shipment?",
    a: "Yes. For wholesale buyers and farm cooperatives, we can source and secure extra replacement filters, tines, blades, and basic maintenance kits directly inside the container or tractor cabin to help optimize your shipping costs.",
  },
];

export default function AgricultureFaq() {
  const [openIndex, setOpenIndex] = useState(0); // فتح السؤال الأول تلقائياً كالعادة

  return (
    <section className="bg-[#F8F9FB] py-20 px-4">
      <div className="mx-auto max-w-[850px]">
        
        {/* HEADER SECTION */}
        <div className="mb-12 text-center">
          <span className="text-xs font-bold tracking-[0.25em] text-[#D9A441] uppercase">
            Farming Insights
          </span>
          <h2 className="mt-2 text-3xl font-black text-[#081F3F] md:text-[38px] leading-tight">
            Agriculture Machinery FAQ
          </h2>
        </div>

        {/* ACCORDION ITEMS CONTAINER */}
        <div className="space-y-4">
          {agricultureFaqs.map((faq, index) => {
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

                {/* ANSWER CONTAINER */}
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
