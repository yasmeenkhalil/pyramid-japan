import { useTranslation } from 'react-i18next';
import { CheckCircle2, ShieldCheck, Globe2, Ship } from 'lucide-react';

export default function AboutUs() {
  const { t } = useTranslation();

  const advantages = [
    {
      icon: ShieldCheck,
      title: t("about.adv1_title"),
      desc: t("about.adv1_desc")
    },
    {
      icon: Ship,
      title: t("about.adv2_title"),
      desc: t("about.adv2_desc")
    },
    {
      icon: Globe2,
      title: t("about.adv3_title"),
      desc: t("about.adv3_desc")
    }
  ];

  return (
    <section id="about-us" className="w-full bg-[#F8F9FB] py-20 px-4 md:px-6 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#D9A441] uppercase tracking-widest bg-[#081F3F]/5 px-3 py-1 rounded-full">
                {t("about.badge")}
              </span>
              <h2 className="text-2xl md:text-4xl font-black text-[#081F3F] leading-tight">
                PYRAMID JAPAN <span className="text-[#D9A441]">CORP.</span>
              </h2>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                {t("about.sub_title")}
              </p>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              {t("about.p1")}
            </p>

            <p className="text-sm text-slate-600 leading-relaxed">
              {t("about.p2")}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-[#D9A441] shrink-0" />
                <span>{t("about.feature1")}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-[#D9A441] shrink-0" />
                <span>{t("about.feature2")}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-[#D9A441] shrink-0" />
                <span>{t("about.feature3")}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-[#D9A441] shrink-0" />
                <span>{t("about.feature4")}</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="w-full h-[350px] md:h-[450px] rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-white">
              <img 
                src="https://www.deere.com/assets/images/region-4/industries/agriculture/sugar-harvester/r4k072428_rrd-1024x576.jpg" 
                alt="Pyramid Japan Heavy Agricultural Equipment" 
                className="w-full h-full object-cover object-center"
              />
            </div>

            <div className="absolute -bottom-6 -right-4 bg-[#081F3F] text-white p-5 rounded-xl shadow-xl hidden sm:block max-w-[220px] border border-slate-800">
              <p className="text-2xl font-mono font-black text-[#D9A441]">100%</p>
              <p className="text-xs font-bold uppercase tracking-wider mt-1">{t("about.card_title")}</p>
              <p className="text-[11px] text-slate-400 mt-1 leading-normal">{t("about.card_desc")}</p>
            </div>
          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
          {advantages.map((adv, idx) => {
            const Icon = adv.icon;
            return (
              <div 
                key={idx} 
                className="bg-white border border-slate-200/60 p-6 rounded-xl hover:shadow-md transition-shadow duration-200"
              >
                <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100 mb-4">
                  <Icon className="w-5 h-5 text-[#D9A441]" />
                </div>
                <h3 className="text-sm font-bold text-[#081F3F] uppercase tracking-wide">
                  {adv.title}
                </h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  {adv.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
