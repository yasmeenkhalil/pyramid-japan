import { prisma } from "@/lib/prisma";
import MachineryModal from "@/app/components/MachineryModal";
import MachineryActions from "@/app/components/MachineryActions";

export default async function MachineryPage() {
  const [machineries, categories] = await Promise.all([
    prisma.machinery.findMany({
      include: {
        images: true,
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.category.findMany({
      select: {
        id: true,
        nameEn: true,
      },
    }),
  ]);

  const formattedCategories = categories.map(cat => ({
    id: cat.id,
    nameEn: cat.nameEn,
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Machinery</h1>
        <MachineryModal categories={formattedCategories} />
      </div>

      <div className="overflow-hidden rounded-3xl bg-white shadow-sm border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b bg-slate-50 text-gray-700 font-semibold text-sm">
                <th className="p-4">Image</th>
                <th className="p-4">Stock No</th>
                <th className="p-4">Title (EN)</th>
                <th className="p-4">Category</th>
                <th className="p-4">Year</th>
                <th className="p-4">Hours</th>
                <th className="p-4">Price</th>
                <th className="p-4">Featured</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {machineries.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="p-4 align-middle">
                    {item.images && item.images.length > 0 ? (
                      <img
                        src={item.images[0].imageUrl}
                        alt={item.titleEn}
                        className="h-16 w-24 rounded-lg object-cover border"
                      />
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>

                  <td className="p-4 align-middle font-medium text-gray-500">
                    {item.stockNo || "-"}
                  </td>

                  <td className="p-4 align-middle font-semibold text-gray-900">
                    {item.titleEn}
                  </td>

                  <td className="p-4 align-middle text-gray-600">
                    {item.category?.nameEn || "-"}
                  </td>

                  <td className="p-4 align-middle text-gray-600">
                    {item.year || "-"}
                  </td>

                  <td className="p-4 align-middle text-gray-600">
                    {item.hour || "-"}
                  </td>

                  <td className="p-4 align-middle font-bold text-emerald-600">
                    {item.price ? `$${item.price.toLocaleString()}` : "Ask Price"}
                  </td>

                  <td className="p-4 align-middle">
                    {item.featured ? (
                      <span className="inline-flex items-center rounded-md bg-amber-50 px-2 py-1 text-xs font-medium text-amber-800 ring-1 ring-inset ring-amber-600/20">
                        Featured
                      </span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>

                  <td className="p-4 align-middle text-center">
                    <div className="flex items-center justify-center min-h-[64px]">
                      <MachineryActions
                        machinery={item}
                        categories={formattedCategories}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
