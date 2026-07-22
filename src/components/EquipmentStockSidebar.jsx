import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, HardHat, Settings, Compass, Layers } from 'lucide-react';

export default function EquipmentStockSidebar() {
  const { t, i18n } = useTranslation();
  const [openSection, setOpenSection] = useState('Excavators');

  const stockData = [
    {
      name: 'Excavators',
      count: 44,
      icon: HardHat,
      titleKey: "sidebar.excavators",
      subItems: [
        { label: 'Excavator (0.25m3)', key: "sidebar.exc_sub1" },
        { label: 'Excavator (0.45m3)', key: "sidebar.exc_sub2" },
        { label: 'Excavator (0.7m3~)', key: "sidebar.exc_sub3" }
      ]
    },
    {
      name: 'Mini-Excavators',
      count: 83,
      icon: Settings,
      titleKey: "sidebar.mini_excavators",
      subItems: [
        { label: 'Mini Excavator (1t)', key: "sidebar.mini_sub1" },
        { label: 'Mini Excavator (2-3t)', key: "sidebar.mini_sub2" },
        { label: 'Mini Excavator (4-5t)', key: "sidebar.mini_sub3" }
      ]
    },
    {
      name: 'Cranes',
      count: 3,
      icon: Compass,
      titleKey: "sidebar.cranes",
      subItems: [
        { label: 'Rough Terrain Crane', key: "sidebar.crane_sub1" },
        { label: 'Truck Crane', key: "sidebar.crane_sub2" },
        { label: 'Crawler Crane', key: "sidebar.crane_sub3" },
        { label: 'Spider Cranes', key: "sidebar.crane_sub4" }
      ]
    },
    {
      name: 'Foundation Machines',
      count: 6,
      icon: Layers,
      titleKey: "sidebar.foundation_machines",
      subItems: [
        { label: 'Pile Driving Machine', key: "sidebar.found_sub1" },
        { label: 'Vibro Hammer', key: "sidebar.found_sub2" }
      ]
    }
  ];

  return (
    <div className="w-full bg-pure-white border border-gold-light/40 rounded-2xl overflow-hidden shadow-xs text-left mt-2">
      
      <div className="bg-[#005BAC] text-pure-white p-4 border-b border-gold-light/20">
        <h3 className="text-[11px] font-bold tracking-wider uppercase leading-tight font-mono">
          {t("sidebar.header_top")} <span className="text-gold-light/60">・</span>
        </h3>
        <h3 className="text-[11px] font-bold tracking-wider uppercase leading-tight font-mono mt-0.5">
          {t("sidebar.header_bottom")}
        </h3>
      </div>

      <div className="p-3 flex flex-col gap-1 bg-white">
        {stockData.map((item, idx) => {
          const IconComponent = item.icon;
          const isCurrentOpen = openSection === item.name;

          return (
            <div key={idx} className="border-b border-bg-base/40 last:border-0 pb-1 last:pb-0">
              
              <button 
                onClick={() => setOpenSection(isCurrentOpen ? '' : item.name)}
                className="w-full flex items-center justify-between py-2 px-2 hover:bg-bg-base/30 rounded-xl transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <IconComponent className="w-4 h-4 text-gold-base group-hover:text-sun-red transition-colors stroke-[1.5]" />
                  <span className="text-xs font-bold text-charcoal group-hover:text-sun-red transition-colors font-sans">
                    {t(item.titleKey)}
                    <span className="text-gold-base font-mono text-[10px] mx-1">({item.count})</span>
                  </span>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-gold-base transition-transform duration-300 ${isCurrentOpen ? 'rotate-180' : ''}`} />
              </button>

              {isCurrentOpen && (
                <div className="pl-7 pr-2 py-1.5 flex flex-col gap-2 text-[11px] bg-bg-base/10 rounded-lg mt-1">
                  {item.subItems.map((sub, sIdx) => (
                    <a 
                      key={sIdx} 
                      href={`#${sub.label.replace(/\s+/g, '-').toLowerCase()}`}
                      className="text-gold-base hover:text-sun-red transition-colors block font-medium py-0.5 before:content-['▸'] before:mx-2 before:text-gold-light"
                    >
                      {t(sub.key)}
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
