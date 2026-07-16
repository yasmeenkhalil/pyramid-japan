import React from "react";
import { prisma } from "@/lib/prisma";
import AddUnitModal from "@/app/components/AddUnitModal";
import UnitActions from "@/app/components/UnitActions";

interface UnitData {
  id: string;
  name: string;
}

export default async function UnitsPage() {
  const units: UnitData[] = await prisma.unit.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Manage Units</h1>
        <AddUnitModal />
      </div>

      <div className="overflow-hidden rounded-3xl bg-white shadow-sm max-w-xl">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-slate-50">
              <th className="p-4 text-left">Unit Name</th>
              <th className="p-4 text-center w-32">Actions</th>
            </tr>
          </thead>
          <tbody>
            {units.length === 0 ? (
              <tr>
                <td colSpan={2} className="p-8 text-center text-sm text-gray-400">
                  No units added yet.
                </td>
              </tr>
            ) : (
              units.map((unit) => (
                <tr key={unit.id} className="border-b hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 align-middle font-mono font-medium text-gray-900 text-sm">
                    {unit.name}
                  </td>
                  <td className="p-4 align-middle text-center">
                    <div className="flex items-center justify-center min-h-[48px]">
                      <UnitActions id={unit.id} name={unit.name} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
