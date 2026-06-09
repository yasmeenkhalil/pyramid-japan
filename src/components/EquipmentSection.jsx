import MachineCard from './MachineCard';

export default function EquipmentSection({ title, data }) {
  const words = title.split(' ');
  const firstTwoWords = words.slice(0, 2).join(' ');
  const restOfTitle = words.slice(2).join(' ');

  return (
    <div className="w-full mb-12 text-left px-2 sm:px-0">
      
      {/* 🌟 شريط العنوان الفخم الجديد المتناسق مع الهوية */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-6 border-b border-[#E5C193]/20">
        
        <h3 className="text-lg sm:text-xl font-bold tracking-tight text-[#E6DED5]">
          <span className="text-[#E5C193] mr-2">{firstTwoWords}</span>
          <span className="text-black font-medium">{restOfTitle}</span>
        </h3>
        
        {/* زر "عرض المزيد" بتصميم عصري تفاعلي */}
        <button className="group bg-[#16110F] hover:bg-[#E5C193] text-[#E5C193] hover:text-[#110E0D] text-xs font-semibold px-4 py-2 rounded-lg border border-[#E5C193]/30 hover:border-[#E5C193] transition-all duration-300 flex items-center gap-2 cursor-pointer shrink-0 shadow-lg shadow-black/20">
          <span>View All Equipment</span>
          <svg 
            className="w-3 h-3 transform group-hover:translate-x-1 transition-transform duration-300" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* شبكة عرض البطاقات */}
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {data.map((machine) => (
          <MachineCard key={machine.id} machine={machine} />
        ))}
      </div>

    </div>
  );
}
