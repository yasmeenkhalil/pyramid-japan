import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function ExportCTA() {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden bg-[#D9A441] py-32">

      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[length:30px_30px]" />
      </div>

      <div className="relative mx-auto max-w-[900px] px-6 text-center">

        <span className="text-sm font-bold tracking-[0.3em] uppercase text-white">
          {t("export_cta.badge")}
        </span>

        <h2 className="mt-5 text-5xl font-black text-white md:text-6xl">
          {t("export_cta.title1")}
          <span className="block">
            {t("export_cta.title2")}
          </span>
        </h2>

        <p className="mx-auto mt-8 max-w-2xl text-xl text-white/90">
          {t("export_cta.desc")}
        </p>

        <div className="mt-12 flex flex-wrap justify-center gap-5">

          <Link 
            to="/contact?inquiry=export" 
            className="group inline-flex items-center gap-3 rounded-2xl bg-white px-8 py-5 font-bold text-[#081F3F] transition hover:scale-105"
          >
            {t("export_cta.btn_request")}
            <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
          </Link>

          <Link 
            to="/machinery-all/all?export=true" 
            className="inline-flex items-center justify-center rounded-2xl border border-white/30 px-8 py-5 font-bold text-white backdrop-blur-xl transition hover:bg-white/10"
          >
            {t("export_cta.btn_browse")}
          </Link>

        </div>

      </div>
    </section>
  );
}
