import { useTranslation } from "react-i18next";
import {
  FileText,
  Receipt,
  FileCheck,
  ClipboardList,
} from "lucide-react";

export default function ExportDocuments() {
  const { t } = useTranslation();

  const docs = [
    {
      icon: Receipt,
      titleKey: "export_docs.doc1_title",
    },
    {
      icon: FileText,
      titleKey: "export_docs.doc2_title",
    },
    {
      icon: ClipboardList,
      titleKey: "export_docs.doc3_title",
    },
    {
      icon: FileCheck,
      titleKey: "export_docs.doc4_title",
    },
  ];

  return (
    <section className="bg-white py-16 px-4">
      <div className="mx-auto max-w-[1300px]">

        <div className="text-center">
          <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#D9A441]">
            {t("export_docs.badge")}
          </span>

          <h2 className="mt-2 text-4xl font-black text-[#081F3F] leading-tight">
            {t("export_docs.title")}
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
          {docs.map((doc, idx) => {
            const Icon = doc.icon;

            return (
              <div
                key={idx}
                className="rounded-3xl border border-slate-200 bg-white p-7 text-center shadow-md transition hover:-translate-y-1 hover:shadow-lg"
              >
                <Icon className="mx-auto h-10 w-10 text-[#D9A441]" />

                <h3 className="mt-4 text-lg font-bold text-[#081F3F] leading-snug">
                  {t(doc.titleKey)}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
