import AddMachineryModal from "@/app/components/AddMachineryModal";
import AuthProvider from "@/app/components/AuthProvider";
import MachineryTable from "@/app/components/machinery-table";
import { prisma } from "@/lib/prisma";
import { Tractor, FolderKanban, Mail, Users } from "lucide-react";

async function getDashboardStats() {
  const [machineryCount, inquiryCount, pendingInquiries, categoryCount, userCount] =
    await Promise.all([
      prisma.machinery.count(),
      prisma.inquiry.count(),
      prisma.inquiry.count({
        where: {
          status: "pending",
        },
      }),
      prisma.category.count(),
      prisma.user.count(), 
    ]);

  const latestMachinery = await prisma.machinery.findMany({
    take: 6,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      category: true,
    },
  });

  // 🟢 التعديل الجديد: جلب آخر 5 استفسارات وصلت إلى قاعدة البيانات
  const latestInquiries = await prisma.inquiry.findMany({
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
  });

  return {
    machineryCount,
    inquiryCount,
    pendingInquiries,
    categoryCount,
    userCount,
    latestMachinery,
    latestInquiries, // تمرير المصفوفة الحقيقية
  };
}

export default async function AdminDashboard() {
  const stats = await getDashboardStats();

  return (
     <AuthProvider>
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="rounded-[28px] bg-gradient-to-r from-[#0B4EA2] to-[#2563EB] p-8 text-white shadow-xl">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold">
            Welcome to the Pyramid Japan Administration Dashboard
          </h1>
          <p className="mt-3 text-blue-100">
            Manage machinery inventory, customer inquiries and business
            operations from one place.
          </p>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Machinery"
          value={stats.machineryCount}
          icon={<Tractor size={22} />}
        />
        <StatCard
          title="Categories"
          value={stats.categoryCount}
          icon={<FolderKanban size={22} />}
        />
        <StatCard
          title="Pending Inquiries"
          value={stats.pendingInquiries}
          icon={<Mail size={22} />}
        />
        <StatCard
          title="Users"
          value={stats.userCount}
          icon={<Users size={22} />}
        />
      </div>

      {/* Bottom Section */}
      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <MachineryTable machinery={stats.latestMachinery} />
        </div>

        {/* عرض الاستفسارات الحقيقية */}
        <div className="rounded-[28px] bg-white p-6 shadow-sm border border-slate-200 flex flex-col max-h-[500px]">
          <h3 className="text-lg font-semibold text-slate-900">
            Recent Inquiries
          </h3>

          <div className="mt-5 space-y-4 overflow-y-auto flex-1 pr-1">
            {stats.latestInquiries && stats.latestInquiries.length > 0 ? (
              stats.latestInquiries.map((inquiry: any) => (
                <div key={inquiry.id} className="rounded-2xl bg-slate-50 p-4 border border-slate-100 hover:border-slate-200 transition">
                  <div className="flex items-center justify-between">
                    {/* تأكدي من مسميات الحقول في موديل الـ Inquiry مثل name أو email */}
                    <div className="font-semibold text-slate-900 truncate max-w-[150px]">
                      {inquiry.name || inquiry.customerName || "Anonymous User"}
                    </div>
                    {/* وسم حالة الاستفسار ملوّن */}
                    <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${
                      inquiry.status === "pending" 
                        ? "bg-amber-50 text-amber-800 ring-amber-600/20" 
                        : "bg-emerald-50 text-emerald-800 ring-emerald-600/20"
                    }`}>
                      {inquiry.status}
                    </span>
                  </div>

                  {/* عرض جزء من رسالة الاستفسار أو محتواه */}
                  <p className="mt-1.5 text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {inquiry.message || inquiry.content || "Requested specific machine details."}
                  </p>
                  
                  {/* تاريخ الاستفسار مصغر */}
                  {inquiry.createdAt && (
                    <div className="mt-2 text-[10px] text-slate-400 font-medium">
                      {new Date(inquiry.createdAt).toLocaleDateString()}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-sm text-slate-400 italic">
                No inquiries found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </AuthProvider>
  );
}

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-[24px] bg-white p-6 shadow-sm border border-slate-200">
      <div className="flex items-center justify-between">
        <div className="text-slate-500">{title}</div>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#0B4EA2]">
          {icon}
        </div>
      </div>
      <div className="mt-5 text-4xl font-bold text-slate-900">{value}</div>
    </div>
  );
}
