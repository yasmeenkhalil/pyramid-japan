import { useTranslation } from "react-i18next";
import {
  ArrowUpRight,
  CheckCircle2,
  Globe2,
  Ship,
  Tractor,
  HardHat,
  Factory,
  ShieldCheck,
} from "lucide-react";
import image from "../../public/assets/images/3-motor-graders_01.webp";


export default function AboutUs() {
  const { t, i18n } = useTranslation();

  const isRTL = i18n.language === "ar";

  const sectors = [
    {
      icon: HardHat,
      number: "01",
      title: t("about.sector1_title"),
      desc: t("about.sector1_desc"),
    },
    {
      icon: Tractor,
      number: "02",
      title: t("about.sector2_title"),
      desc: t("about.sector2_desc"),
    },
    {
      icon: Factory,
      number: "03",
      title: t("about.sector3_title"),
      desc: t("about.sector3_desc"),
    },
  ];

  const advantages = [
    {
      icon: ShieldCheck,
      number: "01",
      title: t("about.adv1_title"),
      desc: t("about.adv1_desc"),
    },
    {
      icon: Ship,
      number: "02",
      title: t("about.adv2_title"),
      desc: t("about.adv2_desc"),
    },
    {
      icon: Globe2,
      number: "03",
      title: t("about.adv3_title"),
      desc: t("about.adv3_desc"),
    },
  ];

  const whyChooseUs = [
    t("about.feature1"),
    t("about.feature2"),
    t("about.feature3"),
    t("about.feature4"),
    t("about.feature5"),
    t("about.feature6"),
    t("about.feature7"),
    t("about.feature8"),
    t("about.feature9"),
  ];

  return (
    <section
      id="about-us"
      dir={isRTL ? "rtl" : "ltr"}
      className="relative w-full overflow-hidden bg-[#F7F8FA] py-16 scroll-mt-20 md:py-20 lg:py-24"
    >
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-[420px] w-[420px] rounded-full bg-[#C47B36]/[0.035] blur-3xl" />

        <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-slate-200/30 blur-3xl" />

        <div className="absolute right-[7%] top-[15%] hidden h-20 w-20 rotate-12 rounded-2xl border border-[#C47B36]/10 lg:block" />

        <div className="absolute bottom-[18%] left-[5%] hidden h-12 w-12 rounded-full border border-slate-200 lg:block" />
      </div>

      <div className="relative mx-auto max-w-[1280px] px-5 sm:px-7 lg:px-8">

        {/* =====================================================
            MAIN INTRO
        ====================================================== */}

        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">

          {/* IMAGE */}
          <div className="relative order-2 lg:order-1">
            <div className="relative overflow-hidden rounded-[24px] border border-slate-200 bg-white p-1.5 shadow-[0_20px_50px_-25px_rgba(15,23,42,0.25)]">

              <div className="relative h-[300px] overflow-hidden rounded-[19px] sm:h-[360px] lg:h-[430px]">

                <img
                  src={image}
                  alt={t("about.image_alt")}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#081F3F]/80 via-[#081F3F]/10 to-transparent" />

                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">

                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#D9A441]">
                      {t("about.image_badge")}
                    </p>

                    <p className="mt-1 text-lg font-extrabold text-white sm:text-xl">
                      {t("about.image_title")}
                    </p>
                  </div>

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md">
                    <ArrowUpRight size={17} />
                  </div>

                </div>
              </div>
            </div>

            {/* FLOATING CARD */}

            <div
              className={`absolute -bottom-5 ${
                isRTL ? "-left-3 md:-left-5" : "-right-3 md:-right-5"
              } hidden w-[210px] rounded-2xl border border-white/10 bg-[#081F3F] p-4 shadow-xl sm:block`}
            >
              <div className="flex items-center justify-between gap-3">

                <div>
                  <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-slate-400">
                    {t("about.card_label")}
                  </p>

                  <p className="mt-1 text-xl font-black text-[#D9A441]">
                    {t("about.card_value")}
                  </p>
                </div>

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10">
                  <Globe2
                    size={16}
                    className="text-[#D9A441]"
                  />
                </div>
              </div>

              <p className="mt-2 text-[9px] leading-4 text-slate-400">
                {t("about.card_desc")}
              </p>
            </div>
          </div>

          {/* INTRO CONTENT */}

          <div className="order-1 lg:order-2">

            <div className="mb-4 flex items-center gap-2.5">
              <span className="h-px w-8 bg-[#C47B36]" />

              <span className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#C47B36]">
                {t("about.badge")}
              </span>
            </div>

            <h2 className="text-[32px] font-extrabold leading-[1.08] tracking-[-0.04em] text-[#142B45] sm:text-[39px] lg:text-[45px]">
              {t("about.heading_start")}{" "}
              <span className="text-[#C47B36]">
                {t("about.heading_highlight")}
              </span>
            </h2>

            <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
              {t("about.sub_title")}
            </p>

            <div className="mt-6 space-y-4">

              <p className="text-[13px] leading-7 text-slate-600 sm:text-[14px]">
                {t("about.p1")}
              </p>

              <p className="text-[13px] leading-7 text-slate-600 sm:text-[14px]">
                {t("about.p2")}
              </p>

              <p className="text-[13px] leading-7 text-slate-600 sm:text-[14px]">
                {t("about.p3")}
              </p>

            </div>

            {/* QUICK HIGHLIGHTS */}

            <div className="mt-7 grid grid-cols-1 gap-2 sm:grid-cols-2">

              {[
                t("about.highlight1"),
                t("about.highlight2"),
                t("about.highlight3"),
                t("about.highlight4"),
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2.5 rounded-lg border border-slate-200/70 bg-white/70 px-3 py-2.5"
                >
                  <CheckCircle2
                    className="h-4 w-4 shrink-0 text-[#C47B36]"
                    strokeWidth={2}
                  />

                  <span className="text-[10px] font-semibold text-slate-700">
                    {item}
                  </span>
                </div>
              ))}

            </div>
          </div>
        </div>

        {/* =====================================================
            JAPANESE QUALITY
        ====================================================== */}

        <div className="mt-20 border-t border-slate-200 pt-14">

          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-14">

            <div>
              <div className="mb-3 flex items-center gap-2">
                <span className="h-px w-6 bg-[#C47B36]" />

                <span className="text-[8px] font-bold uppercase tracking-[0.22em] text-[#C47B36]">
                  {t("about.quality_badge")}
                </span>
              </div>

              <h3 className="text-[25px] font-extrabold leading-tight tracking-[-0.025em] text-[#142B45] sm:text-[29px]">
                {t("about.quality_title")}
              </h3>
            </div>

            <div className="space-y-4">
              <p className="text-[13px] leading-7 text-slate-600 sm:text-[14px]">
                {t("about.quality_p1")}
              </p>

              <p className="text-[13px] leading-7 text-slate-600 sm:text-[14px]">
                {t("about.quality_p2")}
              </p>
            </div>

          </div>
        </div>

        {/* =====================================================
            SECTORS
        ====================================================== */}

        <div className="mt-16 border-t border-slate-200 pt-12">

          <div className="mb-7 flex items-end justify-between gap-5">

            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="h-px w-6 bg-[#C47B36]" />

                <span className="text-[8px] font-bold uppercase tracking-[0.22em] text-[#C47B36]">
                  {t("about.sectors_badge")}
                </span>
              </div>

              <h3 className="text-[24px] font-extrabold tracking-[-0.025em] text-[#142B45] sm:text-[28px]">
                {t("about.sectors_title")}
              </h3>
            </div>

            <p className="hidden max-w-sm text-right text-[10px] leading-5 text-slate-400 sm:block">
              {t("about.sectors_desc")}
            </p>

          </div>

          <div className="grid gap-3 md:grid-cols-3">

            {sectors.map((sector) => {
              const Icon = sector.icon;

              return (
                <div
                  key={sector.number}
                  className="group relative overflow-hidden rounded-[17px] border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#C47B36]/40 hover:shadow-[0_15px_35px_-18px_rgba(15,23,42,0.2)]"
                >

                  <div
                    className={`absolute ${
                      isRTL ? "left-4" : "right-4"
                    } top-4 text-[9px] font-bold tracking-wider text-slate-200 transition-colors group-hover:text-[#C47B36]/30`}
                  >
                    {sector.number}
                  </div>

                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-[#C47B36] transition-all duration-300 group-hover:bg-[#142B45] group-hover:text-white">
                    <Icon size={18} strokeWidth={1.7} />
                  </div>

                  <h4 className="text-[13px] font-extrabold text-[#142B45]">
                    {sector.title}
                  </h4>

                  <p className="mt-2 text-[10px] leading-[1.8] text-slate-500 sm:text-[11px]">
                    {sector.desc}
                  </p>

                  <div className="mt-4 h-px w-7 bg-[#C47B36] transition-all duration-300 group-hover:w-14" />

                </div>
              );
            })}

          </div>
        </div>

        {/* =====================================================
            GLOBAL EXPORT
        ====================================================== */}

        <div className="mt-14 grid overflow-hidden rounded-[22px] border border-slate-200 bg-white lg:grid-cols-[0.8fr_1.2fr]">

          <div className="relative bg-[#142B45] p-7 sm:p-9">

            <div className="absolute right-0 top-0 h-32 w-32 translate-x-12 -translate-y-12 rounded-full border border-white/5" />

            <Ship
              size={28}
              strokeWidth={1.4}
              className="text-[#D9A441]"
            />

            <span className="mt-6 block text-[8px] font-bold uppercase tracking-[0.25em] text-[#D9A441]">
              {t("about.export_badge")}
            </span>

            <h3 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">
              {t("about.export_title")}
            </h3>

          </div>

          <div className="space-y-4 p-7 sm:p-9">

            <p className="text-[13px] leading-7 text-slate-600 sm:text-[14px]">
              {t("about.export_p1")}
            </p>

            <p className="text-[13px] leading-7 text-slate-600 sm:text-[14px]">
              {t("about.export_p2")}
            </p>

            <p className="text-[13px] leading-7 text-slate-600 sm:text-[14px]">
              {t("about.export_p3")}
            </p>

          </div>
        </div>

        {/* =====================================================
            QUALITY & VALUE
        ====================================================== */}

        <div className="mt-16">

          <div className="mx-auto max-w-3xl text-center">

            <div className="mb-3 flex items-center justify-center gap-2">
              <span className="h-px w-6 bg-[#C47B36]" />

              <span className="text-[8px] font-bold uppercase tracking-[0.22em] text-[#C47B36]">
                {t("about.value_badge")}
              </span>

              <span className="h-px w-6 bg-[#C47B36]" />
            </div>

            <h3 className="text-[25px] font-extrabold tracking-[-0.025em] text-[#142B45] sm:text-[29px]">
              {t("about.value_title")}
            </h3>

            <div className="mt-6 space-y-4 text-start">

              <p className="text-[13px] leading-7 text-slate-600 sm:text-[14px]">
                {t("about.value_p1")}
              </p>

              <p className="text-[13px] leading-7 text-slate-600 sm:text-[14px]">
                {t("about.value_p2")}
              </p>

            </div>
          </div>
        </div>

        {/* =====================================================
            WHY CHOOSE US
        ====================================================== */}

        <div className="mt-16 border-t border-slate-200 pt-12">

          <div className="mb-7">

            <div className="mb-2 flex items-center gap-2">
              <span className="h-px w-6 bg-[#C47B36]" />

              <span className="text-[8px] font-bold uppercase tracking-[0.22em] text-[#C47B36]">
                {t("about.why_badge")}
              </span>
            </div>

            <h3 className="text-[25px] font-extrabold tracking-[-0.025em] text-[#142B45] sm:text-[29px]">
              {t("about.why_title")}
            </h3>

          </div>

          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">

            {whyChooseUs.map((feature, index) => (
              <div
                key={index}
                className="group flex items-start gap-3 rounded-xl border border-slate-200/80 bg-white p-4 transition-all duration-300 hover:border-[#C47B36]/30 hover:shadow-sm"
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#C47B36]/10">
                  <CheckCircle2
                    size={15}
                    className="text-[#C47B36]"
                    strokeWidth={2}
                  />
                </div>

                <span className="pt-1 text-[10px] font-semibold leading-5 text-slate-700 sm:text-[11px]">
                  {feature}
                </span>
              </div>
            ))}

          </div>
        </div>

        {/* =====================================================
            ADVANTAGES / SUPPORT
        ====================================================== */}

        <div className="mt-12 grid gap-3 md:grid-cols-3">

          {advantages.map((adv) => {
            const Icon = adv.icon;

            return (
              <div
                key={adv.number}
                className="group flex gap-4 rounded-[17px] border border-slate-200/80 bg-white p-5 transition-all duration-300 hover:border-[#C47B36]/30 hover:shadow-sm"
              >

                <div className="shrink-0">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#142B45] text-[#D9A441]">
                    <Icon
                      size={17}
                      strokeWidth={1.7}
                    />
                  </div>

                  <p className="mt-2 text-center text-[8px] font-bold text-slate-300">
                    {adv.number}
                  </p>

                </div>

                <div>

                  <h4 className="text-[12px] font-extrabold text-[#142B45]">
                    {adv.title}
                  </h4>

                  <p className="mt-1.5 text-[10px] leading-[1.7] text-slate-500">
                    {adv.desc}
                  </p>

                </div>

              </div>
            );
          })}

        </div>

        {/* =====================================================
            VISION / MISSION
        ====================================================== */}

        <div className="mt-12 grid overflow-hidden rounded-[22px] bg-[#142B45] md:grid-cols-2">

          {/* VISION */}

          <div className="relative p-7 sm:p-9">

            <span className="text-[8px] font-bold uppercase tracking-[0.25em] text-[#D9A441]">
              {t("about.vision_label")}
            </span>

            <h3 className="mt-2 text-xl font-extrabold text-white">
              {t("about.vision_title")}
            </h3>

            <p className="mt-3 max-w-lg text-[11px] leading-6 text-slate-300 sm:text-[12px]">
              {t("about.vision_desc")}
            </p>

            <div className="absolute bottom-0 right-0 h-24 w-24 translate-x-8 translate-y-8 rounded-full border border-white/5" />
          </div>

          {/* MISSION */}

          <div className="relative border-t border-white/10 p-7 sm:p-9 md:border-l md:border-t-0">

            <span className="text-[8px] font-bold uppercase tracking-[0.25em] text-[#D9A441]">
              {t("about.mission_label")}
            </span>

            <h3 className="mt-2 text-xl font-extrabold text-white">
              {t("about.mission_title")}
            </h3>

            <p className="mt-3 max-w-lg text-[11px] leading-6 text-slate-300 sm:text-[12px]">
              {t("about.mission_desc")}
            </p>

            <p className="mt-4 max-w-lg text-[11px] leading-6 text-slate-300 sm:text-[12px]">
              {t("about.mission_extra")}
            </p>

            <div className="absolute bottom-0 right-0 h-24 w-24 translate-x-8 translate-y-8 rounded-full border border-white/5" />
          </div>

        </div>

        {/* =====================================================
            FROM JAPAN TO THE WORLD
        ====================================================== */}

        <div className="relative mt-12 overflow-hidden rounded-[22px] border border-[#C47B36]/15 bg-white p-7 text-center sm:p-10">

          <div className="absolute left-1/2 top-0 h-32 w-32 -translate-x-1/2 -translate-y-20 rounded-full bg-[#C47B36]/[0.04] blur-2xl" />

          <Globe2
            size={27}
            strokeWidth={1.4}
            className="relative mx-auto text-[#C47B36]"
          />

          <span className="relative mt-4 block text-[8px] font-bold uppercase tracking-[0.25em] text-[#C47B36]">
            {t("about.final_badge")}
          </span>

          <h3 className="relative mt-2 text-xl font-extrabold text-[#142B45] sm:text-2xl">
            {t("about.final_title")}
          </h3>

          <p className="relative mx-auto mt-4 max-w-3xl text-[12px] leading-7 text-slate-500 sm:text-[13px]">
            {t("about.final_desc")}
          </p>

          <div className="relative mx-auto mt-6 h-px w-12 bg-[#C47B36]" />

          <p className="relative mx-auto mt-5 max-w-3xl text-[14px] font-extrabold leading-6 text-[#142B45] sm:text-lg">
            {t("about.final_statement")}
          </p>

        </div>

      </div>
    </section>
  );
}