import { FileText, PlayCircle, ShieldCheck } from 'lucide-react';
import { useTranslation } from "react-i18next"; // استيراد مكتبة الترجمة

export default function SidebarBanners() {
  const { t, i18n } = useTranslation(); // تفعيل تابع الترجمة والاتجاهات

  const handleDownloadStockList = async () => {
    try {
      const response = await fetch('/api/machinery/export', {
        method: 'GET',
      });
      if (!response.ok) throw new Error("Failed to download file");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Pyramid_Japan_Stock_List.xlsx';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting excel:", error);
    }
  };

  return (
    <div className="w-full flex flex-col gap-4 text-left rtl:text-right" dir={i18n.dir()}>
      
      {/* BANNER 1: STOCK OPERATIONS */}
      <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-sm transition-all duration-300 hover:shadow-md hover:border-red-500 group cursor-pointer" onClick={handleDownloadStockList}>
        <div className="flex items-center gap-3 border-b border-gray-100 pb-3 mb-4">
          <FileText className="w-4 h-4 text-red-600 transition-transform duration-300 group-hover:scale-110" />
          <h3 className="text-xs font-bold tracking-wider uppercase text-gray-800">
            {t('sidebar.stock_title')}
          </h3>
        </div>
        
        <div>
          <label className="block text-[11px] font-semibold text-amber-700 uppercase tracking-wider mb-1">
            {t('sidebar.stock_subtitle')}
          </label>
          <p className="text-[11px] text-gray-500 leading-relaxed font-light">
            {t('sidebar.stock_desc')}
          </p>
          <button className="w-full bg-gray-900 hover:bg-red-600 text-white py-2.5 rounded-xl text-[10px] font-bold tracking-widest uppercase transition-all duration-300 mt-4 cursor-pointer flex items-center justify-center gap-1">
            {t('sidebar.stock_btn')}
            <span className="rtl:rotate-180">→</span>
          </button>
        </div>
      </div>

      {/* BANNER 2: CORPORATE MEDIA */}
      <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-sm transition-all duration-300 hover:shadow-md hover:border-red-500 group cursor-pointer">
        <div className="flex items-center gap-3 border-b border-gray-100 pb-3 mb-4">
          <PlayCircle className="w-4 h-4 text-red-600 transition-transform duration-300 group-hover:scale-110" />
          <h3 className="text-xs font-bold tracking-wider uppercase text-gray-800">
            {t('sidebar.media_title')}
          </h3>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-amber-700 uppercase tracking-wider mb-1">
            {t('sidebar.media_subtitle')}
          </label>
          <p className="text-[11px] text-gray-500 leading-relaxed font-light">
            {t('sidebar.media_desc')}
          </p>
          <button className="w-full bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 py-2.5 rounded-xl text-[10px] font-bold tracking-widest uppercase transition-all duration-300 mt-4 cursor-pointer group-hover:border-red-500/40">
            {t('sidebar.media_btn')}
          </button>
        </div>
      </div>

      {/* BANNER 3: GUARANTEE */}
      <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-sm transition-all duration-300 hover:shadow-md hover:border-red-500 group">
        <div className="flex items-center gap-3 border-b border-gray-100 pb-3 mb-4">
          <ShieldCheck className="w-4 h-4 text-red-600" />
          <h3 className="text-xs font-bold tracking-wider uppercase text-gray-800">
            {t('sidebar.guarantee_title')}
          </h3>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-amber-700 uppercase tracking-wider mb-1">
            {t('sidebar.guarantee_subtitle')}
          </label>
          <p className="text-[11px] text-gray-500 leading-relaxed font-light">
            {t('sidebar.guarantee_desc')}
          </p>
          <div className="mt-4 flex items-center justify-center gap-1.5 bg-gray-50 text-gray-700 p-2.5 rounded-xl border border-gray-100 text-[10px] font-bold tracking-wider uppercase">
            <span>✓</span> {t('sidebar.guarantee_badge')}
          </div>
        </div>
      </div>

    </div>
  );
}
