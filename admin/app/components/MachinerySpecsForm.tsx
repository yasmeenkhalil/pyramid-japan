"use client";

import React, { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

interface SpecOption {
  id: string;
  nameEn: string;
  nameAr: string;
}

interface UnitOption {
  id: string;
  name: string;
}

interface SelectedSpec {
  specificationId: string;
  value: string;
  unitId: string;
}

interface MachinerySpecsFormProps {
  availableSpecs: SpecOption[];
  availableUnits: UnitOption[];
  selectedSpecs: SelectedSpec[];
  onChange: (specs: SelectedSpec[]) => void;
}

export default function MachinerySpecsForm({ 
  availableSpecs, 
  availableUnits, 
  selectedSpecs, 
  onChange 
}: MachinerySpecsFormProps) {
  const [currentSpecId, setCurrentSpecId] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [currentUnitId, setCurrentUnitId] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleAddSpec = () => {
    setError("");

    if (!currentSpecId || !value.trim()) {
      setError("Please select a specification and enter a value.");
      return;
    }

    const isDuplicate = selectedSpecs.some(spec => spec.specificationId === currentSpecId);
    if (isDuplicate) {
      setError("This specification has already been added.");
      return;
    }

    const newSpec: SelectedSpec = {
      specificationId: currentSpecId,
      value: value.trim(),
      unitId: currentUnitId || "" 
    };

    onChange([...selectedSpecs, newSpec]);

    setCurrentSpecId("");
    setValue("");
    setCurrentUnitId("");
  };

  const handleRemoveSpec = (specId: string) => {
    const updated = selectedSpecs.filter(spec => spec.specificationId !== specId);
    onChange(updated);
  };
  return (
    <div className="space-y-4 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-bold text-gray-900">Machinery Specifications</h3>
      
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 items-end bg-slate-50 p-4 rounded-2xl border border-slate-100">
        <div className="flex flex-col">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Specification *</label>
          <select
            value={currentSpecId}
            onChange={(e) => {
              setCurrentSpecId(e.target.value);
              if (error) setError("");
            }}
            className="w-full border border-slate-200 px-3 py-2.5 rounded-xl text-sm bg-white text-gray-800 focus:border-[#0B4EA2] focus:outline-none transition-all"
          >
            <option value="">-- Choose Spec --</option>
            {availableSpecs.map((spec) => (
              <option key={spec.id} value={spec.id}>
                {spec.nameEn} ({spec.nameAr})
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Value *</label>
          <input
            type="text"
            placeholder="e.g. 100 or 13.5"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              if (error) setError("");
            }}
            className="w-full border border-slate-200 px-3 py-2.5 rounded-xl text-sm bg-white text-gray-800 focus:border-[#0B4EA2] focus:outline-none transition-all"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Unit (Optional)</label>
          <select
            value={currentUnitId}
            onChange={(e) => setCurrentUnitId(e.target.value)}
            className="w-full border border-slate-200 px-3 py-2.5 rounded-xl text-sm bg-white text-gray-800 focus:border-[#0B4EA2] focus:outline-none transition-all"
          >
            <option value="">-- None --</option>
            {availableUnits.map((unit) => (
              <option key={unit.id} value={unit.id}>
                {unit.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <button
            type="button"
            onClick={handleAddSpec}
            className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-[#0B4EA2] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition cursor-pointer"
          >
            <Plus size={16} />
            Add Specification
          </button>
        </div>
      </div>

      {error && (
        <p className="text-xs text-red-600 font-bold bg-red-50 p-2 rounded-lg border border-red-200 inline-block">
          🚨 {error}
        </p>
      )}
      {selectedSpecs.length > 0 && (
        <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-slate-50 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                <th className="p-3">Specification</th>
                <th className="p-3">Value</th>
                <th className="p-3">Unit</th>
                <th className="p-3 text-center w-24">Action</th>
              </tr>
            </thead>
            <tbody>
              {selectedSpecs.map((spec) => {
                const specDef = availableSpecs.find(s => s.id === spec.specificationId);
                const unitDef = availableUnits.find(u => u.id === spec.unitId);
                return (
                  <tr key={spec.specificationId} className="border-b last:border-0 hover:bg-slate-50/50 transition-colors">
                    <td className="p-3 font-medium text-gray-900">
                      {specDef ? `${specDef.nameEn} (${specDef.nameAr})` : "Unknown Spec"}
                    </td>
                    <td className="p-3 text-gray-600 font-mono">{spec.value}</td>
                    <td className="p-3 text-gray-600 font-medium">
                      {unitDef ? unitDef.name : <span className="text-gray-400 text-xs">None</span>}
                    </td>
                    <td className="p-3 text-center">
                      <button
                        type="button"
                        onClick={() => handleRemoveSpec(spec.specificationId)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-red-100 bg-red-50 text-red-600 hover:bg-red-100 transition-all cursor-pointer"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
