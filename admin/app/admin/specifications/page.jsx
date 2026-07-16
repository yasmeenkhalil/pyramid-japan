import { prisma } from "@/lib/prisma";
import AddSpecificationModal from "@/app/components/AddSpecificationModal";
import SpecificationActions from "@/app/components/SpecificationActions";

export default async function SpecificationsPage() {
  const specifications = await prisma.specification.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Specifications</h1>
        <AddSpecificationModal />
      </div>

      <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-slate-50">
              <th className="p-4 text-left">Name Arabic</th>
              <th className="p-4 text-left">Name English</th>
              <th className="p-4 text-left">Name Japanese</th>
              <th className="p-4 text-left">Slug</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {specifications.map((spec) => (
              <tr
                key={spec.id}
                className="border-b hover:bg-slate-50/50 transition-colors"
              >
                <td className="p-4 align-middle font-medium text-gray-900">
                  {spec.nameAr}
                </td>
                <td className="p-4 align-middle text-gray-600">
                  {spec.nameEn}
                </td>
                <td className="p-4 align-middle text-gray-600">
                  {spec.nameJa}
                </td>
                <td className="p-4 align-middle text-gray-500 font-mono text-sm">
                  {spec.slug}
                </td>
                <td className="p-4 align-middle">
                  <div className="flex items-center min-h-[64px]">
                    <SpecificationActions
                      id={spec.id}
                      nameAr={spec.nameAr}
                      nameEn={spec.nameEn}
                      nameJa={spec.nameJa}
                      slug={spec.slug}
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
