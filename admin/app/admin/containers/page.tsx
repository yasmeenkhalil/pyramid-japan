import { prisma } from "@/lib/prisma";
import ContainerModal from "@/app/components/ContainerModal";
import ContainerActions from "@/app/components/ContainerActions";

export const dynamic = "force-dynamic";

export default async function ContainersPage() {
  // جلب كافة الحاويات محلياً من قاعدة البيانات مع بيانات الدول المرتبطة بها
  const containers = await prisma.containerImage.findMany({
    include: {
      exportCountry: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">
          Container Exports
        </h1>
        {/* زر إضافة حاوية جديدة - يفتح المودال في وضع الإنشاء */}
        <ContainerModal />
      </div>

      <div className="overflow-hidden rounded-3xl bg-white shadow-sm border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm text-gray-500">
            <thead>
              <tr className="border-b bg-slate-50 text-gray-700 font-semibold">
                <th className="p-4">Image</th>
                <th className="p-4">English Title</th>
                <th className="p-4">Arabic Title</th>
                <th className="p-4">Japanese Title</th>
                <th className="p-4">Russian Title</th>
                <th className="p-4">Destination</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 border-t border-gray-100">
              {containers.map((container) => (
                <tr
                  key={container.id}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  {/* عرض الصورة المعاينة */}
                  <td className="p-4 align-middle">
                    {container.imageUrl ? (
                      <img
                        src={container.imageUrl}
                        alt={container.titleEn || "Container Image"}
                        className="h-16 w-24 rounded-2xl object-cover border border-gray-100 shadow-sm"
                      />
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>

                  {/* عناوين اللغات الأربع */}
                  <td className="p-4 align-middle text-gray-600 max-w-[150px] truncate">
                    {container.titleEn || <span className="text-gray-400">-</span>}
                  </td>
                  <td className="p-4 align-middle font-medium text-gray-955 max-w-[150px] truncate text-right">
                    {container.titleAr || <span className="text-gray-400">-</span>}
                  </td>
                  <td className="p-4 align-middle text-gray-600 max-w-[150px] truncate">
                    {container.titleJa || <span className="text-gray-400">-</span>}
                  </td>
                  <td className="p-4 align-middle text-gray-600 max-w-[150px] truncate">
                    {container.titleRu || <span className="text-gray-400">-</span>}
                  </td>

                  {/* الدولة المصدر إليها */}
                  <td className="p-4 align-middle">
                    {container.exportCountry ? (
                      <span className="inline-flex items-center rounded-xl bg-blue-50 px-2.5 py-1 text-xs font-semibold text-[#0B4EA2] ring-1 ring-inset ring-blue-700/10">
                        {container.exportCountry.nameEn} ({container.exportCountry.nameAr})
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-xl bg-gray-55 px-2.5 py-1 text-xs font-medium text-gray-600">
                        Global / General
                      </span>
                    )}
                  </td>

                  {/* أزرار العمليات التفاعلية */}
                  <td className="p-4 align-middle">
                    <ContainerActions
                      id={container.id}
                      imageUrl={container.imageUrl}
                      titleEn={container.titleEn}
                      titleAr={container.titleAr}
                      titleJa={container.titleJa}
                      titleRu={container.titleRu}
                      exportCountryId={container.exportCountryId}
                    />
                  </td>
                </tr>
              ))}

              {containers.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-gray-400 font-medium">
                    No container export records found. Click "Add Container Image" to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
