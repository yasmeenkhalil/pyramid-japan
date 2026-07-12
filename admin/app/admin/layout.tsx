import Sidebar from "../components/sidebar";
import Topbar from "../components/topbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen bg-[#F4F8FC] p-4">
      <div className="flex h-full overflow-hidden rounded-[32px] bg-white shadow-xl">
        <Sidebar />

        <div className="flex flex-1 flex-col overflow-hidden">
          <Topbar />

          <main className="flex-1 overflow-y-auto p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}