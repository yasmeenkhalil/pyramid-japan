import Sidebar from "../components/sidebar";
import Topbar from "../components/topbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-screen bg-[#F4F8FC]  overflow-hidden">
      <div className="flex h-full w-full overflow-hidden  bg-white shadow-xl relative">
        
        {/* السايدبار ممتد بالكامل داخل الحاوية الدائرية ومثبت الارتفاع */}
        <div className="h-full flex flex-col shrink-0">
          <Sidebar />
        </div>
        <div className="flex flex-1 flex-col overflow-hidden">
          <Topbar />

          <main className="flex-1 overflow-y-auto p-8 bg-[#F4F8FC]/30">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
