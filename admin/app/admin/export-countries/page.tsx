import React from "react";
import { prisma } from "@/lib/prisma";
import AddCountryModal from "@/app/components/AddCountryModal";
import CountryActions from "@/app/components/CountryActions";

interface CountryData {
  id: string;
  nameAr: string;
  nameEn: string;
  nameJa: string;
  slug: string;
}

export default async function ExportCountriesPage() {
  const countries: CountryData[] = await prisma.exportCountry.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Export Countries</h1>
        <AddCountryModal />
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
            {countries.map((country) => (
              <tr key={country.id} className="border-b hover:bg-slate-50/50 transition-colors">
                <td className="p-4 align-middle font-medium text-gray-900">{country.nameAr}</td>
                <td className="p-4 align-middle text-gray-600">{country.nameEn}</td>
                <td className="p-4 align-middle text-gray-600">{country.nameJa}</td>
                <td className="p-4 align-middle text-gray-500 font-mono text-sm">{country.slug}</td>
                <td className="p-4 align-middle">
                  <div className="flex items-center min-h-[64px]">
                    <CountryActions
                      id={country.id}
                      nameAr={country.nameAr}
                      nameEn={country.nameEn}
                      nameJa={country.nameJa}
                      slug={country.slug}
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
