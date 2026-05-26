import MachineCard from './MachineCard';

export default function EquipmentSection({ title, badgeColor, data }) {
  // فصل الكلمة الأولى من العنوان لتلوينها بالأحمر (مثل Pick Up أو New Arrival)
  const words = title.split(' ');
  const firstWord = words[0] + (words[1] && words[0] === 'New' ? ' ' + words[1] : '');
  const restOfTitle = title.replace(firstWord, '');

  return (
    <div className="w-full mb-10 text-left">
      
      {/* شريط العنوان الممتد المطابق للصورة الاصلية */}
      <div className={`flex items-center justify-between ${badgeColor} text-white px-4 py-1.5 rounded-sm mb-4 border border-blue-800/10`}>
        <h3 className="text-sm font-bold font-sans tracking-wide">
          {/* الكلمة الأولى باللون الأحمر الساطع أو الأصفر، والباقي أبيض */}
          <span className={badgeColor.includes('bg-charcoal') ? 'text-red-500' : 'text-red-500'}>{firstWord}</span>
          <span className="text-white">{restOfTitle}</span>
        </h3>
        
        {/* الزر البرتقالي الصغير في الزاوية المقابلة بالظبط */}
        <button className="bg-[#FF8A00] hover:bg-[#e07a00] text-white text-[10px] font-bold px-3 py-0.5 rounded-full shadow-xs transition-colors flex items-center gap-1 cursor-pointer">
          <span>▸</span> Click here for More
        </button>
      </div>

      {/* شبكة المعدات المكونة من 4 أعمدة أفقية متراصة بدقة */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6">
        {data.map((machine) => (
          <MachineCard key={machine.id} machine={machine} />
        ))}
      </div>

    </div>
  );
}
