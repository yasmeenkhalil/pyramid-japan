import AddMachineryModal from "@/app/components/AddMachineryModal";
import MachineryTable from "@/app/components/machinery-table";
import { prisma } from "@/lib/prisma";
import { Tractor, FolderKanban, Mail, Database } from "lucide-react";



async function getDashboardStats() {
  const [machineryCount, inquiryCount, pendingInquiries, categoryCount] =
    await Promise.all([
      prisma.machinery.count(),
      prisma.inquiry.count(),
      prisma.inquiry.count({
        where: {
          status: "pending",
        },
      }),
      prisma.category.count(),
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

  return {
    machineryCount,
    inquiryCount,
    pendingInquiries,
    categoryCount,
    latestMachinery,
  };
}

export default async function AdminDashboard() {
  const stats = await getDashboardStats();

  return (
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

        <AddMachineryModal />
         
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
          title="Database"
          value="Online"
          icon={<Database size={22} />}
        />
      </div>

      {/* Bottom Section */}

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2 ">

            <MachineryTable machinery={stats.latestMachinery} />
          
        </div>

        <div className="rounded-[28px] bg-white p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900">
            Recent Inquiries
          </h3>

          <div className="mt-5 space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="rounded-2xl bg-slate-50 p-4">
                <div className="font-medium text-slate-900">
                  New Customer Inquiry
                </div>

                <p className="mt-1 text-sm text-slate-500">
                  Waiting for response
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

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
