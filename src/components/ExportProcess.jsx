import { useTranslation } from "react-i18next";
import {
  Search,
  FileText,
  ClipboardCheck,
  CreditCard,
  Ship,
  PackageCheck,
} from "lucide-react";

export default function ExportProcess() {
  const { t } = useTranslation();

  const steps = [
    {
      icon: Search,
      number: "01",
      titleKey: "export_process.step1_title",
      descKey: "export_process.step1_desc",
    },
    {
      icon: FileText,
      number: "02",
      titleKey: "export_process.step2_title",
      descKey: "export_process.step2_desc",
    },
    {
      icon: ClipboardCheck,
      number: "03",
      titleKey: "export_process.step3_title",
      descKey: "export_process.step3_desc",
    },
    {
      icon: CreditCard,
      number: "04",
      titleKey: "export_process.step4_title",
      descKey: "export_process.step4_desc",
    },
    {
      icon: Ship,
      number: "05",
      titleKey: "export_process.step5_title",
      descKey: "export_process.step5_desc",
    },
    {
      icon: PackageCheck,
      number: "06",
      titleKey: "export_process.step6_title",
      descKey: "export_process.step6_desc",
    },
  ];

  return (
    <section className="bg-[#F8F9FB] py-12 px-4">
      <div className="mx-auto max-w-[1300px]">

        <div className="mb-12 text-center">
          <span className="text-xs font-bold tracking-[0.25em] text-[#D9A441] uppercase">
            {t("export_process.badge")}
          </span>

          <h2 className="mt-2 text-3xl font-black text-[#081F3F] md:text-[38px] leading-tight">
            {t("export_process.title")}
          </h2>

          <p className="mx-auto mt-2.5 max-w-xl text-sm text-slate-600 leading-relaxed">
            {t("export_process.desc")}
          </p>
        </div>

        <div className="relative">
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
                  
                  <div className={`flex-1 w-full flex ${isEven ? "lg:justify-end" : "lg:justify-start"}`}>
                    
                    <div className="w-full max-w-[400px] min-h-[190px] flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-md transition hover:-translate-y-0.5 hover:shadow-lg">
                      <div>
                        <div className="mb-4 flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#081F3F]">
                            <Icon className="h-5 w-5 text-[#D9A441]" />
                          </div>

                          <span className="text-[10px] font-bold tracking-widest text-[#D9A441] uppercase">
                            {t("export_process.step_label")} {step.number}
                          </span>
                        </div>

                        <h3 className="text-base font-bold text-[#081F3F]">
                          {t(step.titleKey)}
                        </h3>

                        <p className="mt-2 text-xs leading-relaxed text-slate-600">
                          {t(step.descKey)}
                        </p>
                      </div>
                    </div>

                  </div>

                  <div className="hidden lg:flex shrink-0">
                    <div className="z-10 flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-[#D9A441] text-xs font-black text-white shadow-md">
                      {step.number}
                    </div>
                  </div>

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
