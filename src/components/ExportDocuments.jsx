import {
  FileText,
  Receipt,
  FileCheck,
  ClipboardList,
} from "lucide-react";

const docs = [
  {
    icon: Receipt,
    title: "Commercial Invoice",
  },
  {
    icon: FileText,
    title: "Bill Of Lading",
  },
  {
    icon: ClipboardList,
    title: "Packing List",
  },
  {
    icon: FileCheck,
    title: "Inspection Report",
  },
];

export default function ExportDocuments() {
  return (
    /* مسافة رأسية متوسطة ومتناسقة py-16 لتفادي الفراغات المبالغ فيها */
    <section className="bg-white py-16 px-4">
      <div className="mx-auto max-w-[1300px]">

        {/* HEADER SECTION (حجم عنوان رئيسي ممتاز وموزون متناسق مع الأقسام السابقة) */}
        <div className="text-center">
          <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#D9A441]">
            Documentation
          </span>

          <h2 className="mt-2 text-4xl font-black text-[#081F3F] leading-tight">
            Export Documentation
          </h2>
        </div>

        {/* 4-COLUMN GRID (تعديل المسافات وأبعاد الكروت الداخلية) */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">

          {docs.map((doc) => {
            const Icon = doc.icon;

            return (
              <div
                key={doc.title}
                className="rounded-3xl border border-slate-200 bg-white p-7 text-center shadow-md transition hover:-translate-y-1 hover:shadow-lg"
              >
                {/* حجم أيقونة متوسط وواضح h-10 بدلاً من h-12 */}
                <Icon className="mx-auto h-10 w-10 text-[#D9A441]" />

                {/* حجم عنوان الكرت الداخلي text-lg مناسب وجذاب لمقاس كروت الـ 4 أعمدة */}
                <h3 className="mt-4 text-lg font-bold text-[#081F3F] leading-snug">
                  {doc.title}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
