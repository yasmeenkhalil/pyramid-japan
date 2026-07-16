"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { User, Mail, Lock, Save } from "lucide-react";

export default function AdminProfilePage() {
  const { data: session, update } = useSession();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      setEmail(session.user.email || "");
    }
  }, [session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ type: "success", text: data.message });
        setPassword("");
        
        if (update) {
          await update({
            user: {
              name: name,
              email: email
            }
          });
        }
      } else {
        setMessage({ type: "error", text: data.error || "Failed to update profile" });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Connection error, please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Profile</h1>
        <p className="mt-1 text-sm text-slate-500">Update your security credentials and profile information</p>
      </div>

      <div className="rounded-[28px] bg-white p-8 shadow-xl border border-slate-100">
        <form onSubmit={handleSubmit} className="space-y-6">
          {message.text && (
            <div className={`rounded-xl p-4 text-sm font-semibold border ${
              message.type === "success" ? "bg-emerald-50 text-emerald-800 border-emerald-100" : "bg-red-50 text-red-800 border-red-100"
            }`}>
              {message.type === "success" ? "✅" : "🚨"} {message.text}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Admin Name</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400"><User size={18} /></span>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-slate-200 bg-slate-50 pl-11 pr-4 py-3 rounded-xl text-sm focus:outline-none focus:border-[#0B4EA2] text-gray-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Email Address</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400"><Mail size={18} /></span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-slate-200 bg-slate-50 pl-11 pr-4 py-3 rounded-xl text-sm focus:outline-none focus:border-[#0B4EA2] text-gray-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">New Password (Leave blank to keep current)</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400"><Lock size={18} /></span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-slate-200 bg-slate-50 pl-11 pr-4 py-3 rounded-xl text-sm focus:outline-none focus:border-[#0B4EA2] text-gray-800"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 w-full sm:w-auto rounded-2xl bg-[#0B4EA2] px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-blue-700 transition disabled:opacity-50 cursor-pointer"
            >
              <Save size={18} />
              {loading ? "Saving Changes..." : "Save Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
