import MachineCard from './MachineCard';

export default function EquipmentSection({ title, badgeColor, data }) {
  const words = title.split(' ');
  const firstWord = words[0] + (words[1] && words[0] === 'New' ? ' ' + words[1] : '');
  const restOfTitle = title.replace(firstWord, '');

  return (
    <div className="w-full mb-8 text-left px-2 sm:px-0">
      
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${badgeColor} text-white px-4 py-3 sm:py-1.5 rounded-sm mb-5 border border-blue-800/10`}>
        
        <h3 className="text-xs sm:text-sm font-bold font-sans tracking-wide leading-snug">
          <span className="text-red-500">{firstWord}</span>
          <span className="text-white">{restOfTitle}</span>
        </h3>
        
        <button className="bg-[#FF8A00] hover:bg-[#e07a00] text-white text-[10px] font-bold px-3 py-1 sm:py-0.5 rounded-full shadow-xs transition-colors flex items-center justify-center gap-1 cursor-pointer self-start sm:self-auto shrink-0">
          <span>▸</span> Click here for More
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.map((machine) => (
          <MachineCard key={machine.id} machine={machine} />
        ))}
      </div>

    </div>
  );
}
