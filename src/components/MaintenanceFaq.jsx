import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const maintenanceFaqs = [
  {
    q: "Are your workshop engineers officially certified in Japan?",
    a: "Yes. All maintenance and diagnostic overhauls at Pyramid Japan are conducted by senior mechanics certified under strict Japanese automotive and heavy machinery engineering standards, ensuring world-class execution.",
  },
  {
    q: "Do you supply non-OEM or aftermarket spare parts if requested?",
    a: "Our standard inventory is 100% genuine OEM to maximize machinery lifetime. However, upon specific enterprise customer requests, we can source high-grade, certified Japanese aftermarket components to suit your budget.",
  },
  {
    q: "Can I get a live video feed of my machine's hydraulic pressure test?",
    a: "Absolutely. Transparency is our core value. Once a maintenance or pre-export check is ordered, we can arrange a live streaming session or send high-definition unedited video reports of the gauge meters at maximum load.",
  },
  {
    q: "What is your typical turnaround time for air-freighting critical spare parts?",
    a: "For in-stock components, parts are packed and dispatched via premium air couriers (DHL/FedEx) within 48 hours of payment verification, reaching most global main ports and hubs within 5 to 7 business days.",
  },
];

export default function MaintenanceFaq() {
  const [openIndex, setOpenIndex] = useState(0); // فتح السؤال الأول تلقائياً لتطابق المظهر

  return (
    <section className="bg-[#F8F9FB] py-20 px-4">
      <div className="mx-auto max-w-[850px]">
        
        {/* HEADER SECTION */}
        <div className="mb-12 text-center">
          <span className="text-xs font-bold tracking-[0.25em] text-[#D9A441] uppercase">
            Support Center
          </span>
          <h2 className="mt-2 text-3xl font-black text-[#081F3F] md:text-[38px] leading-tight">
            Maintenance & Parts FAQ
          </h2>
        </div>

        {/* ACCORDION ITEMS CONTAINER */}
        <div className="space-y-4">
          {maintenanceFaqs.map((faq, index) => {
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
