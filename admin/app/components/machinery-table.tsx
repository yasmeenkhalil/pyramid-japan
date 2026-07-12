import Link from "next/link";

interface MachineryTableProps {
  machinery: {
    id: string;
    titleAr: string;
    year: number | null;
    price: number | null;
    featured: boolean;
    category: {
      nameAr: string;
    };
  }[];
}

export default function MachineryTable({
  machinery,
}: MachineryTableProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
      <div className="flex items-center justify-between border-b border-slate-200 p-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            Latest Machinery
          </h3>

          <p className="text-sm text-slate-500">
            Recently added inventory
          </p>
        </div>

        <Link
          href="/admin/machinery"
          className="rounded-xl bg-[#0B4EA2] px-4 py-2 text-sm font-medium text-white"
        >
          View All
        </Link>
      </div>

      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50">
            <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">
              Machinery
            </th>

            <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">
              Category
            </th>

            <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">
              Year
            </th>

            <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">
              Price
            </th>

            <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">
              Status
            </th>
          </tr>
        </thead>

        <tbody>
          {machinery.map((item) => (
            <tr
              key={item.id}
              className="border-b border-slate-100 hover:bg-slate-50"
            >
              <td className="px-6 py-5">
                <div className="font-medium text-slate-900">
                  {item.titleAr}
                </div>
              </td>

              <td className="px-6 py-5 text-slate-600">
                {item.category.nameAr}
              </td>

              <td className="px-6 py-5 text-slate-600">
                {item.year || "-"}
              </td>

              <td className="px-6 py-5 font-medium text-slate-900">
                {item.price
                  ? `$${item.price.toLocaleString()}`
                  : "-"}
              </td>

              <td className="px-6 py-5">
                {item.featured ? (
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                    Featured
                  </span>
                ) : (
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                    Normal
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}