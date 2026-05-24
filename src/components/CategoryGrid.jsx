import { Truck, HardHat, Compass, Layers, Wrench, Settings } from 'lucide-react';

const categories = [
  { name: 'Excavators', count: 41, icon: HardHat },
  { name: 'Mini-Excavators', count: 83, icon: Settings },
  { name: 'Heavy Cranes', count: 3, icon: Compass },
  { name: 'Foundation Systems', count: 6, icon: Layers },
  { name: 'Logistic Trucks', count: 14, icon: Truck },
  { name: 'Road Rollers', count: 7, icon: Wrench },
];

export default function CategoryGrid() {
  return (
    <section className="flex-1">
      <div className="flex items-baseline justify-between mb-6 border-b border-gold-light/40 pb-3">
        <h3 className="font-antique text-base font-bold tracking-wider uppercase text-charcoal">Asset Classifications</h3>
        <p className="text-xs text-gold-base font-mono">Showing {categories.length} Primary Classes</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat, idx) => {
          const IconComponent = cat.icon;
          return (
            <div 
              key={idx} 
              className="bg-pure-white border border-gold-light/40 hover:border-sun-red/60 rounded-2xl p-6 flex flex-col justify-between h-40 cursor-pointer transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 group relative overflow-hidden"
            >
              <div className="flex justify-between items-start">
                <div className="p-3 bg-bg-base/40 rounded-xl text-charcoal group-hover:bg-sun-red/10 group-hover:text-sun-red transition-colors duration-300">
                  <IconComponent className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono font-bold bg-bg-base/50 text-gold-dark px-2.5 py-1 rounded-md group-hover:bg-sun-red group-hover:text-pure-white transition-colors duration-300">
                  {cat.count}
                </span>
              </div>
              <div>
                <h4 className="font-antique text-sm font-bold text-charcoal group-hover:text-sun-red transition-colors duration-300 uppercase tracking-wider">
                  {cat.name}
                </h4>
                <p className="text-[11px] text-gold-base font-light mt-1">Inspected & Documented</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
