"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Plus, X } from "lucide-react";

export default function AddUserModal() {
  const [open, setOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("USER");
  
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }

    if (!role) {
      newErrors.role = "Please select a role.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password,
          role,
        }),
      });

      if (res.ok) {
        handleClose();
        router.refresh();
      } else {
        const err = await res.json();
        if (err.message && err.message.toLowerCase().includes("email")) {
          setErrors((prev) => ({ ...prev, email: err.message }));
        } else {
          alert(err.message || "Failed to add user");
        }
      }
    } catch (error) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setErrors({});
    setName("");
    setEmail("");
    setPassword("");
    setRole("USER");
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-2xl bg-[#0B4EA2] px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-blue-700 transition cursor-pointer"
      >
        <Plus size={18} />
        Add User
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl border border-slate-100 flex flex-col max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between border-b pb-4 mb-5 shrink-0">
              <h3 className="text-xl font-bold text-gray-900">Add New User</h3>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden" noValidate>
              <div className="space-y-4 overflow-y-auto flex-1 pr-1 pb-4">
                
                <div>
                  <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${errors.name ? "text-red-600" : "text-gray-500"}`}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter full name"
                    value={name}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setName(e.target.value);
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

                <div>
                  <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${errors.email ? "text-red-600" : "text-gray-500"}`}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder="example@domain.com"
                    value={email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
                    }}
                    className={`w-full border px-4 py-3 rounded-xl text-sm focus:outline-none transition-all ${
                      errors.email ? "border-red-500 bg-red-50 text-red-900 focus:border-red-600 focus:bg-white" : "border-slate-200 bg-slate-50 text-gray-800 focus:border-[#0B4EA2] focus:bg-white"
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-red-600 font-bold bg-red-50 p-2 rounded-lg border border-red-200">🚨 {errors.email}</p>
                  )}
                </div>

                <div>
                  <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${errors.password ? "text-red-600" : "text-gray-500"}`}>
                    Password *
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors((prev) => ({ ...prev, password: "" }));
                    }}
                    className={`w-full border px-4 py-3 rounded-xl text-sm focus:outline-none transition-all ${
                      errors.password ? "border-red-500 bg-red-50 text-red-900 focus:border-red-600 focus:bg-white" : "border-slate-200 bg-slate-50 text-gray-800 focus:border-[#0B4EA2] focus:bg-white"
                    }`}
                  />
                  {errors.password && (
                    <p className="mt-1.5 text-xs text-red-600 font-bold bg-red-50 p-2 rounded-lg border border-red-200">🚨 {errors.password}</p>
                  )}
                </div>

                <div>
                  <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${errors.role ? "text-red-600" : "text-gray-500"}`}>
                    Role *
                  </label>
                  <select
                    value={role}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                      setRole(e.target.value);
                      if (errors.role) setErrors((prev) => ({ ...prev, role: "" }));
                    }}
                    className={`w-full border px-4 py-3 rounded-xl text-sm focus:outline-none transition-all ${
                      errors.role ? "border-red-500 bg-red-50 text-red-900 focus:border-red-600 focus:bg-white" : "border-slate-200 bg-slate-50 text-gray-800 focus:border-[#0B4EA2] focus:bg-white"
                    }`}
                  >
                    <option value="USER">User</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                  {errors.role && (
                    <p className="mt-1.5 text-xs text-red-600 font-bold bg-red-50 p-2 rounded-lg border border-red-200">🚨 {errors.role}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t mt-6 shrink-0">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-600 hover:bg-slate-50 border border-slate-200 transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#0B4EA2] hover:bg-blue-700 disabled:bg-blue-300 transition-all cursor-pointer"
                >
                  {loading ? "Adding..." : "Add User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
