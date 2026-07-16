"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, Trash2, X, AlertTriangle, CheckCircle, Clock, Mail } from "lucide-react";

interface InquiryActionsProps {
  id: string;
  name: string;
  email: string;
  message: string;
  status: string;
}

export default function InquiryActions({ id, name, email, message, status }: InquiryActionsProps) {
  const [isViewOpen, setIsViewOpen] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleStatusUpdate = async (newStatus: string): Promise<void> => {
    setLoading(true);
    console.log('jjjjjjjjjjjjjjjjjjjjjj');
    console.log(id);
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setIsViewOpen(false);
        router.refresh();
      } else {
        const errData = await res.json();
        alert(errData.message || "Failed to update status");
      }
    } catch (error) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (): Promise<void> => {
    setLoading(true);
    try {
      const res = await fetch(`/api/inquiries/${id}`, { method: "DELETE" });
      if (res.ok) {
        setIsDeleteOpen(false);
        router.refresh();
      } else {
        alert("Failed to delete");
      }
    } catch (error) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleReplyMail = (): void => {
    const subject = encodeURIComponent(`Re: Your inquiry on Pyramid Japan`);
    const body = encodeURIComponent(`Dear ${name},\n\nThank you for contacting Pyramid Japan. Regarding your message:\n"${message}"\n\n`);
    window.open(`mailto:${email}?subject=${subject}&body=${body}`, "_blank");
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setIsViewOpen(true)}
        className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm hover:bg-slate-50 transition-all cursor-pointer"
      >
        <Eye size={16} />
      </button>

      <button
        onClick={handleReplyMail}
        className="flex h-9 w-9 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600 shadow-sm hover:bg-blue-100 transition-all cursor-pointer"
        title="Reply via Email"
      >
        <Mail size={16} />
      </button>

      <button
        onClick={() => setIsDeleteOpen(true)}
        className="flex h-9 w-9 items-center justify-center rounded-xl border border-red-100 bg-red-50 text-red-600 shadow-sm hover:bg-red-100 transition-all cursor-pointer"
      >
        <Trash2 size={16} />
      </button>

      {isViewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-xl border border-slate-100">
            <div className="flex items-center justify-between border-b pb-4 mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Inquiry Details</h3>
                <p className="text-xs text-gray-500">From: {name} ({email})</p>
              </div>
              <button
                onClick={() => setIsViewOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl text-sm text-gray-700 min-h-[120px] whitespace-pre-wrap mb-6 border border-slate-100">
              {message}
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex gap-2">
                <button
                  onClick={() => handleStatusUpdate("completed")}
                  disabled={loading || status === "completed"}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-white bg-green-600 hover:bg-green-700 disabled:opacity-40 transition-all cursor-pointer"
                >
                  <CheckCircle size={14} />
                  Complete
                </button>
                <button
                  onClick={() => handleStatusUpdate("pending")}
                  disabled={loading || status === "pending"}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-amber-800 bg-amber-50 hover:bg-amber-100 disabled:opacity-40 transition-all cursor-pointer border border-amber-200"
                >
                  <Clock size={14} />
                  Pending
                </button>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleReplyMail}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#0B4EA2] hover:bg-blue-700 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Mail size={14} />
                  Send Email
                </button>
                <button
                  type="button"
                  onClick={() => setIsViewOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:bg-slate-50 border border-slate-200 transition-all cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isDeleteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-xl border border-slate-100 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600 mb-4">
              <AlertTriangle size={28} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Inquiry</h3>
            <p className="text-sm text-gray-500 mb-6">
              Are you sure you want to delete this inquiry from <span className="font-semibold text-gray-800">"{name}"</span>?
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
