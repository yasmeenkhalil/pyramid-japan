
export default function MachineCard({ machine }) {
  return (
    <div className="bg-white flex flex-col group cursor-pointer text-left select-none">
      
      {/* 1. حاوية الصورة المربعة تقريباً مع البادج الأزرق بالأسفل */}
      <div className="relative aspect-[4/3] w-full bg-gray-100 overflow-hidden border border-gray-200">
        <img 
          src={machine.image} 
          alt={machine.title} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
        />
        {/* البادج الأزرق في أسفل يمين الصورة تماماً كما بالصورة */}
        <span className="absolute bottom-0 right-0 bg-[#005BAC] text-white text-[10px] font-sans px-2.5 py-0.5 font-medium tracking-wide">
          {machine.tag}
        </span>
      </div>

      {/* 2. تفاصيل المعدة - نصوص ناعمة ومتراصة مباشرة تحت الصورة */}
      <div className="pt-2 flex flex-col gap-0.5 text-[11px] text-gray-700 font-sans">
        
        {/* اسم المعدة والموديل بخط داكن وصغير */}
        <h4 className="text-gray-900 font-medium tracking-tight line-clamp-1 group-hover:text-blue-600 transition-colors">
          {machine.title}
        </h4>
        <p className="font-bold text-gray-900 uppercase tracking-tight">{machine.model}</p>
        
        {/* الساعات وسنة الصنع في سطر واحد يفصل بينهما مسافة */}
        <p className="text-gray-600 font-mono mt-0.5">
          {machine.hours}hr&nbsp;&nbsp;&nbsp;&nbsp;{machine.year}
        </p>
        
        {/* التصنيف الفرعي */}
        <p className="text-gray-800">{machine.tag}</p>
        
        {/* السعر والموقع */}
        <p className="text-gray-600 font-medium">Price : {machine.price}</p>
        <p className="text-gray-500 uppercase text-[10px] tracking-wide font-mono">{machine.location}</p>
        
      </div>

    </div>
  );
}
