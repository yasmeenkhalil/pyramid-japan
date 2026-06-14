import { Ship, Container } from "lucide-react";

export default function ShippingMethods() {
  return (
    /* مسافة رأسية متوسطة ومتناسقة py-16 */
    <section className="bg-white mt-5 py-16 px-4">
      <div className="mx-auto max-w-[1300px]">

        {/* HEADER SECTION (حجم عنوان رئيسي ممتاز وموزون) */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-black text-[#081F3F] leading-tight">
            Shipping Methods
          </h2>
        </div>

        {/* 2-COLUMN GRID */}
        <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">

          {/* CARD 1: RoRo SHIPPING */}
          <div className="rounded-3xl border border-slate-200 p-8 shadow-md transition hover:-translate-y-0.5 hover:shadow-lg">
            {/* حجم أيقونة متوسط وواضح h-10 */}
            <Ship className="mb-5 h-10 w-10 text-[#D9A441]" />

            {/* حجم عنوان الكرت الداخلي text-2xl مناسب وجذاب */}
            <h3 className="text-2xl font-bold text-[#081F3F]">
              RoRo Shipping
            </h3>

            {/* نصوص القائمة بحجم text-base واضح جداً للقراءة وبمسافات مريحة */}
            <ul className="mt-5 space-y-3.5 text-base text-slate-600 font-semibold">
              <li className="flex items-center gap-3 text-slate-700">
                <span className="text-[#D9A441] font-black text-lg">✓</span> Cost Effective
              </li>
              <li className="flex items-center gap-3 text-slate-700">
                <span className="text-[#D9A441] font-black text-lg">✓</span> Fast Loading
              </li>
              <li className="flex items-center gap-3 text-slate-700">
                <span className="text-[#D9A441] font-black text-lg">✓</span> Ideal For Large Equipment
              </li>
              <li className="flex items-center gap-3 text-slate-700">
                <span className="text-[#D9A441] font-black text-lg">✓</span> Worldwide Routes
              </li>
            </ul>
          </div>

          {/* CARD 2: CONTAINER SHIPPING */}
          <div className="rounded-3xl border border-slate-200 p-8 shadow-md transition hover:-translate-y-0.5 hover:shadow-lg">
            {/* حجم أيقونة متوسط وواضح h-10 */}
            <Container className="mb-5 h-10 w-10 text-[#D9A441]" />

            {/* حجم عنوان الكرت الداخلي text-2xl مناسب وجذاب */}
            <h3 className="text-2xl font-bold text-[#081F3F]">
              Container Shipping
            </h3>

            {/* نصوص القائمة بحجم text-base واضح جداً للقراءة وبمسافات مريحة */}
            <ul className="mt-5 space-y-3.5 text-base text-slate-600 font-semibold">
              <li className="flex items-center gap-3 text-slate-700">
                <span className="text-[#D9A441] font-black text-lg">✓</span> Maximum Protection
              </li>
              <li className="flex items-center gap-3 text-slate-700">
                <span className="text-[#D9A441] font-black text-lg">✓</span> Secure Transport
              </li>
              <li className="flex items-center gap-3 text-slate-700">
                <span className="text-[#D9A441] font-black text-lg">✓</span> Small Machinery
              </li>
              <li className="flex items-center gap-3 text-slate-700">
                <span className="text-[#D9A441] font-black text-lg">✓</span> Spare Parts Included
              </li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
