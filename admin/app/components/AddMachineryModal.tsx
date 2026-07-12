"use client";

import { useState } from "react";
import AddMachineryForm from "./AddMachineryForm";

export default function AddMachineryModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="mt-6 rounded-2xl bg-white px-5 py-3 font-semibold text-[#0B4EA2]"
      >
        Add New Machinery
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">

            <h2 className="mb-4 text-lg font-semibold text-slate-900">
              Add New Machinery
            </h2>

            <AddMachineryForm
              onClose={() => setOpen(false)}
            />

          </div>
        </div>
      )}
    </>
  );
}