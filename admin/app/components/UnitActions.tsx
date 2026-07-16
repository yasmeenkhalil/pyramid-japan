"use client";

import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Edit2, Trash2, X, AlertTriangle } from "lucide-react";

interface UnitActionsProps {
  id: string;
  name: string;
}

export default function UnitActions({ id, name }: UnitActionsProps) {
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  
  const [editName, setEditName] = useState<string>(name);
  
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();

  useEffect(() => {
    setEditName(name);
  }, [name]);

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!editName.trim()) {
      newErrors.name = "Unit name is required.";
    } else if (!/^[A-Za-z0-9\s°³²\/%#-]+$/.test(editName)) {
      newErrors.name = "Unit name must contain valid character symbols only (e.g. HP, kg, m³).";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/units/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editName.trim() }),
      });

      if (res.ok) {
        setIsEditOpen(false);
        setErrors({});
        router.refresh();
      } else {
        const err = await res.json();
        if (err.message && err.message.toLowerCase().includes("exist")) {
          setErrors((prev) => ({ ...prev, name: err.message }));
        } else {
          alert(err.message || "Failed to update unit");
        }
      }
    } catch (error) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/units/${id}`, { method: "DELETE" });
      if (res.ok) {
        setIsDeleteOpen(false);
        router.refresh();
      } else {
        alert("Failed to delete unit");
      }
    } catch (error) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClose = () => {
    setIsEditOpen(false);
    setErrors({});
    setEditName(name);
  };
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setIsEditOpen(true)}
        className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-blue-600 shadow-sm hover:bg-slate-50 transition-all cursor-pointer"
      >
        <Edit2 size={16} />
      </button>

      <button
        onClick={() => setIsDeleteOpen(true)}
        className="flex h-9 w-9 items-center justify-center rounded-xl border border-red-100 bg-red-50 text-red-600 shadow-sm hover:bg-red-100 transition-all cursor-pointer"
      >
        <Trash2 size={16} />
      </button>

      {isEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl border border-slate-100 flex flex-col max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between border-b pb-4 mb-5 shrink-0">
              <h3 className="text-xl font-bold text-gray-900">Edit Unit</h3>
              <button
                onClick={handleEditClose}
                className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="flex flex-col flex-1 overflow-hidden" noValidate>
              <div className="space-y-4 overflow-y-auto flex-1 pr-1 pb-4">
                <div>
                  <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${errors.name ? "text-red-600" : "text-gray-500"}`}>
                    Unit Name *
                  </label>
                  <input
                    type="text"
                    value={editName}
                    placeholder="e.g. HP, kg, ton"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setEditName(e.target.value);
                      if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
                    }}
                    className={`w-full border px-4 py-3 rounded-xl text-sm focus:outline-none transition-all ${
                      errors.name ? "border-red-500 bg-red-50 text-red-900 focus:border-red-600 focus:bg-white" : "border-slate-200 bg-slate-50 text-gray-800 focus:border-[#0B4EA2] focus:bg-white"
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-xs text-red-600 font-bold bg-red-50 p-2 rounded-lg border border-red-200">🚨 {errors.name}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t mt-6 shrink-0">
                <button
                  type="button"
                  onClick={handleEditClose}
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-600 hover:bg-slate-50 border border-slate-200 transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#0B4EA2] hover:bg-blue-700 disabled:bg-blue-300 transition-all cursor-pointer"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isDeleteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-xl border border-slate-100 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600 mb-4">
              <AlertTriangle size={28} />
            </div>
            
            <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Unit</h3>
            <p className="text-sm text-gray-500 mb-6">
              Are you sure you want to delete <span className="font-semibold text-gray-800">"{name}"</span>? This action cannot be undone.
            </p>

            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setIsDeleteOpen(false)}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-600 hover:bg-slate-50 border border-slate-200 transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={loading}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-red-600 hover:bg-red-700 disabled:bg-red-300 transition-all cursor-pointer"
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
