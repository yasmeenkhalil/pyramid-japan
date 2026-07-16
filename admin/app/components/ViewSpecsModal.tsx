"use client";

import React, { useState } from "react";
import { Eye, X } from "lucide-react";

interface SpecRelation {
  specification: {
    nameEn: string;
    nameAr: string;
  };
  value: string;
  unit: {
    name: string;
  } | null;
}

interface ViewSpecsModalProps {
  machineryTitle: string;
  specifications: SpecRelation[];
}

export default function ViewSpecsModal({ machineryTitle, specifications }: ViewSpecsModalProps) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex h-[38px] w-[38px] items-center justify-center rounded-2xl border border-slate-200 bg-white text-emerald-600 shadow-sm hover:bg-slate-50 transition shrink-0 cursor-pointer"
      >
        <Eye size={18} />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-xl border border-slate-100 flex flex-col max-h-[80vh] overflow-hidden text-left">
            <div className="flex items-center justify-between border-b pb-4 mb-5 shrink-0">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Machinery Specifications</h3>
                <p className="text-xs text-gray-500 font-medium mt-0.5">{machineryTitle}</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 pr-1 pb-2">
              {specifications.length === 0 ? (
                <p className="text-center text-sm text-gray-400 py-8">No specifications added for this machinery.</p>
              ) : (
                <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-slate-50 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                        <th className="p-3">Specification</th>
                        <th className="p-3">Value</th>
                        <th className="p-3">Unit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {specifications.map((item, idx) => (
                        <tr key={idx} className="border-b last:border-0 hover:bg-slate-50/50 transition-colors">
                          <td className="p-3 font-medium text-gray-900">
                            {item.specification.nameEn} ({item.specification.nameAr})
                          </td>
                          <td className="p-3 text-gray-600 font-mono">{item.value}</td>
                          <td className="p-3 text-gray-600 font-medium">
                            {item.unit ? item.unit.name : <span className="text-gray-400 text-xs">None</span>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end pt-4 border-t mt-4 shrink-0">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-600 hover:bg-slate-50 border border-slate-200 transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
