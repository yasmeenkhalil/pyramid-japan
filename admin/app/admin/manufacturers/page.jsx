import { prisma } from "@/lib/prisma";
import AddManufacturerModal from "@/app/components/AddManufacturerModal";
import ManufacturerActions from "@/app/components/ManufacturerActions";

export default async function ManufacturersPage() {
  const manufacturers = await prisma.manufacturer.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Manufacturers
        </h1>

        <AddManufacturerModal />
      </div>

      <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-slate-50">
              <th className="p-4 text-left">
                Name
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
            {manufacturers.map((maker) => (
              <tr
                key={maker.id}
                className="border-b hover:bg-slate-50/50 transition-colors"
              >
                <td className="p-4 align-middle font-medium text-gray-900">
                  {maker.name}
                </td>
                
                <td className="p-4 align-middle text-gray-500 font-mono text-sm">
                  {maker.slug}
                </td>

                <td className="p-4 align-middle">
                  <div className="flex items-center min-h-[64px]">
                    <ManufacturerActions
                      id={maker.id}
                      name={maker.name}
                      slug={maker.slug}
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
