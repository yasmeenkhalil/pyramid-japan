"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import MachineryModal from "./MachineryModal";

interface Category {
  id: string;
  nameEn: string;
}

interface Machinery {
  id: string;
  titleEn: string;
  titleAr: string;
  titleJa: string;
  stockNo: string | null;
  year: number | null;
  hour: number | null;
  price: number | null;
  descriptionEn: string | null;
  descriptionAr: string | null;
  descriptionJa: string | null;
  featured: boolean;
  categoryId: string;
  images: { id: string; imageUrl: string }[];
}

interface MachineryActionsProps {
  machinery: Machinery;
  categories: Category[];
}

export default function MachineryActions({ machinery, categories }: MachineryActionsProps) {
  const [openDelete, setOpenDelete] = useState(false);

  async function handleDelete() {
    try {
      const res = await fetch(`/api/machinery/${machinery.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        window.location.reload();
      } else {
        alert("Failed to delete machinery");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong during deletion");
    }
  }

  return (
    <>
      <div className="flex items-center justify-start gap-2 h-full my-auto">
        <MachineryModal machinery={machinery} categories={categories} />
        <button
          onClick={() => setOpenDelete(true)}
          className="flex h-[38px] w-[38px] items-center justify-center rounded-2xl bg-red-50 text-red-600 hover:bg-red-100 transition shrink-0"
        >
          <Trash2 size={18} />
        </button>
      </div>

      {openDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">

            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
              <Trash2 size={24} />
            </div>

            <h2 className="text-xl font-bold text-gray-900">
              Delete Machinery
            </h2>

            <p className="mt-2 text-slate-500">
              Are you sure you want to delete this item?
            </p>

            <p className="mt-2 font-semibold text-gray-900">
              {machinery.titleEn}
            </p>

            <p className="mt-4 text-sm text-red-500 font-medium">
              This action cannot be undone.
            </p>

            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setOpenDelete(false)}
                className="rounded-xl bg-slate-100 px-4 py-2 text-gray-700 font-medium hover:bg-slate-200 transition"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                className="rounded-xl bg-red-600 px-4 py-2 text-white font-medium hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
