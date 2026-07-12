import { prisma } from "@/lib/prisma";
import AddCategoryModal from "@/app/components/AddCategoryModal";
import CategoryActions from "@/app/components/CategoryActions";

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Categories
        </h1>

        <AddCategoryModal />
      </div>

      <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-slate-50">
              <th className="p-4 text-left">
                Image
              </th>
              <th className="p-4 text-left">
                Name Arabic
              </th>
              <th className="p-4 text-left">
                Name English
              </th>
              
              <th className="p-4 text-left">
                Name Japanese
              </th>

              <th className="p-4 text-left">
                Slug
              </th>
              <th className="p-4 text-left">
  Actions
</th>
            </tr>
          </thead>
<tbody>
  {categories.map((category) => (
    <tr
      key={category.id}
      className="border-b hover:bg-slate-50/50 transition-colors"
    >
      {/* الصورة في المنتصف */}
      <td className="p-4 align-middle">
        {category.imageUrl ? (
          <img
            src={category.imageUrl}
            alt={category.nameEn}
            className="h-16 w-24 rounded-lg object-cover"
          />
        ) : (
          <span className="text-gray-400">-</span>
        )}
      </td>

      {/* النصوص محاذية عمودياً للمنتصف */}
      <td className="p-4 align-middle font-medium text-gray-900">{category.nameAr}</td>
      <td className="p-4 align-middle text-gray-600">{category.nameEn}</td>
      <td className="p-4 align-middle text-gray-600">{category.nameJa}</td>
      <td className="p-4 align-middle text-gray-500 font-mono text-sm">{category.slug}</td>

      {/* الأزرار مجهزة للتوسط الكامل */}
      <td className="p-4 align-middle">
        <div className="flex items-center min-h-[64px]">
        <CategoryActions
  id={category.id}
  nameEn={category.nameEn}
  nameAr={category.nameAr}
  nameJa={category.nameJa || ""}
  imageUrl={category.imageUrl || ""}
  sector={category.sector}
/>
        </div>
      </td>
    </tr>
  ))}
</tbody>

        </table>
      </div>
    </div>
  );
}