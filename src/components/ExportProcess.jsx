import {
  Search,
  FileText,
  ClipboardCheck,
  CreditCard,
  Ship,
  PackageCheck,
} from "lucide-react";

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Submit Inquiry",
    description:
      "Tell us which machine you're looking for and your destination country.",
  },
  {
    icon: FileText,
    number: "02",
    title: "Receive Quotation",
    description:
      "We provide machine availability, specifications and CIF estimate.",
  },
  {
    icon: ClipboardCheck,
    number: "03",
    title: "Inspection Report",
    description:
      "Detailed photos, videos and condition reports before purchase.",
  },
  {
    icon: CreditCard,
    number: "04",
    title: "Secure Payment",
    description:
      "Safe international payment process with complete transparency.",
  },
  {
    icon: Ship,
    number: "05",
    title: "Shipping",
    description:
      "Container or RoRo shipment arranged by our logistics team.",
  },
  {
    icon: PackageCheck,
    number: "06",
    title: "Delivery",
    description:
      "Receive your machinery at the destination port.",
  },
];

export default function ExportProcess() {
  return (
    <section className="bg-[#F8F9FB] py-12 px-4">
      <div className="mx-auto max-w-[1300px]">

        {/* HEADER SECTION */}
        <div className="mb-12 text-center">
          <span className="text-xs font-bold tracking-[0.25em] text-[#D9A441] uppercase">
            Export Process
          </span>

          <h2 className="mt-2 text-3xl font-black text-[#081F3F] md:text-[38px] leading-tight">
            Simple & Transparent Process
          </h2>

          <p className="mx-auto mt-2.5 max-w-xl text-sm text-slate-600 leading-relaxed">
            We handle everything from machine selection to international
            shipping and export documentation.
          </p>
        </div>

        {/* TIMELINE CONTAINER */}
        <div className="relative">

          {/* خط المنتصف الرفيع */}
          <div className="absolute left-1/2 top-0 hidden h-full w-[1.5px] -translate-x-1/2 bg-[#D9A441]/20 lg:block" />

          <div className="space-y-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`flex ${
                    isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                  } items-center gap-6`}
                >
                  
                  {/* CARD SIDE (تعديل التموضع لتقريب الكروت من المنتصف) */}
                  <div className={`flex-1 w-full flex ${isEven ? "lg:justify-end" : "lg:justify-start"}`}>
                    
                    {/* الكرت بوزن طولي وعرض أقل ومحاذاة ملاصقة للمنتصف */}
                    <div className="w-full max-w-[400px] min-h-[190px] flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-md transition hover:-translate-y-0.5 hover:shadow-lg">
                      <div>
                        {/* حاوية الأيقونة */}
                        <div className="mb-4 flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#081F3F]">
                            <Icon className="h-5 w-5 text-[#D9A441]" />
                          </div>

                          <span className="text-[10px] font-bold tracking-widest text-[#D9A441] uppercase">
                            STEP {step.number}
 Esp                          </span>
                        </div>

                        {/* عنوان الكرت */}
                        <h3 className="text-base font-bold text-[#081F3F]">
                          {step.title}
                        </h3>

                        {/* نص الوصف الداخلي */}
                        <p className="mt-2 text-xs leading-relaxed text-slate-600">
                          {step.description}
                        </p>
                      </div>
                    </div>

                  </div>

                  {/* دائرة الرقم المنتصفية */}
                  <div className="hidden lg:flex shrink-0">
                    <div className="z-10 flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-[#D9A441] text-xs font-black text-white shadow-md">
                      {step.number}
                    </div>
                  </div>

                  {/* الطرف الآخر الفارغ للموازنة */}
                  <div className="hidden lg:block flex-1" />
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
