import React from "react";
import { prisma } from "@/lib/prisma";
import AddUserModal from "@/app/components/AddUserModal";
import UserActions from "@/app/components/UserActions";

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default async function UsersPage() {
  const users: UserData[] = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Manage Users</h1>
      </div>

      <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-slate-50">
              <th className="p-4 text-left">Full Name</th>
              <th className="p-4 text-left">Email Address</th>
              <th className="p-4 text-left">Role</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-slate-50/50 transition-colors">
                <td className="p-4 align-middle font-medium text-gray-900">{user.name}</td>
                <td className="p-4 align-middle text-gray-600">{user.email}</td>
                <td className="p-4 align-middle">
                  <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                    user.role === "ADMIN" 
                      ? "bg-red-50 text-red-700 ring-red-600/10" 
                      : "bg-green-50 text-green-700 ring-green-600/10"
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="p-4 align-middle">
                  <div className="flex items-center min-h-[64px]">
                    <UserActions
                      id={user.id}
                      name={user.name}
                      email={user.email}
                      role={user.role}
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
