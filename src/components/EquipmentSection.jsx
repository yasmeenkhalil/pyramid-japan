import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import MachineCard from './MachineCard';

export default function EquipmentSection({ title, data, loading, categoryRaw }) {
  const { t, i18n } = useTranslation();

  const getInitialCategory = () => {
    if (categoryRaw) return categoryRaw;
    
    const currentLang = i18n.language;
    if (currentLang !== 'en') return 'all';

    const firstWord = title?.split(' ')[0]?.toLowerCase() || '';
    if (firstWord === 'new' || firstWord === 'used') return 'construction';
    if (firstWord === 'export') return 'export';
    if (firstWord === 'agricultural' || firstWord === 'agriculture') return 'agriculture';
    if (firstWord === 'maintenance') return 'maintenance';
    return 'all';
  };

  const initialCategory = getInitialCategory();
  return (
    <div className="w-full mb-12 text-left px-2 sm:px-0">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-6 border-b border-[#E5C193]/20">
        
        <h3 className="text-lg sm:text-xl font-bold tracking-tight text-slate-800">
          <span className="text-[#C47B36]">{title}</span>
        </h3>
        
        <Link 
          to={`/machinery-all/${initialCategory}`}
          className="group bg-[#16110F] hover:bg-[#E5C193] text-[#E5C193] hover:text-[#110E0D] text-xs font-semibold px-4 py-2 rounded-lg border border-[#E5C193]/30 hover:border-[#E5C193] transition-all duration-300 flex items-center gap-2 cursor-pointer shrink-0 shadow-lg"
        >
          <span>{t("eq_section.view_all")}</span>
          <svg 
            className="w-3 h-3 transform group-hover:translate-x-1 transition-transform duration-300" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {loading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm space-y-4 p-4 animate-pulse">
              <div className="w-full h-40 bg-slate-200 rounded-xl" />
              <div className="space-y-2">
                <div className="h-4 bg-slate-200 rounded-md w-3/4" />
                <div className="h-3 bg-slate-200 rounded-md w-1/2" />
              </div>
              <div className="pt-2 border-t border-slate-100 flex justify-between items-center">
                <div className="h-5 bg-slate-200 rounded-md w-1/3" />
                <div className="h-4 bg-slate-200 rounded-md w-1/4" />
              </div>
            </div>
          ))
        ) : data && data.length > 0 ? (
          data.map((machine) => (
            <MachineCard key={machine.id} machine={machine} />
          ))
        ) : (
          <div className="col-span-full text-center py-10 text-sm text-slate-400 italic bg-white border border-slate-100 rounded-2xl">
            {t("eq_section.no_data")}
          </div>
        )}
      </div>

    </div>
  );
}
