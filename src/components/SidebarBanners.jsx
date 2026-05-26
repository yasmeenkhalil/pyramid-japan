import { FileText, PlayCircle, ShieldCheck } from 'lucide-react';

export default function SidebarBanners() {
  return (
    <div className="w-full flex flex-col gap-4 text-left" dir="ltr">
      
      {/* 1. STOCK LIST BANNER */}
      <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-sm transition-all duration-300 hover:shadow-md hover:border-red-500 group cursor-pointer">
        <div className="flex items-center gap-3 border-b border-gray-100 pb-3 mb-4">
          <FileText className="w-4 h-4 text-red-600 transition-transform duration-300 group-hover:scale-110" />
          <h3 className="text-xs font-bold tracking-wider uppercase text-gray-800">
            Stock Operations
          </h3>
        </div>
        
        <div>
          <label className="block text-[11px] font-semibold text-amber-700 uppercase tracking-wider mb-1">
            Complete Inventory
          </label>
          <p className="text-[11px] text-gray-500 leading-relaxed font-light">
            Browse and download our fully updated heavy machinery spreadsheet directly from Japan.
          </p>
          <button className="w-full bg-gray-900 hover:bg-red-600 text-white py-2.5 rounded-xl text-[10px] font-bold tracking-widest uppercase transition-all duration-300 mt-4 cursor-pointer">
            View Stock List →
          </button>
        </div>
      </div>

      {/* 2. COMPANY VIDEO BANNER */}
      <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-sm transition-all duration-300 hover:shadow-md hover:border-red-500 group cursor-pointer">
        <div className="flex items-center gap-3 border-b border-gray-100 pb-3 mb-4">
          <PlayCircle className="w-4 h-4 text-red-600 transition-transform duration-300 group-hover:scale-110" />
          <h3 className="text-xs font-bold tracking-wider uppercase text-gray-800">
            Corporate Media
          </h3>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-amber-700 uppercase tracking-wider mb-1">
            Company Profile Video
          </label>
          <p className="text-[11px] text-gray-500 leading-relaxed font-light">
            Take a virtual video tour inside our certified Japanese inspection and deployment yards.
          </p>
          <button className="w-full bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 py-2.5 rounded-xl text-[10px] font-bold tracking-widest uppercase transition-all duration-300 mt-4 cursor-pointer group-hover:border-red-500/40">
            Watch Tour Video
          </button>
        </div>
      </div>

      {/* 3. QUALITY ASSURANCE BANNER */}
      <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-sm transition-all duration-300 hover:shadow-md hover:border-red-500 group">
        <div className="flex items-center gap-3 border-b border-gray-100 pb-3 mb-4">
          <ShieldCheck className="w-4 h-4 text-red-600" />
          <h3 className="text-xs font-bold tracking-wider uppercase text-gray-800">
            Pyramid Guarantee
          </h3>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-amber-700 uppercase tracking-wider mb-1">
            Quality Assurance
          </label>
          <p className="text-[11px] text-gray-500 leading-relaxed font-light">
            Every technical asset undergoes a rigorous, fully documented inspection protocol prior to global shipment.
          </p>
          <div className="mt-4 flex items-center justify-center gap-1.5 bg-gray-50 text-gray-700 p-2.5 rounded-xl border border-gray-100 text-[10px] font-bold tracking-wider uppercase">
            <span>✓</span> Certified Japanese Standards
          </div>
        </div>
      </div>

    </div>
  );
}
