import React from "react";
import { prisma } from "@/lib/prisma";
import InquiryActions from "@/app/components/InquiryActions";

interface InquiryData {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  country: string | null;
  message: string;
  status: string;
  createdAt: Date;
}

export default async function InquiriesPage() {
  const inquiries: InquiryData[] = await prisma.inquiry.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Inquiries</h1>
      </div>

      <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-slate-50">
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Message</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((inq) => (
              <tr
                key={inq.id}
                className="border-b hover:bg-slate-50/50 transition-colors"
              >
                <td className="p-4 align-middle font-medium text-gray-900">
                  {inq.name}
                </td>

                <td className="p-4 align-middle text-gray-600">
                  {inq.email}
                </td>

                <td className="p-4 align-middle text-gray-600 max-w-xs truncate">
                  {inq.message}
                </td>

                <td className="p-4 align-middle">
                  <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                    inq.status === "pending" ? "bg-amber-50 text-amber-800 ring-amber-600/20" :
                    inq.status === "completed" ? "bg-green-50 text-green-700 ring-green-600/20" :
                    "bg-red-50 text-red-700 ring-red-600/20"
                  }`}>
                    {inq.status}
                  </span>
                </td>

                <td className="p-4 align-middle text-sm text-gray-500">
                  {new Date(inq.createdAt).toLocaleDateString()}
                </td>

                <td className="p-4 align-middle">
                  <div className="flex items-center min-h-[64px]">
                    <InquiryActions
                      id={inq.id}
                      name={inq.name}
                      email={inq.email}
                      message={inq.message}
                      status={inq.status}
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
