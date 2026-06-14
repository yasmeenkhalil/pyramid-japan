"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "How long does shipping take?",
    a: "Shipping times vary depending on destination and shipping method.",
  },
  {
    q: "Can I receive inspection photos?",
    a: "Yes, we provide detailed photos, videos and reports.",
  },
  {
    q: "What payment methods are accepted?",
    a: "International bank transfer is the most common payment method.",
  },
  {
    q: "Do you arrange shipping?",
    a: "Yes, we manage the complete export and logistics process.",
  },
];

export default function FaqSection() {
  const [open, setOpen] = useState(0);

  return (
    <section className="bg-[#F8F9FB] py-32">
      <div className="mx-auto max-w-[900px] px-6">

        <div className="text-center">
          <span className="text-sm font-bold tracking-[0.3em] uppercase text-[#D9A441]">
            FAQ
          </span>

          <h2 className="mt-4 text-5xl font-black text-[#081F3F]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="mt-16 space-y-5">

          {faqs.map((faq, index) => (
            <div
              key={faq.q}
              className="overflow-hidden rounded-3xl border border-slate-200 bg-white"
            >
              <button
                onClick={() =>
                  setOpen(open === index ? null : index)
                }
                className="flex w-full items-center justify-between p-7 text-left"
              >
                <span className="text-lg font-bold text-[#081F3F]">
                  {faq.q}
                </span>

                <ChevronDown
                  className={`transition ${
                    open === index ? "rotate-180" : ""
                  }`}
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