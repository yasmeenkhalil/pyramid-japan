import { prisma } from "@/lib/prisma";
import AddMachineryModal from "@/app/components/AddMachineryModal";
import MachineryActions from "@/app/components/MachineryActions";
import ViewSpecsModal from "@/app/components/ViewSpecsModal";
import TableImageGallery from "@/app/components/TableImageGallery"; // استيراد المكون الجديد هنا

export default async function MachineryPage() {
  const [machineries, categories, manufacturers, availableSpecs, availableUnits] = await Promise.all([
    prisma.machinery.findMany({
      include: {
        images: true,
        category: true,
        specifications: {
          include: {
            specification: true,
            unit: true,
          }
        }
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.category.findMany({
      select: {
        id: true,
        nameEn: true,
        nameAr: true,
      },
    }),
    prisma.manufacturer.findMany({
      select: {
        id: true,
        name: true,
      },
    }),
    prisma.specification.findMany({
      select: {
        id: true,
        nameEn: true,
        nameAr: true,
      },
    }),
    prisma.unit.findMany({
      select: {
        id: true,
        name: true,
      },
    }),
  ]);

  const formattedCategories = categories.map(cat => ({
    id: cat.id,
    nameEn: cat.nameEn,
    nameAr: cat.nameAr,
  }));

  const formattedManufacturers = manufacturers.map(man => ({
    id: man.id,
    name: man.name,
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Machinery</h1>
        <AddMachineryModal 
          categories={formattedCategories} 
          manufacturers={formattedManufacturers}
          availableSpecs={availableSpecs}
          availableUnits={availableUnits}
        />
      </div>

      <div className="overflow-hidden rounded-3xl bg-white shadow-sm border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b bg-slate-50 text-gray-700 font-semibold text-sm">
                <th className="p-4">Image / Gallery</th>
                <th className="p-4">Stock No</th>
                <th className="p-4">Title (EN)</th>
                <th className="p-4">Category</th>
                <th className="p-4">Year</th>
                <th className="p-4">Hours</th>
                <th className="p-4">Price</th>
                <th className="p-4 text-center">Specs</th>
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
                  {/* استدعاء المكون المنفصل هنا وسيعمل بكفاءة بنسبة 100% */}
                  <td className="p-4 align-middle">
                    <TableImageGallery images={item.images} title={item.titleEn} />
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

                  <td className="p-4 align-middle text-center">
                    <div className="flex items-center justify-center min-h-[48px]">
                      <ViewSpecsModal 
                        machineryTitle={item.titleEn} 
                        specifications={item.specifications} 
                      />
                    </div>
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
                        manufacturers={formattedManufacturers}
                        availableSpecs={availableSpecs}
                        availableUnits={availableUnits}
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
