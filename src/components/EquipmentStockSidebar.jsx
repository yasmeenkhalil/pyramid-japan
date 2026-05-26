import { useState } from 'react';
import { ChevronDown, HardHat, Settings, Compass, Layers } from 'lucide-react';

export default function EquipmentStockSidebar() {
  // تفعيل فتح القسم الأول (Excavators) افتراضياً تماماً كما في الصورة
  const [openSection, setOpenSection] = useState('Excavators');

  const stockData = [
    {
      name: 'Excavators',
      count: 44,
      icon: HardHat,
      subItems: ['Excavator (0.25m3)', 'Excavator (0.45m3)', 'Excavator (0.7m3~)']
    },
    {
      name: 'Mini-Excavators',
      count: 83,
      icon: Settings,
      subItems: ['Mini Excavator (1t)', 'Mini Excavator (2-3t)', 'Mini Excavator (4-5t)']
    },
    {
      name: 'Cranes',
      count: 3,
      icon: Compass,
      subItems: ['Rough Terrain Crane', 'Truck Crane', 'Crawler Crane', 'Spider Cranes']
    },
    {
      name: 'Foundation Machines',
      count: 6,
      icon: Layers,
      subItems: ['Pile Driving Machine', 'Vibro Hammer']
    }
  ];

  return (
    <div className="w-full bg-pure-white border border-gold-light/40 rounded-2xl overflow-hidden shadow-xs text-left mt-2">
      
      {/* الشريط الأزرق الفخم المطابق تماماً للعنوان في الصورة القديمة */}
      <div className="bg-[#005BAC] text-pure-white p-4 border-b border-gold-light/20">
        <h3 className="text-[11px] font-bold tracking-wider uppercase leading-tight font-mono">
          Used Heavy Equipment <span className="text-gold-light/60">・</span>
        </h3>
        <h3 className="text-[11px] font-bold tracking-wider uppercase leading-tight font-mono mt-0.5">
          Construction Machines Stock
        </h3>
      </div>

      {/* القائمة الشجرية للتصنيفات والأعداد بالأسفل */}
      <div className="p-3 flex flex-col gap-1 bg-white">
        {stockData.map((item, idx) => {
          const IconComponent = item.icon;
          const isCurrentOpen = openSection === item.name;

          return (
            <div key={idx} className="border-b border-bg-base/40 last:border-0 pb-1 last:pb-0">
              
              {/* زر القسم الرئيسي للضغط والفتح */}
              <button 
                onClick={() => setOpenSection(isCurrentOpen ? '' : item.name)}
                className="w-full flex items-center justify-between py-2 px-2 hover:bg-bg-base/30 rounded-xl transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <IconComponent className="w-4 h-4 text-gold-base group-hover:text-sun-red transition-colors stroke-[1.5]" />
                  <span className="text-xs font-bold text-charcoal group-hover:text-sun-red transition-colors font-sans">
                    {item.name}
                    <span className="text-gold-base font-mono text-[10px] ml-1">({item.count})</span>
                  </span>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-gold-base transition-transform duration-300 ${isCurrentOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* القائمة الفرعية التي تظهر عند الفتح (مثل سعات الحفارات في الصورة) */}
              {isCurrentOpen && (
                <div className="pl-7 pr-2 py-1.5 flex flex-col gap-2 text-[11px] bg-bg-base/10 rounded-lg mt-1">
                  {item.subItems.map((sub, sIdx) => (
                    <a 
                      key={sIdx} 
                      href={`#${sub.replace(/\s+/g, '-').toLowerCase()}`}
                      className="text-gold-base hover:text-sun-red transition-colors block font-medium py-0.5 before:content-['▸'] before:mr-2 before:text-gold-light"
                    >
                      {sub}
                    </a>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}
