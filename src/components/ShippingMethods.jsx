import { Ship, Container } from "lucide-react";
import { useTranslation } from "react-i18next"; // استيراد مكتبة الترجمة

export default function ShippingMethods() {
  const { t } = useTranslation(); // تفعيل تابع الترجمة

  return (
    <section className="bg-white mt-5 py-16 px-4">
      <div className="mx-auto max-w-[1300px]">

        <div className="mb-12 text-center">
          <h2 className="text-4xl font-black text-[#081F3F] leading-tight">
            {t('shipping.main_title')}
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">

          {/* CARD 1: RORO SHIPPING */}
          <div className="rounded-3xl border border-slate-200 p-8 shadow-md transition hover:-translate-y-0.5 hover:shadow-lg text-left rtl:text-right">
            <Ship className="mb-5 h-10 w-10 text-[#D9A441]" />

            <h3 className="text-2xl font-bold text-[#081F3F]">
              {t('shipping.roro_title')}
            </h3>

            <ul className="mt-5 space-y-3.5 text-base text-slate-600 font-semibold">
              <li className="flex items-center gap-3 text-slate-700">
                <span className="text-[#D9A441] font-black text-lg">✓</span> {t('shipping.roro_feature_1')}
              </li>
              <li className="flex items-center gap-3 text-slate-700">
                <span className="text-[#D9A441] font-black text-lg">✓</span> {t('shipping.roro_feature_2')}
              </li>
              <li className="flex items-center gap-3 text-slate-700">
                <span className="text-[#D9A441] font-black text-lg">✓</span> {t('shipping.roro_feature_3')}
              </li>
              <li className="flex items-center gap-3 text-slate-700">
                <span className="text-[#D9A441] font-black text-lg">✓</span> {t('shipping.roro_feature_4')}
              </li>
            </ul>
          </div>

          {/* CARD 2: CONTAINER SHIPPING */}
          <div className="rounded-3xl border border-slate-200 p-8 shadow-md transition hover:-translate-y-0.5 hover:shadow-lg text-left rtl:text-right">
            <Container className="mb-5 h-10 w-10 text-[#D9A441]" />

            <h3 className="text-2xl font-bold text-[#081F3F]">
              {t('shipping.container_title')}
            </h3>

            <ul className="mt-5 space-y-3.5 text-base text-slate-600 font-semibold">
              <li className="flex items-center gap-3 text-slate-700">
                <span className="text-[#D9A441] font-black text-lg">✓</span> {t('shipping.container_feature_1')}
              </li>
              <li className="flex items-center gap-3 text-slate-700">
                <span className="text-[#D9A441] font-black text-lg">✓</span> {t('shipping.container_feature_2')}
              </li>
              <li className="flex items-center gap-3 text-slate-700">
                <span className="text-[#D9A441] font-black text-lg">✓</span> {t('shipping.container_feature_3')}
              </li>
              <li className="flex items-center gap-3 text-slate-700">
                <span className="text-[#D9A441] font-black text-lg">✓</span> {t('shipping.container_feature_4')}
              </li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
