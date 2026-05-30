
export default function MakerSeaction() {
  const makers = [
    { name: 'TADANO', style: 'text-[#005BAC] font-black' },
    { name: 'KATO', style: 'bg-[#002F6C] text-white px-3 py-0.5 font-black tracking-tighter' },
    { name: 'KOMATSU', style: 'text-[#003399] font-black font-sans tracking-tight' },
    { name: 'KOBELCO', style: 'text-[#00A0E9] font-black tracking-tight' },
    { name: 'AICHI', style: 'text-[#005BAC] font-extrabold italic tracking-tight' },
    { name: 'MAEDA', style: 'text-[#009944] font-bold' },
    { name: 'IHI', style: 'text-[#005BAC] font-black' },
    { name: 'NIPPON SHARYO', style: 'text-gray-800 font-bold' },
    { name: 'FURUKAWA', style: 'text-gray-900 font-extrabold tracking-wide' },
    { name: 'MOROOKA', style: 'text-[#D70014] font-black italic' },
    { name: 'SUMITOMO', style: 'text-[#003399] font-bold' },
    { name: 'MITSUBISHI', style: 'text-[#D70014] font-extrabold tracking-widest' },
    { name: 'CATERPILLAR', style: 'bg-[#FFCD00] text-black px-2 py-0.5 font-black' },
    { name: 'HITACHI', style: 'text-black font-black tracking-wide' },
    { name: 'KUBOTA', style: 'text-[#00A0E9] font-extrabold lowercase text-base' },
    { name: 'YANMAR', style: 'text-[#D70014] font-black tracking-tighter' },
    { name: 'TCM', style: 'text-[#D70014] font-black italic text-sm' },
    { name: 'KAWASAKI', style: 'text-[#D70014] font-bold' },
    { name: 'TOYOTA L&F', style: 'text-[#D70014] font-black' },
    { name: 'ISUZU', style: 'text-[#D70014] font-black tracking-widest text-sm' },
    { name: 'HINO', style: 'text-gray-700 font-bold tracking-widest' },
    { name: 'UD TRUCKS', style: 'text-[#D70014] font-bold border border-[#D70014] rounded-full px-1 text-[9px]' },
    { name: 'TOYOTA', style: 'text-gray-500 font-medium' },
    { name: 'SAKAI', style: 'text-black font-black tracking-widest' },
    { name: 'AIRMAN', style: 'text-[#D70014] font-black' },
    { name: 'DENYO', style: 'text-[#D70014] font-black italic' },
    { name: 'OKADA', style: 'text-[#005BAC] font-bold' },
    { name: 'MARUJUN', style: 'text-[#005BAC] font-bold' },
    { name: 'NPK', style: 'text-[#D70014] font-black' },
    { name: 'TAGUCHI', style: 'text-black font-extrabold' },
  ];

  return (
    <div className="w-full text-left bg-white select-none">
      
      <div className="bg-[#005BAC] text-white px-5 py-2.5 rounded-sm mb-6">
        <h3 className="text-xs font-bold font-sans tracking-wide">
          Search Used Japanese Construction equipment by Maker
        </h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-2 gap-y-8 items-center justify-items-center py-4 px-2">
        {makers.map((maker, idx) => (
          <div 
            key={idx} 
            className="w-full h-6 flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-105"
          >
            <span className={`text-xs uppercase tracking-tight text-center ${maker.style}`}>
              {maker.name}
            </span>
          </div>
        ))}
      </div>

      <div className="my-4 pt-4 border-t border-gray-100 pl-6">
        <button className="text-xs font-bold text-gray-800 hover:text-blue-600 transition-colors cursor-pointer uppercase tracking-wider">
          OTHERS
        </button>
      </div>

    </div>
  );
}
